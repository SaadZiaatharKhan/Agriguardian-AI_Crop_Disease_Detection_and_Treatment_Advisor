from fastapi import FastAPI, File, UploadFile
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
import tensorflow as tf
from tensorflow.keras.preprocessing import image
import io
from PIL import Image
import geocoder
import openmeteo_requests
import requests_cache
import pandas as pd
from retry_requests import retry
import joblib

final_prediction = {
    'Disease Prediction': "Upload An Image First",
    'Severity': "Nothing To Show Here",
    'Severity Percentage': 0,
    'Fertilizer': "None",
    'Fertilizer Amount (kg/acre)': 0
}

def get_current_location():
    g = geocoder.ip('me')
    return g.latlng

# Get current location
location = get_current_location()
if location:
    print(f"Latitude: {location[0]}, Longitude: {location[1]}")
else:
    print("Unable to determine the location.")

# Set up caching and retry mechanisms for weather data requests
cache_session = requests_cache.CachedSession('.cache', expire_after=3600)
retry_session = retry(cache_session, retries=5, backoff_factor=0.2)
openmeteo = openmeteo_requests.Client(session=retry_session)

# Define weather API parameters
url = "https://api.open-meteo.com/v1/forecast"
params = {
    "latitude": location[0],
    "longitude": location[1],
    "current_weather": True,
}

# Fetch weather data
responses = openmeteo.weather_api(url, params=params)
response = responses[0]

# Extract current weather variables
current = response.Current()
current_temperature_2m = current.Variables(0).Value()
current_relative_humidity_2m = current.Variables(1).Value()
current_precipitation = current.Variables(2).Value()
current_wind_speed_10m = current.Variables(3).Value()

# Load models and encoders
pipeline = joblib.load('linear_regression_model.pkl')
encoder_severity = joblib.load('encoder_severity.pkl')
encoder_fertilizer = joblib.load('encoder_fertilizer.pkl')
load_disease_classification_model = tf.keras.models.load_model('disease_classification_model.h5')

# Define FastAPI app
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define labels for disease classification
labels = {
    0: 'Apple Scab',
    1: 'Apple Black Rot',
    2: 'Cedar Apple Rust',
    3: 'Healthy Apple',
    4: 'Healthy Blueberry',
    5: 'Cherry Powdery Mildew',
    6: 'Healthy Cherry',
    7: 'Corn Cercospora Leaf Spot',
    8: 'Maize Common Rust',
    9: 'Corn Northern Leaf Blight',
    10: 'Healthy Corn',
    11: 'Grape Black Rot',
    12: 'Grape Black Measles',
    13: 'Grape Leaf Blight',
    14: 'Healthy Grape',
    15: 'Orange Citrus Greening',
    16: 'Peach Bacterial Spot',
    17: 'Healthy Peach',
    18: 'Pepper Bell Bacterial Spot',
    19: 'Healthy Pepper Bell',
    20: 'Potato Early Blight',
    21: 'Potato Late Blight',
    22: 'Healthy Potato',
    23: 'Healthy Raspberry',
    24: 'Healthy Soybean',
    25: 'Squash Powdery Mildew',
    26: 'Strawberry Leaf Scorch',
    27: 'Healthy Strawberry',
    28: 'Tomato Bacterial Spot',
    29: 'Tomato Early Blight',
    30: 'Tomato Late Blight',
    31: 'Tomato Leaf Mold',
    32: 'Tomato Septoria Leaf Spot',
    33: 'Tomato Spider Mites',
    34: 'Tomato Target Spot',
    35: 'Tomato Yellow Leaf Curl Virus',
    36: 'Tomato Mosaic Virus',
    37: 'Healthy Tomato'
}

# Predict the disease class from an image
def predict_image(model, img):
    img = img.resize((224, 224))
    img_array = np.array(img) / 255.0
    img_array = np.expand_dims(img_array, axis=0)
    preds = model.predict(img_array)
    predicted_class = labels[np.argmax(preds[0])]
    return predicted_class

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        contents = await file.read()
        image_stream = io.BytesIO(contents)
        img = Image.open(image_stream).convert("RGB")

        # Predict the disease using the model
        disease_prediction = predict_image(load_disease_classification_model, img)

        # Prepare input data for severity and fertilizer prediction
        input_data = [disease_prediction, current_temperature_2m, current_relative_humidity_2m, current_precipitation, current_wind_speed_10m]
        input_df = pd.DataFrame([input_data], columns=['Class', 'Temperature (°C)', 'Humidity (%)', 'Precipitation (mm)', 'Wind Speed (m/s)'])
        prediction = pipeline.predict(input_df)

        # Extract predictions
        severity_encoded = prediction[0, :encoder_severity.categories_[0].size]
        severity_percentage = prediction[0, encoder_severity.categories_[0].size]
        fertilizer_encoded = prediction[0, encoder_severity.categories_[0].size + 1:-1]
        fertilizer_amount = prediction[0, -1]

        # Decode categorical predictions
        severity = encoder_severity.inverse_transform([severity_encoded])[0][0]
        fertilizer = encoder_fertilizer.inverse_transform([fertilizer_encoded])[0][0]

        # Store the final prediction globally
        global final_prediction
        final_prediction = {
            'Disease Prediction': disease_prediction,
            'Severity': severity,
            'Severity Percentage': severity_percentage,
            'Fertilizer': fertilizer,
            'Fertilizer Amount (kg/acre)': fertilizer_amount
        }

        return final_prediction
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.get("/final")
async def final_output():
    return JSONResponse(content=final_prediction)

"use client";
import Image from "next/image";
import React, { useState, useEffect } from 'react';
import { fetchWeatherApi } from 'openmeteo';

export default function EnvironmentFactors() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [weatherData, setWeatherData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setLatitude(lat);
          setLongitude(lon);

          // Fetch weather data
          setLoading(true);
          try {
            const params = {
              latitude: lat,
              longitude: lon,
              current: ["temperature_2m", "relative_humidity_2m", "precipitation", "wind_speed_10m"],
              hourly: "temperature_2m"
            };
            const url = "https://api.open-meteo.com/v1/forecast";
            const responses = await fetchWeatherApi(url, params);
            const response = responses[0];
            const utcOffsetSeconds = response.utcOffsetSeconds();
            const current = response.current();
            const weatherData = {
              current: {
                temperature2m: current.variables(0)?.value() ?? null,
                relativeHumidity2m: current.variables(1)?.value() ?? null,
                precipitation: current.variables(2)?.value() ?? null,
                windSpeed10m: current.variables(3)?.value() ?? null,
              }
            };
            setWeatherData(weatherData);
          } catch (error) {
            setError('Error fetching weather data');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  const formatValue = (value: number | null) => (value !== null ? value.toFixed(2) : 'N/A');

  return (
    <div>
      {loading && <div>Loading weather data...</div>}
      
      {error && <div>{error}</div>}
      
      {weatherData && (
            <div className="dark:bg-slate-900 flex items-center justify-center w-11/12 pt-0 border-solid border-black border-8 rounded-full space-x-1">
            <div className="p-2 m-2 flex items-center justify-center space-x-2">
                <Image height={50} width={50} src="/assets/images/temperature.png" alt="Logo" className="m-2" />
                <p>{formatValue(weatherData.current.temperature2m)}°C</p>
            </div>
            <div className="p-2 m-2 flex items-center justify-center space-x-2">
                <Image height={50} width={50} src="/assets/images/humidity.png" alt="Logo" className="m-2" />
                <p>{formatValue(weatherData.current.relativeHumidity2m)}%</p>
            </div>
            <div className="p-2 m-2 flex items-center justify-center space-x-2">
                <Image height={50} width={50} src="/assets/images/precipitation.png" alt="Logo" className="m-2" />
                <p>{formatValue(weatherData.current.precipitation)} mm</p>
            </div>
            <div className="p-2 m-2 flex items-center justify-center space-x-2">
                <Image height={50} width={50} src="/assets/images/wind.png" alt="Logo" className="m-2" />
                <p>{formatValue(weatherData.current.windSpeed10m)} m/s</p>
            </div>
            </div>
        
      )}
    </div>
  );
}

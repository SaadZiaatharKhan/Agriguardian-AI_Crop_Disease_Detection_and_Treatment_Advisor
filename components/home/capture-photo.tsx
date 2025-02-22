"use client"; // Indicates that this component is a client component

import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { Button } from '../ui/moving-border';

interface CapturePhotoProps {
  refreshData: () => void;
}

const CapturePhoto = ({ refreshData }: CapturePhotoProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isCaptured, setIsCaptured] = useState(false);
  const [prediction, setPrediction] = useState<string>('');

  const capture = useCallback(() => {
    const image = webcamRef.current?.getScreenshot();
    if (image) {
      setImageSrc(image);
      setIsCaptured(true);
      sendImageToServer(image);
    }
  }, [webcamRef]);

  const recapture = useCallback(() => {
    setIsCaptured(false);
    setImageSrc(null);
    setPrediction('');
  }, []);

  const handleUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageSrc(result);
        setIsCaptured(true);
        sendImageToServer(result);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const sendImageToServer = (imageData: string) => {
    const blob = dataURLtoBlob(imageData);
    const formData = new FormData();
    formData.append('file', blob, 'capture.jpg');

    fetch('http://localhost:8000/predict', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        setPrediction(data.prediction_mobile || data.prediction_inception);
        refreshData(); // Refresh data after image is processed
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  const dataURLtoBlob = (dataURL: string): Blob => {
    const byteString = atob(dataURL.split(',')[1]);
    const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  return (
    <div className='h-full flex flex-col items-center justify-center'>
      {!isCaptured ? (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className='w-50 h-30' // Fixed size for the webcam
          />
          <div className='m-3 flex space-x-3'>
            <Button
              borderRadius="1.75rem"
              className="bg-sky-400 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              onClick={capture}
            >
              Capture Image
            </Button>
            <Button
              borderRadius="1.75rem"
              className="bg-sky-400 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <label htmlFor="uploadImage" className="cursor-pointer">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
                id="uploadImage"
              />
            </Button>
          </div>
        </>
      ) : (
        <div className='relative'>
          <div className='w-50 h-30 flex items-center justify-center bg-gray-200'> 
            <img src={imageSrc!} alt="Captured or Uploaded" className='w-full h-full object-cover' />
          </div>
          <div className='m-3 flex space-x-3'>
            <Button
              borderRadius="1.75rem"
              className="bg-sky-400 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              type="button"
              onClick={recapture}
            >
              Recapture
            </Button>
            <Button
              borderRadius="1.75rem"
              className="bg-sky-400 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
            >
              <label htmlFor="uploadImage" className="cursor-pointer">
                Upload New Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                style={{ display: 'none' }}
                id="uploadImage"
              />
            </Button>
          </div>
          {prediction && <div className='mt-3 text-lg'>Prediction: {prediction}</div>}
        </div>
      )}
    </div>
  );
};

export default CapturePhoto;


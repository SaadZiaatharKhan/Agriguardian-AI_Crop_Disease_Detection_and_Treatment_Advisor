import React, { useEffect } from 'react';
import { useData } from './fetchdata';

const SomeComponent = () => {
  const data = useData();

  useEffect(() => {
    console.log("Component data:", data);
  }, [data]);

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Disease Prediction: {data['Disease Prediction']}</h1>
      <p>Severity: {data['Severity']}</p>
      <p>Fertilizer: {data['Fertilizer']}</p>
    </div>
  );
};

export default SomeComponent;

"use client"

import React, { useState } from 'react';
import CropDiseases from './Crop_Diseases';
import GovernmentSchemes from './Government_Schemes'; // Import GovernmentSchemes component

const Library = () => {
  const [activeTab, setActiveTab] = useState("crop"); // "crop" or "govt"

  return (
    <div className="mt-0 bg-gray-100 pb-8 min-h-screen p-10">
      <h1 className="text-3xl font-bold text-center mb-6 text-black">Library</h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-10">
        <button
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === "crop" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setActiveTab("crop")}
        >
          Crop Diseases
        </button>

        <button
          className={`px-6 py-2 rounded-lg font-semibold ${
            activeTab === "govt" ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
          }`}
          onClick={() => setActiveTab("govt")}
        >
          Government Schemes
        </button>
      </div>

      {/* Render the Selected Component */}
      {activeTab === "crop" ? <CropDiseases /> : <GovernmentSchemes />}
    </div>
  );
};

export default Library;

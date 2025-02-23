"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Fertilizer({ data }) {
  const [land, setLand] = useState(1);

  const handleIncrease = () => setLand((prev) => prev + 1);
  const handleReset = () => setLand(1);
  const handleLandChange = (e) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 0) {
      setLand(value);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      {/* Fertilizer Details */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.3 }}
        className="border-2 border-gray-800 bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md text-center"
      >
        <h2 className="text-3xl font-bold text-green-600 dark:text-green-300 mb-4">
          Fertilizer Details
        </h2>

        {/* Fertilizer Name */}
        <div className="flex flex-col items-center mb-4">
          <h4 className="text-lg font-semibold">Fertilizer Name:</h4>
          <p className="text-2xl font-medium text-blue-500 dark:text-blue-300">
            {data["Fertilizer"]}
          </p>
        </div>

        {/* Land Area Input */}
        <div className="flex flex-col items-center mb-4">
          <h4 className="text-lg font-semibold">Land Area (in Acres):</h4>
          <input
            type="number"
            value={land}
            min="0"
            step="0.1"
            onChange={handleLandChange}
            className="w-24 text-center text-lg font-medium border-2 border-gray-600 rounded-md p-2 bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Fertilizer Amount */}
        <div className="flex flex-col items-center mb-6">
          <h4 className="text-lg font-semibold">Fertilizer Amount (kg):</h4>
          <p className="text-2xl font-medium text-red-500 dark:text-red-300">
            {(data["Fertilizer Amount (kg/acre)"] * land).toFixed(2)}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-4">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            onClick={handleIncrease}
          >
            +1 Acre
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
            onClick={handleReset}
          >
            Reset
          </motion.button>
        </div>
      </motion.div>

      {/* Disclaimer */}
      <p className="text-center text-sm text-red-600 dark:text-red-400 mt-4">
        ⚠️ Note: This data is AI-generated. Always consult agricultural experts before using fertilizers.
      </p>
    </main>
  );
}

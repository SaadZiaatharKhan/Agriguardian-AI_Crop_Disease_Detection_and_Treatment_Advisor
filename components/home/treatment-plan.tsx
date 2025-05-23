"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import diseasedata from "@/data/diseaseData.json";

interface TreatmentPlanProps {
  data: any;
  language?: string;
}

const Treatment_Plan: React.FC<TreatmentPlanProps> = ({ data, language }) => {
  const [treatment, setTreatment] = useState<any>(null);

  useEffect(() => {
    if (!data) return;

    // Normalize and trim strings for a robust comparison
    const diseasePrediction = data["Disease Prediction"]?.trim().toLowerCase();
    const severityLevel = data["Severity"];

    const diseaseEntry = Object.values(diseasedata).find(
      (entry: any) => entry.disease.trim().toLowerCase() === diseasePrediction
    );

    if (diseaseEntry && diseaseEntry.severity[severityLevel]) {
      setTreatment(diseaseEntry.severity[severityLevel]);
    } else {
      setTreatment(null);
    }
  }, [data, language]); // Update whenever data or language changes

  return (
    <div className="max-w-xl mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-md">
      {treatment ? (
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8 }} 
          className="mb-4 border border-cyan-400 p-4 rounded-lg bg-gray-800"
        >
          <h3 className="text-xl font-semibold text-cyan-400 mb-2">Treatment Plan</h3>
          <div className="space-y-2">
            <p className="text-gray-300">
              <span className="font-medium text-cyan-300">Organic Treatment:</span> {treatment.treatment.organic}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-cyan-300">Chemical Treatment:</span> {treatment.treatment.chemical}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-cyan-300">Cost per acre (Organic):</span> ₹{treatment.cost_per_acre.organic}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-cyan-300">Cost per acre (Chemical):</span> ₹{treatment.cost_per_acre.chemical}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-cyan-300">Effectiveness (Organic):</span> {treatment.effectiveness.organic}%
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-cyan-300">Effectiveness (Chemical):</span> {treatment.effectiveness.chemical}%
            </p>
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-400">No treatment plan available.</p>
      )}
    </div>
  );
};

export default Treatment_Plan;

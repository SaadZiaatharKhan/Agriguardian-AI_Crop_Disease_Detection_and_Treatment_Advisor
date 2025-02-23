"use client";
import { useEffect, useState } from "react";
import Lamp from "@/components/home/lamp";
import PhotoWindow from "@/components/home/photo-window";
import EnvironmentFactors from "@/components/home/environment-factors";
import Card from "@/components/home/card";
import FetchData from "@/components/fetchdata";
import SeverityChart from "@/components/home/severity-chart";
import Fertilizer from "@/components/home/fertilizer";
import Treatment_Plan from "@/components/home/treatment-plan";
import MarketTrends from "@/components/MarketTrends";

import { UserButton } from "@clerk/nextjs";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [isOpen, setIsOpen] = useState(false);

  const languages = ["English", "Hindi", "Marathi", "Urdu", "Bengali", "Gujarati"];

  const refreshData = async () => {
    try {
      const result = await FetchData(selectedLanguage); // Fetch new data based on the language
      setData(result);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    refreshData();
  }, [selectedLanguage]); // Re-fetch data whenever the language changes

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="dark:bg-gradient-to-b from-slate-950 to-blue-950 bg-white h-auto lg:w-full w-fit backdrop-blur-md md:flex flex-col select-none cursor-pointer justify-center items-center relative">

      {/* Language Selector */}
      <div className="w-full relative text-left my-4 flex justify-between p-6">
        <div>
          <UserButton />
        </div>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg focus:outline-none"
          >
            {selectedLanguage} ▼
          </button>

          {isOpen && (
            <div className="absolute -left-7 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {languages.map((language) => (
                <button
                  key={language}
                  onClick={() => {
                    setSelectedLanguage(language);
                    setIsOpen(false);
                  }}
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full text-left"
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col justify-evenly items-center border-transparent w-fit">
        <EnvironmentFactors />

        <div className="h-full flex -z-1 m-3 p-4 justify-between space-x-5">
          <div className="h-1/4 w-1/3 flex justify-center items-center m-3">
            <PhotoWindow refreshData={refreshData} language={selectedLanguage} />
          </div>
          <div className="h-1/4 w-2/3 flex justify-center items-center">
            <Card data={data} language={selectedLanguage} /> {/* Passing language to Card */}
          </div>
        </div>

        <div className="z-40 h-full w-full flex flex-col items-center justify-center p-3 m-3">
          <h2 className="text-6xl m-2 p-2">SEVERITY</h2>
          <div className="h-full w-full">
            <SeverityChart data={data} language={selectedLanguage} /> {/* Passing language */}
          </div>
        </div>

        <div className="h-full w-full flex flex-col items-center justify-center p-3 m-3">
          <h2 className="text-6xl m-2 p-2">FERTILIZER</h2>
          <div>
            <Fertilizer data={data} language={selectedLanguage} /> {/* Passing language */}
          </div>
        </div>

        <div className="h-full w-full flex flex-col items-center justify-center p-3 m-3">
          <h2 className="text-6xl m-2 p-2">Treatment Plan</h2>
          <div>
            <Treatment_Plan data={data} language={selectedLanguage} /> {/* Passing language */}
          </div>
        </div>

        <div className="h-full w-full flex flex-col items-center justify-center p-3 m-3">
          <h2 className="text-6xl m-2 p-2">Crop Market Trends & Selling Advice</h2>
          <div>
            <MarketTrends />
          </div>
        </div>
      </div>
    </main>
  );
}

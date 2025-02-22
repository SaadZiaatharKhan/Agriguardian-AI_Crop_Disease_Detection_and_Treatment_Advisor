"use client";
import { useEffect, useState } from "react";
import Lamp from "@/components/home/lamp";
import PhotoWindow from "@/components/home/photo-window";
import EnvironmentFactors from "@/components/home/environment-factors";
import Card from "@/components/home/card";
import FetchData from "@/components/fetchdata";
import SeverityChart from "@/components/home/severity-chart";
import Fertilizer from "@/components/home/fertilizer";

export default function Home() {
  const [data, setData] = useState<any>(null); // Updated type
  const [error, setError] = useState<string | null>(null);

  const refreshData = async () => {
    try {
      const result = await FetchData();
      setData(result);
    } catch (err) {
      setError("Failed to fetch data");
    }
  };

  useEffect(() => {
    refreshData(); // Fetch initial data
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <main className="dark:bg-gradient-to-b from-slate-950 to-blue-950 bg-white h-auto lg:w-full w-fit backdrop-blur-md md:flex flex-col select-none cursor-pointer justify-center items-center">
      <div className="opacity-0 dark:opacity-100 w-full">
        <Lamp />
      </div>
      <div className="flex flex-col justify-evenly items-center border-transparent w-fit">
        <div className="">
          <EnvironmentFactors />
        </div>
        <div className="h-full flex -z-1 m-3 p-4 justify-between space-x-5">
          <div className="h-1/4 w-1/3 flex justify-center items-center m-3">
            <PhotoWindow refreshData={refreshData} />
          </div>
          <div className="h-1/4 w-2/3 flex justify-center items-center">
            <Card data={data} /> {/* Pass the fetched data to Card */}
          </div>
        </div>
        <div className="z-40 h-full w-full flex flex-col items-center justify-center p-3 m-3">
          <h2 className="text-6xl m-2 p-2">SEVERITY</h2>
            <div className="h-full w-full">
              <SeverityChart data={data}/>
            </div>
        </div>
        <div className="h-full w-full flex flex-col items-center justify-center p-3 m-3">
          <h2 className="text-6xl m-2 p-2">FERTILIZER</h2>
          <div>
            <Fertilizer data={data}/>
          </div>
        </div>
      </div>
    </main>
  );
}


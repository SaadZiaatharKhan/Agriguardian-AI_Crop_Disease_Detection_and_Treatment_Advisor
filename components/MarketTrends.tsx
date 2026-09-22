"use client";
import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

export default function MarketTrends() {
  const [crop, setCrop] = useState("");
  const [marketData, setMarketData] = useState(null);
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch market data and analyze trends using Gemini AI
  const fetchMarketData = async (cropName: string) => {
    if (!cropName.trim()) return;
    setLoading(true);

    try {
      // Fetch market trends from SerpAPI
      const res = await fetch(`/api/market-trends?crop=${cropName}`);
      const data = await res.json();

      setMarketData(data.searchResults);

      // Analyze trends with Gemini AI
      const analysisRes = await fetch("/api/analyze-trends", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marketData: data.searchResults }),
      });
      const analysis = await analysisRes.json();

      // Remove '*' characters for cleaner output
      const cleanedAdvice = analysis.advice.replace(/\*/g, "");
      setAdvice(cleanedAdvice);
      setError("");
    } catch (err: any) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch market trends. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Debounce the API calls to wait until user stops typing for 500ms
  const debouncedFetchMarketData = useCallback(
    debounce((cropName: string) => {
      fetchMarketData(cropName);
    }, 500),
    []
  );

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCrop(value);
    debouncedFetchMarketData(value);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="dark:text-black dark:font-bold text-2xl font-normal mb-4">Market Price Trends</h2>
      
      <input
        type="text"
        placeholder="Enter crop name..."
        value={crop}
        onChange={handleInputChange}
        className="w-full border border-gray-300 p-2 rounded mb-4"
      />
      
      {loading && <p className="text-gray-600">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {marketData && (
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="text-lg text-blue-600 font-normal mb-2">Market Data</h3>
            <div className="bg-gray-100 p-4 rounded border border-gray-200 max-h-64 overflow-auto overflow-x-auto">
              <pre className="whitespace-pre text-sm text-gray-800">
                {JSON.stringify(marketData, null, 2)}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg text-blue-600 font-normal mb-2">Selling Advice</h3>
            <div className="bg-gray-100 p-4 rounded border border-gray-200 max-h-64 overflow-auto overflow-x-auto">
              <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {advice}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Source: SerpAPI (Market Data), Google Gemini AI (Analysis)
          </p>
        </div>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });
const adviceModel = genAI.getGenerativeModel({
  model: "gemini-3.5-flash-lite",
  generationConfig: { responseMimeType: "application/json" },
});

const unavailableAdvice = {
  about: "Unable to fetch advice at this time.",
  causes: "Unable to fetch advice at this time.",
  prevention: "Unable to fetch advice at this time.",
  aftermath: "Unable to fetch advice at this time.",
};

async function fetchAdvice(disease, severity, language) {
  try {
    const prompt = `For the crop disease "${disease}" with severity "${severity}", respond in ${language}. Return only a JSON object with these string fields: "about" (about 30 words), "causes" (about 50 words), "prevention" (about 50 words), and "aftermath" (about 55 words explaining what to do now). Do not use Markdown.`;
    const result = await adviceModel.generateContent(prompt);
    const advice = JSON.parse(result.response.text());

    return {
      about: advice.about || unavailableAdvice.about,
      causes: advice.causes || unavailableAdvice.causes,
      prevention: advice.prevention || unavailableAdvice.prevention,
      aftermath: advice.aftermath || unavailableAdvice.aftermath,
    };
  } catch (error) {
    console.error("Error fetching crop advice:", error);
    return unavailableAdvice;
  }
}

const ChatInput = ({ onSend }) => {
  const [query, setQuery] = useState("");

  const handleSend = () => {
    if (!query.trim()) return;
    onSend(query);
    setQuery("");
  };

  return (
    <div className="flex items-center p-3 border rounded-lg shadow-md w-full bg-gray-800">
      <input
        type="text"
        placeholder="Enter your query..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        className="flex-grow outline-none bg-transparent text-white placeholder-gray-500"
      />
      <button onClick={handleSend} className="ml-3 text-gray-400 hover:text-white">
        ➜
      </button>
    </div>
  );
};

const Card = ({ data, language }) => {
  const [advice, setAdvice] = useState(unavailableAdvice);
  const [messages, setMessages] = useState([]);
  const [isGPTMode, setIsGPTMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const disease = data["Disease Prediction"];
      const severity = data["Severity"];
      const nextAdvice = await fetchAdvice(disease, severity, language);
      setAdvice(nextAdvice);
    }
    fetchData();
  }, [data, language]);

  const handleQuery = async (query) => {
    setMessages((prev) => [...prev, { text: query, type: "user" }]);
    const prompt = `Answer this query related to ${data["Disease Prediction"]} in 40 words: ${query} in ${language} without bold and italic.`;
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      setMessages((prev) => [...prev, { text: response, type: "bot" }]);
    } catch (error) {
      console.error("Error generating GPT response:", error);
      setMessages((prev) => [...prev, { text: "Error processing query.", type: "bot" }]);
    }
  };

  return (
    <div className="relative max-w-lg mx-auto mt-5 bg-gray-900 text-white p-4 rounded-lg shadow-md">
      {/* Toggle Button */}
      <button
        className="absolute top-3 right-3 w-8 h-8 bg-cyan-400 rounded-full flex items-center justify-center shadow-lg"
        onClick={() => setIsGPTMode(!isGPTMode)}
      >
        {isGPTMode ? "💬" : "🤖"}
      </button>

      {isGPTMode ? (
        <div className="h-56 overflow-y-auto mt-4 space-y-2 bg-gray-800 p-3 rounded-md">
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`p-2 rounded-lg max-w-[80%] ${
                msg.type === "user" ? "bg-blue-500 self-end ml-auto" : "bg-gray-700 self-start"
              }`}
            >
              {msg.text}
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-4 space-y-3 border-b border-gray-700">
          {["Predicted Disease", "About", "Causes", "Prevention", "What To Do Now?"].map((title, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="mb-4"
            >
              <h2 className="text-lg font-semibold text-cyan-400">{title}</h2>
              <p className="text-gray-300">
                {[
                  data["Disease Prediction"],
                  advice.about,
                  advice.causes,
                  advice.prevention,
                  advice.aftermath,
                ][index]}
              </p>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-3">
        <ChatInput onSend={handleQuery} />
      </div>
    </div>
  );
};

export default Card;

"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function fetchAbout(disease, language) {
  const prompt = `Tell About ${disease} in 30 words in ${language}.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function fetchCauses(disease, severity, language) {
  const prompt = `Tell Causes of ${disease} of ${severity} in 50 words in ${language}.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function fetchPrevention(disease, language) {
  const prompt = `Tell Prevention of ${disease} in 50 words in ${language}.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

async function fetchAftermath(disease, severity, language) {
  const prompt = `Tell What to do after ${disease} of severity ${severity} in 55 words in ${language}.`;
  const result = await model.generateContent(prompt);
  return result.response.text();
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
      <button onClick={handleSend} className="ml-3 text-gray-400 hover:text-white">➜</button>
    </div>
  );
};

const Card = ({ data, language }) => {
  const [about, setAbout] = useState("");
  const [causes, setCauses] = useState("");
  const [prevention, setPrevention] = useState("");
  const [aftermath, setAftermath] = useState("");
  const [messages, setMessages] = useState([]);
  const [isGPTMode, setIsGPTMode] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setAbout(await fetchAbout(data["Disease Prediction"], language));
      setCauses(await fetchCauses(data["Disease Prediction"], data["Severity"], language));
      setPrevention(await fetchPrevention(data["Disease Prediction"], language));
      setAftermath(await fetchAftermath(data["Disease Prediction"], data["Severity"], language));
    }
    fetchData();
  }, [data, language]);

  const handleQuery = async (query) => {
    setMessages((prev) => [...prev, { text: query, type: "user" }]);
    const prompt = `Answer this query related to ${data["Disease Prediction"]} in 40 words: ${query} in ${language}.`;
    const result = await model.generateContent(prompt);
    const response = await result.response.text();
    setMessages((prev) => [...prev, { text: response, type: "bot" }]);
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
              <p className="text-gray-300">{[data["Disease Prediction"], about, causes, prevention, aftermath][index]}</p>
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
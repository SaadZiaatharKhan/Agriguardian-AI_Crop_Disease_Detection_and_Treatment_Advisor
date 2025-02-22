"use client";
import React from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";

export default function LinkPreviewText1() {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <h1 className="text-neutral-500 dark:text-neutral-400 text-xl md:text-4xl max-w-3xl mx-auto mb-10 font-bold	text-b">Crop Disease Detection And Management</h1>
      <h1 className="text-neutral-500 dark:text-neutral-400 text-xl md:text-2xl max-w-3xl mx-auto mb-10 font-bold	text-b">Explanation of the Proposed Solution:
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-lg max-w-3xl mx-auto mb-10">
      The system uses AI-based image analysis with CNNs (VGG-16, Inception V-3, ResNet-50) to detect crop diseases from images captured by farmers. Preprocessing (noise reduction, color normalization, segmentation) with {" "}
      <LinkPreview url="https://opencv.org/" className="font-bold">
          OpenCV
        </LinkPreview>{" "}
       optimizes images for analysis. Neural networks classify diseases and estimate severity, integrating environmental data from IoT devices and {" "}
       <LinkPreview url="https://open-meteo.com/" className="font-bold">
       Open-Meteo Weather APIs
        </LinkPreview>
        . Linear Regression models predict disease outbreaks by analyzing temperature, humidity, and other factors. Upon detection, the system provides tailored treatment recommendations based on disease severity, crop type, and local conditions, and suggests nearby Agro-shops via {" "}
        <LinkPreview url="https://developers.google.com/maps" className="font-bold">
        Google Maps API
        </LinkPreview>. The solution is accessible via mobile and web applications with multilingual support in 15 native languages, using generative text powered by {" "}
        <LinkPreview url="https://platform.openai.com/docs/overview" className="font-bold">
        OpenAI API
        </LinkPreview>, {" "}
        <LinkPreview url="https://ollama.com/" className="font-bold">
        Ollama
        </LinkPreview>, Llama3.1, and Gemini.
      </p>
    </div>
  );
}

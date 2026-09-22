"use client";
import React from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";
import AnimatedToolTip from "./animated-tooltip";

export default function LinkPreviewText2() {
  return (
    <div className="flex justify-center items-center h-[40rem] flex-col px-4">
      <h1 className="text-neutral-500 dark:text-neutral-400 text-xl md:text-2xl max-w-3xl mx-auto mb-10 font-bold	text-b">Problem Solving Approach and Innovation:
      </h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-xl md:text-lg max-w-3xl mx-auto mb-10">
      AI-driven image analysis and computer vision using {" "}
      <LinkPreview url="https://scikit-learn.org/stable/" className="font-bold">
      scikit-learn
      </LinkPreview>{" "}
      and OpenCV enable early disease detection, reducing crop yield loss. Integration of environmental data allows for proactive disease outbreak predictions, enhancing accuracy and predictive capabilities. Real-time data powers customized treatment and prevention plans, with real-time predictive alerts that set it apart from traditional systems. Offers tailored treatments, preventive measures, and support through Professional Helpline and Community Support via Websockets and {" "}
      <LinkPreview url="https://getstream.io/" className="font-bold">
      Stream API
      </LinkPreview>. Cross-Platform Mobile and Web-Apps provide easy access with a user-friendly interface, multilingual support, and offline functionality using Tensorflow lite model.
      </p>
    </div>
  );
}

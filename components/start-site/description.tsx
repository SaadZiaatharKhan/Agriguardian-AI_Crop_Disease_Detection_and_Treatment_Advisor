"use client";
import { TypewriterEffect } from "../ui/typewriter-effect";

export default function Description_below_problems() {
  const words = [
    {
      text: "A",
    },
    {
      text: "Modern",
    },
    {
      text: "AI",
    },
    {
      text: "Based",
    },
    {
      text: "Application",
    },
    {
      text: "To",
    },
    {
      text: "Detect",
    },
    {
      text: "Crop",
    },
    {
      text: "Diseases",
    },
    {
      text: "And",
    },
    {
      text: "Provide",
    },
    {
      text: "Solution.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem] ">
      <TypewriterEffect words={words} />
    </div>
  );
}

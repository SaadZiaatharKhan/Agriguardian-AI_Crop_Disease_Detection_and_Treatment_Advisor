import React from "react";
import { FlipWords } from "../ui/flip-words";

export default function Start_Problems() {
  const words = [" QUERIES", " PROBLEMS", " ISSUES", " CONCERNS"];

  return (
    <div className="h-[40rem] flex justify-center items-center px-4">
      <div className="text-4xl md:text-6xl mx-auto font-normal text-white dark:text-slate-400">
        ALL YOUR 
        <FlipWords words={words} /> <br />
        ONE SOLUTION
      </div>
    </div>
  );
}

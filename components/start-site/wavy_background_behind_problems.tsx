"use client";
import React from "react";
import { WavyBackground } from "../ui/wavy-background";
import Start_Problems from "./start-problems";

export default function Wavy_Background_Behind_Problems() {
  return (
    <WavyBackground className="w-full lg:text-7xl text-white font-bold inter-var text-center overflow-x-hidden">
        <Start_Problems/>
    
    </WavyBackground>
  );
}

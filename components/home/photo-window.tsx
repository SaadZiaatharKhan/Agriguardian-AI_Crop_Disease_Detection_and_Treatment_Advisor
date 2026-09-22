"use client";
import React from "react";
import { BackgroundGradient } from "../ui/background-gradient";
import CapturePhoto from "./capture-photo";

interface PhotoWindowProps {
  refreshData: () => void;
}

export default function PhotoWindow({ refreshData }: PhotoWindowProps) {
  return (
    <div>
      <BackgroundGradient className="rounded-[22px] h-full w-auto bg-white dark:bg-zinc-900">
        <CapturePhoto refreshData={refreshData} />
      </BackgroundGradient>
    </div>
  );
}

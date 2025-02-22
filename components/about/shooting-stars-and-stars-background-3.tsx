"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import LinkPreviewText3 from "./link-preview-text-3";

export default function ShootingStarsAndStarsBackground2() {
  return (
    <div className="h-[40rem] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <div className="z-10">
         <LinkPreviewText3/>
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}

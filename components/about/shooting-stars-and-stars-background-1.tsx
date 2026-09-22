"use client";
import React from "react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { StarsBackground } from "@/components/ui/stars-background";
import LinkPreviewText1 from "./link-preview-text-1";
export default function ShootingStarsAndStarsBackground1() {
  return (
    <div className="h-[40rem] rounded-md bg-neutral-900 flex flex-col items-center justify-center relative w-full">
      <div className="z-10">     
         <LinkPreviewText1/>
      </div>
      <ShootingStars />
      <StarsBackground />
    </div>
  );
}

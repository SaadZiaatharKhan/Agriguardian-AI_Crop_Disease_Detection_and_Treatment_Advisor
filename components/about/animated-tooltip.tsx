"use client";
import React from "react";
import { AnimatedTooltip } from "../ui/animated-tooltip";
const people = [
  {
    id: 1,
    name: "Jane Smith",
    designation: "Team Leader",
    image:
      "/assets/images/humidity.png",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    designation: "Product Manager",
    image:
      "/assets/images/logo.png",
  },
  {
    id: 3,
    name: "Alexa Williams",
    designation: "Data Scientist",
    image:
      "/assets/images/humidity.png",
  },
  {
    id: 4,
    name: "Stuart Wilson",
    designation: "UX Designer",
    image:
      "/assets/images/precipitation.png",
  },
  {
    id: 5,
    name: "Ben Stokes",
    designation: "Soap Developer",
    image:
      "/assets/images/precipitation.png",
  },
  {
    id: 6,
    name: "William Davis",
    designation: "The Explorer",
    image:
      "/assets/images/precipitation.png",
  },
];

export default function AnimatedToolTip() {
  return (
    <div className="flex flex-row items-center justify-center mb-10 w-full">
      <AnimatedTooltip items={people} />
    </div>
  );
}

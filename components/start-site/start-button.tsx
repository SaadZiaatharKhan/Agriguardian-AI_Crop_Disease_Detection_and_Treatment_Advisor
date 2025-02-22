"use client";
import React from "react";
import { Button } from "../ui/moving-border";
import Link from "next/link";

export default function Start_Button() {
  return (
    <div>
      <Button
        borderRadius="1.75rem"
        className="bg-gray-400 dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
      >
        <Link href="/Home">Getting Started</Link>
      </Button>
    </div>
  );
}

"use client";
import React from "react";
import { Vortex } from "@/components/ui/vortex";
import { FlipWords } from "@/components/ui/flip-card";

export function VortexDemo() {
    const words = [" Code", "Music", "Video", "Image", "Conversations"];
  return (
    <div className="w-screen mx-auto rounded-md h-[35rem] overflow-hidden">
      <Vortex
        className="flex items-center flex-col justify-center px-2 md:px-10 py-2 w-full h-full"
      >
        <h2 className="text-white text-2xl md:text-6xl font-bold text-center">
          AI is the future of everything
        </h2>
        <p className="text-white text-sm md:text-2xl max-w-xl mt-6 text-center">
            Leverage the power of AI with Versa AI.
        </p>
        <div className="text-2xl md:text-2xl text-center font-bold"> 
          Generate <FlipWords words={words} /> <br />
        </div>
      </Vortex>
    </div>
  );
}

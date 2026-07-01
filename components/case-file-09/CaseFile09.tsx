"use client";

import React, { useState, useEffect } from "react";
import { markCaseCompleted } from "@/components/case-progress";
import { ImageOrderingEngine } from "./ImageOrderingEngine";
import { PuzzleConfig } from "./types";
import { ArchiveFragmentPanel } from "./stage2/ArchiveFragmentPanel";

const CASE_9_PUZZLE: PuzzleConfig = {
  id: "archive-dependencies",
  title: "ARCHIVE DEPENDENCIES",
  description:
    "Reconstruct the final archive symbol by dragging and arranging all eight collectible fragments into their correct positions.",
  imageFolder: "/Symbols",
  imageFiles: [
    "cf1.png",
    "cf2.png",
    "cf3.png",
    "cf4.png",
    "cf5.png",
    "cf6.png",
    "cf7.png",
    "cf8.png",
  ],
  correctOrder: [
    "cf1",
    "cf2",
    "cf3",
    "cf4",
    "cf5",
    "cf6",
    "cf7",
    "cf8",
  ],
  gridCols: 4,
  gridRows: 2,
};

const STAGE_2_STORY_TEXT = `ARCHIVE RECOVERY: 97%

Cross-file correlation restored.

Recovered object detected.

FILE:
NULL.txt

STATUS:
Contains hidden data.

No visible content detected.`;

const STAGE_2_HINTS = [
  "The archive never creates truly empty files.\nCheck what the operating system knows that your editor does not.",
  "Sometimes information is stored in characters that cannot be seen.",
  "Search for tools that detect or decode zero-width Unicode characters."
];

export default function CaseFile09() {
  const [stage, setStage] = useState<1 | 2>(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("case-09-quiz-1-completed") === "true") {
        window.location.href = "/hunt/case-09/power-restoration";
      } else if (localStorage.getItem("case-09-symbol-reconstructed") === "true") {
        setStage(2);
      }
    }
  }, []);

  const handleStage1Solve = () => {
    localStorage.setItem("case-09-symbol-reconstructed", "true");
    setStage(2);
  };

  const handleStage2Solve = () => {
    localStorage.setItem("case-09-quiz-1-completed", "true");
    localStorage.setItem("case-09-stage-1-completed", "true");
    window.location.href = "/hunt/case-09/power-restoration";
  };

  return (
    <div
      className="min-h-screen w-full text-white bg-cover bg-center bg-no-repeat flex flex-col relative overflow-hidden font-mono"
      style={{
        backgroundImage: "url('/Hunt/Background-Image.png')",
      }}
    >
      {/* Background cinematic dark overlays */}
      <div className="absolute inset-0 bg-black/65 pointer-events-none z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none z-0" />

      {/* Floating retro scanline effect */}
      <div className="absolute inset-0 pointer-events-none z-10 bg-repeating-linear-gradient(to_bottom,rgba(6,182,212,0.015)_0,rgba(6,182,212,0.015)_1px,transparent_2px,transparent_4px) animate-[scan_15s_linear_infinite]" />



      {/* Main Puzzle Area */}
      <main className="flex-1 relative z-20 flex flex-col items-center justify-center py-10 md:py-16">
        <div className="w-full flex flex-col items-center">
          {stage === 1 ? (
            <ImageOrderingEngine config={CASE_9_PUZZLE} onSolve={handleStage1Solve} />
          ) : (
            <ArchiveFragmentPanel
              storyText={STAGE_2_STORY_TEXT}
              filePath="/assets/files/NULL.txt"
              expectedAnswer="NULLEVENT"
              hints={STAGE_2_HINTS}
              fileSize="216 Bytes"
              statusText="No visible characters"
              onSuccess={handleStage2Solve}
            />
          )}
        </div>
      </main>

      {/* Global scanline animation override */}
      <style jsx global>{`
        @keyframes scan {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 0 400px;
          }
        }
      `}</style>
    </div>
  );
}

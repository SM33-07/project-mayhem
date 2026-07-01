"use client";

import React, { useEffect } from "react";
import CaseGuard from "@/components/CaseGuard";
import { PuzzleHeader } from "@/components/PuzzleHeader";
import { TransmissionPanel } from "@/components/TransmissionPanel";
import { MorseDisplay } from "@/components/MorseDisplay";
import { AnswerInput } from "@/components/AnswerInput";
import { HintPanel } from "@/components/HintPanel";
import { SuccessModal } from "@/components/SuccessModal";
import { useMorsePuzzle } from "@/hooks/useMorsePuzzle";
import { markCaseCompleted } from "@/components/case-progress";

export default function MorseTransmissionPage() {
  const {
    answer,
    setAnswer,
    error,
    setError,
    hintIndex,
    isSolved,
    handleSubmit,
    showNextHint,
    story,
    transmission,
    hints,
    title,
  } = useMorsePuzzle();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("case-09-stage-2-completed") !== "true") {
        window.location.href = "/hunt/case-09";
      }
    }
  }, []);

  const handleSolveComplete = async () => {
    await markCaseCompleted("09");
    window.location.href = "/hunt";
  };

  return (
    <CaseGuard caseId="09">
      <div
        className="min-h-screen w-full text-white bg-cover bg-center bg-no-repeat flex flex-col relative overflow-y-auto font-mono"
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
        <main className="flex-1 relative z-20 flex flex-col items-center justify-start py-10 md:py-16 px-4 max-w-6xl mx-auto w-full space-y-8">
          <PuzzleHeader title={title} category="CASE 9 // FINAL SECURITY PROTOCOL" />

          {/* Decryption grid system - Two column layout on large screens */}
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Narrative (Story/Log) & Hints */}
            <div className="lg:col-span-5 flex flex-col gap-6 w-full items-stretch">
              <TransmissionPanel story={story} />
              <HintPanel hints={hints} hintIndex={hintIndex} />
            </div>

            {/* Right Column: Morse Raw Data & Input submission */}
            <div className="lg:col-span-7 flex flex-col gap-6 w-full items-center">
              <MorseDisplay transmission={transmission} />
              <AnswerInput
                value={answer}
                onChange={(val) => {
                  setAnswer(val);
                  if (error) setError(false);
                }}
                onSubmit={handleSubmit}
                onHint={showNextHint}
                error={error}
                disabled={isSolved}
              />
            </div>
          </div>
        </main>

        {/* Success / Decryption Decoded Modal */}
        <SuccessModal isOpen={isSolved} onConfirm={handleSolveComplete} />

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
    </CaseGuard>
  );
}

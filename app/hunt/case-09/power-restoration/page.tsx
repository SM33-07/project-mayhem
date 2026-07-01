"use client";

import React, { useEffect } from "react";
import CaseGuard from "@/components/CaseGuard";
import { PowerGrid } from "@/components/PowerGrid";

export default function PowerRestorationPage() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("case-09-stage-2-completed") === "true") {
        window.location.href = "/hunt/case-09/morse-transmission";
      }
    }
  }, []);

  const handleSolve = () => {
    // Record stage 2 completion locally
    if (typeof window !== "undefined") {
      localStorage.setItem("case-09-stage-2-completed", "true");
    }
    
    // Redirect to morse transmission
    window.location.href = "/hunt/case-09/morse-transmission";
  };

  return (
    <CaseGuard caseId="09">
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
          <PowerGrid onSolve={handleSolve} />
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
    </CaseGuard>
  );
}

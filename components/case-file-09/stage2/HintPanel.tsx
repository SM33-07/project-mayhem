import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, ChevronDown, MessageSquare } from "lucide-react";

interface HintPanelProps {
  hints: string[];
}

export function HintPanel({ hints }: HintPanelProps) {
  const [revealedCount, setRevealedCount] = useState(0);

  const handleRevealNext = () => {
    if (revealedCount < hints.length) {
      setRevealedCount((prev) => prev + 1);
    }
  };

  return (
    <div className="w-full max-w-md font-mono space-y-4">
      {/* Trigger Button */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={handleRevealNext}
          disabled={revealedCount >= hints.length}
          className="flex items-center gap-2 px-5 py-2.5 bg-zinc-900 border border-zinc-800 hover:border-amber-500/40 text-zinc-400 hover:text-amber-400 disabled:text-zinc-700 disabled:border-zinc-950 disabled:bg-zinc-950/20 text-xs font-bold uppercase rounded-lg tracking-widest transition-all duration-300 shadow-md cursor-pointer hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] disabled:cursor-not-allowed disabled:shadow-none active:scale-95"
        >
          <HelpCircle size={14} className={revealedCount < hints.length ? "animate-pulse" : ""} />
          <span>
            {revealedCount === 0
              ? "Request Hint"
              : revealedCount >= hints.length
              ? "All Hints Unlocked"
              : `Unlock Next Hint (${revealedCount}/${hints.length})`}
          </span>
        </button>
      </div>

      {/* Unlocked Hints list */}
      <div className="space-y-3">
        <AnimatePresence>
          {hints.slice(0, revealedCount).map((hint, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, height: 0, y: -10 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-zinc-950/60 border border-amber-500/25 rounded-xl p-4 shadow-[0_0_20px_rgba(245,158,11,0.02)] relative">
                {/* Micro amber indicator dot */}
                <div className="absolute top-3 right-3 h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />

                <div className="flex items-start gap-2.5">
                  <MessageSquare size={14} className="text-amber-500 mt-0.5 shrink-0" />
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-[0.2em] text-amber-500/70 font-bold">
                      Intelligence Hint #{idx + 1}
                    </span>
                    <p className="text-zinc-400 text-xs font-sans leading-relaxed whitespace-pre-line">
                      {hint}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

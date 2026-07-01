import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";

interface SuccessModalProps {
  isOpen: boolean;
  onConfirm: () => void;
}

export function SuccessModal({ isOpen, onConfirm }: SuccessModalProps) {
  const [progress, setProgress] = useState(97);
  const [isFullyRestored, setIsFullyRestored] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setProgress(97);
      setIsFullyRestored(false);

      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsFullyRestored(true);
            return 100;
          }
          return prev + 1;
        });
      }, 500); // Takes 1.5 seconds to reach 100%

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-emerald-500/40 bg-zinc-950 p-6 md:p-8 shadow-[0_0_50px_rgba(16,185,129,0.2)] z-10 text-center font-mono"
          >
            {/* Hologram aesthetic scanline background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-500/[0.02] pointer-events-none" />

            {/* Glowing Shield/Restore icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150 }}
              className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-950/40 border border-emerald-500/45 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)] ${
                !isFullyRestored ? "animate-pulse" : ""
              }`}
            >
              {isFullyRestored ? <ShieldCheck size={32} /> : <CheckCircle2 size={32} />}
            </motion.div>

            {/* Restoring progress display */}
            <div className="space-y-4">
              <div className="text-[10px] tracking-[0.3em] text-emerald-500/60 uppercase">
                {isFullyRestored ? "SYSTEM SECURITY: AUTHENTICATED" : "DECRYPTION IN PROGRESS..."}
              </div>

              <h2 className="text-xl md:text-2xl font-bold tracking-wider text-emerald-400 uppercase">
                {isFullyRestored ? "Archive Restored" : `Restoring Archive: ${progress}%`}
              </h2>

              {/* Progress bar */}
              <div className="w-full h-1.5 bg-zinc-900 border border-zinc-800 rounded-full overflow-hidden relative">
                <motion.div
                  className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Details displayed upon full recovery */}
              <div className="min-h-[80px] flex items-center justify-center">
                <AnimatePresence>
                  {isFullyRestored && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="text-zinc-400 text-xs leading-relaxed space-y-2 font-mono uppercase tracking-wider"
                    >
                      <p className="text-emerald-400/90 font-bold">
                        Hidden archive fragment recovered.
                      </p>
                      <p>Keyword verified.</p>
                      <p className="text-emerald-500/60">Authentication restored.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action Proceed Button */}
              <div className="pt-2">
                <button
                  onClick={onConfirm}
                  disabled={!isFullyRestored}
                  className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-500 disabled:bg-zinc-900 text-black disabled:text-zinc-700 font-bold border disabled:border-zinc-800 border-transparent rounded-xl tracking-widest text-xs transition-all duration-300 hover:bg-emerald-400 hover:shadow-[0_0_25px_rgba(52,211,153,0.45)] cursor-pointer disabled:cursor-not-allowed active:scale-98"
                >
                  <ShieldCheck size={16} />
                  <span>RESTORE STATION POWER</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

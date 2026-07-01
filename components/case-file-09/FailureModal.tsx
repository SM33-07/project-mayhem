import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon, X } from "lucide-react";

interface FailureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FailureModal({ isOpen, onClose }: FailureModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-red-500/40 bg-zinc-950 p-6 md:p-8 shadow-[0_0_50px_rgba(239,68,68,0.15)] z-10 text-center font-mono"
          >
            {/* Scanner line background */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-500/[0.01] pointer-events-none" />

            {/* Glowing error icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 150 }}
              className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-red-950/40 border border-red-500/45 text-red-500 shadow-[0_0_20px_rgba(239,68,68,0.25)]"
            >
              <AlertOctagon size={28} />
            </motion.div>

            {/* Diagnostics Title */}
            <div className="text-[10px] tracking-[0.3em] text-red-500/60 uppercase mb-2">
              VERIFICATION STATUS: REJECTED
            </div>

            <h2 className="text-lg md:text-xl font-bold tracking-wider text-red-500 uppercase mb-3">
              Archive Verification Failed
            </h2>

            {/* Hint details */}
            <div className="text-zinc-400 text-xs leading-relaxed max-w-xs mx-auto mb-8 font-sans">
              <p>
                The current fragment sequence does not match the signature required to secure the archive. Inspect the final layout carefully and try again.
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="w-full flex items-center justify-center gap-2 py-3 bg-zinc-900 border border-zinc-800 hover:border-red-500/40 text-zinc-300 hover:text-white font-bold rounded-xl tracking-wider text-xs transition-all duration-300 cursor-pointer active:scale-98"
            >
              <X size={14} />
              <span>CONTINUE REARRANGING</span>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

import React from "react";

interface ValidateButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function ValidateButton({ onClick, disabled }: ValidateButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-8 py-3.5 bg-cyan-950/20 border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 hover:text-white rounded-xl font-mono text-xs tracking-[0.25em] font-bold transition-all duration-300 hover:shadow-[0_0_25px_rgba(6,182,212,0.35)] cursor-pointer select-none active:scale-95 disabled:opacity-40 disabled:pointer-events-none uppercase relative group overflow-hidden`}
    >
      {/* Laser line flare effect on hover */}
      <span className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent bottom-0 left-0 translate-y-2 group-hover:translate-y-0 transition-transform duration-500" />
      <span className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent top-0 left-0 -translate-y-2 group-hover:translate-y-0 transition-transform duration-500" />

      <span className="relative z-10">VALIDATE ARCHIVE</span>
    </button>
  );
}

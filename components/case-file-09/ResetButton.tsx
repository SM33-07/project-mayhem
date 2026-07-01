import React from "react";
import { RotateCcw } from "lucide-react";

interface ResetButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function ResetButton({ onClick, disabled }: ResetButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center gap-2 px-6 py-3 bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-500 text-zinc-400 hover:text-zinc-200 rounded-xl font-mono text-xs tracking-wider transition-all duration-300 cursor-pointer select-none active:scale-95 disabled:opacity-40 disabled:pointer-events-none"
    >
      <RotateCcw size={14} className="group-hover:rotate-45 transition-transform duration-300" />
      <span>RESET PUZZLE</span>
    </button>
  );
}

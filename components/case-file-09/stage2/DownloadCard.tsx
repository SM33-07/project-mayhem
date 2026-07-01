import React from "react";
import { Download, FileWarning } from "lucide-react";

interface DownloadCardProps {
  fileName: string;
  filePath: string;
  fileSize?: string;
  statusText?: string;
}

export function DownloadCard({
  fileName,
  filePath,
  fileSize = "216 Bytes",
  statusText = "No visible characters",
}: DownloadCardProps) {
  return (
    <div className="w-full max-w-md bg-zinc-950/80 border border-cyan-500/20 rounded-xl p-5 md:p-6 backdrop-blur-md shadow-[0_0_30px_rgba(6,182,212,0.05)] relative overflow-hidden select-none font-mono group">
      {/* Laser corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/50" />

      {/* Cyber overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-cyan-500/[0.01] pointer-events-none" />

      {/* Diagnostics details */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-cyan-400/70">
            Object Diagnostics
          </span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
        </div>

        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-zinc-500 block uppercase text-[10px] tracking-wider mb-1">
              File Target
            </span>
            <span className="text-zinc-200 font-bold block">{fileName}</span>
          </div>
          <div>
            <span className="text-zinc-500 block uppercase text-[10px] tracking-wider mb-1">
              File Size
            </span>
            <span className="text-amber-400 font-bold block animate-pulse">
              {fileSize}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-zinc-500 block uppercase text-[10px] tracking-wider mb-1">
              Integrity Status
            </span>
            <span className="text-cyan-400 font-semibold flex items-center gap-1.5">
              <FileWarning size={14} className="text-cyan-400 animate-pulse" />
              {statusText}
            </span>
          </div>
        </div>

        {/* Download Trigger */}
        <div className="pt-2">
          <a
            href={filePath}
            download={fileName}
            className="w-full flex items-center justify-center gap-2 py-3 bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-200 text-xs font-bold uppercase rounded-lg tracking-widest transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] active:scale-[0.98] cursor-pointer"
          >
            <Download size={14} className="animate-bounce" />
            <span>Download {fileName}</span>
          </a>
        </div>
      </div>
    </div>
  );
}

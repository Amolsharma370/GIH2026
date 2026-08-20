import React from "react";

export default function Slider({ label, value, min, max, step, onChange, unit = "", className = "" }) {
  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs text-muted uppercase tracking-wide">{label}</label>
        <span className="text-xs font-mono text-primary">{value}{unit}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full h-1 bg-blueprint/40 rounded-full appearance-none cursor-pointer accent-signal"
      />
    </div>
  );
}

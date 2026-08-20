import React from "react";

export default function ZoneLegend({ zones }) {
  if (!zones || zones.length === 0) return null;
  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-panel/90 border border-blueprint/60 rounded-lg p-3 backdrop-blur-sm">
      <p className="text-xs font-mono text-muted uppercase tracking-widest mb-2">Overpressure zones</p>
      <div className="space-y-1.5">
        {[...zones].reverse().map((zone) => (
          <div key={zone.id} className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-sm shrink-0" style={{ backgroundColor: zone.colorHex }} />
            <span className="text-xs font-mono text-muted">{zone.label}</span>
            <span className="text-xs font-mono text-blueprint ml-auto pl-4">{zone.radiusM}m</span>
          </div>
        ))}
      </div>
    </div>
  );
}

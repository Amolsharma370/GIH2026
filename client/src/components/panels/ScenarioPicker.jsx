import React, { useEffect, useState } from "react";
import { getFacilities } from "../../services/api";

export default function ScenarioPicker({ onSelect }) {
  const [facilities, setFacilities] = useState([]);
  useEffect(() => { getFacilities().then(setFacilities).catch(() => {}); }, []);
  if (!facilities.length) return null;
  return (
    <div className="space-y-1">
      {facilities.map((f, i) => (
        <button key={i} onClick={() => onSelect?.(f)}
          className="w-full text-left px-3 py-2 rounded text-xs font-mono text-muted hover:text-primary hover:bg-raised transition-all duration-150">
          {f.name}
        </button>
      ))}
    </div>
  );
}

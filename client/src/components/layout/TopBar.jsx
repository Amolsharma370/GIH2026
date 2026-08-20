import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useScenario } from "../../context/ScenarioContext";

export default function TopBar() {
  const { scenario } = useScenario();
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const center = scenario?.meta?.center;
  const scenarioName = scenario?.meta?.name ?? "No scenario loaded";

  return (
    <header className="h-11 bg-panel border-b border-blueprint/60 flex items-center justify-between px-4 shrink-0 z-50">
      <div className="flex items-center gap-3">
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="13" stroke="#FF8A3D" strokeWidth="2" />
          <circle cx="16" cy="16" r="8" stroke="#4C8DFF" strokeWidth="1.5" />
          <circle cx="16" cy="16" r="3" fill="#FF8A3D" />
        </svg>
        <Link to="/" className="text-sm font-display font-semibold text-primary tracking-tight">sentinelzone</Link>
        <span className="text-blueprint/80 text-xs">|</span>
        <span className="text-xs font-mono text-muted max-w-xs truncate">scenario: {scenarioName.toLowerCase()}</span>
      </div>
      <div className="flex items-center gap-6 text-xs font-mono text-muted">
        {center && (
          <span>
            <span className="text-blueprint/80">lat</span> {center.lat.toFixed(4)}
            {"  "}
            <span className="text-blueprint/80">lng</span> {center.lng.toFixed(4)}
          </span>
        )}
        <span className="text-primary/80">{time.toLocaleTimeString("en-GB", { hour12: false })}</span>
        <Link to="/about" className="text-muted hover:text-primary transition-colors duration-150">about</Link>
      </div>
    </header>
  );
}

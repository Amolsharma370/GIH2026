import React, { useEffect } from "react";
import TopBar from "../components/layout/TopBar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import HazardMap from "../components/map/HazardMap";
import ZoneDetailTable from "../components/panels/ZoneDetailTable";
import ImpactStatsPanel from "../components/panels/ImpactStatsPanel";
import { useHazardZones } from "../hooks/useHazardZones";
import Badge from "../components/ui/Badge";
import Spinner from "../components/ui/Spinner";

export default function Console() {
  const { loadDemo, loading, error, scenario, isDemo } = useHazardZones();

  useEffect(() => {
    if (!scenario) loadDemo();
  }, []); // eslint-disable-line

  return (
    <div className="flex flex-col h-screen bg-void">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 relative overflow-hidden">
          {loading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-void/70 backdrop-blur-sm">
              <div className="flex flex-col items-center gap-3">
                <Spinner size={32} />
                <span className="text-xs font-mono text-muted">Computing hazard zones...</span>
              </div>
            </div>
          )}
          {error && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-50 bg-panel border border-zone4/60 rounded px-4 py-2">
              <span className="text-xs font-mono text-zone4">{error}</span>
            </div>
          )}
          <HazardMap />
        </main>
        <aside className="w-72 bg-panel border-l border-blueprint/60 flex flex-col overflow-y-auto shrink-0">
          <div className="p-3 border-b border-blueprint/60 flex items-center justify-between">
            <span className="text-xs font-mono text-muted uppercase tracking-widest">Scenario readout</span>
            {isDemo && (
              <Badge style={{ color: "#7E93AC", border: "1px solid #2B4A66", background: "rgba(43,74,102,0.2)" }}>
                Demo — historical case study
              </Badge>
            )}
          </div>
          {scenario && (
            <div className="p-3 border-b border-blueprint/40 space-y-1">
              <p className="text-xs font-mono text-muted">chemical</p>
              <p className="text-sm font-mono text-primary">{scenario.inputs.chemicalName}</p>
              {scenario.inputs.quantityKg && (
                <p className="text-xs font-mono text-muted">{scenario.inputs.quantityKg} kg · {scenario.inputs.releaseType}</p>
              )}
              <p className="text-xs font-mono text-muted">
                wind {scenario.inputs.windSpeedMs} m/s @ {scenario.inputs.windDirectionDeg}deg · class {scenario.inputs.stabilityClass}
              </p>
            </div>
          )}
          <div className="p-3 border-b border-blueprint/40">
            <ZoneDetailTable />
          </div>
          <div className="p-3">
            <ImpactStatsPanel />
          </div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}

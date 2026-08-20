import React, { useState } from "react";
import { useHazardZones } from "../../hooks/useHazardZones";
import Button from "../ui/Button";
import Slider from "../ui/Slider";
import Card from "../ui/Card";
import Spinner from "../ui/Spinner";

const CHEMICALS = [
  { value: "MIC", label: "Methyl isocyanate (MIC)" },
  { value: "LPG", label: "Liquefied Petroleum Gas (LPG)" },
  { value: "H2S", label: "Hydrogen sulfide (H2S)" },
  { value: "NH3", label: "Ammonia (NH3)" },
  { value: "Cl2", label: "Chlorine (Cl2)" },
];

const RELEASE_TYPES = [
  { value: "toxic_gas", label: "Toxic gas dispersion" },
  { value: "bleve", label: "BLEVE" },
  { value: "jet_fire", label: "Jet fire" },
  { value: "vapour_cloud_explosion", label: "Vapour cloud explosion" },
  { value: "pool_fire", label: "Pool fire" },
];

const STABILITY = ["A", "B", "C", "D", "E", "F"];

export default function ScenarioInputPanel() {
  const { loading, loadDemo, runScenario } = useHazardZones();
  const [chemical, setChemical] = useState("MIC");
  const [releaseType, setReleaseType] = useState("toxic_gas");
  const [quantity, setQuantity] = useState(1000);
  const [windSpeed, setWindSpeed] = useState(2);
  const [windDir, setWindDir] = useState(190);
  const [stability, setStability] = useState("D");
  const [lat, setLat] = useState(23.2752);
  const [lng, setLng] = useState(77.4063);

  const handleRun = () => {
    runScenario({
      center: { lat: Number(lat), lng: Number(lng) },
      chemicalName: CHEMICALS.find(c => c.value === chemical)?.label || chemical,
      releaseType,
      quantityKg: quantity,
      windSpeedMs: windSpeed,
      windDirectionDeg: windDir,
      stabilityClass: stability,
    });
  };

  return (
    <div className="flex flex-col gap-3 p-3 h-full">
      <div className="pb-2 border-b border-blueprint/40">
        <p className="text-xs font-mono text-muted uppercase tracking-widest mb-2">Quick load</p>
        <Button variant="outline" className="w-full" onClick={loadDemo} disabled={loading}>
          {loading ? <Spinner size={14} /> : null}
          Bhopal 1984 demo
        </Button>
      </div>

      <Card title="Source location">
        <div className="p-3 space-y-2">
          {[["Latitude", lat, setLat], ["Longitude", lng, setLng]].map(([lbl, val, setter]) => (
            <div key={lbl} className="space-y-1">
              <label className="text-xs text-muted uppercase tracking-wide">{lbl}</label>
              <input
                type="number" value={val} step="0.0001"
                onChange={e => setter(e.target.value)}
                className="w-full bg-void border border-blueprint/60 rounded px-2 py-1.5 text-xs font-mono text-primary focus:outline-none focus:border-signal/60"
              />
            </div>
          ))}
        </div>
      </Card>

      <Card title="Chemical">
        <div className="p-3 space-y-2">
          <select value={chemical} onChange={e => setChemical(e.target.value)}
            className="w-full bg-void border border-blueprint/60 rounded px-2 py-1.5 text-xs font-body text-primary focus:outline-none focus:border-signal/60">
            {CHEMICALS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
          <select value={releaseType} onChange={e => setReleaseType(e.target.value)}
            className="w-full bg-void border border-blueprint/60 rounded px-2 py-1.5 text-xs font-body text-primary focus:outline-none focus:border-signal/60">
            {RELEASE_TYPES.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
        </div>
      </Card>

      <Card title="Release quantity">
        <div className="p-3">
          <Slider label="Mass (kg)" value={quantity} min={100} max={50000} step={100} onChange={setQuantity} unit=" kg" />
        </div>
      </Card>

      <Card title="Meteorology">
        <div className="p-3 space-y-3">
          <Slider label="Wind speed" value={windSpeed} min={0.5} max={15} step={0.5} onChange={setWindSpeed} unit=" m/s" />
          <Slider label="Wind direction" value={windDir} min={0} max={360} step={5} onChange={setWindDir} unit="deg" />
          <div className="space-y-1.5">
            <label className="text-xs text-muted uppercase tracking-wide">Stability class</label>
            <div className="flex gap-1">
              {STABILITY.map(s => (
                <button key={s} onClick={() => setStability(s)}
                  className={`flex-1 py-1 text-xs font-mono rounded transition-all duration-150 ${stability === s ? "bg-signal text-void" : "bg-void border border-blueprint/60 text-muted hover:text-primary"}`}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Button variant="primary" className="w-full mt-auto" onClick={handleRun} disabled={loading}>
        {loading ? <Spinner size={14} /> : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        )}
        {loading ? "Analysing..." : "Run analysis"}
      </Button>
    </div>
  );
}

import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { useHazardZones } from "../../hooks/useHazardZones";
import Card from "../ui/Card";

export default function ImpactStatsPanel() {
  const { zones } = useHazardZones();
  if (!zones.length) return null;

  const chartData = zones.map(z => ({ name: `Z${z.severity}`, radius: z.radiusM, color: z.colorHex }));
  const maxRadius = Math.max(...zones.map(z => z.radiusM));
  const totalArea = zones.reduce((s, z) => s + Math.PI * (z.radiusM / 1000) ** 2, 0);

  return (
    <div className="space-y-3">
      <Card title="Zone radii">
        <div className="p-3">
          <ResponsiveContainer width="100%" height={120}>
            <BarChart data={chartData} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
              <XAxis dataKey="name" tick={{ fill: "#7E93AC", fontSize: 10, fontFamily: "IBM Plex Mono" }} />
              <YAxis tick={{ fill: "#7E93AC", fontSize: 10, fontFamily: "IBM Plex Mono" }} />
              <Tooltip
                contentStyle={{ background: "#101B2D", border: "1px solid #2B4A66", borderRadius: 6, fontFamily: "IBM Plex Mono", fontSize: 11 }}
                labelStyle={{ color: "#E8EEF5" }}
                formatter={v => [`${v} m`, "Radius"]}
              />
              <Bar dataKey="radius" radius={[3, 3, 0, 0]}>
                {chartData.map((d, i) => <Cell key={i} fill={d.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid grid-cols-2 gap-2">
        <Card>
          <div className="p-3">
            <p className="text-xs text-muted uppercase tracking-wide mb-1">Max radius</p>
            <p className="text-lg font-mono text-primary">{maxRadius}<span className="text-xs text-muted ml-1">m</span></p>
          </div>
        </Card>
        <Card>
          <div className="p-3">
            <p className="text-xs text-muted uppercase tracking-wide mb-1">Outer area</p>
            <p className="text-lg font-mono text-primary">{totalArea.toFixed(2)}<span className="text-xs text-muted ml-1">km2</span></p>
          </div>
        </Card>
      </div>
    </div>
  );
}

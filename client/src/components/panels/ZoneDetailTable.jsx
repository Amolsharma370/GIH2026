import React from "react";
import { useHazardZones } from "../../hooks/useHazardZones";
import Badge from "../ui/Badge";

export default function ZoneDetailTable() {
  const { zones } = useHazardZones();
  if (!zones.length) return <div className="p-4 text-center text-xs font-mono text-muted">No scenario loaded</div>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs font-mono">
        <thead>
          <tr className="border-b border-blueprint/60">
            <th className="text-left text-muted px-3 py-2 font-normal">Zone</th>
            <th className="text-left text-muted px-3 py-2 font-normal">Sev.</th>
            <th className="text-right text-muted px-3 py-2 font-normal">Radius</th>
          </tr>
        </thead>
        <tbody>
          {zones.map(zone => (
            <tr key={zone.id} className="border-b border-blueprint/30 hover:bg-raised/50 transition-colors">
              <td className="px-3 py-2">
                <Badge color={zone.colorHex}>{zone.label.split(" ").slice(0, 2).join(" ")}</Badge>
              </td>
              <td className="px-3 py-2 text-muted">{zone.severity}/6</td>
              <td className="px-3 py-2 text-right text-primary">{zone.radiusM} m</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

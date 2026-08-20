import React, { useEffect, useState } from "react";
import { Polygon, Tooltip } from "react-leaflet";
import { geojsonPolygonToLatLngs } from "../../utils/geojson";
import { getZoneOpacity } from "../../utils/zoneColors";

export default function ZoneRingLayer({ zones, animating }) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!animating || zones.length === 0) {
      setVisibleCount(zones.length);
      return;
    }
    setVisibleCount(0);
    zones.forEach((_, i) => {
      setTimeout(() => setVisibleCount(i + 1), i * 80 + 50);
    });
  }, [animating, zones]);

  return (
    <>
      {zones.slice(0, visibleCount).map((zone) => {
        const positions = geojsonPolygonToLatLngs(zone.geometry);
        if (!positions.length) return null;
        return (
          <Polygon
            key={zone.id}
            positions={positions}
            pathOptions={{
              color: zone.colorHex,
              fillColor: zone.colorHex,
              fillOpacity: getZoneOpacity(zone.severity),
              weight: 1.5,
              opacity: 0.85,
            }}
          >
            <Tooltip sticky>
              <span style={{ fontFamily: "IBM Plex Mono", fontSize: 11 }}>
                {zone.label} — {zone.radiusM}m radius
              </span>
            </Tooltip>
          </Polygon>
        );
      })}
    </>
  );
}

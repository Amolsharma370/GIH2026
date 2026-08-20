import React from "react";
import { CircleMarker, Tooltip } from "react-leaflet";

export default function SourceMarker({ center }) {
  if (!center) return null;
  return (
    <CircleMarker
      center={[center.lat, center.lng]}
      radius={6}
      pathOptions={{ color: "#FF8A3D", fillColor: "#FF8A3D", fillOpacity: 1, weight: 2 }}
    >
      <Tooltip direction="top" offset={[0, -8]}>
        <span style={{ fontFamily: "IBM Plex Mono", fontSize: 11 }}>source</span>
      </Tooltip>
    </CircleMarker>
  );
}

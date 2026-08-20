import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useHazardZones } from "../../hooks/useHazardZones";
import ZoneRingLayer from "./ZoneRingLayer";
import SourceMarker from "./SourceMarker";
import MapControls from "./MapControls";
import ZoneLegend from "./ZoneLegend";

const ESRI_SATELLITE = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const DEFAULT_CENTER = [20.5937, 78.9629];

function FlyToCenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) map.flyTo([center.lat, center.lng], 13, { duration: 1.5 });
  }, [center, map]);
  return null;
}

export default function HazardMap() {
  const { scenario, zones, center, animating } = useHazardZones();
  
  // Extract the multi-source epicenters if they exist, otherwise fallback to the single center
  const epicenters = scenario?.meta?.epicenters || (center ? [center] : []);

  return (
    <div className="relative w-full h-full">
      <MapContainer center={DEFAULT_CENTER} zoom={5} className="w-full h-full" zoomControl={false}>
        <TileLayer url={ESRI_SATELLITE} attribution="Tiles &copy; Esri" maxZoom={19} />
        {center && <FlyToCenter center={center} />}
        <ZoneRingLayer zones={zones} animating={animating} />
        {epicenters.map((epi, i) => (
          <SourceMarker key={i} center={epi} />
        ))}
        <MapControls />
      </MapContainer>
      <ZoneLegend zones={zones} />
    </div>
  );
}

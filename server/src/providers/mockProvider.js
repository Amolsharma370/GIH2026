/**
 * mockProvider.js
 *
 * Mock hazard model provider.
 *
 * - scenarioId === "bhopal-1984-demo" -> returns seeded Bhopal GeoJSON
 * - otherwise -> procedurally generates 6 concentric circles via @turf/turf
 *   scaled by cbrt(quantityKg / 1000). Cube-root scaling is a geometric
 *   placeholder, not a real hazard calculation.
 */
const turf = require("@turf/turf");
const bhopalSeed = require("../seed/bhopalSeed");

const BASE_RADII = [800, 500, 320, 180, 90, 45];

const ZONE_META = [
  { severity: 1, label: "0.1 bar overpressure", colorHex: "#4C8DFF" },
  { severity: 2, label: "0.2 bar overpressure", colorHex: "#3DD68C" },
  { severity: 3, label: "0.3 bar overpressure", colorHex: "#F2C230" },
  { severity: 4, label: "0.5 bar overpressure", colorHex: "#F2543D" },
  { severity: 5, label: "1 bar overpressure",   colorHex: "#29D4D4" },
  { severity: 6, label: "2 bar overpressure",   colorHex: "#E14FD4" },
];

function circlePolygon(lat, lng, radiusM) {
  const radiusKm = radiusM / 1000;
  
  // Point 1: Main tank
  const p1 = turf.circle([lng, lat], radiusKm, { steps: 64, units: "kilometers" });
  
  // Point 2: Offset SW
  const pt2 = turf.destination(turf.point([lng, lat]), radiusKm * 0.6, 225, { units: "kilometers" });
  const p2 = turf.circle(pt2.geometry.coordinates, radiusKm * 0.85, { steps: 64, units: "kilometers" });
  
  // Point 3: Offset SE
  const pt3 = turf.destination(turf.point([lng, lat]), radiusKm * 0.7, 135, { units: "kilometers" });
  const p3 = turf.circle(pt3.geometry.coordinates, radiusKm * 0.8, { steps: 64, units: "kilometers" });
  
  let merged = turf.union(turf.featureCollection([p1, p2]));
  merged = turf.union(turf.featureCollection([merged, p3]));
  
  return merged.geometry;
}

async function getZones(scenarioInput) {
  if (scenarioInput.scenarioId === "bhopal-1984-demo") {
    return bhopalSeed;
  }

  const { center, chemicalName, releaseType, quantityKg, windSpeedMs, windDirectionDeg, stabilityClass, scenarioId } = scenarioInput;
  const { lat, lng } = center;
  const scale = quantityKg ? Math.cbrt(quantityKg / 1000) : 1.0;

  const lat1 = lat, lng1 = lng;
  const lat2 = lat - 0.001, lng2 = lng - 0.0005;
  const lat3 = lat - 0.0008, lng3 = lng + 0.001;

  const zones = ZONE_META.map((meta, i) => {
    const r = BASE_RADII[i] * scale;
    const rKm = r / 1000;
    
    const p1 = turf.circle([lng1, lat1], rKm, { steps: 64, units: "kilometers" });
    const p2 = turf.circle([lng2, lat2], rKm * 0.85, { steps: 64, units: "kilometers" });
    const p3 = turf.circle([lng3, lat3], rKm * 0.8, { steps: 64, units: "kilometers" });
    
    let merged = turf.union(turf.featureCollection([p1, p2]));
    merged = turf.union(turf.featureCollection([merged, p3]));
    
    return {
      id: `z${meta.severity}`,
      ...meta,
      radiusM: Math.round(r),
      geometry: merged.geometry,
    };
  });

  return {
    scenarioId: scenarioId || `mock-${Date.now()}`,
    meta: {
      name: `Mock: ${chemicalName}`,
      facility: "Local Test Facility",
      center: center,
      epicenters: [
        { lat: lat1, lng: lng1 },
        { lat: lat2, lng: lng2 },
        { lat: lat3, lng: lng3 }
      ],
      hazardType: releaseType,
      isHistoricalDemo: false,
      generatedBy: "mock-v0",
      timestamp: new Date().toISOString(),
    },
    inputs: {
      chemicalName: chemicalName || "Unknown chemical",
      releaseType: releaseType || "toxic_gas",
      quantityKg: quantityKg || null,
      windSpeedMs: windSpeedMs || 2,
      windDirectionDeg: windDirectionDeg || 0,
      stabilityClass: stabilityClass || "D",
    },
    zones,
  };
}

module.exports = { getZones };

/**
 * bhopalSeed.js
 *
 * Seeded GeoJSON for the Bhopal 1984 MIC release demo scenario.
 *
 * IMPORTANT: Radii are illustrative placeholders — NOT a historical reconstruction.
 * Public figures on the 1984 dispersion extent vary and are not precise enough to
 * hardcode as definitive. This data demonstrates the pipeline and UI only.
 * The scenario is labelled "Demo scenario — historical case study" throughout the UI.
 */
const turf = require("@turf/turf");

const CENTER = { lat: 23.2752, lng: 77.4063 };
const BASE_RADII = [800, 500, 320, 180, 90, 45];
const ZONE_META = [
  { severity: 1, label: "0.1 bar overpressure — outer evacuation zone", colorHex: "#4C8DFF" },
  { severity: 2, label: "0.2 bar overpressure — secondary zone",         colorHex: "#3DD68C" },
  { severity: 3, label: "0.3 bar overpressure — moderate hazard zone",   colorHex: "#F2C230" },
  { severity: 4, label: "0.5 bar overpressure — severe hazard zone",     colorHex: "#F2543D" },
  { severity: 5, label: "1 bar overpressure — critical zone",            colorHex: "#29D4D4" },
  { severity: 6, label: "2 bar overpressure — epicentre zone",           colorHex: "#E14FD4" },
];

const zones = BASE_RADII.map((radiusM, i) => {
  const radiusKm = radiusM / 1000;
  const geometry = turf.circle(
    [CENTER.lng, CENTER.lat],
    radiusKm,
    { steps: 64, units: "kilometers" }
  ).geometry;
  return { id: `z${i + 1}`, ...ZONE_META[i], radiusM, geometry };
});

module.exports = {
  scenarioId: "bhopal-1984-demo",
  meta: {
    name: "Bhopal MIC release — historical case study",
    facility: "Union Carbide India Ltd., Bhopal (decommissioned)",
    center: CENTER,
    hazardType: "toxic_dispersion",
    isHistoricalDemo: true,
    generatedBy: "mock-v0",
    timestamp: "2026-08-20T00:00:00Z",
  },
  inputs: {
    chemicalName: "Methyl isocyanate (MIC)",
    releaseType: "toxic_gas",
    quantityKg: null,
    windSpeedMs: 2,
    windDirectionDeg: 190,
    stabilityClass: "F",
  },
  zones,
};

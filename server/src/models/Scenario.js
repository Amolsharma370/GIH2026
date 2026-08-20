const mongoose = require("mongoose");

const zoneSchema = new mongoose.Schema(
  {
    id: String,
    severity: { type: Number, min: 1, max: 6 },
    label: String,
    colorHex: String,
    radiusM: Number,
    geometry: mongoose.Schema.Types.Mixed,
  },
  { _id: false }
);

const scenarioSchema = new mongoose.Schema(
  {
    scenarioId: { type: String, required: true, index: true },
    meta: {
      name: String,
      facility: String,
      center: { lat: Number, lng: Number },
      hazardType: String,
      isHistoricalDemo: { type: Boolean, default: false },
      generatedBy: String,
      timestamp: String,
    },
    inputs: {
      chemicalName: String,
      releaseType: String,
      quantityKg: Number,
      windSpeedMs: Number,
      windDirectionDeg: Number,
      stabilityClass: String,
    },
    zones: [zoneSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Scenario", scenarioSchema);

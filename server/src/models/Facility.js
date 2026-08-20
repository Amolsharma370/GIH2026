const mongoose = require("mongoose");

const facilitySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    center: { lat: Number, lng: Number },
    hazardType: String,
    isHistoricalDemo: { type: Boolean, default: false },
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Facility", facilitySchema);

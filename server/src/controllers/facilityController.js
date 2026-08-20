const Facility = require("../models/Facility");
const { isConnected } = require("../config/db");

const DEMO_FACILITIES = [
  {
    name: "Union Carbide India Ltd., Bhopal (decommissioned)",
    center: { lat: 23.2752, lng: 77.4063 },
    hazardType: "toxic_dispersion",
    isHistoricalDemo: true,
    description: "Site of the 1984 Bhopal gas disaster — MIC release.",
  },
  {
    name: "Hypothetical Refinery A — Mumbai Offshore",
    center: { lat: 18.9388, lng: 72.8354 },
    hazardType: "bleve",
    isHistoricalDemo: false,
    description: "Generic LPG storage facility — demo scenario.",
  },
  {
    name: "Hypothetical Refinery B — Jamnagar",
    center: { lat: 22.4707, lng: 70.0577 },
    hazardType: "jet_fire",
    isHistoricalDemo: false,
    description: "Generic crude processing facility — demo scenario.",
  },
  {
    name: "Hypothetical Refinery C — Vadodara",
    center: { lat: 22.3072, lng: 73.1812 },
    hazardType: "vapour_cloud_explosion",
    isHistoricalDemo: false,
    description: "Generic petrochemical plant — demo scenario.",
  },
];

async function getFacilities(req, res, next) {
  try {
    if (!isConnected()) return res.json(DEMO_FACILITIES);
    let facilities = await Facility.find();
    if (facilities.length === 0) {
      await Facility.insertMany(DEMO_FACILITIES);
      facilities = await Facility.find();
    }
    res.json(facilities);
  } catch (err) {
    next(err);
  }
}

module.exports = { getFacilities };

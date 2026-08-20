const { v4: uuidv4 } = require("uuid");
const getZones = require("../providers/hazardModelProvider");
const Scenario = require("../models/Scenario");
const { isConnected } = require("../config/db");

async function persistIfConnected(data) {
  if (!isConnected()) return;
  try {
    const existing = await Scenario.findOne({ scenarioId: data.scenarioId });
    if (!existing) await Scenario.create(data);
  } catch (err) {
    console.error("[scenario] persist error:", err.message);
  }
}

async function getBhopalDemo(req, res, next) {
  try {
    const result = await getZones({ scenarioId: "bhopal-1984-demo" });
    await persistIfConnected(result);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function runScenario(req, res, next) {
  try {
    const {
      center,
      chemicalName = "Unknown chemical",
      releaseType = "toxic_gas",
      quantityKg,
      windSpeedMs = 2,
      windDirectionDeg = 0,
      stabilityClass = "D",
    } = req.body;

    if (!center || center.lat == null || center.lng == null) {
      return res.status(400).json({ error: "center.lat and center.lng are required" });
    }

    const scenarioInput = {
      scenarioId: `run-${uuidv4()}`,
      center,
      chemicalName,
      releaseType,
      quantityKg: quantityKg ? Number(quantityKg) : null,
      windSpeedMs: Number(windSpeedMs),
      windDirectionDeg: Number(windDirectionDeg),
      stabilityClass,
    };

    const result = await getZones(scenarioInput);
    await persistIfConnected(result);
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function getScenarioById(req, res, next) {
  try {
    if (!isConnected()) return res.status(503).json({ error: "Database not available" });
    const scenario = await Scenario.findOne({ scenarioId: req.params.id });
    if (!scenario) return res.status(404).json({ error: "Scenario not found" });
    res.json(scenario);
  } catch (err) {
    next(err);
  }
}

async function listScenarios(req, res, next) {
  try {
    if (!isConnected()) return res.json([]);
    const scenarios = await Scenario.find()
      .sort({ createdAt: -1 })
      .limit(20)
      .select("scenarioId meta.name meta.facility meta.timestamp meta.hazardType inputs.chemicalName");
    res.json(scenarios);
  } catch (err) {
    next(err);
  }
}

module.exports = { getBhopalDemo, runScenario, getScenarioById, listScenarios };

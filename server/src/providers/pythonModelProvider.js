/**
 * pythonModelProvider.js
 *
 * POSTs scenarioInput to the FastAPI ml-service at PYTHON_SERVICE_URL/compute.
 *
 * ROADMAP: When ml-service/app.py /compute is backed by the real model
 * (STAC imagery + agentic AI + Shapely unary_union), this file needs zero changes.
 * Set MODEL_PROVIDER=python in server/.env — nothing else changes.
 */
const axios = require("axios");
const bhopalSeed = require("../seed/bhopalSeed");

const PYTHON_SERVICE_URL = process.env.PYTHON_SERVICE_URL || "http://localhost:8000";

async function getZones(scenarioInput) {
  // The Bhopal demo is a static historical case study, bypass the ML compute
  if (scenarioInput.scenarioId === "bhopal-1984-demo") {
    return bhopalSeed;
  }

  const url = `${PYTHON_SERVICE_URL}/compute`;
  try {
    const response = await axios.post(url, scenarioInput, {
      timeout: 30000,
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (err) {
    let detail = err.response?.data?.detail || err.message;
    if (typeof detail === 'object') {
      detail = JSON.stringify(detail);
    }
    throw new Error(`[pythonModelProvider] ml-service error: ${detail}`);
  }
}

module.exports = { getZones };

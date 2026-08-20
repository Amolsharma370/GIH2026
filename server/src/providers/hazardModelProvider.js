/**
 * hazardModelProvider.js
 *
 * The single seam between Express and the hazard model.
 * Reads MODEL_PROVIDER env var ("mock" | "python", default "mock")
 * and delegates to the appropriate provider.
 *
 * To swap: change MODEL_PROVIDER in server/.env. Zero other changes needed.
 */
const mockProvider = require("./mockProvider");
const pythonModelProvider = require("./pythonModelProvider");

const PROVIDER = (process.env.MODEL_PROVIDER || "mock").toLowerCase().trim();
console.log(`[provider] active model provider: ${PROVIDER}`);

/**
 * getZones(scenarioInput) -> Promise<ZoneResult>
 */
async function getZones(scenarioInput) {
  switch (PROVIDER) {
    case "python":
      return pythonModelProvider.getZones(scenarioInput);
    case "mock":
    default:
      return mockProvider.getZones(scenarioInput);
  }
}

module.exports = getZones;

const express = require("express");
const router = express.Router();
const {
  getBhopalDemo,
  runScenario,
  getScenarioById,
  listScenarios,
} = require("../controllers/scenarioController");

router.get("/demo/bhopal", getBhopalDemo);
router.post("/run", runScenario);
router.get("/", listScenarios);
router.get("/:id", getScenarioById);

module.exports = router;

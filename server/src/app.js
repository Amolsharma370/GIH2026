const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const errorHandler = require("./middleware/errorHandler");
const scenarioRoutes = require("./routes/scenarios");
const facilityRoutes = require("./routes/facilities");

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/scenarios", scenarioRoutes);
app.use("/api/facilities", facilityRoutes);

app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

app.use(errorHandler);

module.exports = app;

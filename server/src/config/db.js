const mongoose = require("mongoose");

let connected = false;

async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.warn("[db] MONGO_URI not set — running without persistence (history disabled)");
    return;
  }
  try {
    await mongoose.connect(uri);
    connected = true;
    console.log("[db] MongoDB connected");
  } catch (err) {
    console.error("[db] MongoDB connection failed:", err.message);
    console.warn("[db] Continuing without persistence — history panel will be empty");
  }
}

function isConnected() {
  return connected;
}

module.exports = { connectDB, isConnected };

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ScenarioProvider } from "./context/ScenarioContext";
import Landing from "./pages/Landing";
import Console from "./pages/Console";
import About from "./pages/About";

export default function App() {
  return (
    <ScenarioProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/console" element={<Console />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ScenarioProvider>
  );
}

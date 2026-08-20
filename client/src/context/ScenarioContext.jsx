import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchBhopalDemo, runScenario as apiRunScenario } from "../services/api";

const ScenarioContext = createContext(null);

export function ScenarioProvider({ children }) {
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [animating, setAnimating] = useState(false);

  const triggerAnimation = () => {
    setAnimating(true);
    setTimeout(() => setAnimating(false), 2000);
  };

  const loadDemo = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchBhopalDemo();
      setScenario(data);
      triggerAnimation();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const runScenario = useCallback(async (inputs) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiRunScenario(inputs);
      setScenario(data);
      triggerAnimation();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <ScenarioContext.Provider value={{ scenario, loading, error, animating, loadDemo, runScenario }}>
      {children}
    </ScenarioContext.Provider>
  );
}

export function useScenario() {
  const ctx = useContext(ScenarioContext);
  if (!ctx) throw new Error("useScenario must be used within ScenarioProvider");
  return ctx;
}

import { useScenario } from "../context/ScenarioContext";

export function useHazardZones() {
  const { scenario, loading, error, animating, loadDemo, runScenario } = useScenario();
  const zones = scenario?.zones ?? [];
  const center = scenario?.meta?.center ?? null;
  const isDemo = scenario?.meta?.isHistoricalDemo ?? false;
  return { scenario, zones, center, isDemo, loading, error, animating, loadDemo, runScenario };
}

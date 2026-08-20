import { useMemo } from "react";

/** Returns per-ring animation delay config for the bloom effect. */
export function useRingAnimation(zones) {
  return useMemo(() => {
    if (!zones || zones.length === 0) return [];
    return zones.map((zone, i) => ({ zoneId: zone.id, delay: i * 0.08 }));
  }, [zones]);
}

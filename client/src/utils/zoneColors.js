export const ZONE_COLORS = {
  1: "#4C8DFF",
  2: "#3DD68C",
  3: "#F2C230",
  4: "#F2543D",
  5: "#29D4D4",
  6: "#E14FD4",
};

export const getZoneColor = (severity) => ZONE_COLORS[severity] || "#FFFFFF";
export const getZoneOpacity = (severity) => 0.15 + (severity / 6) * 0.15;

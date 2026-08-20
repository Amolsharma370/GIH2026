import React from "react";

export default function Badge({ children, color, className = "", style }) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-mono ${className}`}
      style={color ? { backgroundColor: `${color}22`, color, borderColor: `${color}44`, border: "1px solid", ...style } : style}
    >
      {children}
    </span>
  );
}

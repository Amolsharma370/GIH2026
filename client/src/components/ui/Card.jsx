import React from "react";

export default function Card({ children, className = "", title }) {
  return (
    <div className={`bg-raised border border-blueprint/60 rounded-lg ${className}`}>
      {title && (
        <div className="px-4 py-2 border-b border-blueprint/60">
          <span className="text-xs font-mono uppercase tracking-widest text-muted">{title}</span>
        </div>
      )}
      {children}
    </div>
  );
}

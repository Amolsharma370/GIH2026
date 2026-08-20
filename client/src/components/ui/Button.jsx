import React from "react";

export default function Button({ children, variant = "primary", className = "", ...props }) {
  const base = "inline-flex items-center justify-center gap-2 rounded font-body font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-signal/50 disabled:opacity-40 disabled:cursor-not-allowed";
  const variants = {
    primary: "bg-signal text-void px-4 py-2 text-sm hover:bg-signal/90 active:scale-95",
    ghost: "text-muted px-3 py-1.5 text-sm hover:text-primary hover:bg-raised",
    outline: "border border-blueprint/60 text-muted px-3 py-1.5 text-sm hover:border-signal/50 hover:text-primary",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

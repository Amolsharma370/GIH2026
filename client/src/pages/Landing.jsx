import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../components/ui/Button";

const RING_COLORS = ["#4C8DFF", "#3DD68C", "#F2C230", "#F2543D", "#29D4D4", "#E14FD4"];
const RING_SIZES = [320, 260, 200, 150, 100, 60];

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-void flex flex-col items-center justify-center relative overflow-hidden">
      {/* Animated background rings */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {RING_SIZES.map((size, i) => (
          <motion.div key={i} className="absolute rounded-full border"
            style={{ width: size, height: size, borderColor: RING_COLORS[i] }}
            animate={{ scale: [1, 1.05, 1], opacity: [0.12, 0.22, 0.12] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
          />
        ))}
        <motion.div className="absolute w-3 h-3 rounded-full bg-signal"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative z-10 text-center max-w-lg px-6">
        <div className="flex items-center justify-center gap-3 mb-6">
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="13" stroke="#FF8A3D" strokeWidth="2" />
            <circle cx="16" cy="16" r="8" stroke="#4C8DFF" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="3" fill="#FF8A3D" />
          </svg>
          <h1 className="text-2xl font-display font-semibold text-primary tracking-tight">sentinelzone</h1>
        </div>
        <p className="text-sm font-body text-muted mb-2 leading-relaxed">
          Multi-zone hazard threat visualisation for oil &amp; gas facilities.
        </p>
        <p className="text-xs font-mono text-blueprint mb-10">
          SIH1308 · Ministry of Home Affairs · Disaster Management
        </p>
        <Button variant="primary" className="text-sm px-8 py-3" onClick={() => navigate("/console")}>
          Launch console
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Button>
      </div>

      <p className="absolute bottom-6 text-xs font-mono text-muted/40">SIH2026 Hackathon Prototype</p>
    </div>
  );
}

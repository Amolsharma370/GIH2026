import React from "react";
import { Link } from "react-router-dom";
import TopBar from "../components/layout/TopBar";
import Footer from "../components/layout/Footer";

export default function About() {
  return (
    <div className="flex flex-col h-screen bg-void">
      <TopBar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-12 space-y-10">
          <div>
            <h1 className="text-2xl font-display font-semibold text-primary mb-4">About Sentinelzone</h1>
            <p className="text-sm font-body text-muted leading-relaxed mb-4">
              Sentinelzone is a prototype console for <strong className="text-primary">SIH1308</strong> —
              &ldquo;Threat zone of an explosion, particularly in oil and gas handling industries or
              refineries&rdquo; — filed under the Ministry of Home Affairs, Disaster Management domain.
              It turns a release scenario into evacuation-planning geometry for emergency responders
              and facility siting authorities, in the lineage of tools like NOAA ALOHA and DNV PHAST.
            </p>
            <p className="text-sm font-body text-muted leading-relaxed">
              The current build uses a mock hazard model that returns illustrative concentric ring zones.
              The architecture is designed so the real Python model — satellite imagery via STAC, agentic
              AI zone-radius estimation, and Shapely polygon union — can replace the mock with a single
              environment variable change. No frontend or route changes required.
            </p>
          </div>
          <div>
            <h2 className="text-lg font-display font-medium text-primary mb-3">Model roadmap</h2>
            <div className="bg-raised border border-blueprint/60 rounded-lg p-4 font-mono text-xs text-muted space-y-2">
              <p className="text-primary">today   Express -&gt; mockProvider -&gt; Bhopal seed | procedural rings -&gt; GeoJSON</p>
              <p>later   Express -&gt; pythonProvider -&gt; POST /compute -&gt;</p>
              <p className="pl-6">ml-service (STAC fetch + agentic AI + Shapely unary_union) -&gt; same GeoJSON</p>
            </div>
            <p className="text-xs font-body text-muted mt-3">
              Set <code className="font-mono text-primary">MODEL_PROVIDER=python</code> in{" "}
              <code className="font-mono text-primary">server/.env</code> to activate the bridge.
              Nothing else in this codebase changes.
            </p>
          </div>
          <Link to="/console" className="inline-block text-sm font-mono text-signal hover:underline">
            &larr; Back to console
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

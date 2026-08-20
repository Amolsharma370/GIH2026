import React from "react";
import ScenarioInputPanel from "../panels/ScenarioInputPanel";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-panel border-r border-blueprint/60 flex flex-col overflow-y-auto shrink-0">
      <ScenarioInputPanel />
    </aside>
  );
}

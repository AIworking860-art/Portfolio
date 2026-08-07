import React, { useState } from "react";
import OrchestratorPipeline from "../components/Orchestrator/OrchestratorPipeline";
import SwarmMatrix from "../components/Swarm/SwarmMatrix";
import { FaSync, FaRobot, FaSlidersH } from "react-icons/fa";

function OrchestratorPage() {
  const [activeTab, setActiveTab] = useState("swarm"); // 'swarm' | 'pipeline'

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            ⚡ Command Control Center
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Master AI Multi-Agent Orchestrator
          </h1>
          <p className="text-textMuted text-sm mt-1 max-w-3xl">
            Autonomous event-driven micro-agent architecture powered by EventBus pub/sub messaging across 80+ specialized AI Agents.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-white/5 border border-white/10 rounded-xl">
          <button
            onClick={() => setActiveTab("swarm")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "swarm"
                ? "bg-primary text-black shadow-lg shadow-primary/20"
                : "text-textMuted hover:text-white"
            }`}
          >
            <FaRobot /> 80+ Swarm Matrix
          </button>
          <button
            onClick={() => setActiveTab("pipeline")}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === "pipeline"
                ? "bg-primary text-black shadow-lg shadow-primary/20"
                : "text-textMuted hover:text-white"
            }`}
          >
            <FaSync /> 10-Step Pipeline View
          </button>
        </div>
      </div>

      {activeTab === "swarm" ? <SwarmMatrix /> : <OrchestratorPipeline />}
    </div>
  );
}

export default OrchestratorPage;

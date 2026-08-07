import React from "react";
import { useSwarm } from "../context/SwarmContext";
import { useAgent } from "../context/AgentContext";
import { FaShieldAlt, FaTrash, FaSync, FaTerminal, FaPlay, FaRobot } from "react-icons/fa";

function AdminDashboardPage() {
  const { eventLogs, triggerSwarmCascade } = useSwarm();
  const { runOrchestratorPipeline, isExecuting } = useAgent();

  const handleClearCache = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          🛡️ Master Admin Control
        </div>
        <h1 className="text-4xl font-extrabold text-white">Autonomous OS Admin Hub</h1>
        <p className="text-textMuted text-sm mt-1">
          High-level management console for system health, agent execution, cache clearing, and manual override
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FaPlay className="text-primary" /> Trigger Multi-Agent Pipeline
          </h3>
          <p className="text-xs text-textMuted">Manually execute the 10-step Git Push automated workflow.</p>
          <button
            onClick={() => runOrchestratorPipeline()}
            disabled={isExecuting}
            className="w-full py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase"
          >
            Run Pipeline
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FaRobot className="text-secondary" /> Trigger 80+ Swarm Cascade
          </h3>
          <p className="text-xs text-textMuted">Fire asynchronous event cascade across all 12 functional domains.</p>
          <button
            onClick={() => triggerSwarmCascade()}
            className="w-full py-2.5 rounded-xl bg-secondary text-white font-bold text-xs uppercase"
          >
            Fire Swarm Cascade
          </button>
        </div>

        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <FaTrash className="text-rose-400" /> Reset OS Local Memory
          </h3>
          <p className="text-xs text-textMuted">Clear cached local state and reset to default initial projects.</p>
          <button
            onClick={handleClearCache}
            className="w-full py-2.5 rounded-xl bg-rose-500/20 text-rose-300 border border-rose-500/30 hover:bg-rose-500 hover:text-black font-bold text-xs uppercase"
          >
            Clear State Cache
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboardPage;

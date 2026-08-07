import React from "react";
import { useSwarm } from "../../context/SwarmContext";
import { FaTimes, FaPlay, FaRobot, FaSignInAlt, FaSignOutAlt, FaTerminal } from "react-icons/fa";

function AgentDetailModal() {
  const { selectedAgentForModal, setSelectedAgentForModal, triggerAgent, activeAgentIds } = useSwarm();

  if (!selectedAgentForModal) return null;

  const agent = selectedAgentForModal;
  const isActive = activeAgentIds.has(agent.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-[#0d1322] border border-white/10 rounded-2xl p-6 space-y-6 shadow-2xl relative">
        {/* Modal Header */}
        <div className="flex items-start justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2.5 rounded-xl bg-primary/20 text-primary border border-primary/30">
              {agent.icon}
            </span>
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                {agent.name}
              </h3>
              <span className="text-xs text-textMuted uppercase font-mono tracking-wider">
                ID: {agent.id} • Domain: {agent.domain}
              </span>
            </div>
          </div>
          <button
            onClick={() => setSelectedAgentForModal(null)}
            className="p-2 rounded-lg text-textMuted hover:text-white hover:bg-white/10 transition-colors"
          >
            <FaTimes />
          </button>
        </div>

        {/* Single Responsibility */}
        <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-2">
          <h4 className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
            <FaRobot /> Single Responsibility Specification
          </h4>
          <p className="text-sm text-slate-200 leading-relaxed">
            {agent.description}
          </p>
        </div>

        {/* Event Subscriptions & Outputs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Listens To */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaSignInAlt /> Subscribed Input Events
            </h4>
            <div className="space-y-1">
              {agent.listensTo?.map((evt) => (
                <div key={evt} className="text-xs font-mono text-slate-300 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                  {evt}
                </div>
              ))}
            </div>
          </div>

          {/* Emits */}
          <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-2">
            <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <FaSignOutAlt /> Emitted Output Events
            </h4>
            <div className="space-y-1">
              {agent.emits?.map((evt) => (
                <div key={evt} className="text-xs font-mono text-slate-300 bg-cyan-500/10 px-2.5 py-1 rounded border border-cyan-500/20">
                  {evt}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* API Contract Code Preview */}
        <div className="p-4 rounded-xl bg-black/70 border border-white/10 space-y-2 font-mono text-xs">
          <div className="text-textMuted flex items-center gap-2">
            <FaTerminal className="text-primary" /> API Specification & Execution Handler
          </div>
          <pre className="text-slate-300 overflow-x-auto p-2 bg-white/5 rounded">
{`async function execute(payload, bus) {
  // ${agent.name} handler
  const result = await processPayload(payload);
  bus.publish("${agent.emits[0] || "completed"}", result);
}`}
          </pre>
        </div>

        {/* Action Controls */}
        <div className="pt-2 flex justify-end gap-3">
          <button
            onClick={() => triggerAgent(agent.id, { test: true })}
            disabled={isActive}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all ${
              isActive
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 cursor-wait"
                : "bg-primary text-black hover:scale-105 shadow-lg shadow-primary/30"
            }`}
          >
            <FaPlay className={isActive ? "animate-spin" : ""} />
            {isActive ? "Agent Executing..." : "Test Execute Agent"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AgentDetailModal;

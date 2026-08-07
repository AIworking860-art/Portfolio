import React, { useState } from "react";
import { useSwarm } from "../../context/SwarmContext";
import {
  FaSearch,
  FaRobot,
  FaPlay,
  FaTerminal,
  FaInfoCircle,
  FaCheckCircle,
  FaSpinner,
  FaSlidersH,
  FaBroadcastTower,
} from "react-icons/fa";
import AgentDetailModal from "./AgentDetailModal";

function SwarmMatrix() {
  const {
    agents,
    AGENT_DOMAINS,
    activeAgentIds,
    eventLogs,
    isCascadeRunning,
    triggerSwarmCascade,
    triggerAgent,
    setSelectedAgentForModal,
  } = useSwarm();

  const [selectedDomain, setSelectedDomain] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAgents = agents.filter((agent) => {
    const matchesDomain = selectedDomain === "all" || agent.domain === selectedDomain;
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="w-full space-y-8 animate-fade-in">
      <AgentDetailModal />

      {/* Top Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/20 text-primary text-2xl">
            <FaRobot />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{agents.length} Agents</div>
            <div className="text-xs text-textMuted">Specialized Micro-Agents</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-2xl">
            <FaBroadcastTower />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {activeAgentIds.size} Active
            </div>
            <div className="text-xs text-textMuted">Currently Executing</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-secondary/20 text-secondary text-2xl">
            <FaTerminal />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{eventLogs.length} Events</div>
            <div className="text-xs text-textMuted">EventBus Messages</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent/20 text-accent text-2xl">
            <FaSlidersH />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">12 Domains</div>
            <div className="text-xs text-textMuted">Decoupled Swarm Architecture</div>
          </div>
        </div>
      </div>

      {/* Control Header & Cascade Trigger */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaRobot className="text-primary" />
              Autonomous Swarm Matrix (80+ Micro-Agents)
            </h3>
            <p className="text-xs text-textMuted mt-1">
              Every agent has a single responsibility and communicates through the EventBus architecture
            </p>
          </div>

          <button
            onClick={() => triggerSwarmCascade()}
            disabled={isCascadeRunning}
            className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg ${
              isCascadeRunning
                ? "bg-white/10 text-white/50 cursor-not-allowed"
                : "bg-primary text-black hover:scale-105 shadow-primary/30"
            }`}
          >
            {isCascadeRunning ? (
              <>
                <FaSpinner className="animate-spin" /> Swarm Cascade Running...
              </>
            ) : (
              <>
                <FaPlay /> Trigger 80+ Swarm Cascade
              </>
            )}
          </button>
        </div>

        {/* Domain Tabs & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Search */}
          <div className="relative w-full lg:w-72">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted text-xs" />
            <input
              type="text"
              placeholder="Search 80+ agents by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-textMuted focus:outline-none focus:border-primary"
            />
          </div>

          {/* Domain Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 lg:pb-0 custom-scrollbar">
            <button
              onClick={() => setSelectedDomain("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedDomain === "all"
                  ? "bg-primary text-black"
                  : "bg-white/5 text-textMuted hover:text-white"
              }`}
            >
              All Domains ({agents.length})
            </button>
            {AGENT_DOMAINS.map((domain) => (
              <button
                key={domain.id}
                onClick={() => setSelectedDomain(domain.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 transition-all ${
                  selectedDomain === domain.id
                    ? "bg-primary text-black"
                    : "bg-white/5 text-textMuted hover:text-white"
                }`}
              >
                <span>{domain.icon}</span>
                <span>{domain.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 80+ Agent Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAgents.map((agent) => {
          const isActive = activeAgentIds.has(agent.id);
          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgentForModal(agent)}
              className={`p-4 rounded-2xl border backdrop-blur-md transition-all duration-300 cursor-pointer relative overflow-hidden flex flex-col justify-between group ${
                isActive
                  ? "border-amber-400 bg-amber-500/10 shadow-lg shadow-amber-500/20 scale-105"
                  : "border-white/10 bg-white/5 hover:border-primary/50 hover:bg-white/10"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl p-2 rounded-xl bg-white/5 border border-white/5">
                    {agent.icon}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      isActive ? "bg-amber-400 text-black animate-pulse" : "bg-white/10 text-textMuted"
                    }`}
                  >
                    {isActive ? "PROCESSING" : "STANDBY"}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-white group-hover:text-primary transition-colors">
                  {agent.name}
                </h4>

                <p className="text-xs text-textMuted line-clamp-2 leading-relaxed">
                  {agent.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] text-textMuted font-mono">
                <span className="truncate">Listens: {agent.listensTo?.[0] || "event"}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    triggerAgent(agent.id);
                  }}
                  className="px-2 py-1 rounded bg-primary/20 text-primary hover:bg-primary hover:text-black font-bold transition-all"
                >
                  Run
                </button>
              </div>

              {isActive && (
                <div className="absolute inset-x-0 bottom-0 h-1 bg-amber-400 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Real-time EventBus Bus Stream Terminal */}
      <div className="p-6 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs space-y-3 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-textMuted">
          <div className="flex items-center gap-2">
            <FaTerminal className="text-primary" />
            <span className="font-bold text-white">EventBus Telemetry Stream (PubSub Engine)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
              Bus Active ({eventLogs.length} Events Logged)
            </span>
          </div>
        </div>

        <div className="h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {eventLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-3">
              <span className="text-textMuted text-[10px] whitespace-nowrap">
                [{log.time}]
              </span>
              <span className="text-emerald-400 font-bold whitespace-nowrap">
                EVENT: [{log.eventName}]
              </span>
              <span className="text-primary font-semibold whitespace-nowrap">
                FROM: [{log.sourceAgentId}]
              </span>
              <span className="text-slate-300 truncate">
                PAYLOAD: {JSON.stringify(log.payload)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SwarmMatrix;

import React from "react";
import { useAgent } from "../context/AgentContext";
import { useSwarm } from "../context/SwarmContext";
import { FaRobot, FaGithub, FaLayerGroup, FaFileAlt, FaBrain, FaPlay, FaTerminal, FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function DashboardPage() {
  const { projects, blogs, resumeData, runOrchestratorPipeline, isExecuting } = useAgent();
  const { agents, activeAgentIds, eventLogs, triggerSwarmCascade } = useSwarm();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* OS Banner */}
      <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden shadow-2xl">
        <div className="space-y-2 z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
             NEXORA AI OPERATING SYSTEM • VER 2026.4
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Developer OS Dashboard
          </h1>
          <p className="text-sm text-textMuted max-w-2xl">
            Autonomous multi-agent platform monitoring GitHub repositories, writing documentation, generating blogs, rendering graphics, and auto-updating resumes in real time.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 z-10">
          <button
            onClick={() => runOrchestratorPipeline()}
            disabled={isExecuting}
            className="px-5 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
          >
            <FaPlay className={isExecuting ? "animate-spin" : ""} />
            {isExecuting ? "Pipeline Running..." : "Simulate Git Push"}
          </button>
          <button
            onClick={() => triggerSwarmCascade()}
            className="px-5 py-2.5 rounded-xl bg-secondary text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-secondary/80 transition-all shadow-lg"
          >
            <FaRobot /> Trigger 80+ Swarm
          </button>
        </div>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-primary/20 text-primary text-2xl">
            <FaRobot />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">{agents.length} Agents</div>
            <div className="text-xs text-textMuted">{activeAgentIds.size} Active Processing</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-secondary/20 text-secondary text-2xl">
            <FaGithub />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">{projects.length} Repos</div>
            <div className="text-xs text-textMuted">Indexed & Documented</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-accent/20 text-accent text-2xl">
            <FaLayerGroup />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">{blogs.length} Articles</div>
            <div className="text-xs text-textMuted">Auto-Generated Posts</div>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-emerald-500/20 text-emerald-400 text-2xl">
            <FaBrain />
          </div>
          <div>
            <div className="text-2xl font-extrabold text-white">100% Zero-Work</div>
            <div className="text-xs text-textMuted">Full AI Automation</div>
          </div>
        </div>
      </div>

      {/* Grid: Auto-Generated Content Feeds */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Repos */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaGithub className="text-primary" /> Auto-Indexed Repositories
            </h3>
            <Link to="/projects" className="text-xs font-bold text-primary hover:underline">
              View All →
            </Link>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 3).map((p) => (
              <div key={p.id} className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">{p.name}</h4>
                  <p className="text-xs text-textMuted line-clamp-1">{p.description}</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-primary/10 text-primary text-[10px] font-mono border border-primary/20">
                  {p.language}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Resume Updates */}
        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FaFileAlt className="text-secondary" /> Auto-Updated Career Bullets
            </h3>
            <Link to="/resume" className="text-xs font-bold text-secondary hover:underline">
              Full Resume →
            </Link>
          </div>

          <div className="space-y-3">
            {resumeData.autoBullets.slice(0, 3).map((bullet, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-black/40 border border-white/5 text-xs text-slate-200 font-mono flex items-start gap-2">
                <FaCheckCircle className="text-primary text-xs mt-0.5 shrink-0" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Real-time Bus Terminal Stream */}
      <div className="p-6 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs space-y-3 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-textMuted">
          <div className="flex items-center gap-2">
            <FaTerminal className="text-primary" />
            <span className="font-bold text-white">EventBus Telemetry Stream ({eventLogs.length} Events Logged)</span>
          </div>
          <span className="text-[10px] text-emerald-400 font-bold">SYSTEM ACTIVE</span>
        </div>

        <div className="h-48 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {eventLogs.slice(0, 10).map((log) => (
            <div key={log.id} className="flex items-start gap-3">
              <span className="text-textMuted text-[10px]">[{log.time}]</span>
              <span className="text-emerald-400 font-bold">[{log.eventName}]</span>
              <span className="text-primary">FROM: [{log.sourceAgentId}]</span>
              <span className="text-slate-300 truncate">{JSON.stringify(log.payload)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;

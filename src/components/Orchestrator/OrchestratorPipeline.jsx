import React, { useState } from "react";
import { useAgent } from "../../context/AgentContext";
import {
  FaTerminal,
  FaPlay,
  FaRobot,
  FaCheckCircle,
  FaSpinner,
  FaGithub,
  FaLayerGroup,
  FaBrain,
  FaSync,
} from "react-icons/fa";

function OrchestratorPipeline() {
  const {
    projects,
    blogs,
    pipelineLogs,
    activeStepIndex,
    isExecuting,
    currentProcessingRepo,
    WORKFLOW_STEPS,
    runOrchestratorPipeline,
  } = useAgent();

  const [inputRepo, setInputRepo] = useState("");

  const handleCustomTrigger = (e) => {
    e.preventDefault();
    if (!inputRepo.trim() || isExecuting) return;
    const cleanName = inputRepo.trim().replace(/^https?:\/\/github\.com\//, "");
    runOrchestratorPipeline(cleanName);
    setInputRepo("");
  };

  return (
    <div className="w-full space-y-8">
      {/* Top Banner / Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary/20 text-primary text-2xl">
            <FaRobot />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">10 Active</div>
            <div className="text-xs text-textMuted">Autonomous Agents</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-secondary/20 text-secondary text-2xl">
            <FaGithub />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{projects.length} Repos</div>
            <div className="text-xs text-textMuted">Indexed & Auto-Synced</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-accent/20 text-accent text-2xl">
            <FaLayerGroup />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{blogs.length} Articles</div>
            <div className="text-xs text-textMuted">Auto-Generated Tech Blogs</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-400 text-2xl">
            <FaBrain />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">
              {isExecuting ? "EXECUTING" : "STANDBY"}
            </div>
            <div className="text-xs text-textMuted">Pipeline Telemetry Status</div>
          </div>
        </div>
      </div>

      {/* Main Workflow Node Diagram */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <FaSync className={isExecuting ? "animate-spin text-primary" : "text-primary"} />
              Autonomous Workflow Visualizer
            </h3>
            <p className="text-xs text-textMuted">
              Automatic 10-step multi-agent ingestion pipeline triggered on every Git Push
            </p>
          </div>

          <button
            onClick={() => runOrchestratorPipeline()}
            disabled={isExecuting}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all duration-300 ${
              isExecuting
                ? "bg-white/10 text-white/50 cursor-not-allowed"
                : "bg-primary text-black hover:scale-105 shadow-lg shadow-primary/30"
            }`}
          >
            {isExecuting ? (
              <>
                <FaSpinner className="animate-spin" /> Agents Processing...
              </>
            ) : (
              <>
                <FaPlay /> Simulate Git Push Event
              </>
            )}
          </button>
        </div>

        {/* Custom Repo Ingestion Form */}
        <form onSubmit={handleCustomTrigger} className="flex gap-2">
          <input
            type="text"
            placeholder="Enter custom GitHub Repo or URL (e.g. facebook/react)..."
            value={inputRepo}
            onChange={(e) => setInputRepo(e.target.value)}
            disabled={isExecuting}
            className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm text-white placeholder-textMuted focus:outline-none focus:border-primary transition-colors"
          />
          <button
            type="submit"
            disabled={isExecuting || !inputRepo.trim()}
            className="px-4 py-2.5 rounded-xl bg-secondary text-white font-semibold text-xs transition-all hover:bg-secondary/80 disabled:opacity-50"
          >
            Run Agent Analysis
          </button>
        </form>

        {/* Workflow Node Step Pipeline */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
          {WORKFLOW_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const isCompleted = activeStepIndex > idx || (activeStepIndex === -1 && !isExecuting && currentProcessingRepo);
            
            return (
              <div
                key={step.id}
                className={`p-3.5 rounded-xl border text-center transition-all duration-300 relative overflow-hidden flex flex-col items-center gap-2 ${
                  isActive
                    ? "border-primary bg-primary/20 shadow-lg shadow-primary/20 scale-105"
                    : isCompleted
                    ? "border-emerald-500/40 bg-emerald-500/10 text-white"
                    : "border-white/10 bg-white/5 opacity-60"
                }`}
              >
                <div className="text-2xl">{step.icon}</div>
                <div className="text-xs font-bold text-white line-clamp-1">
                  {step.label}
                </div>
                <div className="text-[10px] text-textMuted font-mono line-clamp-1">
                  {step.agent}
                </div>

                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-primary animate-pulse" />
                )}
                {isCompleted && (
                  <FaCheckCircle className="absolute top-2 right-2 text-emerald-400 text-xs" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Agent Log Stream Terminal */}
      <div className="p-6 rounded-2xl bg-black/80 border border-white/10 font-mono text-xs space-y-3 shadow-2xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-3 text-textMuted">
          <div className="flex items-center gap-2">
            <FaTerminal className="text-primary" />
            <span className="font-bold text-white">Live Multi-Agent Log Stream</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
              Telemetry Active
            </span>
          </div>
        </div>

        <div className="h-64 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
          {pipelineLogs.map((log) => (
            <div key={log.id} className="flex items-start gap-3">
              <span className="text-textMuted text-[10px] whitespace-nowrap">
                [{log.time}]
              </span>
              <span className="text-primary font-semibold whitespace-nowrap">
                [{log.agent}]
              </span>
              <span className="text-slate-200">{log.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrchestratorPipeline;

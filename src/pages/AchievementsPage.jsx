import React from "react";
import { FaTrophy, FaStar, FaBolt, FaShieldAlt, FaRocket, FaCheckCircle } from "react-icons/fa";

function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      icon: <FaTrophy className="text-amber-400" />,
      title: "100% Zero-Work Portfolio Automation",
      category: "AI Architecture",
      description: "Engineered an 80+ agent EventBus architecture that automatically generates docs, covers, blogs, and deployments upon Git Push.",
      metric: "0 Manual Hours Needed",
    },
    {
      id: 2,
      icon: <FaBolt className="text-cyan-400" />,
      title: "Sub-Millisecond Multi-Agent Swarm Latency",
      category: "High Performance",
      description: "Achieved 60 FPS 3D WebGL shader rendering while managing asynchronous micro-agent event dispatching.",
      metric: "60 FPS WebGL",
    },
    {
      id: 3,
      icon: <FaShieldAlt className="text-emerald-400" />,
      title: "Zero Security Vulnerabilities Flagged",
      category: "Security Audit",
      description: "Automated security audit agent verified 100% clean dependency tree and zero leaked secrets.",
      metric: "100% Clean Audit",
    },
    {
      id: 4,
      icon: <FaRocket className="text-purple-400" />,
      title: "45+ Repos Ingested & Auto-Synced",
      category: "Continuous Deployment",
      description: "Successfully processed 45+ GitHub repositories into structured Markdown documentation and interactive 3D project cards.",
      metric: "45+ Repos Sync",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          🏆 Engineering Milestones
        </div>
        <h1 className="text-4xl font-extrabold text-white">Achievements & Trophies</h1>
        <p className="text-textMuted text-sm mt-1">
          Unlocked engineering milestones verified by the Achievement Update Agent
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {achievements.map((item) => (
          <div
            key={item.id}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 hover:border-amber-400/50 transition-all duration-300 flex items-start gap-4"
          >
            <div className="p-4 rounded-2xl bg-black/40 border border-white/10 text-3xl shrink-0">
              {item.icon}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex justify-between items-center">
                <span className="text-xs font-mono text-primary uppercase font-bold">{item.category}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
                  {item.metric}
                </span>
              </div>
              <h3 className="text-lg font-bold text-white">{item.title}</h3>
              <p className="text-xs text-textMuted leading-relaxed">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AchievementsPage;

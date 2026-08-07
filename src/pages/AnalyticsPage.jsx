import React from "react";
import { FaChartLine, FaGithub, FaStar, FaEye, FaCodeBranch, FaUsers } from "react-icons/fa";

function AnalyticsPage() {
  const metrics = [
    { label: "Total Stars Earned", val: "626 Stars", icon: <FaStar className="text-amber-400" /> },
    { label: "Total Repository Forks", val: "144 Forks", icon: <FaCodeBranch className="text-purple-400" /> },
    { label: "Portfolio Unique Visitors", val: "18,450", icon: <FaEye className="text-cyan-400" /> },
    { label: "GitHub Followers", val: "1,240 Followers", icon: <FaUsers className="text-emerald-400" /> },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          📊 Telemetry Dashboard
        </div>
        <h1 className="text-4xl font-extrabold text-white">GitHub & Visitor Analytics</h1>
        <p className="text-textMuted text-sm mt-1">
          Aggregated by the GitHub Stats Agent and Visitor Analytics Agent
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {metrics.map((m, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center gap-4">
            <div className="p-3.5 rounded-xl bg-white/5 text-2xl">{m.icon}</div>
            <div>
              <div className="text-xl font-extrabold text-white">{m.val}</div>
              <div className="text-xs text-textMuted">{m.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* GitHub Contribution Heatmap Mock Visualizer */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
        <div className="flex justify-between items-center border-b border-white/10 pb-3">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <FaGithub className="text-primary" /> GitHub Contribution Heatmap (2026)
          </h3>
          <span className="text-xs font-mono text-emerald-400">1,842 Contributions</span>
        </div>

        <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 pt-2">
          {Array.from({ length: 120 }).map((_, i) => {
            const intensity = (i * 17) % 5;
            const colors = [
              "bg-white/5",
              "bg-emerald-950 border border-emerald-800",
              "bg-emerald-700",
              "bg-emerald-500",
              "bg-emerald-300",
            ];
            return <div key={i} className={`h-4 rounded-sm ${colors[intensity]}`} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;

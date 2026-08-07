import React from "react";
import { FaClock, FaRocket, FaCode, FaCheckCircle } from "react-icons/fa";

function TimelinePage() {
  const events = [
    {
      year: "August 2026",
      title: "Master AI Portfolio Orchestrator Platform Launched",
      desc: "Deployed autonomous 80+ multi-agent platform with event-driven architecture, 12 profile themes, and full auto-blogging.",
      icon: <FaRocket className="text-primary" />,
    },
    {
      year: "June 2026",
      title: "Nexora Core Multi-Agent Micro-Task Engine",
      desc: "Architected sub-millisecond PubSub EventBus for micro-agent message passing.",
      icon: <FaCode className="text-secondary" />,
    },
    {
      year: "2025",
      title: "Quantum Agent Mesh & Vector Routing",
      desc: "Engineered zero-copy memory buffers for distributed multi-agent consensus.",
      icon: <FaClock className="text-accent" />,
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-5xl mx-auto space-y-10 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          ⏳ Engineering History
        </div>
        <h1 className="text-4xl font-extrabold text-white">Career & Release Timeline</h1>
        <p className="text-textMuted text-sm mt-1">
          Chronological milestone timeline maintained by the Timeline Update Agent
        </p>
      </div>

      <div className="relative border-l-2 border-primary/30 ml-4 space-y-8 pl-6">
        {events.map((evt, idx) => (
          <div key={idx} className="relative group">
            <div className="absolute -left-[35px] top-1 p-2 rounded-full bg-[#0b0f19] border-2 border-primary text-base">
              {evt.icon}
            </div>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-2 group-hover:border-primary/50 transition-all duration-300">
              <span className="text-xs font-mono text-primary font-bold">{evt.year}</span>
              <h3 className="text-lg font-bold text-white">{evt.title}</h3>
              <p className="text-xs text-textMuted leading-relaxed">{evt.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimelinePage;

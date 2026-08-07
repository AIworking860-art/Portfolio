import React from "react";
import { useAgent } from "../context/AgentContext";
import { FaCode, FaRobot, FaLayerGroup, FaDatabase, FaServer, FaPaintBrush } from "react-icons/fa";

function SkillsPage() {
  const { resumeData } = useAgent();

  const skillCategories = [
    { name: "AI & Autonomous Systems", icon: <FaRobot className="text-primary" />, items: ["Autonomous AI Agents", "Multi-Agent Swarms", "EventBus PubSub", "LLM Prompting", "RAG Pipeline"] },
    { name: "Frontend & 3D WebGL", icon: <FaPaintBrush className="text-secondary" />, items: ["React 19 & Next.js", "Three.js & WebGL Shaders", "TailwindCSS & CSS Systems", "Framer Motion", "Vite"] },
    { name: "Backend & Distributed Systems", icon: <FaServer className="text-accent" />, items: ["Node.js / Express", "Python & FastAPI", "Rust Core Memory", "REST & GraphQL APIs", "Microservices"] },
    { name: "Databases & Storage", icon: <FaDatabase className="text-amber-400" />, items: ["PostgreSQL", "MongoDB", "Redis Cache", "Vector DB (Pinecone/Chroma)", "SQLite"] },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-10 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          ⚡ Technical Mastery
        </div>
        <h1 className="text-4xl font-extrabold text-white">Skills & Competencies</h1>
        <p className="text-textMuted text-sm mt-1">
          Dynamic skill ratings automatically calculated from commit velocity by the Skill Update Agent
        </p>
      </div>

      {/* Progress Bars */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-6">
        <h3 className="text-lg font-bold text-white">Skill Progress Ratings</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resumeData.skills.map((skill, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-white">{skill.name}</span>
                <span className="text-primary font-mono">{skill.level}%</span>
              </div>
              <div className="w-full h-3 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 rounded-full"
                  style={{ width: `${skill.level}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {skillCategories.map((cat, i) => (
          <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-white/5 text-2xl">{cat.icon}</div>
              <h3 className="text-lg font-bold text-white">{cat.name}</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span key={item} className="px-3 py-1.5 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-slate-200">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsPage;

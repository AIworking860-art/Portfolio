import React from "react";
import { useAgent } from "../context/AgentContext";
import { FaBriefcase, FaBuilding, FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

function ExperiencePage() {
  const { resumeData } = useAgent();

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          💼 Professional Track Record
        </div>
        <h1 className="text-4xl font-extrabold text-white">Work Experience</h1>
        <p className="text-textMuted text-sm mt-1">
          Career milestones logged by the Experience Update Agent
        </p>
      </div>

      <div className="space-y-6">
        {resumeData.experience.map((exp, idx) => (
          <div
            key={idx}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 hover:border-primary/40 transition-all duration-300"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <FaBuilding className="text-primary" /> {exp.company}
                </h3>
                <div className="text-sm font-semibold text-secondary">{exp.title}</div>
              </div>
              <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-textMuted flex items-center gap-1.5">
                <FaCalendarAlt /> {exp.period}
              </span>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {exp.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExperiencePage;

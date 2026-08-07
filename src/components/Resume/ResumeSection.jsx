import React from "react";
import { useAgent } from "../../context/AgentContext";
import { FaFileDownload, FaBriefcase, FaGraduationCap, FaRobot, FaCheckCircle, FaStar } from "react-icons/fa";

function ResumeSection() {
  const { resumeData } = useAgent();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
            <FaRobot /> Auto-Updating Career Profile
          </div>
          <h2 className="text-3xl font-extrabold text-white">{resumeData.name}</h2>
          <p className="text-sm text-textMuted font-mono mt-1">{resumeData.role} • {resumeData.location}</p>
        </div>

        <button
          onClick={handlePrint}
          className="px-5 py-2.5 rounded-xl bg-primary text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:scale-105 transition-all shadow-lg shadow-primary/20"
        >
          <FaFileDownload /> Export Resume PDF
        </button>
      </div>

      {/* Summary Box */}
      <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3">
        <h3 className="text-sm font-bold text-primary uppercase tracking-wider">Executive Summary</h3>
        <p className="text-sm text-slate-300 leading-relaxed">{resumeData.summary}</p>
      </div>

      {/* Auto-Generated Highlights Box */}
      <div className="p-6 rounded-2xl bg-primary/10 border border-primary/30 backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FaRobot className="text-primary" /> Live AI-Generated Resume Accomplishments
          </h3>
          <span className="text-[10px] font-mono text-primary px-2 py-0.5 rounded bg-primary/20">
            Real-time Sync Active
          </span>
        </div>

        <div className="space-y-2">
          {resumeData.autoBullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs text-slate-200 font-mono">
              <FaCheckCircle className="text-primary text-sm mt-0.5 shrink-0" />
              <span>{bullet}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid: Experience & Skills */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Experience Timeline */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FaBriefcase className="text-primary" /> Professional Experience
          </h3>

          <div className="space-y-4">
            {resumeData.experience.map((exp, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-base font-bold text-white">{exp.title}</h4>
                    <div className="text-xs text-primary font-semibold">{exp.company}</div>
                  </div>
                  <span className="text-xs text-textMuted font-mono px-2.5 py-1 rounded bg-white/5">
                    {exp.period}
                  </span>
                </div>
                <p className="text-xs text-textMuted leading-relaxed pt-1">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills Matrix */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FaStar className="text-secondary" /> Technical Mastery Scores
          </h3>

          <div className="space-y-4">
            {resumeData.skills.map((skill, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-white">{skill.name}</span>
                  <span className="font-mono text-primary font-bold">{skill.level}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary via-secondary to-accent transition-all duration-500 rounded-full"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeSection;

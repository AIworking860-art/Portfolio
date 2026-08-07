import React from "react";
import { FaCertificate, FaCheckCircle, FaAward, FaExternalLinkAlt } from "react-icons/fa";

function CertificatesPage() {
  const certs = [
    {
      id: 1,
      title: "Master Autonomous Multi-Agent Architect",
      issuer: "Nexora AI Labs",
      date: "2026",
      credentialId: "CERT-AI-2026-994",
      skills: ["Agentic AI", "EventBus PubSub", "LLM Swarms", "Zero-Work Pipelines"],
      badgeColor: "#10b981",
    },
    {
      id: 2,
      title: "Senior Full-Stack WebGL & 3D Shader Engineer",
      issuer: "GPU Graphics Institute",
      date: "2025",
      credentialId: "CERT-WEBGL-882",
      skills: ["Three.js", "GLSL Shaders", "React 19", "Vite"],
      badgeColor: "#8b5cf6",
    },
    {
      id: 3,
      title: "Advanced Distributed Micro-Agent Systems",
      issuer: "Quantum Cybernetics",
      date: "2024",
      credentialId: "CERT-DIST-401",
      skills: ["Rust", "Python", "Vector Mesh Routing"],
      badgeColor: "#06b6d4",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold mb-2">
          📜 Verified Credentials
        </div>
        <h1 className="text-4xl font-extrabold text-white">Certificates & Certifications</h1>
        <p className="text-textMuted text-sm mt-1">
          Technical mastery certificates indexed and verified by the Certificate Update Agent
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {certs.map((cert) => (
          <div
            key={cert.id}
            className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-4 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div
                  className="p-3 rounded-xl text-2xl text-white shadow-lg"
                  style={{ backgroundColor: `${cert.badgeColor}33`, borderColor: `${cert.badgeColor}66` }}
                >
                  <FaCertificate style={{ color: cert.badgeColor }} />
                </div>
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                  <FaCheckCircle /> Verified
                </span>
              </div>

              <h3 className="text-lg font-bold text-white leading-snug">{cert.title}</h3>
              <div className="text-xs text-primary font-semibold">{cert.issuer} • {cert.date}</div>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {cert.skills.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[10px] text-textMuted font-mono">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-textMuted font-mono">
              <span>{cert.credentialId}</span>
              <button className="text-primary font-bold hover:underline flex items-center gap-1">
                View <FaExternalLinkAlt className="text-[10px]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CertificatesPage;

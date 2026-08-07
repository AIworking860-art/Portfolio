import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch, FaFolderPlus, FaArrowRight, FaEye, FaRobot } from "react-icons/fa";
import { useAgent } from "../../context/AgentContext";
import "./Projects.css";

/* ─── 3D Tilt Card ──────────────────────────────────────────────────── */
function TiltCard({ repo, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-3d-card glass-panel"
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      {/* Auto-Generated Dynamic Cover Art Banner */}
      <div
        className="h-28 rounded-xl mb-4 p-3 flex flex-col justify-between relative overflow-hidden transition-all duration-300 group-hover:scale-[1.02]"
        style={{ background: repo.coverGradient || "linear-gradient(135deg, #10b981, #06b6d4)" }}
      >
        <div className="flex items-center justify-between text-xs text-white/90 font-mono">
          <span className="px-2 py-0.5 rounded bg-black/30 backdrop-blur-md border border-white/20">
            {repo.language || "Multi-Stack"}
          </span>
          <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-300">
            <FaRobot /> Auto-Indexed
          </span>
        </div>
        <div className="text-lg font-extrabold text-white tracking-tight drop-shadow-md">
          {repo.name}
        </div>
      </div>

      <p className="project-repo-desc line-clamp-2 text-xs text-textMuted">
        {repo.description}
      </p>

      {repo.aiSummary && (
        <div className="mt-3 p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-slate-300 leading-relaxed">
          <span className="text-primary font-bold">AI Insight:</span> {repo.aiSummary}
        </div>
      )}

      <div className="project-meta-row mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="meta-stats flex items-center gap-3 text-xs text-textMuted">
          <span className="flex items-center gap-1"><FaStar className="text-amber-400" /> {repo.stargazers_count}</span>
          <span className="flex items-center gap-1"><FaCodeBranch className="text-purple-400" /> {repo.forks_count}</span>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/projects/${repo.name}`} className="btn-view-details text-xs">
            <FaEye /> Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Projects Section ──────────────────────────────── */
function Projects() {
  const { projects } = useAgent();

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container space-y-8">
        {/* Section Header */}
        <motion.div
          className="projects-header text-center max-w-2xl mx-auto space-y-3"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge-live inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
            <span className="pulse-dot"></span>
            <span>AUTONOMOUS MULTI-AGENT SYNC ACTIVE</span>
          </div>

          <h2 className="projects-title text-3xl sm:text-4xl font-extrabold text-white">
            AI-Indexed <span className="text-gradient">Repositories</span>
          </h2>

          <p className="projects-subtitle text-sm text-textMuted">
            Automatically analyzed and documented whenever code is pushed to GitHub.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((repo, i) => (
            <TiltCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <Link to="/projects" className="btn-view-all inline-flex items-center gap-2">
            <span>Explore All Projects & Architecture Specs</span>
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Projects;
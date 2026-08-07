import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch, FaFolderOpen, FaFolderPlus, FaEye, FaSearch, FaTimes, FaRobot } from "react-icons/fa";
import { useAgent } from "../context/AgentContext";
import "./ProjectsPage.css";

/* ─── 3D Tilt Card ───────────────────────────── */
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
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={cardRef}
      className="pp-card glass-panel flex flex-col justify-between"
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.05 }}
    >
      <div>
        {/* Cover Art Banner */}
        <div
          className="h-32 rounded-xl mb-4 p-3.5 flex flex-col justify-between relative overflow-hidden shadow-lg"
          style={{ background: repo.coverGradient || "linear-gradient(135deg, #10b981, #06b6d4)" }}
        >
          <div className="flex items-center justify-between text-xs text-white/90 font-mono">
            <span className="px-2.5 py-1 rounded bg-black/40 backdrop-blur-md border border-white/20">
              {repo.language || "Code"}
            </span>
            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-emerald-300">
              <FaRobot /> Auto-Indexed
            </span>
          </div>
          <h3 className="text-xl font-extrabold text-white tracking-tight drop-shadow-md">
            {repo.name}
          </h3>
        </div>

        <p className="pp-repo-desc text-xs text-textMuted leading-relaxed">
          {repo.description}
        </p>

        {repo.aiSummary && (
          <div className="mt-3 p-3 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300">
            <span className="text-primary font-bold">AI Analysis:</span> {repo.aiSummary}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
        <div className="pp-stats flex items-center gap-3 text-xs text-textMuted">
          <span className="flex items-center gap-1"><FaStar className="text-amber-400" /> {repo.stargazers_count}</span>
          <span className="flex items-center gap-1"><FaCodeBranch className="text-purple-400" /> {repo.forks_count}</span>
        </div>

        <div className="pp-actions flex items-center gap-2">
          <Link to={`/projects/${repo.name}`} className="pp-btn-details text-xs">
            <FaEye /> View Docs
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

/* ─── Main ProjectsPage ──────────────────────── */
function ProjectsPage() {
  const { projects } = useAgent();
  const [search, setSearch] = useState("");
  const [activeLang, setActiveLang] = useState("All");

  const languages = ["All", ...Array.from(new Set(projects.map((r) => r.language).filter(Boolean)))];

  const filtered = projects.filter((r) => {
    const matchesLang = activeLang === "All" || r.language === activeLang;
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description || "").toLowerCase().includes(search.toLowerCase());
    return matchesLang && matchesSearch;
  });

  return (
    <section className="pp-section min-h-screen pt-28 pb-20 px-4 sm:px-8 max-w-7xl mx-auto space-y-8">
      {/* Hero Header */}
      <motion.div
        className="pp-hero text-center max-w-2xl mx-auto space-y-3"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="pp-badge inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold">
          <span className="pulse-dot-pp"></span>
          <span>AUTONOMOUS REPOSITORY ENGINE</span>
        </div>

        <h1 className="pp-title text-4xl font-extrabold text-white">
          All <span className="text-gradient">Indexed Projects</span>
        </h1>

        <p className="pp-subtitle text-sm text-textMuted">
          Real-time autonomous repository indexer updated automatically on Git Push
        </p>
      </motion.div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-textMuted text-xs" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-black/40 border border-white/10 text-xs text-white placeholder-textMuted focus:outline-none focus:border-primary"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-textMuted hover:text-white"
            >
              <FaTimes className="text-xs" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveLang(lang)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                activeLang === lang
                  ? "bg-primary text-black"
                  : "bg-white/5 text-textMuted hover:text-white"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((repo, i) => (
            <TiltCard key={repo.id} repo={repo} index={i} />
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-white/5 border border-white/10 text-center space-y-3">
          <FaFolderOpen className="text-4xl text-textMuted mx-auto" />
          <h3 className="text-lg font-bold text-white">No Matching Projects Found</h3>
          <p className="text-xs text-textMuted">Try adjusting your search criteria or language filter.</p>
        </div>
      )}
    </section>
  );
}

export default ProjectsPage;

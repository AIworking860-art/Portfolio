import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaGithub, FaStar, FaCodeBranch, FaExclamationTriangle,
  FaFolderOpen, FaFolderPlus, FaEye, FaSearch, FaTimes,
} from "react-icons/fa";
import { fetchGithubProjects, GITHUB_USERNAME } from "../components/Projects/github";
import "./ProjectsPage.css";

/* ─── Language Color Map ─────────────────────── */
const langColors = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#2b7489",
  HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051", Go: "#00ADD8", Rust: "#dea584", Java: "#b07219",
  "C++": "#f34b7d", "C#": "#178600", Ruby: "#701516", default: "#06b6d4",
};

/* ─── 3D Tilt Card ───────────────────────────── */
function TiltCard({ repo, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 300, damping: 30 });
  const glowX  = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });
  const glowY  = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top)  / rect.height - 0.5);
  };
  const handleMouseLeave = () => { x.set(0); y.set(0); };

  const langColor = langColors[repo.language] || langColors.default;

  const formatDate = (d) => {
    if (!d) return "Recently";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <motion.div
      ref={cardRef}
      className="pp-card glass-panel"
      style={{ rotateX, rotateY, transformPerspective: 900, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Mouse-follow glow */}
      <motion.div
        className="pp-card-glow"
        style={{ background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(6,182,212,0.18) 0%, transparent 60%)` }}
      />

      <div className="pp-card-top">
        <div className="pp-repo-icon"><FaFolderPlus /></div>
        <div className="pp-lang-pill" style={{ borderColor: `${langColor}55` }}>
          <span className="pp-lang-dot" style={{ backgroundColor: langColor }}></span>
          <span>{repo.language || "Code"}</span>
        </div>
      </div>

      <h3 className="pp-repo-name">{repo.name}</h3>
      <p className="pp-repo-desc">{repo.description || "No description provided on GitHub."}</p>

      <div className="pp-meta">
        <div className="pp-stats">
          <span><FaStar className="pp-star" /> {repo.stargazers_count || 0}</span>
          <span><FaCodeBranch className="pp-fork" /> {repo.forks_count || 0}</span>
        </div>
        <span className="pp-updated">Updated {formatDate(repo.updated_at)}</span>
      </div>

      <div className="pp-actions">
        <Link to={`/projects/${repo.name}`} className="pp-btn-details">
          <FaEye /> Details
        </Link>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="pp-btn-github">
          <FaGithub /> GitHub
        </a>
        {repo.homepage && (
          <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="pp-btn-demo">
            🌐 Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

/* ─── Skeleton Card ──────────────────────────── */
function SkeletonCard() {
  return (
    <div className="pp-skeleton glass-panel">
      <div className="sk-row">
        <div className="sk-box sk-icon"></div>
        <div className="sk-box sk-pill"></div>
      </div>
      <div className="sk-box sk-title"></div>
      <div className="sk-box sk-line"></div>
      <div className="sk-box sk-line sk-line-short"></div>
      <div className="sk-box sk-meta"></div>
      <div className="sk-row sk-btns">
        <div className="sk-box sk-btn"></div>
        <div className="sk-box sk-btn"></div>
      </div>
    </div>
  );
}

/* ─── Main ProjectsPage ──────────────────────── */
function ProjectsPage() {
  const [projects, setProjects]     = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(false);
  const [search, setSearch]         = useState("");
  const [activeLang, setActiveLang] = useState("All");
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  const loadProjects = useCallback(async () => {
    try {
      setError(false);
      const data = await fetchGithubProjects();
      setProjects(data);
      setLastSyncedAt(new Date());
    } catch {
      setError(true);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
    const id = setInterval(loadProjects, 5 * 60 * 1000);
    return () => clearInterval(id);
  }, [loadProjects]);

  // Build language filter list
  const languages = ["All", ...Array.from(
    new Set(projects.map((r) => r.language).filter(Boolean))
  ).sort()];

  // Filtered projects
  const filtered = projects.filter((r) => {
    const matchesLang = activeLang === "All" || r.language === activeLang;
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description || "").toLowerCase().includes(search.toLowerCase());
    return matchesLang && matchesSearch;
  });

  return (
    <section className="pp-section">
      <div className="pp-container">

        {/* ── Hero Header ── */}
        <motion.div
          className="pp-hero"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="pp-badge">
            <span className="pulse-dot-pp"></span>
            <span>LIVE GITHUB SYNC</span>
          </div>

          <h1 className="pp-title">
            All <span className="text-gradient">Projects</span>
          </h1>

          <p className="pp-subtitle">
            Real-time repository feed from{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="pp-user-link"
            >
              @{GITHUB_USERNAME}
            </a>
            . New projects appear here automatically.
          </p>

          {lastSyncedAt && !error && (
            <span className="pp-sync-time">
              Last synced: {lastSyncedAt.toLocaleTimeString()} · auto-refreshes every 5 min
            </span>
          )}
        </motion.div>

        {/* ── Search & Filter Bar ── */}
        {!loading && !error && (
          <motion.div
            className="pp-filter-bar glass-panel"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="pp-search-wrap">
              <FaSearch className="pp-search-icon" />
              <input
                type="text"
                placeholder="Search projects by name or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pp-search-input"
              />
              {search && (
                <button className="pp-clear-search" onClick={() => setSearch("")}>
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="pp-lang-filters">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`pp-lang-btn ${activeLang === lang ? "active" : ""}`}
                  onClick={() => setActiveLang(lang)}
                >
                  {lang !== "All" && (
                    <span
                      className="pp-lang-dot-sm"
                      style={{ backgroundColor: langColors[lang] || langColors.default }}
                    ></span>
                  )}
                  {lang}
                </button>
              ))}
            </div>

            <div className="pp-results-count">
              {filtered.length} {filtered.length === 1 ? "project" : "projects"} found
            </div>
          </motion.div>
        )}

        {/* ── Loading Skeleton ── */}
        {loading && (
          <div className="pp-grid">
            {Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* ── Error State ── */}
        {!loading && error && (
          <motion.div
            className="pp-error glass-panel"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <FaExclamationTriangle className="pp-error-icon" />
            <h2>Failed to load repositories</h2>
            <p>GitHub API may be temporarily unavailable. Please try again later.</p>
            <button className="pp-retry-btn" onClick={loadProjects}>Retry</button>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank" rel="noopener noreferrer"
              className="pp-gh-btn"
            >
              <FaGithub /> View GitHub Profile
            </a>
          </motion.div>
        )}

        {/* ── Empty / No Results State ── */}
        {!loading && !error && filtered.length === 0 && (
          <motion.div
            className="pp-empty glass-panel"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            <div className="pp-empty-icon"><FaFolderOpen /></div>
            <h2>{search || activeLang !== "All" ? "No matching projects" : "No projects yet"}</h2>
            <p>
              {search || activeLang !== "All"
                ? "Try adjusting your search or filter."
                : `New repos pushed to @${GITHUB_USERNAME} will appear here automatically.`}
            </p>
            {(search || activeLang !== "All") && (
              <button className="pp-retry-btn" onClick={() => { setSearch(""); setActiveLang("All"); }}>
                Clear Filters
              </button>
            )}
          </motion.div>
        )}

        {/* ── Projects Grid ── */}
        {!loading && !error && filtered.length > 0 && (
          <div className="pp-grid">
            {filtered.map((repo, i) => (
              <TiltCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default ProjectsPage;

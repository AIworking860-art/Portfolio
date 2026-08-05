import { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  FaGithub, FaStar, FaCodeBranch, FaExclamationTriangle,
  FaFolderOpen, FaFolderPlus, FaArrowRight, FaEye,
} from "react-icons/fa";
import { fetchGithubProjects, GITHUB_USERNAME } from "./github";
import "./Projects.css";

/* ─── 3D Tilt Card ──────────────────────────────────────────────────── */
function TiltCard({ repo, index }) {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), { stiffness: 300, damping: 30 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), { stiffness: 300, damping: 30 });
  const glowX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });
  const glowY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), { stiffness: 200, damping: 25 });

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

  const langColors = {
    Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#2b7489",
    HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B",
    Shell: "#89e051", default: "#06b6d4",
  };
  const langColor = langColors[repo.language] || langColors.default;

  const formatDate = (d) => {
    if (!d) return "Recently";
    return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <motion.div
      ref={cardRef}
      className="project-3d-card glass-panel"
      style={{ rotateX, rotateY, transformPerspective: 1000, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glow highlight that follows mouse */}
      <motion.div
        className="card-glow-follow"
        style={{
          background: `radial-gradient(circle at ${glowX}% ${glowY}%, rgba(6,182,212,0.18) 0%, transparent 60%)`,
        }}
      />

      <div className="project-card-header">
        <div className="repo-icon">
          <FaFolderPlus />
        </div>
        <div className="repo-lang-pill" style={{ borderColor: `${langColor}50` }}>
          <span className="lang-dot" style={{ backgroundColor: langColor }}></span>
          <span>{repo.language || "Code"}</span>
        </div>
      </div>

      <h3 className="project-repo-name">{repo.name}</h3>

      <p className="project-repo-desc">
        {repo.description || "No description provided on GitHub."}
      </p>

      <div className="project-meta-row">
        <div className="meta-stats">
          <span title="Stars"><FaStar className="star-icon" /> {repo.stargazers_count || 0}</span>
          <span title="Forks"><FaCodeBranch className="fork-icon" /> {repo.forks_count || 0}</span>
        </div>
        <div className="meta-updated">Updated {formatDate(repo.updated_at)}</div>
      </div>

      <div className="project-card-actions">
        <Link to={`/projects/${repo.name}`} className="btn-view-details">
          <FaEye /> <span>Details</span>
        </Link>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-github-repo"
        >
          <FaGithub /> <span>GitHub</span>
        </a>
      </div>
    </motion.div>
  );
}

/* ─── Projects Section (Home Preview) ──────────────────────────────── */
function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastSyncedAt, setLastSyncedAt] = useState(null);

  const loadProjects = useCallback(async () => {
    try {
      setError(false);
      const data = await fetchGithubProjects();
      setProjects(data);
      setLastSyncedAt(new Date());
    } catch (err) {
      console.error("Failed to fetch live GitHub repos:", err);
      setError(true);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
    const intervalId = setInterval(loadProjects, 5 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, [loadProjects]);

  // Show only top 6 on home page preview
  const previewProjects = projects.slice(0, 6);

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* Section Header */}
        <motion.div
          className="projects-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-badge-live">
            <span className="pulse-dot"></span>
            <span>LIVE GITHUB SYNC ACTIVE</span>
          </div>

          <h2 className="projects-title">
            GitHub <span className="text-gradient">Projects</span>
          </h2>

          <p className="projects-subtitle">
            Dynamically loaded from{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="github-user-link"
            >
              @{GITHUB_USERNAME}
            </a>
            {" "}— always up to date, automatically.
          </p>

          {lastSyncedAt && !error && (
            <span className="auto-sync-status">
              Auto-synced: {lastSyncedAt.toLocaleTimeString()} · refreshes every 5 min
            </span>
          )}
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="projects-loading-state glass-panel">
            <div className="loading-spinner"></div>
            <p>Fetching repositories from GitHub @{GITHUB_USERNAME}...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="projects-error-state glass-panel">
            <FaExclamationTriangle className="error-icon" />
            <h3>Unable to load GitHub repositories. Please try again later.</h3>
            <p className="error-sub">Visit my GitHub profile directly to view all repositories.</p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-glow"
            >
              <FaGithub /> <span>Open GitHub Profile</span>
            </a>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && projects.length === 0 && (
          <div className="projects-empty-state glass-panel">
            <div className="empty-icon-box"><FaFolderOpen /></div>
            <h3 className="empty-title">No Public Projects Yet</h3>
            <p className="empty-message">
              New GitHub repositories will automatically appear here once pushed to{" "}
              <strong>@{GITHUB_USERNAME}</strong>.
            </p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github-profile-link"
            >
              <FaGithub /> <span>Visit GitHub Profile</span>
            </a>
          </div>
        )}

        {/* Project Cards Grid */}
        {!loading && !error && previewProjects.length > 0 && (
          <>
            <div className="projects-grid">
              {previewProjects.map((repo, i) => (
                <TiltCard key={repo.id} repo={repo} index={i} />
              ))}
            </div>

            {/* View All Projects CTA */}
            <motion.div
              className="view-all-cta"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {projects.length > 6 && (
                <p className="view-all-count">
                  Showing 6 of <strong>{projects.length}</strong> repositories
                </p>
              )}
              <Link to="/projects" className="btn-view-all">
                <span>View All Projects</span>
                <FaArrowRight />
              </Link>
            </motion.div>
          </>
        )}

      </div>
    </section>
  );
}

export default Projects;
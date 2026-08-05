import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaGithub, FaStar, FaCodeBranch, FaExclamationTriangle,
  FaArrowLeft, FaCalendarAlt, FaClock, FaExternalLinkAlt,
  FaTag, FaEye, FaLock, FaUnlock,
} from "react-icons/fa";
import { fetchGithubRepoDetail, GITHUB_USERNAME } from "../components/Projects/github";
import "./ProjectDetailPage.css";

/* ─── Language Color Map ─────────────────────── */
const langColors = {
  Python: "#3572A5", JavaScript: "#f1e05a", TypeScript: "#2b7489",
  HTML: "#e34c26", CSS: "#563d7c", "Jupyter Notebook": "#DA5B0B",
  Shell: "#89e051", Go: "#00ADD8", Rust: "#dea584", Java: "#b07219",
  "C++": "#f34b7d", "C#": "#178600", Ruby: "#701516", default: "#06b6d4",
};

const formatDate = (d) => {
  if (!d) return "Unknown";
  return new Date(d).toLocaleDateString("en-US", {
    month: "long", day: "numeric", year: "numeric",
  });
};

/* ─── Floating Particles ─────────────────────── */
function FloatingParticles() {
  return (
    <div className="pdp-particles" aria-hidden="true">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="pdp-particle"
          style={{
            left: `${Math.random() * 100}%`,
            top:  `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`,
            animationDuration: `${4 + Math.random() * 5}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Stat Card ──────────────────────────────── */
function StatCard({ icon, label, value, accent }) {
  return (
    <motion.div
      className="pdp-stat glass-panel"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 350, damping: 20 }}
    >
      <span className="pdp-stat-icon" style={{ color: accent }}>{icon}</span>
      <span className="pdp-stat-value">{value}</span>
      <span className="pdp-stat-label">{label}</span>
    </motion.div>
  );
}

/* ─── Main Component ─────────────────────────── */
function ProjectDetailPage() {
  const { repoName } = useParams();
  const [repo, setRepo]       = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(false);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(false);
    setRepo(null);

    fetchGithubRepoDetail(repoName)
      .then((data) => { if (!cancelled) { setRepo(data); setLoading(false); } })
      .catch(() => { if (!cancelled) { setError(true); setLoading(false); } });

    return () => { cancelled = true; };
  }, [repoName]);

  const langColor = repo ? (langColors[repo.language] || langColors.default) : "#06b6d4";

  /* ── Loading ── */
  if (loading) {
    return (
      <section className="pdp-section">
        <div className="pdp-container">
          <div className="pdp-loading">
            <div className="pdp-spinner"></div>
            <p>Loading project details...</p>
          </div>
        </div>
      </section>
    );
  }

  /* ── Error ── */
  if (error || !repo) {
    return (
      <section className="pdp-section">
        <div className="pdp-container">
          <Link to="/projects" className="pdp-back-btn">
            <FaArrowLeft /> Back to Projects
          </Link>
          <div className="pdp-error glass-panel">
            <FaExclamationTriangle className="pdp-error-icon" />
            <h2>Project Not Found</h2>
            <p>
              The repository <strong>{repoName}</strong> could not be loaded.
              It may be private, renamed, or removed.
            </p>
            <Link to="/projects" className="pdp-btn-primary">
              ← Back to All Projects
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const stagger = {
    container: { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } },
    item: { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16,1,0.3,1] } } },
  };

  return (
    <section className="pdp-section">
      <div className="pdp-container">

        {/* Back Button */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <Link to="/projects" className="pdp-back-btn">
            <FaArrowLeft /> Back to Projects
          </Link>
        </motion.div>

        {/* ── Hero Card ── */}
        <motion.div
          className="pdp-hero glass-panel"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <FloatingParticles />

          {/* Ambient glow blobs */}
          <div className="pdp-blob pdp-blob-1" />
          <div className="pdp-blob pdp-blob-2" />

          <div className="pdp-hero-content">
            <div className="pdp-hero-meta">
              {/* Language badge */}
              {repo.language && (
                <span className="pdp-lang-badge" style={{ borderColor: `${langColor}66`, color: langColor, background: `${langColor}18` }}>
                  <span className="pdp-lang-dot" style={{ backgroundColor: langColor }} />
                  {repo.language}
                </span>
              )}

              {/* Visibility */}
              <span className={`pdp-vis-badge ${repo.private ? "private" : "public"}`}>
                {repo.private ? <><FaLock /> Private</> : <><FaUnlock /> Public</>}
              </span>

              {/* Fork indicator */}
              {repo.fork && (
                <span className="pdp-fork-badge"><FaCodeBranch /> Forked</span>
              )}
            </div>

            <h1 className="pdp-repo-title">{repo.name}</h1>

            <p className="pdp-repo-desc">
              {repo.description || "No description provided for this repository on GitHub."}
            </p>

            {/* Topics / Tags */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="pdp-topics">
                <FaTag className="pdp-tag-icon" />
                {repo.topics.map((topic) => (
                  <span key={topic} className="pdp-topic-pill">{topic}</span>
                ))}
              </div>
            )}

            {/* Action Buttons */}
            <div className="pdp-hero-actions">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="pdp-btn-primary"
              >
                <FaGithub /> View on GitHub
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pdp-btn-secondary"
                >
                  <FaExternalLinkAlt /> Live Demo
                </a>
              )}
            </div>
          </div>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          className="pdp-stats-row"
          variants={stagger.container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={stagger.item}>
            <StatCard icon={<FaStar />} label="Stars" value={repo.stargazers_count} accent="#eab308" />
          </motion.div>
          <motion.div variants={stagger.item}>
            <StatCard icon={<FaCodeBranch />} label="Forks" value={repo.forks_count} accent="#8b5cf6" />
          </motion.div>
          <motion.div variants={stagger.item}>
            <StatCard icon={<FaEye />} label="Watchers" value={repo.watchers_count} accent="#06b6d4" />
          </motion.div>
          <motion.div variants={stagger.item}>
            <StatCard icon={<FaCalendarAlt />} label="Created" value={formatDate(repo.created_at)} accent="#10b981" />
          </motion.div>
          <motion.div variants={stagger.item}>
            <StatCard icon={<FaClock />} label="Updated" value={formatDate(repo.updated_at)} accent="#f97316" />
          </motion.div>
        </motion.div>

        {/* ── Details Grid ── */}
        <motion.div
          className="pdp-details-grid"
          variants={stagger.container}
          initial="hidden"
          animate="visible"
        >
          {/* About Card */}
          <motion.div className="pdp-detail-card glass-panel" variants={stagger.item}>
            <h2 className="pdp-card-title">About This Project</h2>
            <p className="pdp-card-body">
              {repo.description
                ? `${repo.name} is a ${repo.language || "code"} project hosted on GitHub by @${GITHUB_USERNAME}.${repo.description ? ` ${repo.description}` : ""}`
                : `${repo.name} is a project hosted on GitHub by @${GITHUB_USERNAME}. Visit the repository for more details.`}
            </p>
            {repo.topics && repo.topics.length > 0 && (
              <>
                <h3 className="pdp-card-subtitle">Technologies & Topics</h3>
                <div className="pdp-topics-list">
                  {repo.topics.map((t) => (
                    <span key={t} className="pdp-topic-pill">{t}</span>
                  ))}
                </div>
              </>
            )}
          </motion.div>

          {/* Repository Info Card */}
          <motion.div className="pdp-detail-card glass-panel" variants={stagger.item}>
            <h2 className="pdp-card-title">Repository Info</h2>
            <ul className="pdp-info-list">
              <li>
                <span className="pdp-info-label">Repository</span>
                <span className="pdp-info-value">{repo.full_name}</span>
              </li>
              <li>
                <span className="pdp-info-label">Primary Language</span>
                <span className="pdp-info-value">
                  {repo.language
                    ? <><span className="pdp-lang-dot-sm" style={{ backgroundColor: langColor }} />{repo.language}</>
                    : "Not specified"}
                </span>
              </li>
              <li>
                <span className="pdp-info-label">Visibility</span>
                <span className="pdp-info-value">{repo.private ? "Private" : "Public"}</span>
              </li>
              <li>
                <span className="pdp-info-label">Default Branch</span>
                <span className="pdp-info-value">{repo.default_branch || "main"}</span>
              </li>
              {repo.license && (
                <li>
                  <span className="pdp-info-label">License</span>
                  <span className="pdp-info-value">{repo.license.name}</span>
                </li>
              )}
              <li>
                <span className="pdp-info-label">Created On</span>
                <span className="pdp-info-value">{formatDate(repo.created_at)}</span>
              </li>
              <li>
                <span className="pdp-info-label">Last Updated</span>
                <span className="pdp-info-value">{formatDate(repo.updated_at)}</span>
              </li>
              {repo.homepage && (
                <li>
                  <span className="pdp-info-label">Live Demo</span>
                  <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="pdp-info-link">
                    {repo.homepage} <FaExternalLinkAlt />
                  </a>
                </li>
              )}
            </ul>
          </motion.div>
        </motion.div>

        {/* ── CTA Footer ── */}
        <motion.div
          className="pdp-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="pdp-cta-card glass-panel">
            <h3>Interested in this project?</h3>
            <p>View the full source code, star the repository, or fork it on GitHub.</p>
            <div className="pdp-cta-actions">
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="pdp-btn-primary">
                <FaGithub /> Open on GitHub
              </a>
              <Link to="/projects" className="pdp-btn-outline">
                ← All Projects
              </Link>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default ProjectDetailPage;

import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub, FaStar, FaCodeBranch, FaExclamationTriangle,
  FaFolderOpen, FaFolder, FaArrowRight, FaSync
} from "react-icons/fa";
import { fetchGithubProjects, GITHUB_USERNAME } from "./github";
import "./Projects.css";

// Language color map
const LANG_COLORS = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Jupyter: "#DA5B0B",
  Shell: "#89e051",
  default: "#8b5cf6",
};

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

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short", day: "numeric", year: "numeric",
    });
  };

  const getLangColor = (lang) => LANG_COLORS[lang] || LANG_COLORS.default;

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">

        {/* Section Header */}
        <div className="projects-header">
          <div className="section-badge-live">
            <span className="pulse-dot"></span>
            <span>LIVE GITHUB SYNC</span>
          </div>
          <h2 className="projects-title">
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="projects-subtitle">
            Live from{" "}
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="github-user-link"
            >
              @{GITHUB_USERNAME}
            </a>
          </p>
          {lastSyncedAt && !error && (
            <span className="auto-sync-status">
              <FaSync style={{ fontSize: "0.65rem" }} />
              Synced: {lastSyncedAt.toLocaleTimeString()}
            </span>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="projects-loading-state glass-panel">
            <div className="loading-spinner"></div>
            <p>Loading repositories from GitHub...</p>
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="projects-error-state glass-panel">
            <FaExclamationTriangle className="error-icon" />
            <h3>Could not load GitHub repos. Try again later.</h3>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github-repo"
            >
              <FaGithub /> View on GitHub
            </a>
          </div>
        )}

        {/* Empty */}
        {!loading && !error && projects.length === 0 && (
          <div className="projects-empty-state glass-panel">
            <FaFolderOpen className="empty-icon" />
            <h3>No Public Projects Yet</h3>
            <p>Projects will appear here automatically when pushed to GitHub.</p>
          </div>
        )}

        {/* Projects Grid — Small Cards */}
        {!loading && !error && projects.length > 0 && (
          <>
            <div className="projects-grid-small">
              {projects.map((repo) => (
                <Link
                  key={repo.id}
                  to={`/projects/${repo.name}`}
                  className="project-small-card glass-panel"
                >
                  {/* Card Top */}
                  <div className="psc-top">
                    <div className="psc-folder-icon">
                      <FaFolder />
                    </div>
                    <div
                      className="psc-lang-dot"
                      style={{ background: getLangColor(repo.language) }}
                      title={repo.language || "Code"}
                    />
                  </div>

                  {/* Name */}
                  <h3 className="psc-name">{repo.name}</h3>

                  {/* Description */}
                  <p className="psc-desc">
                    {repo.description || "No description provided."}
                  </p>

                  {/* Footer stats */}
                  <div className="psc-footer">
                    <span className="psc-stat">
                      <FaStar className="psc-stat-icon star" />
                      {repo.stargazers_count || 0}
                    </span>
                    <span className="psc-stat">
                      <FaCodeBranch className="psc-stat-icon fork" />
                      {repo.forks_count || 0}
                    </span>
                    {repo.language && (
                      <span className="psc-lang">
                        <span
                          className="psc-lang-badge"
                          style={{ background: getLangColor(repo.language) }}
                        />
                        {repo.language}
                      </span>
                    )}
                    <span className="psc-arrow">
                      <FaArrowRight />
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* View All on GitHub */}
            <div className="projects-view-all">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-view-all-github"
              >
                <FaGithub />
                <span>View All on GitHub</span>
                <FaArrowRight />
              </a>
            </div>
          </>
        )}

      </div>
    </section>
  );
}

export default Projects;
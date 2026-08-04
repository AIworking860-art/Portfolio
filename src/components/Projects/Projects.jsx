import { useEffect, useState, useCallback } from "react";
import { FaGithub, FaStar, FaCodeBranch, FaExclamationTriangle, FaFolderOpen, FaFolderPlus } from "react-icons/fa";
import { fetchGithubProjects, GITHUB_USERNAME } from "./github";
import "./Projects.css";

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

    // Auto-refresh GitHub repositories every 5 minutes automatically
    const intervalId = setInterval(() => {
      loadProjects();
    }, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [loadProjects]);

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="projects-section" id="projects">
      <div className="projects-container">
        
        {/* Section Header */}
        <div className="projects-header">
          <div className="section-badge-live">
            <span className="pulse-dot"></span>
            <span>LIVE GITHUB SYNC ACTIVE</span>
          </div>

          <h2 className="projects-title">
            GitHub <span className="text-gradient">Projects</span>
          </h2>

          <p className="projects-subtitle">
            Dynamically loaded from official GitHub account{" "}
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
              Auto-synced: {lastSyncedAt.toLocaleTimeString()} (Refreshes every 5 mins)
            </span>
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="projects-loading-state glass-panel">
            <div className="loading-spinner"></div>
            <p>Fetching real-time repositories from GitHub (@{GITHUB_USERNAME})...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="projects-error-state glass-panel">
            <FaExclamationTriangle className="error-icon" />
            <h3>Unable to load GitHub repositories at the moment. Please try again later.</h3>
            <p className="error-sub">
              Visit my official GitHub profile directly to view public repositories.
            </p>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-glow"
            >
              <FaGithub />
              <span>Open GitHub Profile</span>
            </a>
          </div>
        )}

        {/* Empty State (When user has 0 public repos on GitHub) */}
        {!loading && !error && projects.length === 0 && (
          <div className="projects-empty-state glass-panel">
            <div className="empty-icon-box">
              <FaFolderOpen />
            </div>
            <h3 className="empty-title">No Public Projects Yet</h3>
            <p className="empty-message">
              New GitHub repositories will automatically appear here as soon as they are pushed to my GitHub account (<strong>@{GITHUB_USERNAME}</strong>).
            </p>
            <div className="empty-actions">
              <a
                href={`https://github.com/${GITHUB_USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-github-profile-link"
              >
                <FaGithub />
                <span>Visit https://github.com/{GITHUB_USERNAME}</span>
              </a>
            </div>
          </div>
        )}

        {/* Real Repositories Grid (Only displayed when real public repos exist) */}
        {!loading && !error && projects.length > 0 && (
          <div className="projects-grid">
            {projects.map((repo) => (
              <div key={repo.id} className="project-3d-card glass-panel">
                
                <div className="project-card-header">
                  <div className="repo-icon">
                    <FaFolderPlus />
                  </div>

                  <div className="repo-lang-pill">
                    <span className="lang-dot"></span>
                    <span>{repo.language || "Code"}</span>
                  </div>
                </div>

                <h3 className="project-repo-name">{repo.name}</h3>

                <p className="project-repo-desc">
                  {repo.description || "No description provided on GitHub."}
                </p>

                {/* Meta details: Stars, Forks, Last Updated */}
                <div className="project-meta-row">
                  <div className="meta-stats">
                    <span title="Stars">
                      <FaStar className="star-icon" /> {repo.stargazers_count || 0}
                    </span>
                    <span title="Forks">
                      <FaCodeBranch className="fork-icon" /> {repo.forks_count || 0}
                    </span>
                  </div>

                  <div className="meta-updated">
                    Last Updated: {formatDate(repo.updated_at)}
                  </div>
                </div>

                {/* GitHub Repository Button */}
                <div className="project-card-actions">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-github-repo"
                  >
                    <FaGithub />
                    <span>View Repository</span>
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}

export default Projects;
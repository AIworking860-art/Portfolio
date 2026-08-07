import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  FaGithub, FaStar, FaCodeBranch, FaSearch, FaTimes,
  FaFolder, FaArrowRight, FaSync, FaExclamationTriangle, FaFolderOpen
} from "react-icons/fa";
import { fetchGithubProjects, GITHUB_USERNAME } from "../components/Projects/github";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./ProjectsPage.css";

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

function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(false);
  const [search, setSearch]     = useState("");
  const [activeLang, setActiveLang] = useState("All");

  const loadProjects = useCallback(async () => {
    try {
      setError(false);
      const data = await fetchGithubProjects();
      setProjects(data);
    } catch (err) {
      console.error("Failed to fetch GitHub repos:", err);
      setError(true);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    loadProjects();
  }, [loadProjects]);

  const languages = ["All", ...Array.from(new Set(projects.map((r) => r.language).filter(Boolean)))];

  const filtered = projects.filter((r) => {
    const matchesLang   = activeLang === "All" || r.language === activeLang;
    const matchesSearch =
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      (r.description || "").toLowerCase().includes(search.toLowerCase());
    return matchesLang && matchesSearch;
  });

  const getLangColor = (lang) => LANG_COLORS[lang] || LANG_COLORS.default;

  return (
    <>
      <Navbar />
      <div className="pp-page">
        <div className="pp-container">
          
          {/* Header */}
          <div className="pp-header">
            <div className="section-badge-live">
              <span className="pulse-dot"></span>
              <span>LIVE GITHUB REPOSITORIES</span>
            </div>
            <h1 className="pp-title">
              My <span className="text-gradient">Projects</span>
            </h1>
            <p className="pp-subtitle">
              Explore public GitHub repositories for Muhammad Hashir (<strong>@{GITHUB_USERNAME}</strong>). Click any project for full details.
            </p>
          </div>

          {/* Search & Filter Bar */}
          <div className="pp-filter-bar glass-panel">
            <div className="pp-search-box">
              <FaSearch className="pp-search-icon" />
              <input
                type="text"
                placeholder="Search projects..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pp-search-input"
              />
              {search && (
                <button onClick={() => setSearch("")} className="pp-clear-btn">
                  <FaTimes />
                </button>
              )}
            </div>

            <div className="pp-lang-pills">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`pp-lang-pill ${activeLang === lang ? "active" : ""}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="pp-loading glass-panel">
              <div className="pp-spinner"></div>
              <p>Fetching repositories from GitHub...</p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="pp-error glass-panel">
              <FaExclamationTriangle className="pp-error-icon" />
              <h3>Unable to load repositories.</h3>
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

          {/* Grid */}
          {!loading && !error && filtered.length > 0 && (
            <div className="pp-grid">
              {filtered.map((repo) => (
                <div key={repo.id} className="pp-card glass-panel">
                  <div className="pp-card-top">
                    <div className="pp-folder-icon">
                      <FaFolder />
                    </div>
                    {repo.language && (
                      <span className="pp-lang-tag" style={{ background: `${getLangColor(repo.language)}20`, color: getLangColor(repo.language), borderColor: `${getLangColor(repo.language)}40` }}>
                        <span className="pp-dot" style={{ background: getLangColor(repo.language) }} />
                        {repo.language}
                      </span>
                    )}
                  </div>

                  <h3 className="pp-card-name">{repo.name}</h3>

                  <p className="pp-card-desc">
                    {repo.description || "No description provided."}
                  </p>

                  <div className="pp-card-meta">
                    <span><FaStar className="icon-yellow" /> {repo.stargazers_count || 0}</span>
                    <span><FaCodeBranch className="icon-purple" /> {repo.forks_count || 0}</span>
                  </div>

                  <div className="pp-card-actions">
                    <Link to={`/projects/${repo.name}`} className="pp-btn-details">
                      <span>View Details</span>
                      <FaArrowRight />
                    </Link>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="pp-btn-gh"
                      title="GitHub Repo"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filtered.length === 0 && (
            <div className="pp-empty glass-panel">
              <FaFolderOpen className="pp-empty-icon" />
              <h3>No matching projects found</h3>
              <p>Try adjusting your search query or language filter.</p>
            </div>
          )}

        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProjectsPage;

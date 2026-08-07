import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  FaGithub, FaStar, FaCodeBranch, FaEye, FaArrowLeft,
  FaExternalLinkAlt, FaCalendarAlt, FaCode, FaFolder,
  FaExclamationTriangle, FaClock, FaTag
} from "react-icons/fa";
import { fetchGithubProjects, GITHUB_USERNAME } from "../Projects/github";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import "./ProjectDetail.css";

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

function ProjectDetailPage() {
  const { repoName } = useParams();
  const [repo, setRepo]       = useState(null);
  const [readme, setReadme]   = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function load() {
      try {
        // Fetch all repos and find this one
        const all = await fetchGithubProjects();
        const found = all.find((r) => r.name === repoName);
        if (!found) { setNotFound(true); setLoading(false); return; }
        setRepo(found);

        // Try to fetch README
        try {
          const res = await fetch(
            `https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/readme`,
            { headers: { Accept: "application/vnd.github.v3.raw" } }
          );
          if (res.ok) {
            const text = await res.text();
            setReadme(text);
          }
        } catch {
          // No readme — that's fine
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [repoName]);

  const formatDate = (d) =>
    d ? new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "—";

  const langColor = repo ? (LANG_COLORS[repo.language] || LANG_COLORS.default) : "#8b5cf6";

  return (
    <>
      <Navbar />
      <div className="pd-page">

        {/* Loading */}
        {loading && (
          <div className="pd-loading">
            <div className="pd-spinner" />
            <p>Loading project details...</p>
          </div>
        )}

        {/* Not Found */}
        {!loading && notFound && (
          <div className="pd-notfound">
            <FaExclamationTriangle />
            <h2>Project Not Found</h2>
            <p>"{repoName}" could not be found.</p>
            <Link to="/#projects" className="pd-back-btn">
              <FaArrowLeft /> Back to Projects
            </Link>
          </div>
        )}

        {/* Content */}
        {!loading && repo && (
          <>
            {/* Back Button */}
            <div className="pd-back-row">
              <Link to="/#projects" className="pd-back-btn">
                <FaArrowLeft /> Back to Projects
              </Link>
            </div>

            {/* Hero Banner */}
            <div className="pd-hero glass-panel">
              <div className="pd-hero-left">
                <div className="pd-repo-icon" style={{ background: `${langColor}22`, borderColor: `${langColor}44` }}>
                  <FaFolder style={{ color: langColor }} />
                </div>
                <div>
                  <div className="pd-breadcrumb">
                    <FaGithub />
                    <span>{GITHUB_USERNAME}</span>
                    <span>/</span>
                    <span className="pd-repo-name">{repo.name}</span>
                  </div>
                  <p className="pd-desc">{repo.description || "No description provided."}</p>

                  {/* Topics / Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="pd-topics">
                      {repo.topics.map((t) => (
                        <span key={t} className="pd-topic-tag">
                          <FaTag /> {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="pd-hero-actions">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pd-btn-github"
                >
                  <FaGithub /> View on GitHub
                </a>
                {repo.homepage && (
                  <a
                    href={repo.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-btn-demo"
                  >
                    <FaExternalLinkAlt /> Live Demo
                  </a>
                )}
              </div>
            </div>

            {/* Stats Row */}
            <div className="pd-stats-row">
              <div className="pd-stat-card glass-panel">
                <FaStar className="pds-icon star" />
                <div>
                  <span className="pds-val">{repo.stargazers_count || 0}</span>
                  <span className="pds-lbl">Stars</span>
                </div>
              </div>
              <div className="pd-stat-card glass-panel">
                <FaCodeBranch className="pds-icon fork" />
                <div>
                  <span className="pds-val">{repo.forks_count || 0}</span>
                  <span className="pds-lbl">Forks</span>
                </div>
              </div>
              <div className="pd-stat-card glass-panel">
                <FaEye className="pds-icon eye" />
                <div>
                  <span className="pds-val">{repo.watchers_count || 0}</span>
                  <span className="pds-lbl">Watchers</span>
                </div>
              </div>
              <div className="pd-stat-card glass-panel">
                <FaCode className="pds-icon lang" style={{ color: langColor }} />
                <div>
                  <span className="pds-val">{repo.language || "—"}</span>
                  <span className="pds-lbl">Language</span>
                </div>
              </div>
              <div className="pd-stat-card glass-panel">
                <FaCalendarAlt className="pds-icon date" />
                <div>
                  <span className="pds-val" style={{ fontSize: "0.78rem" }}>
                    {formatDate(repo.created_at)}
                  </span>
                  <span className="pds-lbl">Created</span>
                </div>
              </div>
              <div className="pd-stat-card glass-panel">
                <FaClock className="pds-icon update" />
                <div>
                  <span className="pds-val" style={{ fontSize: "0.78rem" }}>
                    {formatDate(repo.updated_at)}
                  </span>
                  <span className="pds-lbl">Last Updated</span>
                </div>
              </div>
            </div>

            {/* README */}
            <div className="pd-readme-section glass-panel">
              <div className="pd-readme-header">
                <FaFolder />
                <span>README.md</span>
              </div>
              {readme ? (
                <pre className="pd-readme-content">{readme}</pre>
              ) : (
                <div className="pd-no-readme">
                  <p>No README found for this repository.</p>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pd-btn-github"
                  >
                    <FaGithub /> View on GitHub
                  </a>
                </div>
              )}
            </div>

          </>
        )}
      </div>
      <Footer />
    </>
  );
}

export default ProjectDetailPage;

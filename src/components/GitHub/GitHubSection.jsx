import { FaGithub, FaCodeBranch, FaStar, FaUserPlus, FaArrowRight } from "react-icons/fa";
import "./GitHubSection.css";

function GitHubSection() {
  const username = "AIworking860-art";
  const profileUrl = `https://github.com/${username}`;

  return (
    <section className="github-section" id="github">
      <div className="github-container">
        
        <div className="github-showcase-card glass-panel">
          <div className="github-card-ambient-glow"></div>

          <div className="github-card-left">
            <div className="github-avatar-box">
              <FaGithub className="github-large-icon" />
            </div>

            <div className="github-identity">
              <div className="github-verified-badge">
                <span>OFFICIAL GITHUB PROFILE</span>
              </div>
              <h3 className="github-username-text">@{username}</h3>
              <p className="github-role-sub">Muhammad Hashir • AI & Python Developer</p>
            </div>
          </div>

          <div className="github-card-center">
            <div className="github-quick-stats">
              <div className="stat-pill glass-panel">
                <FaStar className="stat-icon yellow" />
                <span>Open Source AI Projects</span>
              </div>
              <div className="stat-pill glass-panel">
                <FaCodeBranch className="stat-icon purple" />
                <span>Python & n8n Automations</span>
              </div>
              <div className="stat-pill glass-panel">
                <FaUserPlus className="stat-icon cyan" />
                <span>Global Collaborations</span>
              </div>
            </div>
          </div>

          <div className="github-card-right">
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-github-profile-primary"
            >
              <FaGithub className="btn-icon-left" />
              <span>Explore GitHub Profile</span>
              <FaArrowRight className="btn-icon-right" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}

export default GitHubSection;

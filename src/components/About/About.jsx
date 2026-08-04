import { FaPython, FaBrain, FaRobot, FaCogs } from "react-icons/fa";
import "./About.css";

function About() {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        
        {/* Left Column: Authentic & Confident Professional Bio */}
        <div className="about-content">
          <div className="section-badge">ABOUT THE DEVELOPER</div>
          
          <h2 className="about-title">
            Architecting <span className="text-gradient">Intelligent AI & Automation Systems</span>
          </h2>

          <p className="about-text-lead">
            I am a specialized <strong>AI & Python Developer</strong> dedicated to delivering high-impact, 
            production-grade software solutions for international companies, startups, and tech innovators.
          </p>

          <p className="about-text-body">
            My engineering expertise is focused strictly on four high-demand domains: 
            <strong> Python Development</strong>, <strong>Agentic AI</strong>, 
            <strong> Generative AI</strong>, and <strong>n8n Automation</strong>. 
            By uniting autonomous AI agents with robust backend architecture, I transform complex enterprise workflows 
            into seamless, intelligent digital systems.
          </p>

          <p className="about-text-body">
            Whether building autonomous multi-agent networks, fine-tuning Generative AI models, 
            or designing enterprise-wide n8n automation pipelines, I engineer scalable, 
            reliable, and secure code built to meet the rigorous standards of international recruiters and clients.
          </p>

          <div className="about-highlights-grid">
            <div className="highlight-card glass-panel">
              <span className="highlight-num">100%</span>
              <span className="highlight-label">Python & AI Precision</span>
            </div>
            <div className="highlight-card glass-panel">
              <span className="highlight-num">Global</span>
              <span className="highlight-label">International Ready</span>
            </div>
          </div>
        </div>

        {/* Right Column: 3D Glass Skill Stack Container (Strictly 4 Skills) */}
        <div className="about-visual-side">
          <div className="about-3d-card glass-panel">
            <div className="about-card-header">
              <div className="ai-core-avatar">
                <span className="core-pulse"></span>
                <span>AI</span>
              </div>
              <div>
                <h3 className="card-dev-name">Muhammad Hashir</h3>
                <p className="card-dev-role">AI & Python Developer</p>
              </div>
            </div>

            <div className="focused-skills-list">
              <div className="focused-skill-item">
                <div className="skill-icon-wrapper cyan">
                  <FaPython />
                </div>
                <div className="skill-item-info">
                  <h4>Python Developer</h4>
                  <p>Backend systems & high-performance APIs</p>
                </div>
              </div>

              <div className="focused-skill-item">
                <div className="skill-icon-wrapper purple">
                  <FaRobot />
                </div>
                <div className="skill-item-info">
                  <h4>Agentic AI</h4>
                  <p>Autonomous AI multi-agent architecture</p>
                </div>
              </div>

              <div className="focused-skill-item">
                <div className="skill-icon-wrapper blue">
                  <FaBrain />
                </div>
                <div className="skill-item-info">
                  <h4>Generative AI</h4>
                  <p>LLM solutions & custom intelligent models</p>
                </div>
              </div>

              <div className="focused-skill-item">
                <div className="skill-icon-wrapper emerald">
                  <FaCogs />
                </div>
                <div className="skill-item-info">
                  <h4>n8n Automation</h4>
                  <p>Enterprise workflow orchestration</p>
                </div>
              </div>
            </div>

            <div className="about-card-footer">
              <span>Ready for International Opportunities</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default About;
import { TypeAnimation } from "react-type-animation";
import { FaGithub, FaWhatsapp, FaEnvelope, FaCode, FaArrowRight, FaRobot, FaCogs } from "react-icons/fa";
import HeroCanvas from "./HeroCanvas";
import MotionWrapper from "./MotionWrapper";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        
        {/* Left Column: Text & CTA */}
        <MotionWrapper className="hero-content">
          <div className="hero-status-pill">
            <span className="status-dot"></span>
            <span>Available for International AI & Automation Projects</span>
          </div>

          <h4 className="hero-greeting">Hello, I'm</h4>
          <h1 className="hero-title">
            Muhammad <span className="text-gradient">Hashir</span>
          </h1>

          <div className="hero-subtitle-wrapper">
            <span className="static-prefix">Professional </span>
            <TypeAnimation
              sequence={[
                "AI & Python Developer", 2200,
                "Agentic AI Specialist", 2200,
                "Generative AI Engineer", 2200,
                "n8n Automation Architect", 2200,
              ]}
              speed={45}
              repeat={Infinity}
              className="hero-typewriter"
            />
          </div>

          <p className="hero-bio">
            Engineering high-performance Python backends, autonomous Agentic AI systems, 
            Generative AI solutions, and enterprise n8n workflow automations for startups 
            and global companies.
          </p>

          {/* Required Buttons */}
          <div className="hero-action-buttons">
            <a href="#projects" className="btn-primary-glow">
              <span>View Projects</span>
              <FaArrowRight className="btn-icon" />
            </a>

            <a
              href="https://github.com/AIworking860-art"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass"
            >
              <FaGithub className="btn-icon" />
              <span>GitHub</span>
            </a>

            <a href="#contact" className="btn-glass">
              <FaEnvelope className="btn-icon" />
              <span>Contact Me</span>
            </a>

            <a
              href="https://wa.me/923080763337"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-hero"
            >
              <FaWhatsapp className="btn-icon" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Quick Metrics */}
          <div className="hero-metrics-grid">
            <div className="metric-item glass-panel">
              <FaCode className="metric-icon cyan" />
              <div>
                <h4 className="metric-val">Python Core</h4>
                <p className="metric-lbl">Architecture & APIs</p>
              </div>
            </div>

            <div className="metric-item glass-panel">
              <FaRobot className="metric-icon purple" />
              <div>
                <h4 className="metric-val">Agentic & GenAI</h4>
                <p className="metric-lbl">Autonomous AI Systems</p>
              </div>
            </div>

            <div className="metric-item glass-panel">
              <FaCogs className="metric-icon blue" />
              <div>
                <h4 className="metric-val">n8n Workflows</h4>
                <p className="metric-lbl">Process Automation</p>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Right Column: 3D Floating Profile Card & Canvas */}
        <div className="hero-visual-wrapper">
          <div className="hero-3d-canvas">
            <HeroCanvas />
          </div>

          {/* 3D Floating Profile Card with Glassmorphism */}
          <div className="profile-card-3d animate-float">
            <div className="profile-image-container">
              <div className="profile-glow-ring"></div>
              <div className="profile-image-frame">
                <img
                  src="/profile.jpg"
                  alt="Muhammad Hashir - Official Professional Profile"
                  className="profile-img"
                  onError={(e) => {
                    // Fallback to assets if needed
                    e.target.src = "/src/assets/profile.jpg";
                  }}
                />
              </div>
            </div>

            <div className="profile-info-badge glass-panel">
              <h3 className="profile-name">Muhammad Hashir</h3>
              <p className="profile-title-tag">AI & Python Developer</p>
              <div className="profile-skills-row">
                <span className="mini-badge">Python</span>
                <span className="mini-badge">Agentic AI</span>
                <span className="mini-badge">GenAI</span>
                <span className="mini-badge">n8n</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

export default Hero;
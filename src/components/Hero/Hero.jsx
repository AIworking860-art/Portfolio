import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { FaGithub, FaPalette, FaRobot, FaMicrochip, FaPlay, FaSync, FaBrain, FaCode } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useAgent } from "../../context/AgentContext";
import HeroCanvas from "./HeroCanvas";
import MotionWrapper from "./MotionWrapper";
import "./Hero.css";

function Hero() {
  const { setIsCustomizerOpen, activeTheme } = useTheme();
  const { runOrchestratorPipeline, isExecuting, projects } = useAgent();

  return (
    <section className="hero-section" id="home">
      <div className="hero-container">
        {/* Left Column: Text & CTA */}
        <MotionWrapper className="hero-content">
          <div className="hero-status-pill">
            <span className="status-dot"></span>
            <span>AI & Python Developer • Available for Hire</span>
          </div>

          <h4 className="hero-greeting">Hi, I'm</h4>
          <h1 className="hero-title">
            Muhammad <span className="text-gradient">Hashir</span>
          </h1>

          <div className="hero-subtitle-wrapper">
            <TypeAnimation
              sequence={[
                "Agentic AI Developer", 2200,
                "Python Architect", 2200,
                "Generative AI Engineer", 2200,
                "n8n Workflow Automation", 2200,
                "Multi-Agent System Builder", 2200,
              ]}
              speed={48}
              repeat={Infinity}
              className="hero-typewriter"
            />
          </div>

          <p className="hero-bio">
            I build intelligent, autonomous AI systems — from multi-agent pipelines to generative AI applications, 
            agentic workflows, and Python automation platforms. Specializing in LLMs, RAG, n8n, and cutting-edge AI architecture.
          </p>

          {/* Action Buttons */}
          <div className="hero-action-buttons">
            <a
              href="https://github.com/AIworking860-art"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary-glow"
            >
              <FaGithub />
              <span>View GitHub</span>
            </a>

            <Link to="/projects" className="btn-glass">
              <FaCode className="text-secondary" />
              <span>See Projects</span>
            </Link>

            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="btn-glass cursor-pointer"
            >
              <FaPalette className="text-primary" />
              <span>Theme Studio</span>
            </button>
          </div>

          {/* Quick Telemetry Metrics */}
          <div className="hero-metrics-grid">
            <div className="metric-item glass-panel">
              <FaBrain className="metric-icon cyan" />
              <div>
                <h4 className="metric-val">80+ AI Agents</h4>
                <p className="metric-lbl">Autonomous Pipeline</p>
              </div>
            </div>

            <div className="metric-item glass-panel">
              <FaGithub className="metric-icon purple" />
              <div>
                <h4 className="metric-val">{projects.length}+ Projects</h4>
                <p className="metric-lbl">Live on GitHub</p>
              </div>
            </div>

            <div className="metric-item glass-panel">
              <FaSync className="metric-icon blue" />
              <div>
                <h4 className="metric-val">Zero Manual</h4>
                <p className="metric-lbl">Full Automation</p>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Right Column: Profile Card */}
        <div className="hero-visual-wrapper">
          <div className="hero-3d-canvas">
            <HeroCanvas />
          </div>

          {/* 3D Glass Profile Card */}
          <div className="profile-card-3d animate-float">
            <div className="profile-image-container">
              <div className="profile-glow-ring"></div>
              <div className="profile-image-frame">
                <img
                  src="/Portfolio/muhammad-hashir.jpg"
                  alt="Muhammad Hashir"
                  className="profile-img"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/muhammad-hashir.jpg";
                  }}
                />
              </div>
            </div>

            <div className="profile-info-badge glass-panel">
              <h3 className="profile-name">Muhammad Hashir</h3>
              <p className="profile-title-tag">AI & Python Developer</p>
              <div className="profile-skills-row">
                <span className="mini-badge">Agentic AI</span>
                <span className="mini-badge">Python</span>
                <span className="mini-badge">LLMs</span>
                <span className="mini-badge">n8n</span>
                <span className="mini-badge">RAG</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
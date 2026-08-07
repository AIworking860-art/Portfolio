import { TypeAnimation } from "react-type-animation";
import { Link } from "react-router-dom";
import { FaGithub, FaPalette, FaArrowRight, FaRobot, FaMicrochip, FaPlay, FaSync } from "react-icons/fa";
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
            <span>Master AI Portfolio Orchestrator • 2026 Edition</span>
          </div>

          <h4 className="hero-greeting">Autonomous AI Platform</h4>
          <h1 className="hero-title">
            Usman <span className="text-gradient">Ghani</span>
          </h1>

          <div className="hero-subtitle-wrapper">
            <span className="static-prefix">Autonomous </span>
            <TypeAnimation
              sequence={[
                "AI Portfolio Orchestrator", 2200,
                "Multi-Agent System Architect", 2200,
                "Agentic AI & Swarm Specialist", 2200,
                "3D WebGL & Shader Engineer", 2200,
              ]}
              speed={45}
              repeat={Infinity}
              className="hero-typewriter"
            />
          </div>

          <p className="hero-bio">
            An intelligent multi-agent platform that monitors GitHub repositories in real time, automatically analyzing code diffs, generating technical documentation, creating blog articles, rendering cover artwork, and auto-updating resumes without manual intervention.
          </p>

          {/* Action Buttons */}
          <div className="hero-action-buttons">
            <button
              onClick={() => runOrchestratorPipeline()}
              disabled={isExecuting}
              className="btn-primary-glow cursor-pointer"
            >
              <FaPlay className={isExecuting ? "animate-spin" : ""} />
              <span>{isExecuting ? "Pipeline Running..." : "Simulate Git Push"}</span>
            </button>

            <button
              onClick={() => setIsCustomizerOpen(true)}
              className="btn-glass cursor-pointer"
            >
              <FaPalette className="text-primary" />
              <span>Theme Studio ({activeTheme.name})</span>
            </button>

            <Link to="/orchestrator" className="btn-glass">
              <FaMicrochip className="text-secondary" />
              <span>Orchestrator Dashboard</span>
            </Link>
          </div>

          {/* Quick Telemetry Metrics */}
          <div className="hero-metrics-grid">
            <div className="metric-item glass-panel">
              <FaRobot className="metric-icon cyan" />
              <div>
                <h4 className="metric-val">10 Autonomous Agents</h4>
                <p className="metric-lbl">Multi-Agent Workflow</p>
              </div>
            </div>

            <div className="metric-item glass-panel">
              <FaGithub className="metric-icon purple" />
              <div>
                <h4 className="metric-val">{projects.length} Sync Repos</h4>
                <p className="metric-lbl">Auto-Indexed Docs</p>
              </div>
            </div>

            <div className="metric-item glass-panel">
              <FaSync className="metric-icon blue" />
              <div>
                <h4 className="metric-val">Zero Manual Work</h4>
                <p className="metric-lbl">Full Automation</p>
              </div>
            </div>
          </div>
        </MotionWrapper>

        {/* Right Column: 3D WebGL Floating Visualizer */}
        <div className="hero-visual-wrapper">
          <div className="hero-3d-canvas">
            <HeroCanvas />
          </div>

          {/* 3D Glass Profile Card */}
          <div className="profile-card-3d animate-float">
            <div className="profile-image-container">
              <div className="profile-glow-ring"></div>
              <div className="profile-image-frame flex items-center justify-center bg-primary/20 text-primary text-5xl">
                <FaRobot />
              </div>
            </div>

            <div className="profile-info-badge glass-panel">
              <h3 className="profile-name">Usman Ghani</h3>
              <p className="profile-title-tag">Lead AI Systems Architect</p>
              <div className="profile-skills-row">
                <span className="mini-badge">Multi-Agent</span>
                <span className="mini-badge">Git Push Sync</span>
                <span className="mini-badge">LLM Docs</span>
                <span className="mini-badge">3D WebGL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
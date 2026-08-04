import { FaPython, FaRobot, FaBrain, FaCogs } from "react-icons/fa";
import "./Skills.css";

const skillsData = [
  {
    id: "python",
    title: "Python Developer",
    icon: <FaPython />,
    category: "Core Engineering",
    colorClass: "cyan",
    description: "Designing high-performance backend architectures, microservices, complex algorithms, and robust API integrations using Python.",
    highlights: ["Backend & API Development", "High-Performance Scripting", "Data Pipelines & Logic"],
  },
  {
    id: "agentic-ai",
    title: "Agentic AI",
    icon: <FaRobot />,
    category: "Autonomous Systems",
    colorClass: "purple",
    description: "Architecting multi-agent AI systems, autonomous decision workflows, tool-augmented reasoning, and intelligent task execution.",
    highlights: ["Autonomous AI Agents", "Multi-Agent Frameworks", "Task & Reasoning Loops"],
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    icon: <FaBrain />,
    category: "LLM Solutions",
    colorClass: "blue",
    description: "Engineering custom LLM applications, RAG (Retrieval-Augmented Generation) systems, fine-tuning pipelines, and prompt engineering.",
    highlights: ["LLM Applications & RAG", "Contextual AI Search", "Custom Model Integration"],
  },
  {
    id: "n8n-automation",
    title: "n8n Automation",
    icon: <FaCogs />,
    category: "Workflow Orchestration",
    colorClass: "emerald",
    description: "Building enterprise workflow automations, webhook integrations, multi-system data sync, and AI-driven automation webhooks.",
    highlights: ["Enterprise Automation", "Webhook & API Sync", "AI-Powered Workflows"],
  },
];

function Skills() {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">
        
        {/* Section Header */}
        <div className="skills-header text-center">
          <div className="section-badge">CORE EXPERTISE</div>
          <h2 className="skills-title">
            Specialized <span className="text-gradient">Technical Mastery</span>
          </h2>
          <p className="skills-subtitle">
            Laser-focused on delivering production-grade AI engineering and scalable workflow automation.
          </p>
        </div>

        {/* 3D Skills Grid (Strictly 4 Cards) */}
        <div className="skills-grid">
          {skillsData.map((skill) => (
            <div key={skill.id} className="skill-3d-card glass-panel">
              <div className="skill-card-glow"></div>
              
              <div className="skill-card-top">
                <div className={`skill-icon-box ${skill.colorClass}`}>
                  {skill.icon}
                </div>
                <span className="skill-category">{skill.category}</span>
              </div>

              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>

              <div className="skill-tags">
                {skill.highlights.map((tag, idx) => (
                  <span key={idx} className="skill-tag">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="skill-card-footer">
                <div className="skill-bar-bg">
                  <div className={`skill-bar-fill ${skill.colorClass}`}></div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;
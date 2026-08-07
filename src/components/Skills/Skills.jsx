import { useState } from "react";
import {
  FaPython, FaRobot, FaBrain, FaTerminal,
  FaGitAlt, FaGithub, FaPlug, FaServer,
  FaDatabase, FaCode, FaCheckCircle
} from "react-icons/fa";
import "./Skills.css";

const skillsCategories = [
  {
    category: "AI & Autonomous Systems",
    skills: [
      { name: "Python", icon: <FaPython />, level: 95, colorClass: "cyan", desc: "Core language for AI backends, automation scripts, microservices & APIs" },
      { name: "Agentic AI", icon: <FaRobot />, level: 92, colorClass: "purple", desc: "Multi-agent autonomous systems, tool invocation loops & cognitive planning" },
      { name: "Generative AI", icon: <FaBrain />, level: 90, colorClass: "blue", desc: "LLM integration, Retrieval-Augmented Generation (RAG) & vector search" },
      { name: "Prompt Engineering", icon: <FaTerminal />, level: 94, colorClass: "emerald", desc: "System prompt optimization, structured JSON output formatting & chain-of-thought" },
    ],
  },
  {
    category: "Backend & API Development",
    skills: [
      { name: "FastAPI", icon: <FaServer />, level: 88, colorClass: "cyan", desc: "High-performance asynchronous Python web APIs with OpenAPI specs" },
      { name: "REST APIs", icon: <FaPlug />, level: 92, colorClass: "purple", desc: "RESTful architecture, webhook triggers, authentication & payload schemas" },
      { name: "SQL", icon: <FaDatabase />, level: 86, colorClass: "blue", desc: "Relational database querying, schema design, indexes & ORM integration" },
      { name: "JSON", icon: <FaCode />, level: 96, colorClass: "emerald", desc: "Data serialization, schema validation & complex multi-nested structures" },
    ],
  },
  {
    category: "Version Control & Automation",
    skills: [
      { name: "Git", icon: <FaGitAlt />, level: 92, colorClass: "cyan", desc: "Branching strategies, conflict resolution, rebase & commit workflows" },
      { name: "GitHub", icon: <FaGithub />, level: 94, colorClass: "purple", desc: "Repository management, Actions CI/CD workflows & open-source collaboration" },
    ],
  },
];

function Skills() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredCategories = activeCategory === "All"
    ? skillsCategories
    : skillsCategories.filter(c => c.category === activeCategory);

  return (
    <section id="skills" className="skills-section">
      <div className="skills-container">

        {/* Section Header */}
        <div className="skills-header text-center">
          <div className="section-badge">TECHNICAL EXPERTISE</div>
          <h2 className="skills-title">
            Skills & <span className="text-gradient">Core Competencies</span>
          </h2>
          <p className="skills-subtitle">
            Specialized in AI engineering, Python architecture, autonomous workflows, and modern backend technologies.
          </p>

          {/* Category Filter Pills */}
          <div className="skills-filter-row">
            {["All", "AI & Autonomous Systems", "Backend & API Development", "Version Control & Automation"].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`skills-filter-pill ${activeCategory === cat ? "active" : ""}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Category Sections */}
        <div className="skills-categories-wrapper">
          {filteredCategories.map((catGroup, idx) => (
            <div key={idx} className="skills-category-group">
              <h3 className="category-group-title">
                <FaCheckCircle className="title-icon" /> {catGroup.category}
              </h3>

              <div className="skills-grid-new">
                {catGroup.skills.map((skill) => (
                  <div key={skill.name} className="skill-card-pro glass-panel">
                    <div className="scp-header">
                      <div className={`scp-icon-box ${skill.colorClass}`}>
                        {skill.icon}
                      </div>
                      <div className="scp-title-block">
                        <h4 className="scp-name">{skill.name}</h4>
                        <span className="scp-pct">{skill.level}%</span>
                      </div>
                    </div>

                    <p className="scp-desc">{skill.desc}</p>

                    {/* Progress Bar */}
                    <div className="scp-bar-track">
                      <div
                        className={`scp-bar-fill ${skill.colorClass}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Skills;
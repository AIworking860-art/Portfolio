import { FaBriefcase, FaCodeBranch, FaGraduationCap, FaRocket, FaLaptopCode } from "react-icons/fa";
import "./Experience.css";

const timelineData = [
  {
    id: 1,
    role: "AI & Python Developer (Freelance)",
    organization: "Global / Remote Clients",
    period: "2023 — Present",
    type: "Freelance",
    icon: <FaLaptopCode />,
    colorClass: "cyan",
    description:
      "Engineering autonomous Agentic AI tools, custom LLM RAG pipelines, Python backends, and n8n workflow automations for international startups and tech teams.",
    achievements: [
      "Built multi-agent AI automation workflows reducing manual client tasks by 80%+",
      "Developed high-throughput FastAPI & Python microservices with SQL vector stores",
      "Created n8n webhook pipelines connecting OpenAI, Telegram, PostgreSQL & Google Workspace",
    ],
  },
  {
    id: 2,
    role: "Agentic AI & GenAI Architect",
    organization: "Personal Projects & Open Source",
    period: "2022 — Present",
    type: "Open Source & R&D",
    icon: <FaRocket />,
    colorClass: "purple",
    description:
      "Architecting state-of-the-art multi-agent swarm platforms, RAG knowledge graph tools, and fine-tuned prompt engineering templates on GitHub.",
    achievements: [
      "Published open-source Python repositories for autonomous AI agents and prompt engineering",
      "Integrated real-time streaming LLM responses with custom vector databases",
      "Designed clean modular project structures for rapid enterprise deployment",
    ],
  },
  {
    id: 3,
    role: "Python Software Developer",
    organization: "Independent Development",
    period: "2021 — 2023",
    type: "Backend Engineering",
    icon: <FaCodeBranch />,
    colorClass: "emerald",
    description:
      "Mastered core Python architecture, REST API design, database schemas, object-oriented programming, and async event loops.",
    achievements: [
      "Built scalable web scrapers, data parsers, and custom API wrappers in Python",
      "Designed relational database schemas with SQLite, PostgreSQL & JSON data stores",
      "Implemented clean Git/GitHub workflows with standard CI/CD practices",
    ],
  },
];

function Experience() {
  return (
    <section id="experience" className="experience-section">
      <div className="experience-container">
        
        {/* Section Header */}
        <div className="experience-header text-center">
          <div className="section-badge">CAREER TIMELINE</div>
          <h2 className="experience-title">
            Professional <span className="text-gradient">Journey & Experience</span>
          </h2>
          <p className="experience-subtitle">
            A proven track record of engineering autonomous AI systems, Python backends, and high-impact software solutions.
          </p>
        </div>

        {/* Timeline Stream */}
        <div className="timeline-wrapper">
          <div className="timeline-line"></div>

          {timelineData.map((item, index) => (
            <div
              key={item.id}
              className={`timeline-item ${index % 2 === 0 ? "left" : "right"}`}
            >
              <div className="timeline-dot-container">
                <div className={`timeline-icon-box ${item.colorClass}`}>
                  {item.icon}
                </div>
              </div>

              <div className="timeline-content glass-panel">
                <div className="timeline-header-row">
                  <div>
                    <span className="timeline-type-pill">{item.type}</span>
                    <h3 className="timeline-role">{item.role}</h3>
                    <h4 className="timeline-org">{item.organization}</h4>
                  </div>
                  <span className="timeline-period">{item.period}</span>
                </div>

                <p className="timeline-desc">{item.description}</p>

                <ul className="timeline-achievements">
                  {item.achievements.map((ach, idx) => (
                    <li key={idx}>
                      <span className="bullet-dot">•</span>
                      <span>{ach}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Experience;

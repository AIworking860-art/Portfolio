import { FaTimes, FaFileDownload, FaEnvelope, FaWhatsapp, FaCheckCircle, FaUserTie } from "react-icons/fa";
import "./CVModal.css";

function CVModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Create printable CV summary / download
    const link = document.createElement("a");
    link.href = "mailto:hashir.muhmmad1427@gmail.com?subject=Request%20Official%20CV%20-%20Muhammad%20Hashir";
    link.target = "_blank";
    link.click();
  };

  return (
    <div className="cv-modal-backdrop" onClick={onClose}>
      <div className="cv-modal-card glass-panel" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="cv-modal-close" onClick={onClose} aria-label="Close CV Modal">
          <FaTimes />
        </button>

        {/* Modal Header */}
        <div className="cv-modal-header">
          <div className="cv-avatar-box">
            <FaUserTie />
          </div>
          <div>
            <div className="cv-status-badge">CURRICULUM VITAE</div>
            <h2 className="cv-name">Muhammad Hashir</h2>
            <p className="cv-role">AI & Python Developer | Agentic AI Specialist</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="cv-modal-body">
          <div className="cv-section-block">
            <h4><FaCheckCircle className="icon-emerald" /> Professional Profile</h4>
            <p>
              Specialized AI & Python Developer focused on building production-grade autonomous Agentic AI systems, 
              custom LLM applications, RAG pipelines, FastAPI backends, and enterprise n8n workflow automations.
            </p>
          </div>

          <div className="cv-section-block">
            <h4><FaCheckCircle className="icon-cyan" /> Core Expertise</h4>
            <div className="cv-skills-grid">
              <span>Python Architect</span>
              <span>Agentic AI & Multi-Agent</span>
              <span>Generative AI & LLMs</span>
              <span>n8n Workflow Automation</span>
              <span>FastAPI & REST APIs</span>
              <span>SQL & Vector Databases</span>
              <span>Git & GitHub CI/CD</span>
            </div>
          </div>

          <div className="cv-section-block">
            <h4><FaCheckCircle className="icon-purple" /> Contact & Availability</h4>
            <p className="text-xs text-textMuted">
              • Email: hashir.muhmmad1427@gmail.com<br />
              • WhatsApp: +92 308 0763337<br />
              • Location: Pakistan (Available for International Remote & Freelance Roles)
            </p>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="cv-modal-footer">
          <button onClick={handleDownload} className="btn-cv-download">
            <FaFileDownload />
            <span>Request Full PDF CV</span>
          </button>

          <a href="https://wa.me/923080763337" target="_blank" rel="noreferrer" className="btn-cv-whatsapp">
            <FaWhatsapp />
            <span>Chat via WhatsApp</span>
          </a>

          <button onClick={onClose} className="btn-cv-close">
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default CVModal;

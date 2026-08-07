import { Link } from "react-router-dom";
import { FaGithub, FaWhatsapp, FaEnvelope, FaArrowUp } from "react-icons/fa";
import "./Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-badge">MH</span>
              <span>Muhammad <span className="text-gradient">Hashir</span></span>
            </Link>
            <p className="footer-brand-desc">
              AI & Python Developer specializing in Agentic AI, Generative AI, Python Architecture, and n8n Workflow Automations.
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Quick Navigation</h4>
            <div className="footer-nav-grid">
              <Link to="/" className="footer-nav-item">Home</Link>
              <Link to="/about" className="footer-nav-item">About</Link>
              <Link to="/skills" className="footer-nav-item">Skills</Link>
              <Link to="/projects" className="footer-nav-item">Projects</Link>
              <Link to="/experience" className="footer-nav-item">Experience</Link>
              <Link to="/github" className="footer-nav-item">GitHub</Link>
              <Link to="/contact" className="footer-nav-item">Contact</Link>
            </div>
          </div>

          {/* Direct Social Links */}
          <div className="footer-links-group">
            <h4 className="footer-heading">Direct Connect</h4>
            <div className="footer-social-links">
              <a
                href="https://github.com/AIworking860-art"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-item"
              >
                <FaGithub />
                <span>GitHub Profile</span>
              </a>

              <a
                href="mailto:hashir.muhmmad1427@gmail.com"
                className="footer-social-item"
              >
                <FaEnvelope />
                <span>Email App</span>
              </a>

              <a
                href="https://wa.me/923080763337"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-item"
              >
                <FaWhatsapp />
                <span>WhatsApp Chat</span>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="copyright-text">
            © {new Date().getFullYear()} Muhammad Hashir. All Rights Reserved. Built with 3D UI Aesthetics.
          </p>

          <button onClick={scrollToTop} className="scroll-top-btn" title="Scroll to Top">
            <FaArrowUp />
          </button>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
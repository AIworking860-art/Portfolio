import { useState, useEffect } from "react";
import { FaGithub, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <a href="#home" className="navbar-logo">
          <span className="logo-badge">AI</span>
          <span className="logo-name">Muhammad<span className="logo-highlight">Hashir</span></span>
        </a>

        {/* Desktop Nav Links */}
        <nav className="navbar-links">
          <a href="#about" className="nav-link">About</a>
          <a href="#skills" className="nav-link">Skills</a>
          <a href="#projects" className="nav-link">Projects</a>
          <a href="#github" className="nav-link">GitHub</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>

        {/* Action Buttons */}
        <div className="navbar-actions">
          <a
            href="https://github.com/AIworking860-art"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-icon-btn github"
            title="GitHub Profile"
          >
            <FaGithub />
          </a>
          
          <a
            href="https://wa.me/923080763337"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-btn-whatsapp"
          >
            <FaWhatsapp />
            <span>Chat AI</span>
          </a>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a>
          <a href="#github" onClick={() => setMobileMenuOpen(false)}>GitHub</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          <div className="mobile-socials">
            <a href="https://github.com/AIworking860-art" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
            <a href="https://wa.me/923080763337" target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
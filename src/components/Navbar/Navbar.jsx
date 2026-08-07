import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaWhatsapp, FaBars, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLightMode, setIsLightMode] = useState(() => {
    return localStorage.getItem("portfolio_theme_mode") === "light";
  });

  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isLightMode) {
      document.body.classList.add("theme-light");
      localStorage.setItem("portfolio_theme_mode", "light");
    } else {
      document.body.classList.remove("theme-light");
      localStorage.setItem("portfolio_theme_mode", "dark");
    }
  }, [isLightMode]);

  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  const isCurrentPath = (path) => location.pathname === path;

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-badge">MH</span>
          <span className="logo-name">Muhammad<span className="logo-highlight">Hashir</span></span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar-links">
          <Link to="/" className={`nav-link ${isCurrentPath("/") ? "active" : ""}`}>Home</Link>
          <Link to="/about" className={`nav-link ${isCurrentPath("/about") ? "active" : ""}`}>About</Link>
          <Link to="/skills" className={`nav-link ${isCurrentPath("/skills") ? "active" : ""}`}>Skills</Link>
          <Link to="/projects" className={`nav-link ${location.pathname.startsWith("/projects") ? "active" : ""}`}>Projects</Link>
          <Link to="/experience" className={`nav-link ${isCurrentPath("/experience") ? "active" : ""}`}>Experience</Link>
          <Link to="/github" className={`nav-link ${isCurrentPath("/github") ? "active" : ""}`}>GitHub</Link>
          <Link to="/contact" className={`nav-link ${isCurrentPath("/contact") ? "active" : ""}`}>Contact</Link>
        </nav>

        {/* Action Buttons */}
        <div className="navbar-actions">
          {/* Light / Dark Mode Toggle */}
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            title={isLightMode ? "Switch to Dark Mode" : "Switch to Light Mode"}
            aria-label="Toggle Theme Mode"
          >
            {isLightMode ? <FaMoon className="text-amber-500" /> : <FaSun className="text-yellow-400" />}
          </button>

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
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link to="/skills" onClick={() => setMobileMenuOpen(false)}>Skills</Link>
          <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
          <Link to="/experience" onClick={() => setMobileMenuOpen(false)}>Experience</Link>
          <Link to="/github" onClick={() => setMobileMenuOpen(false)}>GitHub</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          <div className="mobile-socials">
            <button onClick={toggleTheme} className="mobile-theme-btn">
              {isLightMode ? <><FaMoon /> Dark Mode</> : <><FaSun /> Light Mode</>}
            </button>
            <a href="https://github.com/AIworking860-art" target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
            <a href="https://wa.me/923080763337" target="_blank" rel="noreferrer"><FaWhatsapp /> WhatsApp</a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
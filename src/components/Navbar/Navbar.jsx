import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaGithub, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Renders a nav link — scroll anchor on home, router link otherwise
  const NavLink = ({ href, to, children, onClick }) => {
    if (isHome && href) {
      return (
        <a href={href} className="nav-link" onClick={onClick}>
          {children}
        </a>
      );
    }
    return (
      <Link
        to={to || "/"}
        className={`nav-link ${pathname === to ? "active" : ""}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-badge">AI</span>
          <span className="logo-name">
            Muhammad<span className="logo-highlight">Hashir</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="navbar-links">
          <NavLink href="#about" to="/#about">About</NavLink>
          <NavLink href="#skills" to="/#skills">Skills</NavLink>
          <Link
            to="/projects"
            className={`nav-link ${pathname === "/projects" || pathname.startsWith("/projects/") ? "active" : ""}`}
          >
            Projects
          </Link>
          <NavLink href="#github" to="/#github">GitHub</NavLink>
          <NavLink href="#contact" to="/#contact">Contact</NavLink>
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
          {isHome ? (
            <>
              <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
              <a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a>
            </>
          ) : (
            <>
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
            </>
          )}
          <Link
            to="/projects"
            className={pathname === "/projects" || pathname.startsWith("/projects/") ? "active" : ""}
            onClick={() => setMobileMenuOpen(false)}
          >
            Projects
          </Link>
          {isHome && (
            <>
              <a href="#github" onClick={() => setMobileMenuOpen(false)}>GitHub</a>
              <a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            </>
          )}
          <div className="mobile-socials">
            <a href="https://github.com/AIworking860-art" target="_blank" rel="noreferrer">
              <FaGithub /> GitHub
            </a>
            <a href="https://wa.me/923080763337" target="_blank" rel="noreferrer">
              <FaWhatsapp /> WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
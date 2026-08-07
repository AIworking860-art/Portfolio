import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaGithub, FaBars, FaTimes, FaPalette, FaRobot, FaMicrochip, FaBook, FaFileAlt,
  FaTachometerAlt, FaAward, FaCertificate, FaStar, FaClock, FaChartLine, FaCog, FaStore, FaShieldAlt
} from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useAgent } from "../../context/AgentContext";
import "./Navbar.css";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { pathname } = useLocation();
  const { setIsCustomizerOpen, activeTheme } = useTheme();
  const { isExecuting } = useAgent();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-badge flex items-center gap-1">
            <FaRobot className="text-xs" /> OS
          </span>
          <span className="logo-name">
            Nexora<span className="logo-highlight">AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <nav className="navbar-links">
          <Link to="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>
            Home
          </Link>
          <Link to="/dashboard" className={`nav-link ${pathname === "/dashboard" ? "active" : ""}`}>
            Dashboard
          </Link>
          <Link to="/projects" className={`nav-link ${pathname.startsWith("/projects") ? "active" : ""}`}>
            Projects
          </Link>
          <Link to="/orchestrator" className={`nav-link ${pathname === "/orchestrator" ? "active" : ""}`}>
            Orchestrator
          </Link>
          <Link to="/blog" className={`nav-link ${pathname === "/blog" ? "active" : ""}`}>
            AI Blog
          </Link>

          {/* More Pages Dropdown */}
          <div className="relative group">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="nav-link flex items-center gap-1 py-2 text-textMuted hover:text-white"
            >
              <span>More Pages ▾</span>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 w-56 p-2 bg-[#0b0f19]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-xl space-y-1 text-xs">
                <Link to="/resume" className="flex items-center gap-2 p-2 rounded-xl text-textMuted hover:text-white hover:bg-white/10">
                  <FaFileAlt className="text-primary" /> Resume & CV
                </Link>
                <Link to="/skills" className="flex items-center gap-2 p-2 rounded-xl text-textMuted hover:text-white hover:bg-white/10">
                  <FaStar className="text-amber-400" /> Skills Matrix
                </Link>
                <Link to="/experience" className="flex items-center gap-2 p-2 rounded-xl text-textMuted hover:text-white hover:bg-white/10">
                  <FaTachometerAlt className="text-cyan-400" /> Experience
                </Link>
                <Link to="/certificates" className="flex items-center gap-2 p-2 rounded-xl text-textMuted hover:text-white hover:bg-white/10">
                  <FaCertificate className="text-emerald-400" /> Certificates
                </Link>
                <Link to="/achievements" className="flex items-center gap-2 p-2 rounded-xl text-textMuted hover:text-white hover:bg-white/10">
                  <FaAward className="text-purple-400" /> Achievements
                </Link>
                <Link to="/timeline" className="flex items-center gap-2 p-2 rounded-xl text-textMuted hover:text-white hover:bg-white/10">
                  <FaClock className="text-accent" /> Release Timeline
                </Link>
                <Link to="/analytics" className="flex items-center gap-2 p-2 rounded-xl text-textMuted hover:text-white hover:bg-white/10">
                  <FaChartLine className="text-primary" /> GitHub Analytics
                </Link>
                <Link to="/themes" className="flex items-center gap-2 p-2 rounded-xl text-textMuted hover:text-white hover:bg-white/10">
                  <FaStore className="text-amber-300" /> Theme Store
                </Link>
                <Link to="/settings" className="flex items-center gap-2 p-2 rounded-xl text-textMuted hover:text-white hover:bg-white/10">
                  <FaCog className="text-textMuted" /> Settings
                </Link>
                <Link to="/admin" className="flex items-center gap-2 p-2 rounded-xl text-rose-400 hover:bg-white/10">
                  <FaShieldAlt /> Admin OS Hub
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Action Controls */}
        <div className="navbar-actions">
          <button
            onClick={() => setIsCustomizerOpen(true)}
            className="px-3.5 py-1.5 rounded-xl bg-primary/20 text-primary border border-primary/30 text-xs font-bold flex items-center gap-2 hover:bg-primary hover:text-black transition-all"
          >
            <span className="text-base">{activeTheme.icon}</span>
            <span className="hidden sm:inline">{activeTheme.name}</span>
          </button>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
          <Link to="/projects" onClick={() => setMobileMenuOpen(false)}>Projects</Link>
          <Link to="/orchestrator" onClick={() => setMobileMenuOpen(false)}>Orchestrator</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>AI Blog</Link>
          <Link to="/resume" onClick={() => setMobileMenuOpen(false)}>Resume & CV</Link>
          <Link to="/skills" onClick={() => setMobileMenuOpen(false)}>Skills</Link>
          <Link to="/certificates" onClick={() => setMobileMenuOpen(false)}>Certificates</Link>
          <Link to="/analytics" onClick={() => setMobileMenuOpen(false)}>Analytics</Link>
          <Link to="/themes" onClick={() => setMobileMenuOpen(false)}>Theme Store</Link>
          <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>Admin OS Hub</Link>
        </div>
      )}
    </header>
  );
}

export default Navbar;
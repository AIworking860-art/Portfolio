import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import GitHubSection from "./components/GitHub/GitHubSection";

const Hero              = lazy(() => import("./components/Hero/Hero"));
const AboutPage         = lazy(() => import("./pages/AboutPage"));
const SkillsPage        = lazy(() => import("./pages/SkillsPage"));
const ProjectsPage      = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./components/Projects/ProjectDetailPage"));
const ExperiencePage    = lazy(() => import("./pages/ExperiencePage"));
const GitHubPage        = lazy(() => import("./pages/GitHubPage"));
const ContactPage       = lazy(() => import("./pages/ContactPage"));

// Home Page — Single Page Overview (All main sections stacked, except Projects grid which is on /projects)
function HomePage() {
  return (
    <>
      <Background />
      <Navbar />

      <Suspense fallback={<div className="section-loading">Loading Experience...</div>}>
        <Hero />
      </Suspense>

      <About />
      <Skills />
      <Experience />
      <GitHubSection />
      <Contact />
      <Footer />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<div className="section-loading">Loading...</div>}>
        <Routes>
          {/* Main Portfolio Home */}
          <Route path="/" element={<HomePage />} />

          {/* Dedicated Section Pages */}
          <Route path="/about" element={<AboutPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:repoName" element={<ProjectDetailPage />} />
          <Route path="/experience" element={<ExperiencePage />} />
          <Route path="/github" element={<GitHubPage />} />
          <Route path="/contact" element={<ContactPage />} />

          {/* Fallback Route — Redirect unknown paths to Home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
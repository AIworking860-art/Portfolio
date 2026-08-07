import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Experience from "./components/Experience/Experience";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import GitHubSection from "./components/GitHub/GitHubSection";

const Hero              = lazy(() => import("./components/Hero/Hero"));
const ProjectsPage      = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./components/Projects/ProjectDetailPage"));

// Home Page — Single Page Scroll (Projects removed from Home Page as requested!)
function HomePage() {
  return (
    <>
      <Background />
      <Navbar />

      <Suspense fallback={<div className="section-loading">Loading...</div>}>
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
          {/* Main Portfolio Home Page */}
          <Route path="/" element={<HomePage />} />

          {/* Dedicated Projects Catalog Page */}
          <Route path="/projects" element={<ProjectsPage />} />

          {/* Project Detail Page */}
          <Route path="/projects/:repoName" element={<ProjectDetailPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
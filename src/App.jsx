import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import GitHubSection from "./components/GitHub/GitHubSection";
import ProjectDetailPage from "./components/Projects/ProjectDetailPage";

const Hero     = lazy(() => import("./components/Hero/Hero"));
const Projects = lazy(() => import("./components/Projects/Projects"));

// Home Page — Single Page Scroll
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

      <Suspense fallback={<div className="section-loading">Loading Repositories...</div>}>
        <Projects />
      </Suspense>

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
          {/* Main Portfolio (Single Page Scroll) */}
          <Route path="/" element={<HomePage />} />

          {/* Project Detail Page */}
          <Route path="/projects/:repoName" element={<ProjectDetailPage />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
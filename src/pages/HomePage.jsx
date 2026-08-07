import { lazy, Suspense } from "react";
import Navbar from "../components/Navbar/Navbar";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import GitHubSection from "../components/GitHub/GitHubSection";
import OrchestratorPipeline from "../components/Orchestrator/OrchestratorPipeline";
import BlogSection from "../components/Blog/BlogSection";
import ResumeSection from "../components/Resume/ResumeSection";

const Hero = lazy(() => import("../components/Hero/Hero"));
const Projects = lazy(() => import("../components/Projects/Projects"));

function HomePage() {
  return (
    <>
      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Suspense fallback={<div className="section-loading">Loading 3D Experience...</div>}>
        <Hero />
      </Suspense>

      {/* Multi-Agent Orchestrator Pipeline Visualizer */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto" id="orchestrator">
        <OrchestratorPipeline />
      </section>

      {/* About Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Projects Showcase */}
      <Suspense fallback={<div className="section-loading">Loading Repositories...</div>}>
        <Projects />
      </Suspense>

      {/* AI Tech Publications */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto" id="blog">
        <BlogSection />
      </section>

      {/* Auto-Updating Resume */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto" id="resume">
        <ResumeSection />
      </section>

      {/* GitHub Profile Showcase Card */}
      <GitHubSection />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default HomePage;

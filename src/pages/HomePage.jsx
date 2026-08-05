import { lazy, Suspense } from "react";
import Background from "../components/Background/Background";
import Navbar from "../components/Navbar/Navbar";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";
import GitHubSection from "../components/GitHub/GitHubSection";

const Hero = lazy(() => import("../components/Hero/Hero"));
const Projects = lazy(() => import("../components/Projects/Projects"));

function HomePage() {
  return (
    <>
      {/* 3D WebGL Background Canvas & Glow Mesh */}
      <Background />

      {/* Floating Glass Navbar */}
      <Navbar />

      {/* Hero Section */}
      <Suspense fallback={<div className="section-loading">Loading 3D Experience...</div>}>
        <Hero />
      </Suspense>

      {/* About Me Section */}
      <About />

      {/* Skills Section */}
      <Skills />

      {/* Projects Preview Section (Real-time GitHub fetch, top 6) */}
      <Suspense fallback={<div className="section-loading">Loading Repositories...</div>}>
        <Projects />
      </Suspense>

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

import { lazy, Suspense } from "react";
import Background from "./components/Background/Background";
import Navbar from "./components/Navbar/Navbar";
import About from "./components/About/About";
import Skills from "./components/Skills/Skills";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import GitHubSection from "./components/GitHub/GitHubSection";

const Hero = lazy(() => import("./components/Hero/Hero"));
const Projects = lazy(() => import("./components/Projects/Projects"));

function App() {
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

      {/* Skills Section (Strictly 4 core skills) */}
      <Skills />

      {/* Projects Section (Real-time GitHub fetch) */}
      <Suspense fallback={<div className="section-loading">Loading Repositories...</div>}>
        <Projects />
      </Suspense>

      {/* GitHub Profile Showcase Card */}
      <GitHubSection />

      {/* Contact Section (Email, WhatsApp, GitHub) */}
      <Contact />

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
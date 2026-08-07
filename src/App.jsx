import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import { AgentProvider } from "./context/AgentContext";
import { SwarmProvider } from "./context/SwarmContext";
import ParticleCanvas from "./components/Background/ParticleCanvas";
import CustomCursor from "./components/Effects/CustomCursor";
import CustomizationStudio from "./components/Customization/CustomizationStudio";
import AIAssistantWidget from "./components/Assistant/AIAssistantWidget";
import PageLayout from "./components/Layout/PageLayout";

// Lazy-loaded pages
const HomePage = lazy(() => import("./pages/HomePage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));
const OrchestratorPage = lazy(() => import("./pages/OrchestratorPage"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ResumePage = lazy(() => import("./pages/ResumePage"));
const CertificatesPage = lazy(() => import("./pages/CertificatesPage"));
const AchievementsPage = lazy(() => import("./pages/AchievementsPage"));
const SkillsPage = lazy(() => import("./pages/SkillsPage"));
const ExperiencePage = lazy(() => import("./pages/ExperiencePage"));
const TimelinePage = lazy(() => import("./pages/TimelinePage"));
const AnalyticsPage = lazy(() => import("./pages/AnalyticsPage"));
const AssistantPage = lazy(() => import("./pages/AssistantPage"));
const SettingsPage = lazy(() => import("./pages/SettingsPage"));
const ThemeStorePage = lazy(() => import("./pages/ThemeStorePage"));
const AdminDashboardPage = lazy(() => import("./pages/AdminDashboardPage"));

const PageLoading = () => (
  <div className="page-full-loader">
    <div className="loader-ring"></div>
    <p>Loading Autonomous AI OS...</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <AgentProvider>
        <SwarmProvider>
          <HashRouter>
            {/* Dynamic Background Particle System */}
            <ParticleCanvas />

            {/* Interactive Glow Cursor */}
            <CustomCursor />

            {/* Profile Customization Drawer */}
            <CustomizationStudio />

            {/* Floating AI Assistant Chat Dock */}
            <AIAssistantWidget />

            <Suspense fallback={<PageLoading />}>
              <Routes>
                {/* 1. Landing Page */}
                <Route path="/" element={<HomePage />} />

                {/* 2. Dashboard */}
                <Route path="/dashboard" element={<PageLayout><DashboardPage /></PageLayout>} />

                {/* 3. Projects Catalog */}
                <Route path="/projects" element={<PageLayout><ProjectsPage /></PageLayout>} />

                {/* 4. Project Detail View */}
                <Route path="/projects/:repoName" element={<PageLayout><ProjectDetailPage /></PageLayout>} />

                {/* 5. Orchestrator Command Center */}
                <Route path="/orchestrator" element={<PageLayout><OrchestratorPage /></PageLayout>} />

                {/* 6. AI Blog */}
                <Route path="/blog" element={<PageLayout><BlogPage /></PageLayout>} />

                {/* 7. Resume & CV */}
                <Route path="/resume" element={<PageLayout><ResumePage /></PageLayout>} />
                <Route path="/cv" element={<PageLayout><ResumePage /></PageLayout>} />

                {/* 8. Certificates */}
                <Route path="/certificates" element={<PageLayout><CertificatesPage /></PageLayout>} />

                {/* 9. Achievements */}
                <Route path="/achievements" element={<PageLayout><AchievementsPage /></PageLayout>} />

                {/* 10. Skills */}
                <Route path="/skills" element={<PageLayout><SkillsPage /></PageLayout>} />

                {/* 11. Experience */}
                <Route path="/experience" element={<PageLayout><ExperiencePage /></PageLayout>} />

                {/* 12. Timeline */}
                <Route path="/timeline" element={<PageLayout><TimelinePage /></PageLayout>} />

                {/* 13. GitHub Analytics */}
                <Route path="/analytics" element={<PageLayout><AnalyticsPage /></PageLayout>} />

                {/* 14. Full-Page AI Assistant */}
                <Route path="/assistant" element={<PageLayout><AssistantPage /></PageLayout>} />

                {/* 15. Settings */}
                <Route path="/settings" element={<PageLayout><SettingsPage /></PageLayout>} />

                {/* 16. Theme Store */}
                <Route path="/themes" element={<PageLayout><ThemeStorePage /></PageLayout>} />

                {/* 17. Admin Dashboard */}
                <Route path="/admin" element={<PageLayout><AdminDashboardPage /></PageLayout>} />
              </Routes>
            </Suspense>
          </HashRouter>
        </SwarmProvider>
      </AgentProvider>
    </ThemeProvider>
  );
}

export default App;
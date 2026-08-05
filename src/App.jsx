import { lazy, Suspense } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/Layout/PageLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetailPage"));

const PageLoading = () => (
  <div className="page-full-loader">
    <div className="loader-ring"></div>
    <p>Loading...</p>
  </div>
);

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<PageLoading />}>
        <Routes>
          {/* Home — single-page layout with all sections */}
          <Route path="/" element={<HomePage />} />

          {/* Dedicated full projects listing page */}
          <Route
            path="/projects"
            element={
              <PageLayout>
                <ProjectsPage />
              </PageLayout>
            }
          />

          {/* Individual project detail page */}
          <Route
            path="/projects/:repoName"
            element={
              <PageLayout>
                <ProjectDetailPage />
              </PageLayout>
            }
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
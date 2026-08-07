import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import GitHubSection from "../components/GitHub/GitHubSection";
import Footer from "../components/Footer/Footer";

function GitHubPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "6rem", minHeight: "80vh" }}>
        <GitHubSection />
      </div>
      <Footer />
    </>
  );
}

export default GitHubPage;

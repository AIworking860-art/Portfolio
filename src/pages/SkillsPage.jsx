import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Skills from "../components/Skills/Skills";
import Footer from "../components/Footer/Footer";

function SkillsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "4rem", minHeight: "80vh" }}>
        <Skills />
      </div>
      <Footer />
    </>
  );
}

export default SkillsPage;

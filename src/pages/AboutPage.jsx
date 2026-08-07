import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import About from "../components/About/About";
import Footer from "../components/Footer/Footer";

function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "4rem", minHeight: "80vh" }}>
        <About />
      </div>
      <Footer />
    </>
  );
}

export default AboutPage;

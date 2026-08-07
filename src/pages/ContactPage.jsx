import { useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ paddingTop: "4rem", minHeight: "80vh" }}>
        <Contact />
      </div>
      <Footer />
    </>
  );
}

export default ContactPage;

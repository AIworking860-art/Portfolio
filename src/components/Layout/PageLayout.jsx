import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Background from "../Background/Background";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

/**
 * Shared layout wrapper for sub-pages (Projects, Detail).
 * Includes: Background, Navbar, scroll-to-top on route change, Footer.
 */
function PageLayout({ children }) {
  const { pathname } = useLocation();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return (
    <>
      <Background />
      <Navbar />
      <main className="page-layout-main">{children}</main>
      <Footer />
    </>
  );
}

export default PageLayout;

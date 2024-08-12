import React, { useEffect, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Loading from "./components/loading/Loading";
import PageTitle from "./components/page-title/PageTitle";
import VantaBackground from "./components/vanta-background/VantaBackground";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import Contact from "./pages/contact/Contact";
import CV from "./pages/cv/CV";
import Home from "./pages/home/Home";
import Portfolio from "./pages/portfolio/Portfolio";

function PageTitleWrapper() {
  const location = useLocation();
  let pageName = "Home";

  switch (location.pathname) {
    case "/cv":
      pageName = "CV";
      break;
    case "/portfolio":
      pageName = "Portfolio";
      break;
    case "/contact":
      pageName = "Contact";
      break;
    default:
      pageName = "Home";
  }

  return <PageTitle pageName={pageName} />;
}

function PageWrapper() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // Show loading indicator
    const timer = setTimeout(() => setLoading(false), 500); // Adjust time as needed

    return () => clearTimeout(timer); // Clean up timer
  }, [location.pathname]); 
  return (
    <>
      {loading && <Loading />}
      <PageTitleWrapper />
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300}>
          <div className="page-content">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </CSSTransition>
      </TransitionGroup>
    </>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        {/* <VantaBackground /> */}
        <Navbar />
        <div className="page-container">
          <PageWrapper />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

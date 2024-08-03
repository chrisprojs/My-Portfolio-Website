import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import Navbar from "./navbar/Navbar";
import Home from "./pages/home/Home";
import CV from "./pages/cv/CV";
import Portfolio from "./pages/portfolio/Portfolio";
import Contact from "./pages/contact/Contact";
import Footer from "./footer/Footer";
import PageTitle from "./components/page-title/PageTitle";
import VantaBackground from "./components/vanta-background/VantaBackground";

function App() {
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
    const location = useLocation();
    return (
      <>
        <PageTitleWrapper />
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location}>
              <Route path="/" element={<Home />} />
              <Route path="/cv" element={<CV />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </>
    );
  }

  return (
    <Router>
      <div className="app-container">
        <VantaBackground />
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

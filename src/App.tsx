import React, { useEffect, useMemo, useState } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useLocation,
} from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import Loading from "./components/loading/Loading";
// import VantaBackground from "./components/vanta-background/VantaBackground";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import Contact from "./pages/contact/Contact";
import CV from "./pages/cv/CV";
import Home from "./pages/home/Home";
import Portfolio from "./pages/portfolio/Portfolio";

function PageWrapper() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const nodeRef = useMemo(() => React.createRef<HTMLDivElement>(), [location.key]);

  useEffect(() => {
    setLoading(true); // Show loading indicator
    const timer = setTimeout(() => setLoading(false), 500); // Adjust time as needed

    return () => clearTimeout(timer); // Clean up timer
  }, [location.pathname]); 
  return (
    <>
      {loading && <Loading />}
      <TransitionGroup>
        <CSSTransition key={location.key} classNames="fade" timeout={300} nodeRef={nodeRef}>
          <div ref={nodeRef} className="page-content">
            <Routes location={location}>
              <Route path="/" element={<Home />} />
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

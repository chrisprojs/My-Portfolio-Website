import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isClicked, setClicked] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = (sectionId:any) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Set an offset of, for example, 50px above the section
      const offset = 80;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = sectionPosition - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  useEffect(() => {
    const sections = ["mainSection", "projectSection", "aboutSection", "serviceSection"];
    const options = { root: null, rootMargin: "0px", threshold: 0.4 }; // Adjust threshold as needed

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <nav className="navbar-bg">
      <div className="navbar-box">
        <div className="navbar-logo">
          <p className="navbar-logo-text">Christian Antonius Anggaresta.</p>
        </div>
        <ul className={`navbar-menu ${isClicked ? "active" : ""}`}>
          <li className="navbar-link">
            <p
              className={`navbar-link ${activeSection === "mainSection" ? "active" : ""}`}
              onClick={() => handleScroll('mainSection')}
            >
              Main
            </p>
          </li>
          <li className="navbar-link">
            <p
              className={`navbar-link ${activeSection === "projectSection" ? "active" : ""}`}
              onClick={() => handleScroll('projectSection')}
            >
              Project
            </p>
          </li>
          <li className="navbar-link">
            <p
              className={`navbar-link ${activeSection === "aboutSection" ? "active" : ""}`}
              onClick={() => handleScroll('aboutSection')}
            >
              About
            </p>
          </li>
          <li className="navbar-link">
            <p
              className={`navbar-link ${activeSection === "serviceSection" ? "active" : ""}`}
              onClick={() => handleScroll('serviceSection')}
            >
              Service
            </p>
          </li>
        </ul>
        <div className="menu-icon" onClick={() => setClicked(!isClicked)}>
          <i className={`fa ${isClicked ? "fa-times" : "fa-bars"}`} />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

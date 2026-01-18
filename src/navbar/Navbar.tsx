import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isClicked, setClicked] = useState(false);
  const [activeSection, setActiveSection] = useState("mainSection");

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

  const sections = [
    { id: "mainSection", offset: 0 },
    { id: "projectSection", offset: 0 },
    { id: "aboutSection", offset: 0 },
    { id: "serviceSection", offset: 0 },
  ];

  useEffect(() => {
    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 100; // Adjust this offset as needed
      let currentSection = "";

      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (section) {
          let sectionTop = section.offsetTop - 100;
          const sectionHeight = section.offsetHeight;

          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            currentSection = id;
          }
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", updateActiveSection);
    return () => window.removeEventListener("scroll", updateActiveSection);
  }, [sections]);

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

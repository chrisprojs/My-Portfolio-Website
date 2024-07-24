import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isClicked, setClicked] = useState(false);
  const location = useLocation(); // Get current location

  return (
    <nav className="navbar-bg">
      <div className="navbar-box">
        <div className="navbar-logo">
          <p className="navbar-logo-text">Christian Antonius Anggaresta.</p>
        </div>
        <ul className={`navbar-menu ${isClicked ? "active" : ""}`}>
          <li className="navbar-link">
            <Link
              to="/"
              className={`navbar-link  ${
                location.pathname === "/" ? "active" : ""
              }`}
              onClick={() => setClicked(!isClicked)}
            >
              Home
            </Link>
          </li>
          <li className="navbar-link">
            <Link
              to="/cv"
              className={`navbar-link  ${
                location.pathname === "/cv" ? "active" : ""
              }`}
              onClick={() => setClicked(!isClicked)}
            >
              CV
            </Link>
          </li>
          <li className="navbar-link">
            <Link
              to="/portfolio"
              className={`navbar-link  ${
                location.pathname === "/portfolio" ? "active" : ""
              }`}
              onClick={() => setClicked(!isClicked)}
            >
              Portfolio
            </Link>
          </li>
          <li className="navbar-link">
            <Link
              to="/contact"
              className={`navbar-link  ${
                location.pathname === "/contact" ? "active" : ""
              }`}
              onClick={() => setClicked(!isClicked)}
            >
              Contact
            </Link>
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

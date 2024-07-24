import React from "react";
import "./Footer.css";
import { PersonalInformation, formatPhoneNumber } from "../PersonalInformation";

function Footer() {

  return (
    <div className="footer">
      <div className="footer-box">
        <p>Contact Me:</p>
        <div className="footer-icon-box">
          <div className="footer-contact-column">
            <a href={PersonalInformation.instagramLink} className="icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href={PersonalInformation.linkedinLink} className="icon">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
          <div className="footer-contact-column footer-icon-text-box">
            <a
              href={`mailto:${PersonalInformation.emailLink}`}
              className="icon"
            >
              <p className="footer-icon-text">
                {PersonalInformation.emailLink}
              </p>
            </a>
          </div>
          <div className="footer-contact-column footer-icon-text-box">
            <a
              href={`tel:${PersonalInformation.phoneNumber}`}
              className="icon"
            >
              <p className="footer-icon-text">
                {formatPhoneNumber(PersonalInformation.phoneNumber)}
              </p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

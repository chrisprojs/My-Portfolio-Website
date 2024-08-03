import React from "react";
import "./Contact.css";
import {
  PersonalInformation,
  formatPhoneNumber,
} from "../../PersonalInformation";
import chipiChapaCat from "./../../asset/chipi-chapa-cat.gif";

function Contact() {
  return (
    <div className="contact-container">
      <div className="contact-info">
        <div>
          <a
            href={PersonalInformation.instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-link"
          >
            <i className="fab fa-instagram"></i> @chris88xyz
          </a>
        </div>
        <div>
          <a
            href={PersonalInformation.linkedinLink}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-info-link"
          >
            <i className="fab fa-linkedin"></i> Christian Antonius Anggaresta
          </a>
        </div>
        <div>
          <a href={`mailto:${PersonalInformation.emailLink}`} className="contact-info-link"><i className="fas fa-envelope"></i> {PersonalInformation.emailLink}</a>
        </div>
        <div>
          <a href={`tel:${PersonalInformation.phoneNumber}`} className="contact-info-link">
          <i className="fas fa-phone"></i> {formatPhoneNumber(PersonalInformation.phoneNumber)}
          </a>
        </div>
        <a
              href="mailto:christiananggaresta20@gmail.com"
              className="contact-button-offer-job"
            >
              {/* play ./asset/dubidubidu.mp3 when hovering the button */}
              <img src={chipiChapaCat} alt="chipi-chapa-cat" className="section-1-gif" />
              Offer Job
              <img src={chipiChapaCat} alt="chipi-chapa-cat" className="section-1-gif" />
            </a>
      </div>
    </div>
  );
}

export default Contact;

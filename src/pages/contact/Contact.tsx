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
      <div className="contact-box">
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
            <a
              href={PersonalInformation.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-link"
            >
              <i className="fab fa-github"></i> chrisprojs
            </a>
          </div>
          <div>
            <a
              href={PersonalInformation.youtubeLink}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-info-link"
            >
              <i className="fab fa-youtube"></i> Christian Antonius Anggaresta
            </a>
          </div>
          <div>
            <a
              href={`mailto:${PersonalInformation.emailLink}`}
              className="contact-info-link"
            >
              <i className="fas fa-envelope"></i>{" "}
              {PersonalInformation.emailLink}
            </a>
          </div>
          <div>
            <a
              href={`tel:${PersonalInformation.phoneNumber}`}
              className="contact-info-link"
            >
              <i className="fas fa-phone"></i>{" "}
              {formatPhoneNumber(PersonalInformation.phoneNumber)}
            </a>
          </div>
        </div>

        <a
          href="mailto:christiananggaresta20@gmail.com"
          className="contact-button-offer-job"
        >
          {/* play ./asset/dubidubidu.mp3 when hovering the button */}
          <img
            src={chipiChapaCat}
            alt="chipi-chapa-cat"
            className="contact-gif"
          />
          Offer Job
          <img
            src={chipiChapaCat}
            alt="chipi-chapa-cat"
            className="contact-gif"
          />
        </a>
      </div>
    </div>
  );
}

export default Contact;

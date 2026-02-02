import React, { useState, useEffect, useRef } from "react";
import html2pdf from "html2pdf.js";
import "./CV.css";
import {
  PersonalInformation,
  formatPhoneNumber,
} from "../../PersonalInformation";
import { Link } from "react-router-dom";
import { WorkExperienceList } from "./WorkExperienceList";
import { EducationList } from "./EducationList";
import { VolunteerExperienceList } from "./VolunteerExperienceList";
import { SkillList } from "./SkillList";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useCVContext } from "../../context/CV-to-CVBox";

const textPreprocessing = (str: string) => {
  return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, "").toLowerCase();
};

function CV() {
  const { isOpened }:any = useCVContext()
  const [isScrollable, setIsScrollable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pdfRef = useRef<HTMLDivElement | null>(null);

  const toggleScrollView = () => {
    setIsScrollable(!isScrollable);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const strippedSearchQuery = textPreprocessing(searchQuery);

  const filteredSkills = SkillList.filter((skill) => {
    const skillName = textPreprocessing(skill.skill);
    const skillDetails = textPreprocessing(skill.details);
    return (
      skillName.toLowerCase().includes(strippedSearchQuery) ||
      skillDetails.toLowerCase().includes(strippedSearchQuery)
    );
  });

  function downloadPdf() {
      let jsPdf = new jsPDF('p', 'pt', 'a4');
      var htmlElement = pdfRef.current; // Reference to the HTML content

      if (!htmlElement) {
        console.error("pdfRef is null");
        return;
      }

      const fixedWidth = 728; // Set your desired fixed width here

      // Clone the element and apply fixed width
      const clonedElement = htmlElement.cloneNode(true) as HTMLElement; // Cast to HTMLElement
      clonedElement.style.width = `${fixedWidth}px`; // Set the fixed width
      clonedElement.style.overflow = 'visible'; // Ensure no overflow
      clonedElement.querySelectorAll('.cv-contact-info a').forEach(el => {
          el.setAttribute('target', '_blank'); // Ensure links open in a new tab
      });
      clonedElement.querySelectorAll<HTMLElement>(".cv-container a, .cv-container p, .cv-container li, .cv-container span").forEach((el) => {
        el.style.fontSize = "0.8rem";
      });
      clonedElement.querySelectorAll<HTMLElement>(".cv-container").forEach((el) => {
        el.style.padding = "40px";
      });
      clonedElement.querySelectorAll<HTMLElement>(".cv-header h1").forEach((el) => {
        el.style.fontSize = "1.2rem";
      });

      document.body.appendChild(clonedElement);

      const opt = {
          callback: function (jsPdf:any) {
              jsPdf.save("Christian_Antonius_Anggaresta_CV.pdf");
          },
          margin: [8, 8, 8, 8],
          autoPaging: "text" as unknown as boolean | "text" | "slice",
          html2canvas: {
              useCors: true,
              allowTaint: true,
              letterRendering: true,
              logging: false,
              scale: 0.8,
              onclone: (clonedDoc:any) => {
                clonedDoc.querySelectorAll(".scrollable").forEach((element:any) => {
                  element.classList.remove("scrollable");
                });

                // Array.from(clonedDoc.styleSheets).forEach((sheet) => {
                //   try {
                //     if ((sheet as CSSStyleSheet).cssRules) {
                //       for (let j = (sheet as CSSStyleSheet).cssRules.length - 1; j >= 0; j--) {
                //         const rule = (sheet as CSSStyleSheet).cssRules[j];
                //         if (rule instanceof CSSMediaRule && rule.media.mediaText === "(max-width: 768px)") {
                //           (sheet as CSSStyleSheet).deleteRule(j); // Remove the media query rules
                //         }
                //       }
                //     }
                //   } catch (error) {
                //     console.warn("Could not access stylesheet rules:", error);
                //   }
                // });
              }
          }
      };

      jsPdf.html(clonedElement, opt);
      document.body.removeChild(clonedElement);
  }

  return (
    <>
      <div className="slider-container"
          style={{
            visibility: `${isOpened ? 'visible' : 'hidden'}`,
            opacity: `${isOpened ? '100%' : '0'}`
          }}
        >
        <p className="slider-text">Scroll Mode</p>
        <label className="switch">
          <input
            type="checkbox"
            checked={isScrollable}
            onChange={toggleScrollView}
          />
          <span className="slider"></span>
        </label>
      </div>
      <div className="download-container"
        style={{
          visibility: `${isOpened ? 'visible' : 'hidden'}`,
          opacity: `${isOpened ? '100%' : '0'}`
        }}
        onClick={downloadPdf}>
        <div className="download-button">
          <i className="fas fa-download"></i>
        </div>
      </div>
      <div id="cv-content" className="cv-container" ref={pdfRef}>
        <div className="cv-header">
          <h1>Christian Antonius Anggaresta</h1>
          <p>Software Engineer</p>
          <p>Jakarta, Indonesia</p>
          <p className="cv-contact-info">
            <span>
              <a href={`tel:${PersonalInformation.phoneNumber}`} target="_blank" rel="noreferrer">
                {formatPhoneNumber(PersonalInformation.phoneNumber)}
              </a>{" "}
              |{" "}
              <a href={`mailto:${PersonalInformation.emailLink}`} target="_blank" rel="noreferrer">
                {PersonalInformation.emailLink}
              </a>{" "}
            </span>
            <br></br>
            <span>
              LinkedIn:{" "}
              <a href={PersonalInformation.linkedinLink} target="_blank" rel="noreferrer">
                {PersonalInformation.linkedinLink}
              </a>
            </span>{" "}
            <br></br>
            <span>
              Portfolio:{" "}
              <a href="https://christian-antonius-portfolio.netlify.app" target="_blank" rel="noreferrer">https://christian-antonius-portfolio.netlify.app</a>
            </span>
          </p>
        </div>

        <div className="cv-section">
          <h2>Work Experience</h2>
          <div className={isScrollable ? "scrollable" : ""}>
            {WorkExperienceList.map((work, index) => (
              <div key={index} className="cv-subsection">
                <h3 className="cv-subsection-h3">{work.company}</h3>
                <p className="cv-subsection-p">{work.position}</p>
                <p className="cv-subsection-p">{work.duration}</p>
                <ul className="cv-subsection-ul">
                  {work.responsibilities.map((resp, idx) => (
                    <li key={idx} className="cv-skills-li">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-section">
          <h2>Research Experience</h2>
          <div className={isScrollable ? "scrollable" : ""}>
            <div className="cv-subsection">
              <h3 className="cv-subsection-h3">DEVELOPING MARKETPLACE WEBSITE FOR BUYING AND SELLING FRANCHISE BUSINESS</h3>
              <p className="cv-subsection-p">Software Engineer</p>
              <p className="cv-subsection-p">February 2025 - January 2026</p>
              <ul className="cv-subsection-ul">
                <li className="cv-skills-li">
                Engineered an advanced search system leveraging LLM Embedded Text and Image Vector Search using Elasticsearch, maintaining a consistent 130ms average latency across complex multi-parameter queries.
                </li>
                <li className="cv-skills-li">
                Implemented Google Maps API to map existing franchise locations across the region in Indonesia, improving geospatial data visualization.
                </li>
                <li className="cv-skills-li">
                Integrated the Midtrans payment gateway to streamline transactions, ensuring secure and efficient payment processing.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="cv-section">
          <h2>Education</h2>
          <div className={isScrollable ? "scrollable" : ""}>
            {EducationList.map((education, index) => (
              <div key={index} className="cv-subsection">
                <h3 className="cv-subsection-h3">{education.institution}</h3>
                <p className="cv-subsection-p">{education.degree}</p>
                <p className="cv-subsection-p">{education.duration}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-section">
          <h2>Volunteer Experience</h2>
          <div className={isScrollable ? "scrollable" : ""}>
            {VolunteerExperienceList.map((volunteer, index) => (
              <div key={index} className="cv-subsection">
                <h3 className="cv-subsection-h3">{volunteer.organization}</h3>
                <p className="cv-subsection-p">{volunteer.position}</p>
                <p className="cv-subsection-p">{volunteer.duration}</p>
                <ul className="cv-subsection-ul">
                  {volunteer.responsibilities.map((resp, idx) => (
                    <li key={idx} className="cv-skills-li">
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="cv-section">
          <h2 className="cv-section-input">
            Skills
            <input
              type="text"
              className="search-input"
              placeholder="Search Skills..."
              value={searchQuery}
              onChange={handleSearch}
              data-html2canvas-ignore
            />
          </h2>
          <ul
            className={`cv-subsection-ul ${isScrollable ? "scrollable" : ""}`}
          >
            {filteredSkills.map((skill, index) => (
              <li key={index} className="cv-skills-li">
                <span className="cv-skills-span">{skill.skill}</span><span>: {skill.details}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CV;

import React, { useState, useEffect } from "react";
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
import htmlDocx from 'html-docx-js';
import { saveAs } from 'file-saver';

const textPreprocessing = (str: string) => {
  return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()\s]/g, "").toLowerCase();
};

function CV() {
  const [isScrollable, setIsScrollable] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const downloadCV = () => {
    const cvContent = document.getElementById("cv-content");
    const scrollableSections = document.querySelectorAll(".scrollable");
    const sectionInput = document.querySelector(".search-input");

    if(isScrollable){
      toggleScrollView();
    }

    if (cvContent) {
      // Temporarily hide scrollbars and section input
      scrollableSections.forEach((section) =>
        section.classList.add("hide-scrollbar")
      );
      if (sectionInput) {
        sectionInput.classList.add("hide-input");
      }

      // Define HTML2PDF options
      const options = {
        margin: [0.5, 0.5],
        filename: "Christian-Antonius-Anggaresta-CV.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: false },
        jsPDF: {
          unit: "in",
          format: "a4",
          orientation: "portrait",
        },
      };

      html2pdf(cvContent, options).then(() => {
          // Revert the visibility changes after saving
          scrollableSections.forEach((section) =>
            section.classList.remove("hide-scrollbar")
          );
          if (sectionInput) {
            sectionInput.classList.remove("hide-input");
          }
        });
    }
  };

  function downloadDocx() {
    const cvContentElement = document.getElementById("cv-content");

    // Check if cvContentElement exists
    if (cvContentElement) {
        const cvContent = cvContentElement.innerHTML;
        const docxContent = htmlDocx.asBlob(cvContent);
        saveAs(docxContent, 'Christian-Antonius-Anggaresta-CV.docx');
    }
  }

  return (
    <>
      <div className="slider-container">
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
      <div className="download-container" onClick={downloadDocx}>
        <div className="download-button">
          <i className="fas fa-download"></i>
        </div>
      </div>
      <div id="cv-content" className="cv-container">
        <div className="cv-header">
          <h1>Christian Antonius Anggaresta</h1>
          <p>Software Engineer</p>
          <p>Jakarta, Indonesia</p>
          <p>
            <a href={`tel:${PersonalInformation.phoneNumber}`}>
              {formatPhoneNumber(PersonalInformation.phoneNumber)}
            </a>{" "}
            |{" "}
            <a href={`mailto:${PersonalInformation.emailLink}`}>
              {PersonalInformation.emailLink}
            </a>
          </p>
          <p>
            LinkedIn:{" "}
            <a href={PersonalInformation.linkedinLink}>
              Christian Antonius Anggaresta
            </a>
          </p>
          <p>
            Portfolio:{" "}
            <Link to="/portfolio">chris-software-developer-portfolio</Link>
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
            />
          </h2>
          <ul
            className={`cv-subsection-ul ${isScrollable ? "scrollable" : ""}`}
          >
            {filteredSkills.map((skill, index) => (
              <li key={index} className="cv-skills-li">
                <span className="cv-skills-p">{skill.skill}</span>:{" "}
                {skill.details}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default CV;

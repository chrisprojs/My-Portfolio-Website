import React, { useState, useEffect } from "react";
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

  const filteredSkills = 
    SkillList.filter((skill) => {
        const skillName = textPreprocessing(skill.skill);
        const skillDetails = textPreprocessing(skill.details);
        return skillName.toLowerCase().includes(strippedSearchQuery) || skillDetails.toLowerCase().includes(strippedSearchQuery)
    });

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
      <div className="cv-container">
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
          <h2 className="cv-section-input">Skills<input
              type="text"
              className="search-input"
              placeholder="Search Skills..."
              value={searchQuery}
              onChange={handleSearch}
            /></h2>
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

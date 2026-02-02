import React from 'react';
import './WorkExperienceCard.css';

interface WorkExperience {
  company: string;
  position: string;
  duration: string;
  responsibilities: string[];
}

interface WorkExperienceCardProps {
  experience: WorkExperience;
}

function WorkExperienceCard({ experience }: WorkExperienceCardProps) {
  const getLogoPath = (company: string) => {
    const logoMap: { [key: string]: any } = {
      'Moladin': require('../../../asset/work-experience-logo/moladin.jpeg'),
      '99 Group': require('../../../asset/work-experience-logo/99 group.jpeg'),
      'Bina Nusantara IT Division': require('../../../asset/work-experience-logo/bina nusantara it division.jpeg')
    };
    return logoMap[company] || '';
  };

  return (
    <div className="work-experience-card">
      <div className="work-experience-info-box">
        <div className="work-experience-logo-container">
          <img 
            src={getLogoPath(experience.company)} 
            alt={`${experience.company} logo`}
            className="work-experience-logo"
          />
        </div>
        <div className="work-experience-info">
          <h3 className="work-experience-company">{experience.company}</h3>
          <p className="work-experience-position">{experience.position}</p>
          <p className="work-experience-duration">{experience.duration}</p>
        </div>
      </div>
      <div className="work-experience-responsibilities-box">
        <ul className="work-experience-responsibilities">
          {experience.responsibilities.map((responsibility, index) => (
            <li key={index}>{responsibility}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default WorkExperienceCard;

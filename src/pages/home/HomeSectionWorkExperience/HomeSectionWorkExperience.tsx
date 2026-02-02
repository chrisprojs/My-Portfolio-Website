import React from 'react'
import './HomeSectionWorkExperience.css';
import { WorkExperienceList } from '../../cv/WorkExperienceList';
import WorkExperienceCard from './WorkExperienceCard';

function HomeSectionWorkExperience() {
  return (
    <section id='workExperienceSection' className="section-container">
      <div className='section-head'>
        <p className="section-header">Work Experience</p>
      </div>
      <div className="work-experience-container">
        {WorkExperienceList.map((experience, index) => (
          <WorkExperienceCard key={index} experience={experience} />
        ))}
      </div>
    </section>
  )
}

export default HomeSectionWorkExperience
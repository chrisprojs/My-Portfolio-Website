import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../portfolio/PortfolioAPI';
import { Project } from '../../portfolio/PortfolioInterface';
import './HomeSectionProject.css';
import Portfolio from '../../portfolio/Portfolio';

function HomeSectionProject() {
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <section id='projectSection' className="section-container">
      <div className='section-head'>
        <p className="section-header">My Projects</p>
      </div>
      <div className={`section-project-collapse ${isProjectsExpanded ? 'expanded' : ''}`}>
        <Portfolio projects={projects} loading={loading}/>
      </div>
      <button
        type="button"
        className="section-project-toggle"
        aria-expanded={isProjectsExpanded}
        onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
      >
        {isProjectsExpanded ? 'Show Less' : 'Show All Projects'}
      </button>
    </section>
  );
}

export default HomeSectionProject;

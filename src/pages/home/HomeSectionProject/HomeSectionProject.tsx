import React, { useEffect, useState } from 'react';
import { getAllProjects } from '../../portfolio/PortfolioAPI';
import { Project } from '../../portfolio/PortfolioInterface';
import './HomeSectionProject.css';
import SlideProject from './SlideProject';
import Portfolio from '../../portfolio/Portfolio';

function HomeSectionProject() {
  const [isGrid, setIsGrid] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
      setLoading(false);
    };
    if (loading) {
      fetchProjects();
    }
  },[]);

  return (
    <section id='projectSection' className="section-container">
      <div className='section-head'>
        <p className="section-header">My Project</p>
        <div className={`section-project-grid ${isGrid ? 'active' : ''}`} onClick={() => setIsGrid(!isGrid)}><i className="fa-solid fa-grid-2"></i></div>
      </div>
      {isGrid ? <Portfolio projects={projects} loading={loading}/> : <SlideProject projects={projects} loading={loading}/>}
    </section>
  );
}

export default HomeSectionProject;
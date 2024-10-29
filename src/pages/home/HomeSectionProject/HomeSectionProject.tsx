import React, { useEffect, useRef, useState } from 'react';
import debounce from 'lodash/debounce';
import PortfolioCard from '../../../components/portfolio card/PortfolioCard';
import PortfolioModal from '../../../components/portfolio modal/PortfolioModal';
import PortfolioSkeletonCard from '../../../components/portfolio card/PortfolioSkeletonCard';
import { getAllProjects } from '../../portfolio/PortfolioAPI';
import { Project } from '../../portfolio/PortfolioInterface';
import './HomeSectionProject.css';
import Slider from 'react-slick';
import SlideProject from './SlideProject';
import Portfolio from '../../portfolio/Portfolio';

function HomeSectionProject() {
  const [isGrid, setIsGrid] = useState(false);

  return (
    <section id='projectSection' className="section-project">
      <div className='section-project-head'>
        <p className="section-project-header">My Project</p>
        <div className={`section-project-grid ${isGrid ? 'active' : ''}`} onClick={() => setIsGrid(!isGrid)}><i className="fa-solid fa-grid-2"></i></div>
      </div>
      {isGrid ? <Portfolio/> : <SlideProject/>}
    </section>
  );
}

export default HomeSectionProject;
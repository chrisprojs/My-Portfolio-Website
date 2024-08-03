import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Portfolio.css';
import PortfolioCard from './portfolio card/PortfolioCard';
import { getAllProjects } from './PortfolioAPI';
import PortfolioModal from './portfolio modal/PortfolioModal';
import { Project } from './PortfolioInterface';
import PortfolioSkeletonCard from './portfolio card/PortfolioSkeletonCard';
import AdComponent1 from '../../components/ad-component/AdComponent1';

function Portfolio() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [adPositions, setAdPositions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
      setLoading(false);

      // Determine ad positions
      for (let i = 0; i < projectsData.length; i++) {
        if (Math.random() < 0.1) { // 10% chance to insert an ad
          adPositions.push(i);
        }
      }
      setAdPositions(adPositions);
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectIndex !== null) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  }, [selectedProjectIndex]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCardClick = (index: number) => {
    setSelectedProjectIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedProjectIndex(null);
  };

  const handleNextProject = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex < projects.length - 1) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    } else if (selectedProjectIndex !== null && selectedProjectIndex >= projects.length - 1) {
      setSelectedProjectIndex(0);
    }
  };

  const handlePrevProject = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    } else if (selectedProjectIndex !== null && selectedProjectIndex <= 0) {
      setSelectedProjectIndex(projects.length - 1);
    }
  };

  const renderCards = () => {
    return projects.map((project, index) => (
      <React.Fragment key={index}>
        <PortfolioCard project={project} onClick={() => handleCardClick(index)} />
        {adPositions.includes(index) && <AdComponent1
            adWidth={isMobile ? '180px' : '300px'}
            adHeight={isMobile ? '300px' : '480px'}
          />}
      </React.Fragment>
    ));
  };

  return (
    <div className="portfolio">
      <div className="portfolio-box">
      {loading
          ? Array.from({ length: 8 }).map((_, index) => <PortfolioSkeletonCard key={index} />)
          : renderCards()
        }
      </div>
      {selectedProjectIndex !== null && (
        <PortfolioModal
          project={projects[selectedProjectIndex]}
          onClose={handleCloseModal}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      )}
    </div>
  );
}

export default Portfolio;

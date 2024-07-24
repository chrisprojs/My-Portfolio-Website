import React, { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Portfolio.css';
import PortfolioCard from './portfolio card/PortfolioCard';
import { projects } from './PortfolioList';
import PortfolioModal from './portfolio modal/PortfolioModal';

function Portfolio() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedProjectIndex !== null) {
      document.documentElement.classList.add('no-scroll');
    } else {
      document.documentElement.classList.remove('no-scroll');
    }
  }, [selectedProjectIndex]);

  const handleCardClick = (index: number) => {
    setSelectedProjectIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedProjectIndex(null);
  };

  const handleNextProject = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex < projects.length - 1) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    }
    else if(selectedProjectIndex !== null && selectedProjectIndex >= projects.length - 1){
      setSelectedProjectIndex(0)
    }
  };

  const handlePrevProject = () => {
    if (selectedProjectIndex !== null && selectedProjectIndex > 0) {
      setSelectedProjectIndex(selectedProjectIndex - 1);
    }
    else if(selectedProjectIndex !== null && selectedProjectIndex <= 0){
      setSelectedProjectIndex(projects.length-1)
    }
  };

  return (
    <div className="portfolio">
      <div className="portfolio-box">
        {projects.map((project, index) => (
          <PortfolioCard key={index} project={project} onClick={() => handleCardClick(index)} />
        ))}
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

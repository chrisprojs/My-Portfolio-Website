import React, { useEffect, useState } from "react";
import Masonry from "react-masonry-css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Portfolio.css";
import PortfolioCard from "../../components/portfolio card/PortfolioCard";
import PortfolioModal from "../../components/portfolio modal/PortfolioModal";
import PortfolioSkeletonCard from "../../components/portfolio card/PortfolioSkeletonCard";

function Portfolio({projects, loading}: {projects:any[], loading:boolean}) {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);
  const [switchLoad, setSwitchLoad] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setSwitchLoad(false);
    }, 1000);
    return () => clearTimeout(timer); // Clean up the timeout
  }, [projects, loading]);

  useEffect(() => {
    if (selectedProjectIndex !== null) {
      document.documentElement.classList.add("no-scroll");
    } else {
      document.documentElement.classList.remove("no-scroll");
    }
  }, [selectedProjectIndex]);

  const handleCardClick = (index: number) => {
    setSelectedProjectIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedProjectIndex(null);
  };

  const handleNextProject = () => {
    if (
      selectedProjectIndex !== null &&
      selectedProjectIndex < projects.length - 1
    ) {
      setSelectedProjectIndex(selectedProjectIndex + 1);
    } else if (
      selectedProjectIndex !== null &&
      selectedProjectIndex >= projects.length - 1
    ) {
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

  const breakpointColumns = {
    default: 4,
    1400: 3,
    992: 2,
    576: 1,
  };

  return (
    <div className="portfolio">
      <div className="portfolio-box">
        {(loading || switchLoad) ? (
          <div className="portfolio-skeleton-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <PortfolioSkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <Masonry
            breakpointCols={breakpointColumns}
            className="portfolio-masonry"
            columnClassName="portfolio-masonry-column"
          >
            {projects.map((project, index) => (
              <PortfolioCard
                key={project.projectId ?? index}
                project={project}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </Masonry>
        )}
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

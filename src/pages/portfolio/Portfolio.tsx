import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Portfolio.css";
import PortfolioCard from "./portfolio card/PortfolioCard";
import { getAllProjects } from "./PortfolioAPI";
import PortfolioModal from "./portfolio modal/PortfolioModal";
import { Project } from "./PortfolioInterface";
import PortfolioSkeletonCard from "./portfolio card/PortfolioSkeletonCard";

function Portfolio() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<
    number | null
  >(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
      setLoading(false);
    };
    fetchProjects();
  });

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

  const renderCards = () => {
    return projects.map((project, index) => (
      <React.Fragment key={index}>
        <PortfolioCard
          project={project}
          onClick={() => handleCardClick(index)}
        />
      </React.Fragment>
    ));
  };

  return (
    <div className="portfolio">
      <div className="portfolio-box">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <PortfolioSkeletonCard key={index} />
            ))
          : renderCards()}
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

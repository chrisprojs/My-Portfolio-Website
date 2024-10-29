import React, { useEffect, useRef, useState } from 'react'
import PortfolioSkeletonCard from '../../../components/portfolio card/PortfolioSkeletonCard'
import Slider from 'react-slick'
import PortfolioModal from '../../../components/portfolio modal/PortfolioModal'
import PortfolioCard from '../../../components/portfolio card/PortfolioCard';
import { getAllProjects } from '../../portfolio/PortfolioAPI';
import { Project } from '../../portfolio/PortfolioInterface';
import { debounce } from 'lodash';

function SlideProject() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [projectsPerPage, setProjectsPerPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const projectsData = await getAllProjects();
      setProjects(projectsData);
      setLoading(false);
    };
    if (projects.length === 0) { // Only fetch if projects array is empty
      fetchProjects();
    }
  }, [projects.length]);

  useEffect(() => {
    const handleResize = debounce(() => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth;
        const cardWidth = 320;
        const numCards = Math.floor((containerWidth-80) / cardWidth);
        setProjectsPerPage(numCards > 0 ? numCards : 1); // Ensure at least one card per page
      }
    }, 200); // Debounce delay in milliseconds
  
    handleResize(); // Initial calculation
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [projectsPerPage]);

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

  const NextArrow = ({ onClick }: any) => (
      <div className={`section-project-navigation ${loading ? 'nav-hidden' : ''}`} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <button
          className="section-project-next-button">
        &rarr;
      </button>
    </div>
  );

  const PrevArrow = ({ onClick }: any) => (
    <div className={`section-project-navigation ${loading ? 'nav-hidden' : ''}`} onClick={(e) => { e.stopPropagation(); onClick(); }}>
      <button
          className="section-project-prev-button">
          &larr;
        </button>
      </div>
  );

  const renderCards = () => {
    return projects.map((project, index) => (
      <React.Fragment key={index}>
        <div className='section-project-card-edge'>
          <PortfolioCard
            project={project}
            onClick={() => handleCardClick(index)}
          />
        </div>
      </React.Fragment>
    ));
  };

  const settings = {
    dots: true,
    infinite: projects.length > 1,
    speed: 500,
    slidesToShow: projectsPerPage,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div></div>
    ),
  };
  return (
    <>
        <div className='section-project-container' ref={containerRef}>
            <Slider {...settings} className='section-project-slider'>
              {loading
                ? Array.from({ length: projectsPerPage }).map((_, index) => (
                    <div className='section-project-card-edge'>
                      <PortfolioSkeletonCard key={index} />
                    </div>
                  ))
                : renderCards()}
            </Slider>
          </div>
        {selectedProjectIndex !== null && (
          <PortfolioModal
            project={projects[selectedProjectIndex]}
            onClose={handleCloseModal}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        )}
      </>
  )
}

export default SlideProject
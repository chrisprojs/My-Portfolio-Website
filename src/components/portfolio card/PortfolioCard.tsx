import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./PortfolioCard.css";
import { likeProject } from "../../pages/portfolio/PortfolioAPI";
import { likeProjectAction } from "../../pages/portfolio/likedProjectsReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/ReduxStorage";

function PortfolioCard({ project, onClick, isSkillFlex = false }: any) {
  const projectData = project;
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  const skillBoxRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [liked, setLiked] = useState(projectData.likes);
  const [isLiked, setIsLiked] = useState(false);

  const dispatch = useDispatch();
  const likedProjects = useSelector((state: RootState) => state.likedProjects.likedProjects);

  useEffect(() => {
    if(likedProjects.some((id:number) => id === projectData.projectId)){
      setIsLiked(true)
    }
  }, [isLiked, likedProjects, projectData.projectId]);

  useEffect(() => {
    const handleResize = () => {
      if (skillBoxRef.current) {
        const skillBoxWidth = skillBoxRef.current.offsetWidth * 2;
        let totalWidth = 0;
        let displayedSkills: string[] = [];
        const charWidth = 12;
        const paddingWidth = 24;

        for (let i = 0; i < projectData.skills.length; i++) {
          const skillWidth = projectData.skills[i].length * charWidth + paddingWidth;
          if (totalWidth + skillWidth > skillBoxWidth) {
            displayedSkills.push(
              `+${projectData.skills.length - i} other${projectData.skills.length - i > 1 ? "s" : ""}`
            );
            break;
          }
          totalWidth += skillWidth;
          displayedSkills.push(projectData.skills[i]);
        }

        setVisibleSkills(displayedSkills);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isSkillFlex, projectData.skills]);

  useEffect(() => {
    if (window.location.pathname === '/') {
      document.body.classList.add('home-page');
    }
  }, []);

  useEffect(() => {
    const minInterval = 3;
    const maxInterval = 10;
    const randomInterval =
      Math.floor(Math.random() * ((maxInterval - minInterval + 1) * 1000)) +
      minInterval * 1000; // Random interval between 3000ms to 10000ms
    const timeout = setTimeout(() => {
      if (sliderRef.current) {
        const nextSlide = (currentSlide + 1) % projectData.images.length;
        sliderRef.current.slickGoTo(nextSlide);
        setCurrentSlide(nextSlide);
      }
    }, randomInterval);

    return () => clearTimeout(timeout);
  }, [currentSlide, projectData.images.length]);

  const handleLikeClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!isLiked && !likedProjects.some((id:number) => id === projectData.projectId)) {
      try {
        await likeProject(projectData.projectId);
        setIsLiked(true);
        setLiked(liked + 1);
        dispatch(likeProjectAction(projectData.projectId));
      } catch (error) {
        console.error('Failed to update likes:', error);
      }
    }
  };

  const handleDotClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const settings = {
    dots: true,
    infinite: projectData.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ref: sliderRef,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul onClick={handleDotClick}>{dots}</ul>
      </div>
    ),
    beforeChange: (current: any, next: any) => setCurrentSlide(next),
  };

  return (
    <div className="portfolio-card-container">
      <div className="portfolio-card" onClick={onClick}>
          <div className="card-content">
            <Slider {...settings} className="portfolio-card-slider">
              {projectData.images.map((image: any, index: any) => (
                <div className="portfolio-card-slider-box" key={index}>
                  {image.picture.endsWith('.jpg') ? (
                    <img src={image.picture} alt={`${projectData.title} slide ${index + 1}`} />
                  ) : image.picture.endsWith('.mp4') ? (
                    <video controls autoPlay muted>
                      <source src={image.picture} type="video/mp4" />
                    </video>
                  ) : null}
                  </div>
              ))}
            </Slider>
            <div className="portfolio-content">
              <div className="portfolio-text">
                <h3>{projectData.title}</h3>
                <p>{projectData.details}</p>
              </div>
              <div className="skills" ref={skillBoxRef}>
                {visibleSkills.map((skill:String, index:any) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="like-container">
            <button
              className={`like-button ${isLiked ? "liked" : ""}`}
              onClick={handleLikeClick}
              disabled={isLiked}
            >
              👍 {liked}
            </button>
          </div>
      </div>
    </div>
  );
}

export default PortfolioCard;

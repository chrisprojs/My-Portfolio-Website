import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './PortfolioCard.css';

function PortfolioCard({ project, onClick }:any) {
  const { images = [], title = '', details = '', skills = [] } = project;
  const [visibleSkills, setVisibleSkills] = useState<string[]>([]);
  const skillBoxRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (skillBoxRef.current) {
        const skillBoxWidth = skillBoxRef.current.offsetWidth;
        let totalWidth = 0;
        let displayedSkills: string[] = [];
        const isMobile = window.innerWidth <= 768;
        const charWidth = isMobile ? 18 : 12;
        const paddingWidth = isMobile ? 38 : 24;

        for (let i = 0; i < skills.length; i++) {
          const skillWidth = skills[i].length * charWidth + paddingWidth;
          if (totalWidth + skillWidth > skillBoxWidth) {
            displayedSkills.push(`+${skills.length - i} other${skills.length - i > 1 ? 's' : ''}`);
            break;
          }
          totalWidth += skillWidth;
          displayedSkills.push(skills[i]);
        }

        setVisibleSkills(displayedSkills);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [skills]);

  useEffect(() => {
    const minInterval = 3;
    const maxInterval = 10;
    const randomInterval = Math.floor(Math.random() * ((maxInterval-minInterval+1)*1000)) + (minInterval*1000); // Random interval between 3000ms to 10000ms
    const timeout = setTimeout(() => {
      if (sliderRef.current) {
        const nextSlide = (currentSlide + 1) % images.length;
        sliderRef.current.slickGoTo(nextSlide);
        setCurrentSlide(nextSlide);
      }
    }, randomInterval);

    return () => clearTimeout(timeout);
  }, [currentSlide, images.length]);

  const handleDotClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    ref: sliderRef,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul onClick={handleDotClick}>{dots}</ul>
      </div>
    ),
    beforeChange: (current:any, next:any) => setCurrentSlide(next),
  };

  return (
    <div className="portfolio-card" onClick={onClick}>
      <Slider {...settings} className="portfolio-card-slider">
        {images.map((image:any, index:number) => (
          <div key={index}>
            <img src={image.picture} alt={`${title} slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
      <div className="portfolio-content">
        <div className="portfolio-text">
          <h3>{title}</h3>
          <p>{details}</p>
        </div>
        <div className="skills" ref={skillBoxRef}>
          {visibleSkills.map((skill, index) => (
            <span key={index} className="skill-badge">
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PortfolioCard;

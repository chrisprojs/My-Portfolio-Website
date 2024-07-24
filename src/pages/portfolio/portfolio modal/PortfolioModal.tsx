import React from 'react';
import './PortfolioModal.css';
import Slider from 'react-slick';

function PortfolioModal({ project, onClose, onNext, onPrev }: any) {
  const { images = [], title = '', details = '', skills = [], author = [], publicationLink = '' } = project;

  const NextArrow = ({ onClick }: any) => (
    <div className="arrow next-arrow" onClick={onClick}>
      &#9654;
    </div>
  );

  const PrevArrow = ({ onClick }: any) => (
    <div className="arrow prev-arrow" onClick={onClick}>
      &#9664;
    </div>
  );

  const settings = {
    dots: true,
    infinite: images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-wrapper" onClick={(e) => e.stopPropagation()}>
        <div className="modal-navigation">
          <button onClick={onPrev} className="modal-prev-button">&larr;</button>
        </div>
        <div className="modal-content">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
          <h2>{title}</h2>
          <div className='modal-body'>
            <Slider {...settings} className="modal-slider">
              {images.map((image: any, index: number) => (
                <div key={index}>
                  <img src={image.picture} alt={`${title} slide ${index + 1}`} />
                  <p className="image-description">{image.desc}</p>
                </div>
              ))}
            </Slider>
            <div className="modal-details">
              <p className="modal-details-text">{details}</p>
              <div className="modal-skills">
                <strong className='modal-skills-strong'>Skills: </strong>
                {skills.map((skill: string, index: number) => (
                  <span key={index} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="modal-authors">
                <strong>Authors: </strong>{author.join(', ')}
              </div>
              {publicationLink && (
                <div className="modal-link">
                  <a href={publicationLink} target="_blank" rel="noopener noreferrer">
                    View Project
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="modal-navigation">
          <button onClick={onNext} className="modal-next-button">&rarr;</button>
        </div>
      </div>
    </div>
  );
}

export default PortfolioModal;

import React, { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import "./PortfolioModal.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/ReduxStorage";
import { likeProject } from "../../pages/portfolio/PortfolioAPI";
import { likeProjectAction } from "../../pages/portfolio/likedProjectsReducer";
import cuteDancing from "./../../asset/cute-dancing.gif";
import { Link } from "react-router-dom";

function PortfolioModal({ project, onClose, onNext, onPrev }: any) {
  const projectData = project;
  const [liked, setLiked] = useState(projectData.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const likedProjects = useSelector(
    (state: RootState) => state.likedProjects.likedProjects
  );

  useEffect(() => {
    setShowModal(true);
    if (likedProjects.some((id: number) => id === projectData.projectId)) {
      setIsLiked(true);
    }
  }, [isLiked, likedProjects, projectData.projectId]);

  const handleLikeClick = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (
      !isLiked &&
      !likedProjects.some((id: number) => id === projectData.projectId)
    ) {
      try {
        await likeProject(projectData.projectId);
        setIsLiked(true);
        setLiked(liked + 1);
        dispatch(likeProjectAction(projectData.projectId));
      } catch (error) {
        console.error("Failed to update likes:", error);
      }
    }
  };

  const NextArrow = ({ onClick }: any) => (
    <div
      className="arrow next-arrow"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      &#9654;
    </div>
  );

  const PrevArrow = ({ onClick }: any) => (
    <div
      className="arrow prev-arrow"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      &#9664;
    </div>
  );

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 100); // Match the duration of the closing transition
  };

  const settings = {
    dots: true,
    infinite: projectData.images.length > 1,
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
    <CSSTransition
      in={showModal}
      timeout={100}
      classNames="modal"
      unmountOnExit
    >
      <div className="modal-overlay" onClick={handleClose}>
        <div className="modal-content-wrapper">
          <div
            className="modal-navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onPrev} className="modal-prev-button">
              &larr;
            </button>
          </div>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={handleClose}>
              &times;
            </button>
            <h2>{projectData.title}</h2>
            <div className="modal-body">
              <div className="modal-slider-box">
                <Slider {...settings} className="modal-slider">
                  {projectData.images.map((image: any, index: any) => (
                    <div key={index}>
                      {image.picture.endsWith(".jpg") ? (
                        <>
                        <img
                          src={image.picture}
                          alt={`${projectData.title} slide ${index + 1}`}
                        />
                        <p className="image-description">{image.desc}</p>
                        </>                
                      ) : image.picture.endsWith(".mp4") ? (
                        <>
                        <video controls autoPlay muted>
                          <source src={image.picture} type="video/mp4" />
                        </video>
                        <p className="image-description">{image.desc}</p>
                        </>
                      ) : null}
                    </div>
                  ))}
                </Slider>
                <div className="like-container like-modal">
                  <button
                    className={`like-button ${isLiked ? "liked" : ""}`}
                    onClick={handleLikeClick}
                    disabled={isLiked}
                  >
                    👍 {liked}
                  </button>
                </div>
              </div>
              <div className="modal-details">
                <p className="modal-details-text">{projectData.details}</p>
                <div className="modal-skills">
                  <strong className="modal-skills-strong">Skills: </strong>
                  {projectData.skills.map((skill: string, index: number) => (
                    <span key={index} className="skill-badge">
                      {skill}
                    </span>
                  ))}
                </div>
                <div className="modal-authors">
                  <strong>Authors: </strong>
                  {projectData.authors.join(", ")}
                </div>
                {projectData.publicationLink && (
                  <div className="modal-link">
                    <a
                      className="modal-view-portfolio section-1-button section-1-button-view-portfolio"
                      href={projectData.publicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <img
                        src={cuteDancing}
                        alt="ricardo-ricardo-flick"
                        className="section-1-gif"
                      />
                      <p className="section-1-text-view-portfolio">View Project</p>
                      <img
                        src={cuteDancing}
                        alt="ricardo-ricardo-flick"
                        className="section-1-gif"
                      />
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className="modal-navigation"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onNext} className="modal-next-button">
              &rarr;
            </button>
          </div>
        </div>
      </div>
    </CSSTransition>
  );
}

export default PortfolioModal;

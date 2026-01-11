import React, { useEffect, useState, useRef } from "react";
import { CSSTransition } from "react-transition-group";
import "./PortfolioModal.css";
import Slider from "react-slick";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/ReduxStorage";
import { likeProject } from "../../pages/portfolio/PortfolioAPI";
import { likeProjectAction } from "../../pages/portfolio/likedProjectsReducer";
import cuteDancing from "./../../asset/cute-dancing.gif";

function PortfolioModal({ project, onClose, onNext, onPrev }: any) {
  const projectData = project;
  const [liked, setLiked] = useState(projectData.likes);
  const [isLiked, setIsLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>("");
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [lastPinchDistance, setLastPinchDistance] = useState<number | null>(null);
  const [pinchCenter, setPinchCenter] = useState<{ x: number; y: number } | null>(null);
  const previewImageRef = useRef<HTMLImageElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);
  const previewOverlayRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<Slider>(null);

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

  const handlePreviewClick = (imageUrl: string) => {
    setPreviewImage(imageUrl);
    setShowPreview(true);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleClosePreview = () => {
    setShowPreview(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
    setLastPinchDistance(null);
    setPinchCenter(null);
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (!showPreview || !previewOverlayRef.current || !previewContentRef.current) return;
    e.preventDefault();
    
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(1, Math.min(5, zoom * zoomFactor));
    
    if (newZoom === 1) {
      setZoom(1);
      setPosition({ x: 0, y: 0 });
      return;
    }
    
    // Get the overlay bounds and pointer position
    const overlayRect = previewOverlayRef.current.getBoundingClientRect();
    const overlayCenterX = overlayRect.width / 2;
    const overlayCenterY = overlayRect.height / 2;
    
    // Pointer position relative to overlay
    const pointerX = e.clientX - overlayRect.left;
    const pointerY = e.clientY - overlayRect.top;
    
    // Calculate the image point under the pointer (in image-local coordinates)
    const imagePointX = (pointerX - overlayCenterX - position.x) / zoom;
    const imagePointY = (pointerY - overlayCenterY - position.y) / zoom;
    
    // Calculate new position to keep the same image point under the pointer
    const newX = pointerX - overlayCenterX - imagePointX * newZoom;
    const newY = pointerY - overlayCenterY - imagePointY * newZoom;
    
    setZoom(newZoom);
    setPosition({ x: newX, y: newY });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    return Math.hypot(
      touch2.clientX - touch1.clientX,
      touch2.clientY - touch1.clientY
    );
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!showPreview) return;
    
    if (e.touches.length === 2 && previewOverlayRef.current) {
      e.preventDefault();
      e.stopPropagation();
      const distance = getDistance(e.touches[0], e.touches[1]);
      setLastPinchDistance(distance);
      
      // Calculate pinch center point
      const overlayRect = previewOverlayRef.current.getBoundingClientRect();
      const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - overlayRect.left;
      const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - overlayRect.top;
      setPinchCenter({ x: centerX, y: centerY });
      setIsDragging(false); // Stop any dragging when pinch starts
    } else if (e.touches.length === 1 && zoom > 1) {
      e.preventDefault();
      setIsDragging(true);
      setDragStart({ x: e.touches[0].clientX - position.x, y: e.touches[0].clientY - position.y });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!showPreview) return;
    
    if (e.touches.length === 2 && previewOverlayRef.current) {
      e.preventDefault();
      e.stopPropagation();
      
      // Initialize pinch if not already started (handles transition from 1 to 2 touches)
      if (lastPinchDistance === null || !pinchCenter) {
        const distance = getDistance(e.touches[0], e.touches[1]);
        setLastPinchDistance(distance);
        
        const overlayRect = previewOverlayRef.current.getBoundingClientRect();
        const centerX = (e.touches[0].clientX + e.touches[1].clientX) / 2 - overlayRect.left;
        const centerY = (e.touches[0].clientY + e.touches[1].clientY) / 2 - overlayRect.top;
        setPinchCenter({ x: centerX, y: centerY });
        setIsDragging(false); // Stop dragging when pinch starts
        return;
      }
      
      const distance = getDistance(e.touches[0], e.touches[1]);
      const zoomChange = distance / lastPinchDistance;
      const newZoom = Math.max(1, Math.min(5, zoom * zoomChange));
      
      if (newZoom === 1) {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
        setLastPinchDistance(distance);
        return;
      }
      
      // Get overlay bounds
      const overlayRect = previewOverlayRef.current.getBoundingClientRect();
      const overlayCenterX = overlayRect.width / 2;
      const overlayCenterY = overlayRect.height / 2;
      
      // Use the stored pinch center point
      const pointerX = pinchCenter.x;
      const pointerY = pinchCenter.y;
      
      // Calculate the image point under the pinch center (in image-local coordinates)
      const imagePointX = (pointerX - overlayCenterX - position.x) / zoom;
      const imagePointY = (pointerY - overlayCenterY - position.y) / zoom;
      
      // Calculate new position to keep the same image point under the pinch center
      const newX = pointerX - overlayCenterX - imagePointX * newZoom;
      const newY = pointerY - overlayCenterY - imagePointY * newZoom;
      
      setZoom(newZoom);
      setPosition({ x: newX, y: newY });
      setLastPinchDistance(distance);
    } else if (e.touches.length === 1 && isDragging && zoom > 1) {
      e.preventDefault();
      setPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0 || e.touches.length === 1) {
      // Only prevent default if we were handling a pinch or drag
      if (lastPinchDistance !== null || isDragging) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
    setIsDragging(false);
    if (lastPinchDistance !== null) {
      setLastPinchDistance(null);
    }
    setPinchCenter(null);
  };

  const resetZoom = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const settings = {
    dots: true,
    infinite: projectData.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    lazyLoad: "progressive" as import("react-slick").LazyLoadTypes,
    appendDots: (dots: React.ReactNode) => (
      <div>
        <ul>{dots}</ul>
      </div>
    ),
  };

  return (
    <>
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
              {window.matchMedia("(max-width: 768px)").matches && (
                <h2>{projectData.title}</h2>
              )}
              <div className="modal-body">
                <div className="modal-slider-box">
                  <Slider {...settings} className="modal-slider" ref={sliderRef}>
                    {projectData.images.map((image: any, index: any) => (
                      <div key={index}>
                        {image.picture.endsWith(".jpg") ? (
                          <>
                          <div className="image-wrapper">
                            <img
                              src={image.picture}
                              alt={`${projectData.title} slide ${index + 1}`}
                            />
                            <button
                              className="preview-button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handlePreviewClick(image.picture);
                              }}
                              title="Preview Image"
                            >
                              🔍
                            </button>
                          </div>
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
                  {!window.matchMedia("(max-width: 768px)").matches && (
                    <h2>{projectData.title}</h2>
                  )}
                  <p className="modal-details-text">{projectData.details}</p>
                  <div className="modal-skills">
                    <strong className="modal-strong">Skills: </strong>
                    {projectData.skills.map((skill: string, index: number) => (
                      <span key={index} className="skill-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="modal-authors">
                    <strong className="modal-strong">Authors: </strong>
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
                          alt="cute-dancing-flick"
                          className="section-1-gif"
                        />
                        <p className="section-1-text-view-portfolio">View Project</p>
                        <img
                          src={cuteDancing}
                          alt="cute-dancing-flick"
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
      
      {/* Image Preview Modal */}
      <CSSTransition
        in={showPreview}
        timeout={200}
        classNames="preview"
        unmountOnExit
      >
        <div
          ref={previewOverlayRef}
          className="preview-overlay"
          onClick={handleClosePreview}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="preview-controls" onClick={(e) => e.stopPropagation()}>
            <button className="preview-close-button" onClick={handleClosePreview}>
              &times;
            </button>
            {zoom > 1 && (
              <button className="preview-reset-button" onClick={resetZoom}>
                Reset Zoom
              </button>
            )}
          </div>
          <div
            ref={previewContentRef}
            className="preview-content"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
          >
            <img
              ref={previewImageRef}
              src={previewImage}
              alt="Preview"
              className="preview-image"
              draggable={false}
            />
          </div>
          <div className="preview-zoom-info">
            {Math.round(zoom * 100)}%
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

export default PortfolioModal;

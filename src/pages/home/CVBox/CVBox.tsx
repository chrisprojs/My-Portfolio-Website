import React, { useEffect, useRef, useState } from 'react'
import './CVBox.css'
import CV from '../../cv/CV'
import { useCVContext } from '../../../context/CV-to-CVBox'

function CVBox() {
  const { isOpened, setIsOpened }:any = useCVContext()
  const [isFooterVisible, setIsFooterVisible] = useState(false)
  const footerRef = useRef<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startY, setStartY] = useState(0);
  const [offset, setOffset] = useState(0);
  const [hasMoved, setHasMoved] = useState(false); 
  const cvBoxContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (offset > 0) {
      setIsOpened(true)
      document.documentElement.classList.add("no-scroll");
    } else {
      setIsOpened(false)
      document.documentElement.classList.remove("no-scroll");
    }
  }, [offset]);

  useEffect(() => {
    footerRef.current = document.getElementById('footer');

    const footerElement = footerRef.current;
    if (!footerElement) return; // If footer is still not found, stop here

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry.isIntersecting),
      { threshold: 0.4 }
    );

    observer.observe(footerElement);

    return () => {
      if (footerElement) {
        observer.unobserve(footerElement);
      }
    };
  }, []);

  // Start drag/touch event
  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    setStartY(e.type === 'mousedown' ? (e as React.MouseEvent).clientY : (e as React.TouchEvent).touches[0].clientY);
    setHasMoved(false);
  };

  // Handle mouse/touch move event
  const handleMove = (e: MouseEvent | TouchEvent) => {
    if (!isDragging) return;

    const vhToPx = window.innerHeight / 100;
    const startOffset = 0 * vhToPx;
    const clientY = e.type === 'mousemove' ? (e as MouseEvent).clientY : (e as TouchEvent).touches[0].clientY;
    const deltaY = startY - clientY;
    const distanceMoved = Math.abs(deltaY);

    if (distanceMoved > 5) {
      setHasMoved(true);
      const newOffset = Math.max(startOffset, offset * vhToPx + deltaY) / vhToPx;
      setOffset(newOffset);
      setStartY(clientY);
    }
  };

  // End drag/touch event
  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    // Add mousemove and touchmove listeners
    window.addEventListener('mousemove', handleMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('touchend', handleEnd);

    if (!isDragging) {
      if (offset < 10) {
        setOffset(0);
      } else if (offset > 70) {
        setOffset(85);
      }
    }

    setTimeout(() => {
      setHasMoved(false);
    }, 100);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  const handleCVButton = () =>{
    if (hasMoved) return;

    if (isOpened) {
      setOffset(0);
    } else {
      setOffset(85);
    }
  }

  
  return (
    <>
      {isOpened && <div className='cvBox-overlay' onClick={handleCVButton}></div>}
      <div 
        ref={cvBoxContainerRef}
        className={`cvBox-container`}
        style={{ bottom: `${isFooterVisible ? '-100vh' : '-1px'}` }}
      >
        <div className='cvBox-button'
        onMouseDown={handleStart} onTouchStart={handleStart} onClick={handleCVButton}>
          <div><i className={`fa-solid fa-chevrons-${(offset>0) ? 'down' : 'up'}`}></i></div>
          <p>View CV</p>
        </div>
        <div className={`cvBox-box ${isDragging ? 'dragged' : ''}`}
          style={{ height: `${offset}vh`}}>
          <div>
            <CV/>
          </div>
        </div>
    </div>
    </>
  )
}

export default CVBox
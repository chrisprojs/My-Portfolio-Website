import React, { useEffect, useRef } from 'react'
import './SkillCarousel.css'
import { SkillList } from '../../pages/cv/SkillList'

function SkillCarousel() {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Start animation for continuous scroll
    const carousel = carouselRef.current;

    if (carousel == null){
      return
    }

    let scrollPosition = carousel.scrollWidth / 2;

    const scrollInterval = setInterval(() => {
      scrollPosition -= 1;
      if (scrollPosition <= 0) {
        // Reset scroll position for continuous loop
        scrollPosition = carousel.scrollWidth / 2;
      }
      carousel.scrollLeft = scrollPosition;
    }, 20); // Adjust speed as needed

    return () => clearInterval(scrollInterval);
  }, []);

  return (
    <div className='skillCaro-container'>
      <div className='skillCaro-box' ref={carouselRef}>
        {SkillList.concat(SkillList).map((skill, index) => (
            <div className="skillCaro-card" key={index}>
              <img
                src={require(`./../../asset/skill-logo/${skill?.skill.toLowerCase()}.png`)}
                alt={`skillCaro-image-${index}`}
              />
              <p>{skill?.level}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillCarousel
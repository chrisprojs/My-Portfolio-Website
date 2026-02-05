import React, { useEffect, useState } from 'react'
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import shigureUiDance from "./../../../asset/shigure-ui-dance.gif";
import ricardoRicardoFlick from "./../../../asset/ricardo-ricardo-flick.gif";
import rickRoll from "./../../../asset/rick-roll.gif";
import chipiChapaCat from "./../../../asset/chipi-chapa-cat.gif";
import './HomeSection1.css'
import linkedin from "./../../../asset/contact-icon/linkedin.png";
import { PersonalInformation } from '../../../PersonalInformation';

function HomeSection1() {
  const [isProfilePictureLoaded, setProfilePictureLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <=768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const profileImage = () => {
    return (
      <img
        src={require("./../../../asset/main_photo1.jpg")}
        className={`profile-picture-1 ${!isProfilePictureLoaded ? "blur" : "clear"}`}
        alt="profile-picture-1"
        onLoad={() => setProfilePictureLoaded(true)}
      />
    )
  }

  const handleScroll = (sectionId:any) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Set an offset of, for example, 50px above the section
      const offset = 80;
      const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = sectionPosition - offset;
  
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  const profileDesc = () => {
    return(
      <div className="section-1-text">
        <div className='section-1-typewriter-box'>
          <Typewriter
            options={{
              delay: 50,
              cursorClassName: "section-1-typewriter"
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(
                  `<span class="section-1-typewriter"><img src='${rickRoll}' alt='rick-roll' class='typewriter-gif typewriter-mobile-hidden' />Hi, I'm Chris.<img src='${rickRoll}' alt='rick-roll' class='typewriter-gif' /><br /></span>`
                )
                .pauseFor(500)
                .changeDelay(30)
                .typeString(`<span class="section-1-typewriter">I'm a Fullstack/Backend Engineer.</span>`)
                .start();
            }}
          />
        </div>
        <q className='section-1-quote-text'>Don&apos;t just write a code, but provide a solution.</q>
      </div>
    )
  }

  return (
    <section id='mainSection' className="section-1">
        {isMobile ? profileDesc(): profileImage()}
        <div className="section-1-button-box">
          {isMobile ? profileImage(): profileDesc()}
          <div className="section-1-button-list">
            <div className="section-1-button-stack">
              <a
                href={`${PersonalInformation.linkedinLink}`}
                className="section-1-button section-1-button-view-cv"
                target="_blank" rel="noopener noreferrer"
              >
                <img
                  src={shigureUiDance}
                  alt="shigure-ui-dance"
                  className="section-1-gif"
                />
                <p className="section-1-text-view-cv">View <img src={linkedin} alt='linkedin-logo'/></p>
                <img
                  src={shigureUiDance}
                  alt="shigure-ui-dance"
                  className="section-1-gif"
                />
              </a>
              <div
                onClick={() => handleScroll('projectSection')}
                className="section-1-button section-1-button-view-portfolio"
              >
                <img
                  src={ricardoRicardoFlick}
                  alt="ricardo-ricardo-flick"
                  className="section-1-gif"
                />
                <p className="section-1-text-view-portfolio">View Project</p>
                <img
                  src={ricardoRicardoFlick}
                  alt="ricardo-ricardo-flick"
                  className="section-1-gif"
                />
              </div>
            </div>
            <a
              href="mailto:christiananggaresta20@gmail.com"
              className="section-1-button-offer-job"
            >
              {/* play ./asset/dubidubidu.mp3 when hovering the button */}
              <img
                src={chipiChapaCat}
                alt="chipi-chapa-cat"
                className="section-1-gif"
              />
              Offer Job
              <img
                src={chipiChapaCat}
                alt="chipi-chapa-cat"
                className="section-1-gif"
              />
            </a>
          </div>
        </div>
      </section>
  )
}

export default HomeSection1
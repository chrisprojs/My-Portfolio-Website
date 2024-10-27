import React, { useEffect, useState } from 'react'
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import shigureUiDance from "./../../../asset/shigure-ui-dance.gif";
import ricardoRicardoFlick from "./../../../asset/ricardo-ricardo-flick.gif";
import rickRoll from "./../../../asset/rick-roll.gif";
import chipiChapaCat from "./../../../asset/chipi-chapa-cat.gif";
import './HomeSection1.css'

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
                .typeString(`<span class="section-1-typewriter">I'm a Software Engineer.</span>`)
                .start();
            }}
          />
        </div>
        <q className='section-1-quote-text'>Don&apos;t just write a code, but provide a solution.</q>
      </div>
    )
  }

  return (
    <div className="section-1">
        {isMobile ? profileDesc(): profileImage()}
        <div className="section-1-button-box">
          {isMobile ? profileImage(): profileDesc()}
          <div className="section-1-button-list">
            <div className="section-1-button-stack">
              <Link
                to="/cv"
                className="section-1-button section-1-button-view-cv"
              >
                <img
                  src={shigureUiDance}
                  alt="shigure-ui-dance"
                  className="section-1-gif"
                />
                <p className="section-1-text-view-cv">View CV</p>
                <img
                  src={shigureUiDance}
                  alt="shigure-ui-dance"
                  className="section-1-gif"
                />
              </Link>
              <Link
                to="/portfolio"
                className="section-1-button section-1-button-view-portfolio"
              >
                <img
                  src={ricardoRicardoFlick}
                  alt="ricardo-ricardo-flick"
                  className="section-1-gif"
                />
                <p className="section-1-text-view-portfolio">View Portfolio</p>
                <img
                  src={ricardoRicardoFlick}
                  alt="ricardo-ricardo-flick"
                  className="section-1-gif"
                />
              </Link>
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
      </div>
  )
}

export default HomeSection1
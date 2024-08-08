import React from 'react'
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import shigureUiDance from "./../../../asset/shigure-ui-dance.gif";
import ricardoRicardoFlick from "./../../../asset/ricardo-ricardo-flick.gif";
import rickRoll from "./../../../asset/rick-roll.gif";
import chipiChapaCat from "./../../../asset/chipi-chapa-cat.gif";
import './HomeSection1.css'

function HomeSection1() {
  return (
    <div className="section-1">
        <img
          src={require("./../../../asset/main_photo1.jpg")}
          className="profile-picture-1"
          alt="profile-picture-1"
        />
        <div className="section-1-button-box">
          <div className="section-1-text">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    `<img src='${rickRoll}' alt='rick-roll' class='typewriter-gif typewriter-mobile-hidden' />Hi, I'm Chris.<img src='${rickRoll}' alt='rick-roll' class='typewriter-gif' /><br />`
                  )
                  .pauseFor(500)
                  .typeString(" I'm a Software Engineer.")
                  .start();
              }}
            />
          </div>
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
import React, { useRef } from "react";
import "./Home.css";
import Typewriter from "typewriter-effect";
import { Link } from "react-router-dom";
import shigureUiDance from "./../../asset/shigure-ui-dance.gif";
import ricardoRicardoFlick from "./../../asset/ricardo-ricardo-flick.gif";
import rickRoll from "./../../asset/rick-roll.gif";
import chipiChapaCat from "./../../asset/chipi-chapa-cat.gif";


function Home() {

  return (
    <div className="box">
      <div className="section-1">
        <img
          src={require("./../../asset/main_photo1.jpg")}
          className="profile-picture-1"
          alt="profile-picture-1"
        />
        <div className="section-1-button-box">
          <div className="section-1-text">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(`<img src='${rickRoll}' alt='rick-roll' class='typewriter-gif typewriter-mobile-hidden' />Hi, I'm Chris.<img src='${rickRoll}' alt='rick-roll' class='typewriter-gif' /><br />`)
                  .pauseFor(500)
                  .typeString(" I'm a Software Engineer.")
                  .start()
              }}
            />
          </div>
          <div className="section-1-button-list">
            <div className="section-1-button-stack">
              <Link
                to="/cv"
                className="section-1-button section-1-button-view-cv"
              >
                <img src={shigureUiDance} alt="shigure-ui-dance" className="section-1-gif" />
                <p className="section-1-text-view-cv">View CV</p>
                <img src={shigureUiDance} alt="shigure-ui-dance" className="section-1-gif" />
              </Link>
              <Link
                to="/portfolio"
                className="section-1-button section-1-button-view-portfolio"
              >
                <img src={ricardoRicardoFlick} alt="ricardo-ricardo-flick" className="section-1-gif" />
                <p className="section-1-text-view-portfolio">View Portfolio</p>
                <img src={ricardoRicardoFlick} alt="ricardo-ricardo-flick" className="section-1-gif" />
              </Link>
            </div>
            <a
              href="mailto:christiananggaresta20@gmail.com"
              className="section-1-button-offer-job"
            >
              {/* play ./asset/dubidubidu.mp3 when hovering the button */}
              <img src={chipiChapaCat} alt="chipi-chapa-cat" className="section-1-gif" />
              Offer Job
              <img src={chipiChapaCat} alt="chipi-chapa-cat" className="section-1-gif" />
            </a>
          </div>
        </div>
      </div>

      <div className="section-2">
        <div className="section-2-textbox">
          <p className="section-2-text">
            I am a software engineer with a strong focus on front-end
            development, crafting user-friendly and visually appealing websites
            and mobile apps. While my expertise focus in the front-end, I am
            also good in back-end development, offering a well-rounded skillset
            for full-stack development. I thrive in collaborative environments
            and leverage AI tools to streamline the coding process, ensuring
            efficient and high-quality website and mobile app creation.
          </p>
        </div>
        <img
          src={require("./../../asset/main_photo2.png")}
          className="profile-picture-2"
          alt="profile-picture-2"
        />
      </div>

      <div className="section-3">
        <div className="section-3-textbox">
          <h1>WHAT I DO?</h1>
        </div>
        <div className="section-3-list">
          <div className="section-3-list-column">
            <p className="section-3-list-title">Front-End Development</p>
            <ul>
              <li className="section-3-list-item">Build responsive and interactive user interfaces using React, HTML, and CSS to ensure a seamless user experience across various devices and screen sizes.</li>
              <li className="section-3-list-item">Design and implement reusable React components to promote code reusability and maintainability, leading to a more efficient development process.</li>
              <li className="section-3-list-item">Craft visually appealing and accessible web pages using modern CSS techniques</li>
              <li className="section-3-list-item">Ensure that web applications function correctly across different browsers and platforms, addressing compatibility issues and implementing polyfills as necessary.</li>
              <li className="section-3-list-item">Work closely with other developer to implement user-centered designs, ensuring that the end product is both functional and aesthetically pleasing.</li>
              <li className="section-3-list-item">Stay updated with the latest industry trends and best practices in front-end development, continuously improving skills and adopting new technologies when appropriate.</li>
            </ul>
          </div>
          <div className="section-3-list-column">
            <p className="section-3-list-title">Backend Development</p>
            <ul>
              <li className="section-3-list-item">Develop robust and scalable server-side applications using ASP.NET, Laravel, and Django to support the needs of web and mobile applications.</li>
              <li className="section-3-list-item">Design, implement, and maintain databases using SQL, ensuring efficient data storage, retrieval, and management to support application functionality.</li>
              <li className="section-3-list-item">Build and integrate RESTful API, enabling seamless communication between the front end and backend systems, and facilitating data exchange with third-party services.</li>
            </ul>
            <p className="section-3-list-title">Mobile App Development</p>
            <ul>
              <li className="section-3-list-item">Build high-quality, cross-platform mobile applications for iOS and Android using React Native, ensuring consistent performance and user experience on both platforms.</li>
              <li className="section-3-list-item">Implement intuitive and engaging user interfaces by translating design wireframes and prototypes into responsive, high-performance React Native components.</li>
              <li className="section-3-list-item">Manage application state effectively using libraries, ensuring data consistency and smooth interactions within the app.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

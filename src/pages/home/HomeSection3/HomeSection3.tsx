import React from 'react'
import './HomeSection3.css'

function HomeSection3() {
  return (
    <section id='serviceSection' className="section-3">
        <div className="section-3-textbox">
          <h1>WHAT I DO?</h1>
        </div>
        <div className="section-3-list">
          <div className="section-3-list-column">
            <p className="section-3-list-title">Front-End Development</p>
            <ul>
              <li className="section-3-list-item">
                Build responsive and accessible user interfaces with React, HTML, and CSS, ensuring compatibility across devices, browsers, and screen sizes.
              </li>
              <li className="section-3-list-item">
                Design and implement reusable React components for efficient and maintainable code, while crafting visually appealing and user-centered web pages.
              </li>
              <li className="section-3-list-item">
              Continuously enhance skills and adopt front-end best practices by staying current with industry trends and new technologies.
              </li>
            </ul>
          </div>
          <div className="section-3-list-column">
            <p className="section-3-list-title">Backend Development</p>
            <ul>
              <li className="section-3-list-item">
                Build scalable REST API server-side applications and manage efficient databases to support web and mobile functionality.
              </li>
              <li className="section-3-list-item">
                Develop and integrate RESTful APIs for seamless front-end and third-party communication.
              </li>
            </ul>
            <p className="section-3-list-title">Mobile App Development</p>
            <ul>
              <li className="section-3-list-item">
                Develop high-quality, cross-platform mobile apps with React Native, delivering responsive interfaces and smooth performance across iOS and Android.
              </li>
            </ul>
          </div>
        </div>
      </section>
  )
}

export default HomeSection3
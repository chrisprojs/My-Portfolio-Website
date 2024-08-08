import React from 'react'
import './HomeSection3.css'

function HomeSection3() {
  return (
    <div className="section-3">
        <div className="section-3-textbox">
          <h1>WHAT I DO?</h1>
        </div>
        <div className="section-3-list">
          <div className="section-3-list-column">
            <p className="section-3-list-title">Front-End Development</p>
            <ul>
              <li className="section-3-list-item">
                Build responsive and interactive user interfaces using React,
                HTML, and CSS to ensure a seamless user experience across
                various devices and screen sizes.
              </li>
              <li className="section-3-list-item">
                Design and implement reusable React components to promote code
                reusability and maintainability, leading to a more efficient
                development process.
              </li>
              <li className="section-3-list-item">
                Craft visually appealing and accessible web pages using modern
                CSS techniques
              </li>
              <li className="section-3-list-item">
                Ensure that web applications function correctly across different
                browsers and platforms, addressing compatibility issues and
                implementing polyfills as necessary.
              </li>
              <li className="section-3-list-item">
                Work closely with other developer to implement user-centered
                designs, ensuring that the end product is both functional and
                aesthetically pleasing.
              </li>
              <li className="section-3-list-item">
                Stay updated with the latest industry trends and best practices
                in front-end development, continuously improving skills and
                adopting new technologies when appropriate.
              </li>
            </ul>
          </div>
          <div className="section-3-list-column">
            <p className="section-3-list-title">Backend Development</p>
            <ul>
              <li className="section-3-list-item">
                Develop robust and scalable server-side applications using
                ASP.NET, Laravel, and Django to support the needs of web and
                mobile applications.
              </li>
              <li className="section-3-list-item">
                Design, implement, and maintain databases using SQL, ensuring
                efficient data storage, retrieval, and management to support
                application functionality.
              </li>
              <li className="section-3-list-item">
                Build and integrate RESTful API, enabling seamless communication
                between the front end and backend systems, and facilitating data
                exchange with third-party services.
              </li>
            </ul>
            <p className="section-3-list-title">Mobile App Development</p>
            <ul>
              <li className="section-3-list-item">
                Build high-quality, cross-platform mobile applications for iOS
                and Android using React Native, ensuring consistent performance
                and user experience on both platforms.
              </li>
              <li className="section-3-list-item">
                Implement intuitive and engaging user interfaces by translating
                design wireframes and prototypes into responsive,
                high-performance React Native components.
              </li>
              <li className="section-3-list-item">
                Manage application state effectively using libraries, ensuring
                data consistency and smooth interactions within the app.
              </li>
            </ul>
          </div>
        </div>
      </div>
  )
}

export default HomeSection3
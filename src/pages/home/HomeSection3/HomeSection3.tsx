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
            <p className="section-3-list-title">Backend Development</p>
            <ul>
              <li className="section-3-list-item">
                Build scalable microservices API for server-side applications and manage efficient databases to support web, mobile, IoT, etc functionality.
              </li>
              <li className="section-3-list-item">
                Build efficient database with relational databases (PostgreSQL, MySQL, etc) or NoSQL (Elasticsearch, MongoDB, etc), including schema design, indexing, and query optimization.
              </li>
              <li className="section-3-list-item">
                Architect advanced distributed backend architecture with interservices communication and load balancing.
              </li>
              <li className="section-3-list-item">
                Build real-time communication API using WebSocket connection.
              </li>
            </ul>
          </div>
          <div className="section-3-list-column">
            <p className="section-3-list-title">Frontend Development</p>
            <ul>
              <li className="section-3-list-item">
                Build responsive and accessible user interfaces with React, HTML, and CSS, ensuring compatibility across devices, browsers, and screen sizes.
              </li>
              <li className="section-3-list-item">
                Design and implement reusable React components for efficient and maintainable code, while crafting visually appealing and user-centered web pages.
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
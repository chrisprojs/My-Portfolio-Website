import React from 'react'
import './HomeSection2.css'

function HomeSection2() {
  return (
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
          src={require("./../../../asset/main_photo2.jpg")}
          className="profile-picture-2"
          alt="profile-picture-2"
          loading='lazy'
        />
      </div>
  )
}

export default HomeSection2
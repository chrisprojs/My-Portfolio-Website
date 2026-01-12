import React, { useEffect, useState } from 'react'
import './ContactBox.css'
import linkedin from "./../../../asset/contact-icon/linkedin.png";
import instagram from "./../../../asset/contact-icon/instagram.png";
import github from "./../../../asset/contact-icon/github.png";
import gmail from "./../../../asset/contact-icon/gmail.png";
import whatsapp from "./../../../asset/contact-icon/whatsapp.png";
import youtube from "./../../../asset/contact-icon/youtube.png";
import { PersonalInformation, formatPhoneNumber } from "../../../PersonalInformation";

function ContactBox() {
  const icons = [
    gmail,
    whatsapp,
    linkedin,
    instagram,
    github,
    youtube,
  ];

  const [currentIcon, setCurrentIcon] = useState(icons[0]); // Start with the first icon
  const [isOpened, setIsOpened] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prevIcon) => {
        const currentIndex = icons.indexOf(prevIcon);
        const nextIndex = (currentIndex + 1) % icons.length; // Loop back to the start
        return icons[nextIndex];
      });
    }, 1000); // Change every 1 second

    return () => clearInterval(interval); // Cleanup the interval on component unmount
  }, []);

  return (
    <div className={`contactBox-container ${isOpened ? 'activate': ''}`}>
      <div className='contactBox-box'>
        <div className='contactBox-grid'>
          <a href={`mailto:${PersonalInformation.emailLink}`} target="_blank" rel="noopener noreferrer" className='contactBox-icon'>
            <img src={gmail} alt='gmail-logo'/>
            <p>{PersonalInformation.emailLink}</p>
          </a>
          <a href={`https://wa.me/${PersonalInformation.phoneNumber.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className='contactBox-icon'>
            <img src={whatsapp} alt='whatsapp-logo'/>
            <p>{formatPhoneNumber(PersonalInformation.phoneNumber)}</p>
          </a>
          <a href={PersonalInformation.linkedinLink} target="_blank" rel="noopener noreferrer" className='contactBox-icon'>
            <img src={linkedin} alt='linkedin-logo'/>
            <p>Christian Antonius Anggaresta</p>
          </a>
          <a href={PersonalInformation.instagramLink} target="_blank" rel="noopener noreferrer" className='contactBox-icon'>
            <img src={instagram} alt='instagram-logo'/>
            <p>@chris88xyz</p>
          </a>
          <a href={PersonalInformation.youtubeLink} target="_blank" rel="noopener noreferrer" className='contactBox-icon'>
            <img src={youtube} alt='youtube-logo'/>
            <p>@christianantoniusanggarest3504</p>
          </a>
          <a href={PersonalInformation.githubLink} target="_blank" rel="noopener noreferrer" className='contactBox-icon'>
            <img src={github} alt='github-logo'/>
            <p>@chrisprojs</p>
          </a>
        </div>
      </div>
      <div className='contactBox-button' onClick={() => setIsOpened(!isOpened)}>
        <p>CONTACT</p>
        <img src={currentIcon} alt='current-icon'/>
      </div>
    </div>
  )
}

export default ContactBox
const portfolioImageRoot = './portfolio-image';

export const projects = [
  {
    title: 'BINUSMAYA LMS Website',
    details: "This project is a Learning Management System (LMS) created when I was in Bina Nusantara IT Division as an Associate Member. As part of the team, my primary focus was on the front end development of the LMS, which is a crucial tool for managing and delivering educational courses, training programs, or learning and development programs.",
    skills: ['React', 'JavaScript', 'CSS', 'TypeScript', 'Front End Development', 'Azure DevOps', 'Git', 'Software Engineering'],
    images: [
      { picture: require(`${portfolioImageRoot}/BINUSMAYA LMS Website/1.jpg`), desc: "Learning Management System Website for Binus University" },
      { picture: require(`${portfolioImageRoot}/BINUSMAYA LMS Website/2.jpg`), desc: "SSG4 Full Team Bina Nusantara IT Division" },
      { picture: require(`${portfolioImageRoot}/BINUSMAYA LMS Website/3.jpg`), desc: "Certification of Membership from Bina Nusantara IT Division for 1 year of working" }
    ],
    publicationLink: "https://binusmaya.binus.ac.id/",
    author: ["Bina Nusantara IT Division SSG4 Team"],
  },
  {
    title: 'My Portfolio Website',
    details: "This is a personal portfolio website designed to showcase the best work I have ever done. It serves as a digital resume and a gallery of your projects, highlighting your skills, experience, and accomplishments in the field of web development.",
    skills: ['React', 'JavaScript', 'CSS', 'TypeScript', 'Front End Development'],
    images: [
      { picture: require(`${portfolioImageRoot}/My Portfolio Website/1.jpg`), desc: "Portfolio page of what i have ever done before" },
      { picture: require(`${portfolioImageRoot}/My Portfolio Website/2.jpg`), desc: "Home page" },
      { picture: require(`${portfolioImageRoot}/My Portfolio Website/3.jpg`), desc: "My CV page" }
    ],
    publicationLink: "https://christian-antonius-portfolio.netlify.app/portfolio",
    author: ["Christian Antonius Anggaresta"],
  },
  {
    title: 'Gibapp Website',
    details: 'Gibapp is a Lost and Found website developed as a team project using Laravel. The primary responsibility was handling the front end development and some back end tasks. The site facilitates users to report lost items and search for found items, creating a community-driven platform to help people retrieve their lost possessions.',
    skills: ['Laravel', 'HTML', 'CSS', 'Back End Development'],
    images: [
      { picture: require(`${portfolioImageRoot}/Gibapp Website/1.jpg`), desc: "Page for reporting lost item" },
      { picture: require(`${portfolioImageRoot}/Gibapp Website/2.jpg`), desc: "List of lost item page" }
    ],
    publicationLink: "https://github.com/gibapp/gibapp",
    author: ["Christian Antonius Anggaresta", "Muhamad Fajar Faturohman", "Ashraf Alif Adillah", "Vincent Steve Kusnadi", "Mousa Khalil Mousa Ayesh", "Fitria Nulan Ramadhani"],
  },
  {
    title: 'Medicare Project Website',
    details: 'This website was a prototype for showcasing and selling various healthcare products. The focus was on creating a clean, professional, and easy-to-navigate website that could effectively display product information and facilitate online purchases.',
    skills: ['HTML', 'CSS', 'Javascript', 'Front End Development'],
    images: [
      { picture: require(`${portfolioImageRoot}/Medicare Project Website/1.jpg`), desc: "Home page" },
      { picture: require(`${portfolioImageRoot}/Medicare Project Website/2.jpg`), desc: "Products page" },
      { picture: require(`${portfolioImageRoot}/Medicare Project Website/3.jpg`), desc: "About Us page" }
    ],
    publicationLink: "https://github.com/chrisprojs/Medicare-Project-Website/tree/main",
    author: ["Christian Antonius Anggaresta"],
  },
  {
    title: 'Movie NET',
    details: 'Movie NET was the first website developed, serving as a movie listing platform. It allowed users to browse through a list of movies, view details, ratings, and other relevant information. This project was a learning experience in web development.',
    skills: ['HTML', 'CSS', 'JavaScript', 'Front End Development'],
    images: [
      { picture: require(`${portfolioImageRoot}/Movie NET/1.jpg`), desc: "Main page" },
      { picture: require(`${portfolioImageRoot}/Movie NET/2.jpg`), desc: "Trending Movies" },
      { picture: require(`${portfolioImageRoot}/Movie NET/3.jpg`), desc: "Superhero Movies" }
    ],
    publicationLink: "https://github.com/chrisprojs/Movie-NET",
    author: ["Christian Antonius Anggaresta"],
  },
  {
    title: 'Jasger Mobile App',
    details: 'Jasger is a mobile application developed collaboratively with friends for the Gemastik Audition. This project involved the development of a mobile application using React Native. I contributed in making interactive and responsive mobile front end and UI/UX for this app.',
    skills: ['React Native', 'Figma', 'UI/UX', 'Front End Development'],
    images: [
      { picture: require(`${portfolioImageRoot}/Jasger Mobile App/1.jpg`), desc: "Home Screen" },
      { picture: require(`${portfolioImageRoot}/Jasger Mobile App/2.jpg`), desc: "List of on going order Screen" },
      { picture: require(`${portfolioImageRoot}/Jasger Mobile App/3.jpg`), desc: "List of history Screen" },
      { picture: require(`${portfolioImageRoot}/Jasger Mobile App/4.jpg`), desc: "UI Prototype for Jasger Apps" },
    ],
    publicationLink: "https://github.com/chrisprojs/jasger_app_frontend",
    author: ["Christian Antonius Anggaresta", "Renaldi Apriyanto Kadang", "Ashraf Alif Adillah"],
  }
];
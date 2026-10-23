export interface Recommendation {
  name: string;
  header: string;
  profilePicture: string;
  letter: string;
  linkedinLink: string;
}

export const RecommendationList: Recommendation[] = [
  {
    name: "Joaquin Sanchez",
    header: "Ex-Tech Lead at Moladin | Ex-Samsung Electronics",
    profilePicture: require("../../../asset/recommendation-profile/joaquin sanchez.jpeg"),
    letter: `It was a pleasure working with Christian from the start of his internship all the way until my departure from Moladin. Although he preferred working on backend projects, he gladly supported the team in developing a WordPress site and handling PHP-based web development. This broadened his perspective and demonstrated his ability to work well across different domains and within a team setting.

Christian consistently sought feedback, was engaged and present in all meetings, and proved to be a dependable teammate throughout his time with us. I wholeheartedly endorse Christian and believe he has the drive and foundation to become a well-rounded engineer.`,
    linkedinLink: "https://www.linkedin.com/in/joaquin-sanchez-47385913/",
  },
  {
    name: "Tommy Dian Pratama",
    header: "Engineering Manager II at Moladin",
    profilePicture: require("../../../asset/recommendation-profile/tommy dian pratama.jpeg"),
    letter: `I had the absolute pleasure of working closely with Christian at Moladin.

Christian consistently delivers exceptional, high-quality code. What sets him apart is his long-term perspective—he routinely goes above and beyond to build software that is flexible, modular, and reusable, always engineering with future scalability and sustained business value in mind.

He would be an incredible asset to any engineering organization looking for a high-impact developer, and I would jump at the chance to work with him again.`,
    linkedinLink: "https://www.linkedin.com/in/vortexgin/",
  },
  {
    name: "Steven",
    header: "Tech Lead at Moladin | Ex-Pharos",
    profilePicture: require("../../../asset/recommendation-profile/steven.jpeg"),
    letter: `He is an exceptional employee with strong technical skills, consistently fulfilling most assigned tasks. He also possesses excellent problem-solving abilities. While we occasionally engage in spirited discussions during ideation, I believe this dynamic is beneficial for the company's overall success.`,
    linkedinLink: "https://www.linkedin.com/in/steven-steven-550446150/",
  },
  {
    name: "Egidius Vico",
    header: "Tech Lead at Moladin",
    profilePicture: require("../../../asset/recommendation-profile/egidius vico.jpeg"),
    letter: `I had the opportunity to work with Chris in Moladin, and I highly recommend him as an amazing software developer, especially in Golang.

Chris has strong technical expertise and consistently delivers high-quality solutions. He played an important role in building scalable Golang architecture that supported the team's growing needs, while also helping reduce operational costs through efficient and thoughtful engineering decisions.

What really stands out about Chris is his ability to solve problems quickly. He has a sharp analytical mindset and is especially good at figuring out practical ways to tackle difficult technical challenges. He was also instrumental in helping solve critical data loss issues, significantly improving the reliability and stability of our systems.

No matter how complex the issue, Chris is always able to break it down and find an effective solution. Beyond his technical skills, he is a reliable and collaborative colleague who is great to work with.`,
    linkedinLink: "https://www.linkedin.com/in/egidius-vico-11b789285/",
  },
  {
    name: "Charlie Lufian",
    header: "Fullstack Developer at Moladin",
    profilePicture: require("../../../asset/recommendation-profile/charlie lufian.jpeg"),
    letter: `I would highly recommend Christian as a colleague and professional. At Moladin, they showed strong problem-solving skills, worked efficiently, and collaborated well with the team. Their fast execution, positive attitude, and reliability made a real impact on our projects. I believe they would be an excellent addition to any team.`,
    linkedinLink: "https://www.linkedin.com/in/charlie-lufian-918428202/",
  },
  {
    name: "Alexander Bradley",
    header: "Software Engineer Intern at Moladin",
    profilePicture: require("../../../asset/recommendation-profile/alexander bradley.jpeg"),
    letter: `I had the pleasure of working with Christian as my senior coworker at Moladin, and I can confidently say that they are someone you can always rely on.
He consistently demonstrated strong technical skills, clear problem-solving abilities, and a calm, structured approach when handling complex tasks. What I appreciated most was their willingness to guide and support junior team members while still maintaining high standards for the team's output.
Beyond technical expertise, he communicates clearly, collaborates well across teams, and brings a positive, professional attitude to the workplace. I learned a lot from working alongside them, and I believe they would be a great asset to any team or organization.`,
    linkedinLink: "https://www.linkedin.com/in/alexander-bradley27/",
  },
];

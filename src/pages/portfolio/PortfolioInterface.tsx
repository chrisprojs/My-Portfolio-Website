export interface Skill {
  skill: string;
}

export interface Image {
  picture: string;
  desc: string;
}

export interface Author {
  author: string;
}

export interface Project {
  projectId: number;
  title: string;
  details: string;
  skills: Skill[];
  images: Image[];
  publicationLink: string;
  authors: Author[];
  likes: number;
}
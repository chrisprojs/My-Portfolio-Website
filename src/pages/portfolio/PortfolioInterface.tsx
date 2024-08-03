export interface Skill {
  projectSkillId: number;
  projectId: number;
  skill: string;
}

export interface Image {
  projectImageId: number;
  projectId: number;
  picture: string;
  desc: string;
}

export interface Author {
  projectAuthorId: number;
  projectId: number;
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
import { Project } from "./PortfolioInterface";

const apiUrl = process.env.REACT_APP_API_KEY

const portfolioImageRoot = './portfolio-image';

async function retryFetch(url: string, delay: number = 1000): Promise<Response> {
  while (1==1) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return response;
      } else {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.warn(`Fetch failed, retrying in ${delay}ms...`);
      await new Promise(res => setTimeout(res, delay));
    }
  }
  throw new Error('Failed to fetch data after multiple attempts');
}

const customSortOrder: Record<string, number> = {
  "BINUSMAYA LMS Website": 1,
  "My Portfolio Website": 2,
  "Eksotika Prima Rub Oil Supplier Website": 3
};

function customSort(a: Project, b: Project): number {
  const aOrder = customSortOrder[a.title] || Infinity;
  const bOrder = customSortOrder[b.title] || Infinity;
  return aOrder - bOrder;
}

// Function to fetch and transform project data
export async function getAllProjects(): Promise<Project[]> {
  try {
    const response = await retryFetch(`${apiUrl}/api/Projects`);
    const data = await response.json();
    const transformedData = data.map((project: { projectId: any; title: any; details: any; skills: any[]; images: any[]; publicationLink: any; authors: any[]; likes: any; }) => ({
      projectId: project.projectId,
      title: project.title,
      details: project.details,
      skills: project.skills.map((skill: { skill: any; }) => skill.skill),
      images: project.images.map((image: { picture: any; desc: any; }) => ({
        picture: require(`${portfolioImageRoot}/${image.picture}`),
        desc: image.desc
      })),
      publicationLink: project.publicationLink,
      authors: project.authors.map((author: { author: any; }) => author.author),
      likes: project.likes
    }));
    
    // Sort the transformed data
    return transformedData.sort(customSort)
  } catch (error) {
    console.error('Error fetching projects:', error);
    return []; // Return an empty array in case of error
  }
}

export async function likeProject(projectId: string): Promise<void> {
  try {
    const response = await fetch(`${apiUrl}/api/Projects/like/${projectId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
  } catch (error) {
    console.error('Error updating project likes:', error);
  }
}
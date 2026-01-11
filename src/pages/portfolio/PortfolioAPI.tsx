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

const customSortOrder = [
  "Vehicle Management System",
  "Moladin Marketplace",
  "Job Sprint API",
  "Rumah123.com",
  "KSN Informatika 2021 Provincial Level",
  "BINUSMAYA LMS Website",
  "Eksotika Prima Rub Oil Supplier Website",
  "AI Live Shopping",
  "Secure Auth With Golang",
  "My Portfolio Website",
  "Karya Asuh",
  "EduFun",
  "99 Back End Tech Challenge",
];

const leastImportantOrder = [
  "Deacon AI Product Photography"
];

function customSort(a: Project, b: Project): number {
  const aCustomOrder = customSortOrder.indexOf(a.title);
  const bCustomOrder = customSortOrder.indexOf(b.title);

  const aLeastImportant = leastImportantOrder.indexOf(a.title);
  const bLeastImportant = leastImportantOrder.indexOf(b.title);

  // Handle least important projects
  if (aLeastImportant !== -1 && bLeastImportant !== -1) {
    return aLeastImportant - bLeastImportant; // Compare within leastImportantOrder
  }
  if (aLeastImportant !== -1) return 1; // Move `a` to the end
  if (bLeastImportant !== -1) return -1; // Move `b` to the end

  // Handle custom sort order
  const aIndex = aCustomOrder !== -1 ? aCustomOrder : Infinity;
  const bIndex = bCustomOrder !== -1 ? bCustomOrder : Infinity;

  return aIndex - bIndex;
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
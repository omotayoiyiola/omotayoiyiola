export interface Project {
  title: string;
  description: string;
  technologies: string[];
  githubLink: string;
  demoLink: string;
  image: string;
}

export interface Blog {
  title: string;
  details: string;
  excerpt: string;
  youtubeLink: string;
  readMinute: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

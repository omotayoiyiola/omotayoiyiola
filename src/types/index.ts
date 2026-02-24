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
  excerpt: string;
  slug: string;
  date: string; // Existing field in your data
  readTime: string; // Existing field in your data
  // Make these optional so the error disappears
  details?: string;
  youtubeLink?: string;
  readMinute?: string | number;
  createdAt?: string;
  updatedAt?: string;
}

// lib/services/projects.ts
import prisma from "@/lib/prisma";
import { PortfolioProject } from "@/generated/prisma";

export const getProjects = async (): Promise<PortfolioProject[] | null> => {
  try {
    const projects = await prisma.portfolioProject.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return null;
  }
};

// You can add other CRUD functions here
// export const getProjectById = async (id: number) => { ... };
// export const createProject = async (data: any) => { ... };

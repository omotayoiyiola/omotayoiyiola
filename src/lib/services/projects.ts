// lib/services/projects.ts
import prisma from "@/lib/prisma";
import { Project } from "@prisma/client";

export const getProjects = async (): Promise<Project[] | null> => {
  try {
    const projects = await prisma.project.findMany();
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return null;
  }
};

// You can add other CRUD functions here
// export const getProjectById = async (id: number) => { ... };
// export const createProject = async (data: any) => { ... };

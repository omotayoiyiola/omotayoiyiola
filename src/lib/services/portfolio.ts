import prisma from "@/lib/prisma";

const emptyPortfolioData = {
  profile: null,
  featuredProjects: [],
  projects: [],
  workExperiences: [],
  educationHistory: [],
  certifications: [],
  blogs: [],
};

export async function getPortfolioData() {
  try {
    const [
      profile,
      featuredProjects,
      projects,
      workExperiences,
      educationHistory,
      certifications,
      blogs,
    ] = await Promise.all([
      prisma.profile.findFirst({ orderBy: { id: "asc" } }),
      prisma.portfolioProject.findMany({
        where: { isFeatured: true },
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
      prisma.portfolioProject.findMany({
        orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      }),
      prisma.workExperience.findMany({
        orderBy: [{ sortOrder: "asc" }, { startDate: "desc" }],
      }),
      prisma.educationHistory.findMany({
        orderBy: [{ sortOrder: "asc" }, { startYear: "desc" }],
      }),
      prisma.certification.findMany({
        orderBy: [{ sortOrder: "asc" }, { dateObtained: "desc" }],
      }),
      prisma.blog.findMany({
        where: { published: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return {
      profile,
      featuredProjects,
      projects,
      workExperiences,
      educationHistory,
      certifications,
      blogs,
    };
  } catch (error) {
    console.error("Failed to fetch portfolio data:", error);
    return emptyPortfolioData;
  }
}

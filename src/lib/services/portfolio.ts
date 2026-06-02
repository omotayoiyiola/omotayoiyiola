import prisma from "@/lib/prisma";

export async function getPortfolioData() {
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
}

// lib/services/blogs.ts
import prisma from "@/lib/prisma";
import { Blog } from "@/generated/prisma";

export const getBlogs = async (): Promise<Blog[] | null> => {
  try {
    const blogs = await prisma.blog.findMany({
      where: { published: true },
      orderBy: {
        createdAt: "desc", // Optional: Order by the most recent blogs
      },
    });
    return blogs;
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return null;
  }
};

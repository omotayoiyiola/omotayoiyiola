// lib/services/blogs.ts
import prisma from "@/lib/prisma";
import { Blog } from "@prisma/client";

export const getBlogs = async (): Promise<Blog[] | null> => {
  try {
    const blogs = await prisma.blog.findMany({
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

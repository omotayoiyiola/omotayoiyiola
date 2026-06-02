import type { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://omotayoiyiola.com";

const staticRoutes = ["", "/about", "/projects", "/blogs", "/contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const blogs = await prisma.blog
    .findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true },
      orderBy: { updatedAt: "desc" },
    })
    .catch(() => []);

  const routes: MetadataRoute.Sitemap = [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
      priority: route === "" ? 1 : 0.8,
    })),
    ...blogs.map((blog) => ({
      url: `${siteUrl}/blogs/${blog.slug}`,
      lastModified: blog.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return routes;
}

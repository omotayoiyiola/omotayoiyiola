import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "@/lib/services/blog";
import { toSafeUrl } from "@/lib/safe-url";

export const metadata: Metadata = {
  title: "Blog",
  description: "Published blog posts and notes.",
  alternates: { canonical: "/blogs" },
};

export const dynamic = "force-dynamic";

export default async function BlogsPage() {
  const blogs = (await getBlogs()) || [];

  return (
    <section className="bg-[#f4f7f8] py-20 dark:bg-[#101214]">
      <div className="container">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Blog
        </p>
        <h1 className="mt-3 text-5xl font-black">Latest posts</h1>
        <div className="mt-12 grid gap-7 lg:grid-cols-3">
          {blogs.map((blog) => {
            const featuredImage = toSafeUrl(blog.featuredImage);

            return (
            <article key={blog.id} className="overflow-hidden rounded-md border border-black/10 bg-white dark:border-white/10 dark:bg-dark">
              {featuredImage && (
                <div className="relative aspect-video">
                  <Image
                    src={featuredImage}
                    alt={blog.title}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6">
                <p className="text-sm font-semibold text-primary">
                  {blog.readMinute || 1} min read
                </p>
                <h2 className="mt-2 text-2xl font-black">{blog.title}</h2>
                <p className="mt-3 leading-7 text-secondary dark:text-gray-300">
                  {blog.excerpt}
                </p>
                <Link className="mt-5 inline-block font-semibold text-primary" href={`/blogs/${blog.slug}`}>
                  Read post
                </Link>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

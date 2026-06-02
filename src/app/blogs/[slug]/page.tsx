import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { toSafeUrl } from "@/lib/safe-url";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await prisma.blog.findFirst({
    where: { slug, published: true },
  });
  const featuredImage = toSafeUrl(blog?.featuredImage);

  return {
    title: blog?.title || "Blog post",
    description: blog?.excerpt,
    alternates: { canonical: `/blogs/${slug}` },
    openGraph: blog
      ? {
          title: blog.title,
          description: blog.excerpt,
          url: `/blogs/${slug}`,
          type: "article",
          images: featuredImage ? [{ url: featuredImage }] : undefined,
        }
      : undefined,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await prisma.blog.findFirst({ where: { slug, published: true } });
  if (!blog) notFound();
  const featuredImage = toSafeUrl(blog.featuredImage);

  return (
    <article className="bg-[#f4f7f8] py-20 dark:bg-[#101214]">
      <div className="container max-w-4xl">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          {blog.readMinute || 1} min read
        </p>
        <h1 className="mt-3 text-5xl font-black">{blog.title}</h1>
        <p className="mt-5 text-xl leading-8 text-secondary dark:text-gray-300">
          {blog.excerpt}
        </p>
        {featuredImage && (
          <div className="relative mt-10 aspect-video overflow-hidden rounded-md">
            <Image
              src={featuredImage}
              alt={blog.title}
              fill
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
            />
          </div>
        )}
        <div className="mt-10 whitespace-pre-line rounded-md border border-black/10 bg-white p-6 text-lg leading-8 dark:border-white/10 dark:bg-dark">
          {blog.details}
        </div>
      </div>
    </article>
  );
}

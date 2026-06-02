import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaPlay } from "react-icons/fa";
import { getPortfolioData } from "@/lib/services/portfolio";
import { toSafeUrl } from "@/lib/safe-url";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Project case studies, screenshots, demos, source links, and videos.",
  alternates: { canonical: "/projects" },
};

export const dynamic = "force-dynamic";

function mediaUrls(media: unknown) {
  if (!Array.isArray(media)) return [];
  return media
    .map((item) => {
      if (typeof item === "string") return item;
      if (item && typeof item === "object" && "url" in item) {
        return String(item.url || "");
      }
      return "";
    })
    .map((url) => toSafeUrl(url))
    .filter((url): url is string => Boolean(url));
}

export default async function ProjectPage() {
  const { projects } = await getPortfolioData();

  return (
    <section className="bg-[#f4f7f8] py-20 dark:bg-[#101214]">
      <div className="container">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Work gallery
          </p>
          <h1 className="mt-3 text-5xl font-black">Projects</h1>
          <p className="mt-5 text-lg leading-8 text-secondary dark:text-gray-300">
            Database-backed project records with screenshots, tech stacks, live
            links, repository links, and video media when available.
          </p>
        </div>

        <div className="mt-12 grid gap-7 lg:grid-cols-2">
          {projects.map((project) => {
            const urls = mediaUrls(project.media);
            const liveUrl = toSafeUrl(project.liveUrl, false);
            const repositoryUrl = toSafeUrl(project.repositoryUrl, false);
            const image =
              toSafeUrl(project.coverImage) ||
              urls[0] ||
              "/projects/portfolio-website.png";

            return (
              <article
                key={project.id}
                className="overflow-hidden rounded-md border border-black/10 bg-white dark:border-white/10 dark:bg-dark"
              >
                <div className="relative aspect-video bg-[#dfe8e4]">
                  <Image
                    src={image}
                    alt={`${project.title} screenshot`}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-2xl font-black">{project.title}</h2>
                    {project.year && (
                      <span className="rounded-md bg-black/5 px-3 py-1 text-sm font-bold dark:bg-white/10">
                        {project.year}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 leading-7 text-secondary dark:text-gray-300">
                    {project.summary}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.skillsUsed.map((item) => (
                      <span
                        key={item}
                        className="rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {urls.length > 1 && (
                    <div className="mt-5 grid grid-cols-3 gap-2">
                      {urls.slice(1, 4).map((url) => (
                        <div
                          key={url}
                          className="relative aspect-video overflow-hidden rounded-md bg-black/5"
                        >
                          {/\.(mp4|mov|webm|avi)$/i.test(url) ? (
                            <video
                              src={url}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <Image
                              src={url}
                              alt=""
                              fill
                              unoptimized
                              className="object-cover"
                              sizes="160px"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <div className="mt-6 flex flex-wrap gap-4 text-sm font-bold text-primary">
                    {liveUrl && <Link href={liveUrl}>Live demo</Link>}
                    {repositoryUrl && (
                      <Link
                        className="inline-flex items-center gap-2"
                        href={repositoryUrl}
                      >
                        <FaGithub aria-hidden /> Source
                      </Link>
                    )}
                    {urls.some((url) => /\.(mp4|mov|webm|avi)$/i.test(url)) && (
                      <span className="inline-flex items-center gap-2">
                        <FaPlay aria-hidden /> Video available
                      </span>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

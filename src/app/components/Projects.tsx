"use client";

import Image from "next/image";
import Link from "next/link";
import { PortfolioProject } from "@/generated/prisma";
import { toSafeUrl } from "@/lib/safe-url";

interface ProjectsProps {
  projects: PortfolioProject[];
}

function projectImage(project: PortfolioProject) {
  const coverImage = toSafeUrl(project.coverImage);
  if (coverImage) return coverImage;
  if (Array.isArray(project.media)) {
    const first = project.media.find(
      (item) => item && typeof item === "object" && "url" in item,
    );
    if (first && typeof first === "object" && "url" in first) {
      return toSafeUrl(String(first.url)) || "/projects/portfolio-website.png";
    }
  }
  return "/projects/portfolio-website.png";
}

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section className="container py-20">
      <h2 className="mb-12 text-center text-3xl font-bold">
        Featured Projects
      </h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {projects.map((project) => {
          const liveUrl = toSafeUrl(project.liveUrl, false);
          const repositoryUrl = toSafeUrl(project.repositoryUrl, false);

          return (
            <article
              key={project.id}
              className="rounded-md bg-white p-6 shadow-md dark:bg-dark/50"
            >
              <div className="relative mb-4 aspect-video overflow-hidden rounded-md">
                <Image
                  src={projectImage(project)}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-xl font-semibold">{project.title}</h3>
              <p className="mt-3 text-gray-600 dark:text-gray-300">
                {project.summary}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.skillsUsed.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md bg-primary/10 px-3 py-1 text-sm text-primary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-4 text-sm font-semibold text-primary">
                {liveUrl && <Link href={liveUrl}>Live</Link>}
                {repositoryUrl && <Link href={repositoryUrl}>Code</Link>}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

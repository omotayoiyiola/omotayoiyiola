import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { FaArrowRight, FaGithub, FaLinkedin, FaPlay } from "react-icons/fa";
import { getPortfolioData } from "@/lib/services/portfolio";
import { toSafeUrl } from "@/lib/safe-url";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export const dynamic = "force-dynamic";

function projectImage(project: { coverImage?: string | null; media: unknown }) {
  const coverImage = toSafeUrl(project.coverImage);
  if (coverImage) return coverImage;
  if (Array.isArray(project.media)) {
    const item = project.media.find(
      (media) => media && typeof media === "object" && "url" in media,
    );
    if (item && typeof item === "object" && "url" in item) {
      return toSafeUrl(String(item.url)) || "/projects/portfolio-website.png";
    }
  }
  return "/projects/portfolio-website.png";
}

function projectHasVideo(media: unknown) {
  if (!Array.isArray(media)) return false;

  return media.some((item) => {
    if (typeof item === "string") return /\.(mp4|mov|webm|avi)$/i.test(item);
    if (item && typeof item === "object" && "url" in item) {
      return /\.(mp4|mov|webm|avi)$/i.test(String(item.url || ""));
    }
    return false;
  });
}

export default async function Home() {
  const {
    profile,
    featuredProjects,
    projects,
    workExperiences,
    certifications,
    blogs,
  } = await getPortfolioData();
  const linkedinUrl = toSafeUrl(profile?.linkedinUrl, false);
  const githubUrl = toSafeUrl(profile?.githubUrl, false);
  const websiteUrl = toSafeUrl(profile?.websiteUrl, false);
  const profileImage = toSafeUrl(profile?.profileImageLarge) || "/profile.avif";
  const visibleProjects = featuredProjects.length
    ? featuredProjects
    : projects.slice(0, 3);

  return (
    <main className="bg-[#f4f7f8] text-[#171717] dark:bg-[#101214] dark:text-white">
      <section className="container grid min-h-[calc(100vh-6rem)] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Portfolio / Resume / Product Engineering
          </p>
          <h1 className="max-w-4xl text-5xl font-black leading-[1.02] text-balance md:text-7xl">
            {profile ? `${profile.firstName} ${profile.lastName}` : "Portfolio"}
          </h1>
          <p className="mt-5 max-w-2xl text-2xl font-semibold text-[#2f3a3f] dark:text-gray-200">
            {profile?.jobTitle || "Software Engineer and Product Builder"}
          </p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#4c565c] dark:text-gray-300">
            {profile?.aboutMessage || "A database-driven portfolio."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="btn btn-primary inline-flex items-center gap-2"
              href="/projects"
            >
              View projects <FaArrowRight aria-hidden />
            </Link>
            <Link
              className="btn border border-[#171717]/15 bg-white text-[#171717] hover:border-primary hover:text-primary dark:bg-dark dark:text-white"
              href="/about"
            >
              View resume
            </Link>
            <Link
              className="btn border border-[#171717]/15 bg-white text-[#171717] hover:border-primary hover:text-primary dark:bg-dark dark:text-white"
              href="/omotayo-iyiola-cv.pdf"
              target="_blank"
              rel="noreferrer"
            >
              CV
            </Link>
            {linkedinUrl && (
              <Link
                className="btn inline-flex items-center gap-2 text-secondary hover:text-primary"
                href={linkedinUrl}
              >
                <FaLinkedin aria-hidden /> LinkedIn
              </Link>
            )}
            {githubUrl && (
              <Link
                className="btn inline-flex items-center gap-2 text-secondary hover:text-primary"
                href={githubUrl}
              >
                <FaGithub aria-hidden /> GitHub
              </Link>
            )}
            {websiteUrl && (
              <Link
                className="btn inline-flex items-center gap-2 text-secondary hover:text-primary"
                href={websiteUrl}
              >
                Website
              </Link>
            )}
          </div>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-md border border-black/10 bg-white shadow-2xl shadow-black/10 dark:border-white/10 dark:bg-dark">
            <Image
              src={profileImage}
              alt={
                profile
                  ? `${profile.firstName} ${profile.lastName}`
                  : "Profile image"
              }
              fill
              priority
              unoptimized
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
          </div>
          <div className="absolute -bottom-6 left-6 right-6 rounded-md bg-[#122026] p-5 text-white shadow-xl">
            <p className="text-sm uppercase tracking-[0.16em] text-[#9bd4c4]">
              Availability
            </p>
            <p className="mt-2 text-lg font-semibold">
              {profile?.openToJobs
                ? "Open to new projects, roles, and collaborations."
                : "Focused on selected projects and collaborations."}
            </p>
          </div>
        </div>
      </section>

      <section className="border-y border-black/10 bg-white py-14 dark:border-white/10 dark:bg-[#15191d]">
        <div className="container grid gap-6 md:grid-cols-4">
          <Stat label="Projects" value={String(projects.length)} />
          <Stat label="Experience" value={String(workExperiences.length)} />
          <Stat label="Certifications" value={String(certifications.length)} />
          <Stat label="Blog posts" value={String(blogs.length)} />
        </div>
      </section>

      <section className="container py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Selected work
            </p>
            <h2 className="mt-3 text-4xl font-black">Projects with proof</h2>
          </div>
          <Link href="/projects" className="font-semibold text-primary">
            See all projects
          </Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="overflow-hidden rounded-md border border-black/10 bg-white dark:border-white/10 dark:bg-dark"
            >
              <div className="relative aspect-video bg-[#dfe8e4]">
                <Image
                  src={projectImage(project)}
                  alt={`${project.title} screenshot`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold">{project.title}</h3>
                <p className="mt-3 text-sm leading-6 text-secondary dark:text-gray-300">
                  {project.summary}
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.skillsUsed.slice(0, 5).map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-4 text-sm font-semibold">
                  {toSafeUrl(project.liveUrl, false) && (
                    <Link href={toSafeUrl(project.liveUrl, false) || ""}>
                      Live
                    </Link>
                  )}
                  {toSafeUrl(project.repositoryUrl, false) && (
                    <Link href={toSafeUrl(project.repositoryUrl, false) || ""}>
                      Code
                    </Link>
                  )}
                  {projectHasVideo(project.media) && (
                    <span className="inline-flex items-center gap-2">
                      <FaPlay aria-hidden /> Video
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#122026] py-20 text-white">
        <div className="container grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#9bd4c4]">
              Skills and experience
            </p>
            <h2 className="mt-3 text-4xl font-black">
              Database-driven resume depth
            </h2>
            <p className="mt-5 leading-7 text-gray-300">
              Skills, featured skills, work history, certifications, projects,
              and blog content are all managed from the admin dashboard.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {[
              ["Featured skills", profile?.featuredSkills || []],
              ["Skills", profile?.skills || []],
              ["Languages", profile?.languages || []],
              [
                "Certifications",
                certifications.map((item) => item.acronym || item.title),
              ],
            ].map(([category, items]) => (
              <div
                key={String(category)}
                className="rounded-md border border-white/10 bg-white/5 p-5"
              >
                <h3 className="font-bold">{String(category)}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {(items as string[]).map((item) => (
                    <span
                      key={item}
                      className="rounded-md bg-white/10 px-3 py-1 text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container mt-12 grid gap-5 lg:grid-cols-3">
          {workExperiences.slice(0, 3).map((item) => (
            <article
              key={item.id}
              className="rounded-md border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm text-[#9bd4c4]">
                {item.startDate} -{" "}
                {item.isCurrentRole ? "Present" : item.endDate}
              </p>
              <h3 className="mt-2 text-lg font-bold">{item.jobTitle}</h3>
              <p className="text-sm text-gray-300">{item.companyName}</p>
              <p className="mt-4 text-sm leading-6 text-gray-300">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm uppercase tracking-[0.14em] text-secondary">
        {label}
      </p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  );
}

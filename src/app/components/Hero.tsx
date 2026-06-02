"use client";

import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Profile } from "@/generated/prisma";
import { toSafeUrl } from "@/lib/safe-url";

interface HeroProps {
  data: Profile | null;
}

export default function Hero({ data }: HeroProps) {
  if (!data) return null;

  const profileImage =
    toSafeUrl(data.profileImageSmall) ||
    toSafeUrl(data.profileImageLarge) ||
    "/profile.avif";
  const githubUrl = toSafeUrl(data.githubUrl, false);
  const linkedinUrl = toSafeUrl(data.linkedinUrl, false);

  return (
    <section className="container py-28">
      <div className="mx-auto max-w-3xl text-center">
        <Image
          src={profileImage}
          alt={`${data.firstName} ${data.lastName}`}
          width={128}
          height={128}
          unoptimized
          className="mx-auto mb-6 h-32 w-32 rounded-full object-cover ring-2 ring-primary"
        />
        <h1 className="text-4xl font-black md:text-6xl">
          {data.firstName} {data.lastName}
        </h1>
        <p className="mt-5 text-xl text-secondary dark:text-gray-300">
          {data.jobTitle}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Link href="/projects" className="btn btn-primary">
            View Projects
          </Link>
          <Link href="/about" className="btn btn-secondary">
            Resume
          </Link>
          {githubUrl && (
            <Link href={githubUrl} className="inline-flex items-center gap-2 text-secondary hover:text-primary">
              <FaGithub /> GitHub
            </Link>
          )}
          {linkedinUrl && (
            <Link href={linkedinUrl} className="inline-flex items-center gap-2 text-secondary hover:text-primary">
              <FaLinkedin /> LinkedIn
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

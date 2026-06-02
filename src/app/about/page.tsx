import type { Metadata } from "next";
import { getPortfolioData } from "@/lib/services/portfolio";
import { toSafeUrl } from "@/lib/safe-url";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Resume, skills, work history, certifications, and profile information.",
  alternates: { canonical: "/about" },
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { profile, workExperiences, educationHistory, certifications } =
    await getPortfolioData();

  return (
    <div className="bg-[#f4f7f8] py-20 dark:bg-[#101214]">
      <div className="container">
        <div className="border-b border-black/10 pb-10 dark:border-white/10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Resume
          </p>
          <h1 className="mt-3 text-5xl font-black">
            {profile ? `${profile.firstName} ${profile.lastName}` : "Profile"}
          </h1>
          <p className="mt-3 text-2xl font-semibold text-[#2f3a3f] dark:text-gray-200">
            {profile?.jobTitle}
          </p>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-secondary dark:text-gray-300">
            {profile?.aboutMessage}
          </p>
        </div>

        <section className="grid gap-6 py-12 lg:grid-cols-3">
          <SkillCard title="Featured skills" items={profile?.featuredSkills || []} />
          <SkillCard title="Skills" items={profile?.skills || []} />
          <SkillCard title="Languages" items={profile?.languages || []} />
        </section>

        <section className="grid gap-10 lg:grid-cols-[1fr_0.75fr]">
          <div>
            <h2 className="text-3xl font-black">Work experience</h2>
            <div className="mt-6 space-y-5">
              {workExperiences.map((item) => (
                <article key={item.id} className="rounded-md border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark">
                  <p className="text-sm font-semibold text-primary">
                    {item.startDate} - {item.isCurrentRole ? "Present" : item.endDate}
                  </p>
                  <h3 className="mt-2 text-2xl font-black">{item.jobTitle}</h3>
                  <p className="font-semibold text-secondary dark:text-gray-300">
                    {item.companyName}
                  </p>
                  <p className="mt-4 leading-7 text-secondary dark:text-gray-300">
                    {item.description}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.technicalSkills.map((skill) => (
                      <span key={skill} className="rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-black">Education</h2>
            <div className="mt-6 space-y-5">
              {educationHistory.map((item) => (
                <article key={item.id} className="rounded-md border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark">
                  <p className="text-sm font-semibold text-primary">
                    {item.startYear} - {item.endYear || "Present"}
                  </p>
                  <h3 className="mt-2 text-xl font-black">{item.courseStudied}</h3>
                  <p className="font-semibold text-secondary dark:text-gray-300">
                    {item.school}
                  </p>
                  {item.description && (
                    <p className="mt-4 leading-7 text-secondary dark:text-gray-300">
                      {item.description}
                    </p>
                  )}
                </article>
              ))}
            </div>

            <h2 className="mt-10 text-3xl font-black">Certifications</h2>
            <div className="mt-6 space-y-5">
              {certifications.map((item) => (
                <CertificationCard key={item.id} certification={item} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function CertificationCard({
  certification,
}: {
  certification: {
    title: string;
    acronym: string | null;
    issuer: string;
    dateObtained: string | null;
    credentialUrl: string | null;
  };
}) {
  const credentialUrl = toSafeUrl(certification.credentialUrl, false);

  return (
    <article className="rounded-md border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark">
      <p className="text-sm font-semibold text-primary">
        {certification.dateObtained || "Credential"}
      </p>
      <h3 className="mt-2 text-xl font-black">
        {certification.title}
        {certification.acronym ? ` (${certification.acronym})` : ""}
      </h3>
      <p className="font-semibold text-secondary dark:text-gray-300">
        {certification.issuer}
      </p>
      {credentialUrl && (
        <a className="mt-4 inline-block font-semibold text-primary" href={credentialUrl}>
          View credential
        </a>
      )}
    </article>
  );
}

function SkillCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-md border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark">
      <h2 className="text-xl font-black">{title}</h2>
      <div className="mt-5 flex flex-wrap gap-2">
        {items.map((item) => (
          <span key={item} className="rounded-md bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

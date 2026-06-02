import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminOverviewPage() {
  const [projects, experiences, education, certifications, blogs] = await Promise.all([
    prisma.portfolioProject.count(),
    prisma.workExperience.count(),
    prisma.educationHistory.count(),
    prisma.certification.count(),
    prisma.blog.count(),
  ]);

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Dashboard
      </p>
      <h1 className="mt-3 text-4xl font-black">Content overview</h1>
      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        <OverviewCard label="Projects" value={projects} />
        <OverviewCard label="Work experiences" value={experiences} />
        <OverviewCard label="Education" value={education} />
        <OverviewCard label="Certifications" value={certifications} />
        <OverviewCard label="Blog posts" value={blogs} />
      </div>
    </section>
  );
}

function OverviewCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark">
      <p className="text-sm font-semibold uppercase tracking-[0.14em] text-secondary">
        {label}
      </p>
      <p className="mt-3 text-4xl font-black">{value}</p>
    </div>
  );
}

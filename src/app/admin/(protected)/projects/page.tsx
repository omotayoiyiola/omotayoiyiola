import prisma from "@/lib/prisma";
import {
  deletePortfolioProject,
  savePortfolioProject,
} from "../../actions";
import AdminNotice from "../../components/AdminNotice";
import {
  Checkbox,
  DeleteButton,
  Field,
  SubmitButton,
  TextArea,
} from "../../components/FormControls";
import MediaUploader from "../../components/MediaUploader";

export const dynamic = "force-dynamic";

type Project = Awaited<ReturnType<typeof prisma.portfolioProject.findMany>>[number];

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
    .filter(Boolean);
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const projects = await prisma.portfolioProject.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Portfolio
      </p>
      <h1 className="mt-3 text-4xl font-black">Projects</h1>
      <div className="mt-6">
        <AdminNotice success={params.success} error={params.error} />
      </div>
      <div className="mt-6 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <ProjectForm />
        <div className="space-y-5">
          {projects.map((project) => (
            <div key={project.id} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
              <ProjectForm project={project} />
              <form action={deletePortfolioProject} className="mt-4">
                <input type="hidden" name="id" value={project.id} />
                <DeleteButton />
              </form>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectForm({ project }: { project?: Project }) {
  return (
    <form action={savePortfolioProject} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
      <input type="hidden" name="id" defaultValue={project?.id} />
      <h2 className="text-xl font-black">{project ? "Edit project" : "Add project"}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" required defaultValue={project?.title} />
        <Field label="Slug" name="slug" defaultValue={project?.slug} />
        <Field label="Year" name="year" defaultValue={project?.year} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={project?.sortOrder ?? 0} />
        <Field label="Live URL" name="liveUrl" defaultValue={project?.liveUrl} />
        <Field label="Repository URL" name="repositoryUrl" defaultValue={project?.repositoryUrl} />
        <div className="md:col-span-2">
          <TextArea label="Summary" name="summary" required rows={4} defaultValue={project?.summary} />
        </div>
        <div className="md:col-span-2">
          <MediaUploader label="Cover image" name="coverImage" defaultValue={project?.coverImage} accept="image/*" />
        </div>
        <div className="md:col-span-2">
          <MediaUploader label="Project media images/videos" name="media" defaultValue={mediaUrls(project?.media)} multiple />
        </div>
        <div className="md:col-span-2">
          <TextArea label="Skills used" name="skillsUsed" defaultValue={project?.skillsUsed.join("\n")} />
        </div>
        <Checkbox label="Featured project" name="isFeatured" defaultChecked={project?.isFeatured} />
      </div>
      <div className="mt-5">
        <SubmitButton label={project ? "Save project" : "Create project"} />
      </div>
    </form>
  );
}

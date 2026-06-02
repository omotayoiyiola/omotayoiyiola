import prisma from "@/lib/prisma";
import {
  deleteWorkExperience,
  saveWorkExperience,
} from "../../actions";
import AdminNotice from "../../components/AdminNotice";
import {
  Checkbox,
  DeleteButton,
  Field,
  SubmitButton,
  TextArea,
} from "../../components/FormControls";

export const dynamic = "force-dynamic";

export default async function AdminWorkExperiencePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const items = await prisma.workExperience.findMany({
    orderBy: [{ sortOrder: "asc" }, { startDate: "desc" }],
  });

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Resume
      </p>
      <h1 className="mt-3 text-4xl font-black">Work experience</h1>
      <div className="mt-6">
        <AdminNotice success={params.success} error={params.error} />
      </div>
      <div className="mt-6 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <ExperienceForm />
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
              <ExperienceForm item={item} />
              <form action={deleteWorkExperience} className="mt-4">
                <input type="hidden" name="id" value={item.id} />
                <DeleteButton />
              </form>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceForm({
  item,
}: {
  item?: Awaited<ReturnType<typeof prisma.workExperience.findMany>>[number];
}) {
  return (
    <form action={saveWorkExperience} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
      <input type="hidden" name="id" defaultValue={item?.id} />
      <h2 className="text-xl font-black">{item ? "Edit role" : "Add role"}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Company name" name="companyName" required defaultValue={item?.companyName} />
        <Field label="Job title" name="jobTitle" required defaultValue={item?.jobTitle} />
        <Field label="Start date" name="startDate" type="month" required defaultValue={item?.startDate} />
        <Field label="End date" name="endDate" type="month" defaultValue={item?.endDate} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
        <div className="flex items-end">
          <Checkbox label="Current role" name="isCurrentRole" defaultChecked={item?.isCurrentRole} />
        </div>
        <div className="md:col-span-2">
          <TextArea label="Technical skills" name="technicalSkills" defaultValue={item?.technicalSkills.join("\n")} />
        </div>
        <div className="md:col-span-2">
          <TextArea label="Description" name="description" required rows={5} defaultValue={item?.description} />
        </div>
      </div>
      <div className="mt-5">
        <SubmitButton label={item ? "Save role" : "Create role"} />
      </div>
    </form>
  );
}

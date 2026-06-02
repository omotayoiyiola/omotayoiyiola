import prisma from "@/lib/prisma";
import { deleteEducationHistory, saveEducationHistory } from "../../actions";
import AdminNotice from "../../components/AdminNotice";
import {
  DeleteButton,
  Field,
  SubmitButton,
  TextArea,
} from "../../components/FormControls";

export const dynamic = "force-dynamic";

type Education = Awaited<ReturnType<typeof prisma.educationHistory.findMany>>[number];

export default async function AdminEducationPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const items = await prisma.educationHistory.findMany({
    orderBy: [{ sortOrder: "asc" }, { startYear: "desc" }],
  });

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Resume
      </p>
      <h1 className="mt-3 text-4xl font-black">Education history</h1>
      <div className="mt-6">
        <AdminNotice success={params.success} error={params.error} />
      </div>
      <div className="mt-6 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <EducationForm />
        <div className="space-y-5">
          {items.map((item) => (
            <div key={item.id} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
              <EducationForm item={item} />
              <form action={deleteEducationHistory} className="mt-4">
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

function EducationForm({ item }: { item?: Education }) {
  return (
    <form action={saveEducationHistory} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
      <input type="hidden" name="id" defaultValue={item?.id} />
      <h2 className="text-xl font-black">{item ? "Edit education" : "Add education"}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="School" name="school" required defaultValue={item?.school} />
        <Field label="Course studied" name="courseStudied" required defaultValue={item?.courseStudied} />
        <Field label="Start year" name="startYear" type="month" required defaultValue={item?.startYear} />
        <Field label="End year" name="endYear" type="month" defaultValue={item?.endYear} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
        <div className="md:col-span-2">
          <TextArea label="Description / research" name="description" rows={4} defaultValue={item?.description} />
        </div>
      </div>
      <div className="mt-5">
        <SubmitButton label={item ? "Save education" : "Create education"} />
      </div>
    </form>
  );
}

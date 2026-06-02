import prisma from "@/lib/prisma";
import { deleteCertification, saveCertification } from "../../actions";
import AdminNotice from "../../components/AdminNotice";
import {
  DeleteButton,
  Field,
  SubmitButton,
} from "../../components/FormControls";

export const dynamic = "force-dynamic";

type Certification = Awaited<ReturnType<typeof prisma.certification.findMany>>[number];

export default async function AdminCertificationsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const certifications = await prisma.certification.findMany({
    orderBy: [{ sortOrder: "asc" }, { dateObtained: "desc" }],
  });

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Resume
      </p>
      <h1 className="mt-3 text-4xl font-black">Certifications</h1>
      <div className="mt-6">
        <AdminNotice success={params.success} error={params.error} />
      </div>
      <div className="mt-6 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <CertificationForm />
        <div className="space-y-5">
          {certifications.map((certification) => (
            <div key={certification.id} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
              <CertificationForm certification={certification} />
              <form action={deleteCertification} className="mt-4">
                <input type="hidden" name="id" value={certification.id} />
                <DeleteButton />
              </form>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CertificationForm({
  certification,
}: {
  certification?: Certification;
}) {
  return (
    <form action={saveCertification} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
      <input type="hidden" name="id" defaultValue={certification?.id} />
      <h2 className="text-xl font-black">
        {certification ? "Edit certification" : "Add certification"}
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" required defaultValue={certification?.title} />
        <Field label="Acronym" name="acronym" defaultValue={certification?.acronym} />
        <Field label="Issuer" name="issuer" required defaultValue={certification?.issuer} />
        <Field label="Date obtained" name="dateObtained" type="month" defaultValue={certification?.dateObtained} />
        <Field label="Credential URL" name="credentialUrl" defaultValue={certification?.credentialUrl} />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={certification?.sortOrder ?? 0} />
      </div>
      <div className="mt-5">
        <SubmitButton label={certification ? "Save certification" : "Create certification"} />
      </div>
    </form>
  );
}

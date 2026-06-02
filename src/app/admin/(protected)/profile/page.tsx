import prisma from "@/lib/prisma";
import { saveProfile } from "../../actions";
import AdminNotice from "../../components/AdminNotice";
import {
  Checkbox,
  Field,
  SubmitButton,
  TextArea,
} from "../../components/FormControls";
import MediaUploader from "../../components/MediaUploader";

export const dynamic = "force-dynamic";

function formatDate(date?: Date | null) {
  return date ? date.toISOString().slice(0, 10) : "";
}

export default async function AdminProfilePage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const profile = await prisma.profile.findFirst({ orderBy: { id: "asc" } });

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Profile
      </p>
      <h1 className="mt-3 text-4xl font-black">Manage profile</h1>
      <div className="mt-6">
        <AdminNotice success={params.success} error={params.error} />
      </div>
      <form
        action={saveProfile}
        className="mt-6 rounded-md border border-black/10 bg-white p-6 dark:border-white/10 dark:bg-dark"
      >
        <input type="hidden" name="id" defaultValue={profile?.id} />
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="First name" name="firstName" required defaultValue={profile?.firstName} />
          <Field label="Last name" name="lastName" required defaultValue={profile?.lastName} />
          <Field label="Email" name="email" type="email" required defaultValue={profile?.email} />
          <Field label="Phone number" name="phoneNumber" defaultValue={profile?.phoneNumber} />
          <Field label="Username" name="username" required defaultValue={profile?.username} />
          <Field label="New password" name="password" type="password" placeholder="Leave blank to keep current password" />
          <Field label="Job title" name="jobTitle" required defaultValue={profile?.jobTitle} />
          <Field label="Date of birth" name="dateOfBirth" type="date" defaultValue={formatDate(profile?.dateOfBirth)} />
          <Field label="Gender" name="gender" defaultValue={profile?.gender} />
          <Field label="Country" name="country" defaultValue={profile?.country} />
          <Field label="State" name="state" defaultValue={profile?.state} />
          <div className="flex items-end">
            <Checkbox label="Open to jobs" name="openToJobs" defaultChecked={profile?.openToJobs} />
          </div>
          <div className="md:col-span-2">
            <TextArea label="About message" name="aboutMessage" required rows={6} defaultValue={profile?.aboutMessage} />
          </div>
          <MediaUploader label="Large profile image" name="profileImageLarge" defaultValue={profile?.profileImageLarge} accept="image/*" />
          <MediaUploader label="Small profile image" name="profileImageSmall" defaultValue={profile?.profileImageSmall} accept="image/*" />
          <TextArea label="Skills, comma or line separated" name="skills" defaultValue={profile?.skills.join("\n")} />
          <TextArea label="Featured skills, comma or line separated" name="featuredSkills" defaultValue={profile?.featuredSkills.join("\n")} />
          <TextArea label="Languages, comma or line separated" name="languages" defaultValue={profile?.languages.join("\n")} />
          <Field label="Facebook URL" name="facebookUrl" defaultValue={profile?.facebookUrl} />
          <Field label="X URL" name="xUrl" defaultValue={profile?.xUrl} />
          <Field label="LinkedIn URL" name="linkedinUrl" defaultValue={profile?.linkedinUrl} />
          <Field label="Instagram URL" name="instagramUrl" defaultValue={profile?.instagramUrl} />
          <Field label="TikTok URL" name="tiktokUrl" defaultValue={profile?.tiktokUrl} />
          <Field label="GitHub URL" name="githubUrl" defaultValue={profile?.githubUrl} />
          <Field label="Website URL" name="websiteUrl" defaultValue={profile?.websiteUrl} />
        </div>
        <div className="mt-6">
          <SubmitButton label="Save profile" />
        </div>
      </form>
    </section>
  );
}

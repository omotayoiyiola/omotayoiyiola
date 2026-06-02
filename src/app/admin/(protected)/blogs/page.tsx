import prisma from "@/lib/prisma";
import { deleteBlog, saveBlog } from "../../actions";
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

type Blog = Awaited<ReturnType<typeof prisma.blog.findMany>>[number];

function galleryUrls(value: unknown) {
  return Array.isArray(value) ? value.map(String).filter(Boolean) : [];
}

export default async function AdminBlogsPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const params = await searchParams;
  const blogs = await prisma.blog.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <section>
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
        Publishing
      </p>
      <h1 className="mt-3 text-4xl font-black">Blog posts</h1>
      <div className="mt-6">
        <AdminNotice success={params.success} error={params.error} />
      </div>
      <div className="mt-6 grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
        <BlogForm />
        <div className="space-y-5">
          {blogs.map((blog) => (
            <div key={blog.id} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
              <BlogForm blog={blog} />
              <form action={deleteBlog} className="mt-4">
                <input type="hidden" name="id" value={blog.id} />
                <DeleteButton />
              </form>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogForm({ blog }: { blog?: Blog }) {
  return (
    <form action={saveBlog} className="rounded-md border border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark">
      <input type="hidden" name="id" defaultValue={blog?.id} />
      <h2 className="text-xl font-black">{blog ? "Edit post" : "Add post"}</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Field label="Title" name="title" required defaultValue={blog?.title} />
        <Field label="Slug" name="slug" defaultValue={blog?.slug} />
        <Field label="Read minutes" name="readMinute" type="number" defaultValue={blog?.readMinute ?? 3} />
        <Field label="YouTube URL" name="youtubeLink" defaultValue={blog?.youtubeLink} />
        <div className="md:col-span-2">
          <TextArea label="Excerpt" name="excerpt" required rows={3} defaultValue={blog?.excerpt} />
        </div>
        <div className="md:col-span-2">
          <TextArea label="Details" name="details" required rows={8} defaultValue={blog?.details} />
        </div>
        <div className="md:col-span-2">
          <MediaUploader label="Featured image" name="featuredImage" defaultValue={blog?.featuredImage} accept="image/*" />
        </div>
        <div className="md:col-span-2">
          <MediaUploader label="Gallery images" name="galleryImages" defaultValue={galleryUrls(blog?.galleryImages)} multiple accept="image/*" />
        </div>
        <Checkbox label="Published" name="published" defaultChecked={blog?.published} />
      </div>
      <div className="mt-5">
        <SubmitButton label={blog ? "Save post" : "Create post"} />
      </div>
    </form>
  );
}

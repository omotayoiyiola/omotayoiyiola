import type { Metadata } from "next";
import { loginAction } from "../actions";
import AdminNotice from "../components/AdminNotice";
import { SubmitButton } from "../components/FormControls";

export const metadata: Metadata = {
  title: "Admin Login",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string; next?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f4f7f8] px-4 py-12 dark:bg-[#101214]">
      <section className="w-full max-w-md rounded-md border border-black/10 bg-white p-6 shadow-xl shadow-black/5 dark:border-white/10 dark:bg-dark">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
          Portfolio admin
        </p>
        <h1 className="mt-3 text-3xl font-black">Sign in</h1>
        <p className="mt-2 text-sm text-secondary dark:text-gray-300">
          Manage profile, work, projects, certifications, and blog content.
        </p>
        <div className="mt-6">
          <AdminNotice success={params.success} error={params.error} />
        </div>
        <form action={loginAction} className="mt-6 space-y-4">
          <input type="hidden" name="next" value={params.next || "/admin"} />
          <label className="block">
            <span className="text-sm font-semibold">Username</span>
            <input
              name="username"
              required
              className="mt-2 w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:border-primary dark:border-white/10 dark:bg-[#101214]"
            />
          </label>
          <label className="block">
            <span className="text-sm font-semibold">Password</span>
            <input
              name="password"
              type="password"
              required
              className="mt-2 w-full rounded-md border border-black/10 px-3 py-2 outline-none focus:border-primary dark:border-white/10 dark:bg-[#101214]"
            />
          </label>
          <SubmitButton label="Log in" />
        </form>
      </section>
    </main>
  );
}

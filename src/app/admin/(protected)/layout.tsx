import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { logoutAction } from "../actions";
import { getCurrentAdmin } from "@/lib/auth";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/profile", label: "Profile" },
  { href: "/admin/work-experience", label: "Work Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/certifications", label: "Certifications" },
  { href: "/admin/blogs", label: "Blogs" },
];

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#f4f7f8] text-[#171717] dark:bg-[#101214] dark:text-white">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-black/10 bg-white p-5 dark:border-white/10 dark:bg-dark lg:block">
        <Link href="/admin" className="text-xl font-black text-primary">
          Portfolio Admin
        </Link>
        <nav className="mt-8 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm font-semibold text-secondary hover:bg-primary/10 hover:text-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-black/10 bg-white/90 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-dark/90">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-secondary">Signed in as</p>
              <p className="font-bold">
                {admin.firstName} {admin.lastName}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex gap-2 overflow-x-auto lg:hidden">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-md bg-black/5 px-3 py-2 text-sm font-semibold dark:bg-white/10"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <form action={logoutAction}>
                <button className="rounded-md border border-black/10 px-3 py-2 text-sm font-semibold hover:border-primary hover:text-primary dark:border-white/10">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </header>
        <main className="px-4 py-8 md:px-8">{children}</main>
      </div>
    </div>
  );
}

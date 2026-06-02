import Link from "next/link";
import {
  FaEnvelope,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import prisma from "@/lib/prisma";
import { toSafeUrl } from "@/lib/safe-url";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "Resume" },
  { href: "/projects", label: "Projects" },
  { href: "/blogs", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

const contact = {
  phone: "+234-7031936856",
  email: "omotayoiyiola123@gmail.com",
};

export default async function Footer() {
  const profile = await prisma.profile
    .findFirst({
      orderBy: { id: "asc" },
      select: {
        facebookUrl: true,
        xUrl: true,
        linkedinUrl: true,
        instagramUrl: true,
        tiktokUrl: true,
        githubUrl: true,
      },
    })
    .catch(() => null);

  const socialLinks = [
    { href: toSafeUrl(profile?.linkedinUrl, false), label: "LinkedIn", icon: FaLinkedinIn },
    { href: toSafeUrl(profile?.githubUrl, false), label: "GitHub", icon: FaGithub },
    { href: toSafeUrl(profile?.xUrl, false), label: "X", icon: FaXTwitter },
    { href: toSafeUrl(profile?.facebookUrl, false), label: "Facebook", icon: FaFacebookF },
    { href: toSafeUrl(profile?.instagramUrl, false), label: "Instagram", icon: FaInstagram },
    { href: toSafeUrl(profile?.tiktokUrl, false), label: "TikTok", icon: FaTiktok },
  ].filter(
    (item): item is typeof item & { href: string } =>
      typeof item.href === "string" && item.href.length > 0
  );

  return (
    <footer className="border-t border-black/10 bg-white dark:border-white/10 dark:bg-dark">
      <div className="container py-10">
        <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <Link href="/" className="text-xl font-black text-primary">
              Omotayo Iyiola
            </Link>
            <p className="mt-3 max-w-md text-sm leading-6 text-secondary">
              Senior Full Stack, AI & Infrastructure Engineer building scalable
              SaaS, fintech, AI, cloud, and enterprise platforms.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 text-secondary transition-colors hover:border-primary hover:bg-primary hover:text-white dark:border-white/10"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              Pages
            </h2>
            <nav className="mt-4 grid gap-3 text-sm font-semibold text-secondary">
              {quickLinks.map((item) => (
                <Link key={item.href} href={item.href} className="hover:text-primary">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h2 className="text-sm font-black uppercase tracking-[0.18em] text-primary">
              Contact
            </h2>
            <div className="mt-4 space-y-3 text-sm font-semibold text-secondary">
              <a
                href={`tel:${contact.phone.replaceAll("-", "")}`}
                className="flex items-center gap-3 hover:text-primary"
              >
                <FaPhoneAlt className="h-4 w-4 text-primary" />
                {contact.phone}
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 hover:text-primary"
              >
                <FaEnvelope className="h-4 w-4 text-primary" />
                {contact.email}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-6 text-sm text-secondary dark:border-white/10 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Omotayo Iyiola. All rights reserved.</p>
          <Link href="/admin/login" className="font-semibold hover:text-primary">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}

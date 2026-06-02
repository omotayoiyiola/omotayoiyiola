import type { Metadata } from "next";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

export const metadata: Metadata = {
  metadataBase: new URL("https://omotayoiyiola.com"),
  title: {
    default: "Omotayo Iyiola | Software Engineer Portfolio",
    template: "%s | Omotayo Iyiola",
  },
  description:
    "Portfolio and resume for Omotayo Iyiola, a software engineer building full-stack products, dashboards, automations, and database-backed web applications.",
  openGraph: {
    title: "Omotayo Iyiola | Software Engineer Portfolio",
    description:
      "Projects, skills, experience, and resume content for Omotayo Iyiola.",
    url: "/",
    siteName: "Omotayo Iyiola",
    images: [{ url: "/profile.avif", width: 1200, height: 630 }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Omotayo Iyiola | Software Engineer Portfolio",
    description:
      "Projects, skills, experience, and resume content for Omotayo Iyiola.",
    images: ["/profile.avif"],
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white antialiased transition-colors dark:bg-gray-900 dark:text-white">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen pt-16">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

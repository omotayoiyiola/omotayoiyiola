// app/page.tsx
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Blogs from "./components/Blogs";
import NewsLetter from "./components/NewsLetter";
import Footer from "./components/Footer";

// Import your new service functions
import { getSettings } from "@/lib/services/settings";
import { getProjects } from "@/lib/services/projects";
import { getBlogs } from "@/lib/services/blog";

export default async function Home() {
  // Call the service functions to fetch data
  const settings = await getSettings();
  const projects = await getProjects();
  const blogs = await getBlogs();

  return (
    <section className="">
      <Hero data={settings} />
      <Projects projects={projects || []} />
      <Blogs blogs={blogs || []} />
      <NewsLetter />
      <Footer />
    </section>
  );
}

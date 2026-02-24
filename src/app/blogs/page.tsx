import { blogs } from "@/contents/blogs";
import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";

const BlogPage = () => {
  return (
    <section className="container max-w-7xl mx-auto py-20">
      <h2 className="text-3xl font-bold mb-12 text-center">Blog Posts</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <article
            key={blog.slug}
            className="bg-white dark:bg-dark/50 rounded-lg shadow-md p-6"
          >
            <Link href={`/blogs/${blog.slug}`}>
              <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                {blog.title}
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {blog.excerpt}
            </p>
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4">
              <span className="flex items-center">
                <FaCalendarAlt className="w-4 h-4 mr-1" />
                {new Date(blog.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>

              <span className="flex items-center">
                <FaClock className="w-4 h-4 mr-1" />
                {blog.readTime}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default BlogPage;

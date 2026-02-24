"use client";

import Link from "next/link";
import React from "react";
import { FaCalendarAlt, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, cardHoverSmall } from "@/utils/animations";
import { Blog } from "@/types";

interface BlogsProps {
  blogs: Blog[];
}

const Blogs = ({ blogs }: BlogsProps) => {
  return (
    <section className="py-20 container max-w-7xl mx-auto px-4">
      <motion.h2 className="text-3xl font-bold mb-12 text-center" {...fadeInUp}>
        Latest Blog Posts
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {blogs.map((blog) => (
          <motion.article
            key={blog.slug}
            className="bg-white dark:bg-dark/50 rounded-lg shadow-md p-6"
            variants={fadeInUp}
            {...cardHoverSmall}
          >
            <Link href={`/blogs/${blog.slug}`}>
              <motion.h3
                className="text-xl font-semibold mb-2 hover:text-primary transition-colors"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {blog.title}
              </motion.h3>
            </Link>
            <motion.p
              className="text-gray-600 dark:text-gray-300 mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {blog.excerpt}
            </motion.p>
            <motion.div
              className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.span
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <FaCalendarAlt className="w-4 h-4 mr-1" />
                {new Date(blog.createdAt ?? new Date()).toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
              </motion.span>

              <motion.span
                className="flex items-center"
                whileHover={{ scale: 1.05 }}
              >
                <FaClock className="w-4 h-4 mr-1" />
                {blog.readMinute}
              </motion.span>
            </motion.div>
          </motion.article>
        ))}
      </motion.div>
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/blogs"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            View All Posts
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Blogs;

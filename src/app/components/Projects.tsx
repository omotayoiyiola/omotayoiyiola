// "use client";

// import { projects } from "@/contents/projects";
// import Image from "next/image";
// import React from "react";
// import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { fadeInUp, staggerContainer, cardHoverSmall } from "@/utils/animations";

// const Projects = () => {
//   return (
//     <section className="py-20 container max-w-7xl mx-auto px-4">
//       <motion.h2 className="text-3xl font-bold mb-12 text-center" {...fadeInUp}>
//         Featured Projects
//       </motion.h2>
//       <motion.div
//         className="grid grid-cols-1 md:grid-cols-3 gap-8"
//         variants={staggerContainer}
//         initial="initial"
//         animate="animate"
//       >
//         {projects.map((project) => (
//           <motion.article
//             key={project.title}
//             className="bg-white dark:bg-dark/50 rounded-lg shadow-md p-6"
//             variants={fadeInUp}
//             {...cardHoverSmall}
//           >
//             <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
//               <Image
//                 src={project.image}
//                 alt={project.image}
//                 fill
//                 className="object-cover"
//                 sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
//               />
//             </div>
//             <motion.h3
//               className="text-xl font-semibold mb-2"
//               whileHover={{ x: 5 }}
//               transition={{ type: "spring", stiffness: 300 }}
//             >
//               {project.title}
//             </motion.h3>
//             <motion.p
//               className="text-gray-600 dark:text-gray-300 mb-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.2 }}
//             >
//               {project.description}
//             </motion.p>
//             <motion.div
//               className="flex flex-wrap gap-2 mb-4"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.3 }}
//             >
//               {project.technologies.map((tech) => (
//                 <motion.span
//                   key={tech}
//                   className="bg-primary/10 dark:bg-gray-700 text-primary px-3 py-1 rounded-full text-sm"
//                   whileHover={{ scale: 1.1 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   {tech}
//                 </motion.span>
//               ))}
//             </motion.div>
//             <motion.div
//               className="flex gap-4 mt-2"
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4 }}
//             >
//               <motion.a
//                 href={project.githubLink}
//                 target="_blank"
//                 className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
//                 whileHover={{ x: 5 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <FaGithub className="w-5 h-5" />
//                 <span>Code</span>
//               </motion.a>

//               <motion.a
//                 href={project.githubLink}
//                 target="_blank"
//                 className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
//                 whileHover={{ x: 5 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <FaExternalLinkAlt className="w-5 h-5" />
//                 <span>Live Demo</span>
//               </motion.a>
//             </motion.div>
//           </motion.article>
//         ))}
//       </motion.div>
//     </section>
//   );
// };

// export default Projects;

// components/Projects.tsx
"use client";

import Image from "next/image";
import React from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, cardHoverSmall } from "@/utils/animations";

// Import the Project type from the Prisma client
import { Project } from "@prisma/client";

// Define the type for the component's props
interface ProjectsProps {
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ projects }) => {
  return (
    <section className="py-20 container max-w-7xl mx-auto px-4">
      <motion.h2 className="text-3xl font-bold mb-12 text-center" {...fadeInUp}>
        Featured Projects
      </motion.h2>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Map over the 'projects' prop instead of hardcoded data */}
        {projects.map((project) => {
          // Parse the JSON strings for tech and images
          // The database returns a string, so we need to convert it to an array.
          const techArray: string[] = project.tech
            ? JSON.parse(project.tech)
            : [];
          const imagesArray: string[] = project.images
            ? JSON.parse(project.images)
            : [];

          return (
            <motion.article
              key={project.id} // Use the unique database ID as the key
              className="bg-white dark:bg-dark/50 rounded-lg shadow-md p-6"
              variants={fadeInUp}
              {...cardHoverSmall}
            >
              <div className="relative aspect-video mb-4 rounded-lg overflow-hidden">
                {imagesArray.length > 0 && (
                  <Image
                    src={imagesArray[0]} // Display the first image in the array
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                  />
                )}
              </div>
              <motion.h3
                className="text-xl font-semibold mb-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {project.title}
              </motion.h3>
              <motion.p
                className="text-gray-600 dark:text-gray-300 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {project.excerpt}
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {/* Map over the parsed tech array */}
                {techArray.map((tech) => (
                  <motion.span
                    key={tech}
                    className="bg-primary/10 dark:bg-gray-700 text-primary px-3 py-1 rounded-full text-sm"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tech}
                  </motion.span>
                ))}
              </motion.div>
              <motion.div
                className="flex gap-4 mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {/* Use the githubUrl from the database */}
                {project.githubUrl && (
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaGithub className="w-5 h-5" />
                    <span>Code</span>
                  </motion.a>
                )}

                {/* Use the demoUrl from the database */}
                {project.demoUrl && (
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    className="flex items-center gap-2 text-secondary hover:text-primary transition-colors"
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaExternalLinkAlt className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                )}
              </motion.div>
            </motion.article>
          );
        })}
      </motion.div>
    </section>
  );
};

export default Projects;

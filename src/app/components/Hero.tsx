// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import React from "react";
// import { FaGithub, FaLinkedin } from "react-icons/fa";
// import { FaX } from "react-icons/fa6";
// import { motion } from "framer-motion";
// import { fadeInUp, fadeIn, scaleIn } from "@/utils/animations";

// const Hero = () => {
//   return (
//     <section className="py-28 container max-w-7xl mx-auto px-4">
//       <div className="max-w-3xl mx-auto text-center">
//         <motion.div
//           className="flex flex-col items-center mb-4"
//           {...scaleIn}
//           transition={{ delay: 0.2 }}
//         >
//           <Image
//             src="/profile.avif"
//             alt="Profile image"
//             width={100}
//             height={100}
//             className="rounded-full mb-4 w-32 h-32 object-cover ring-2 ring-primary"
//           />
//         </motion.div>
//         <motion.h1
//           className="text-4xl md:text-6xl font-bold mb-6"
//           {...fadeInUp}
//           transition={{ delay: 0.3 }}
//         >
//           Hi, I&apos;m{" "}
//           <motion.span
//             className="text-primary"
//             {...fadeIn}
//             transition={{ delay: 0.8 }}
//           >
//             Omotayo Iyiola
//           </motion.span>
//         </motion.h1>
//         <motion.p
//           className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 "
//           {...fadeInUp}
//           transition={{ delay: 0.4 }}
//         >
//           Full Stack Developer | Team Lead | Open Source Enthusiast
//         </motion.p>
//         <motion.div
//           className="flex justify-center space-x-4 mb-8"
//           {...fadeInUp}
//           transition={{ delay: 0.5 }}
//         >
//           <motion.a
//             href="https://github.com"
//             className="text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300"
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaGithub />
//           </motion.a>
//           <motion.a
//             href="/"
//             className="text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300"
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaLinkedin />
//           </motion.a>
//           <motion.a
//             href="/"
//             className="text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300"
//             whileHover={{ scale: 1.2 }}
//             whileTap={{ scale: 0.9 }}
//           >
//             <FaX />
//           </motion.a>
//         </motion.div>
//         <motion.div
//           className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
//           {...fadeInUp}
//           transition={{ delay: 0.6 }}
//         >
//           {" "}
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Link
//               href="/projects"
//               className="bg-primary inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/80 transition-colors"
//             >
//               View Project
//             </Link>
//           </motion.div>
//           <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
//             <Link
//               href="/contact"
//               className="bg-gray-500 inline-block w-full md:w-auto text-gray hover:text-white px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors"
//             >
//               Contact Me
//             </Link>
//           </motion.div>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { FaX } from "react-icons/fa6";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, scaleIn } from "@/utils/animations";

// Import the Settings type from Prisma client for type safety
import { Settings } from "@prisma/client";

// Define the component's props with a type
interface HeroProps {
  data: Settings | null;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  // If no data is provided, the component won't render anything
  if (!data) {
    return null;
  }

  // Destructure the properties from the 'data' object
  const {
    firstName,
    lastName,
    roles,
    logo,
    githubUrl,
    linkedinUrl,
    xUrl,
    cvUrl,
  } = data;

  // The 'roles' field is stored as a JSON string; parse it back into an array
  const rolesArray: string[] = roles ? JSON.parse(roles) : [];

  return (
    <section className="py-28 container max-w-7xl mx-auto px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          className="flex flex-col items-center mb-4"
          {...scaleIn}
          transition={{ delay: 0.2 }}
        >
          <Image
            src={logo || "/profile.avif"} // Use the logo from the database, with a fallback
            alt="Profile image"
            width={100}
            height={100}
            className="rounded-full mb-4 w-32 h-32 object-cover ring-2 ring-primary"
          />
        </motion.div>
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          {...fadeInUp}
          transition={{ delay: 0.3 }}
        >
          Hi, I&apos;m{" "}
          <motion.span
            className="text-primary"
            {...fadeIn}
            transition={{ delay: 0.8 }}
          >
            {firstName} {lastName}
          </motion.span>
        </motion.h1>
        <motion.p
          className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 "
          {...fadeInUp}
          transition={{ delay: 0.4 }}
        >
          {/* Display the roles, separated by ' | ' */}
          {rolesArray.join(" | ")}
        </motion.p>
        <motion.div
          className="flex justify-center space-x-4 mb-8"
          {...fadeInUp}
          transition={{ delay: 0.5 }}
        >
          {githubUrl && (
            <motion.a
              href={githubUrl}
              className="text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub />
            </motion.a>
          )}
          {linkedinUrl && (
            <motion.a
              href={linkedinUrl}
              className="text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaLinkedin />
            </motion.a>
          )}
          {xUrl && (
            <motion.a
              href={xUrl}
              className="text-2xl text-gray-600 hover:text-primary dark:text-gray-300 transition-colors duration-300"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaX />
            </motion.a>
          )}
        </motion.div>
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4"
          {...fadeInUp}
          transition={{ delay: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/projects"
              className="bg-primary inline-block w-full md:w-auto text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/80 transition-colors"
            >
              View Project
            </Link>
          </motion.div>
          {cvUrl && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href={cvUrl}
                className="bg-gray-500 inline-block w-full md:w-auto text-gray hover:text-white px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Download CV
              </Link>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

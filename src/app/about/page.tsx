import React from "react";
import { FaCode, FaLaptopCode } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="container max-w-7xl mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8 text-center">About Me</h1>
      <section className="mb-16">
        <p className="text-lg text-secondary max-w-3xl mx-auto text-center">
          I am a passionate Full Stack Developer with a focus on building
          scalable web applications. With expertise in both frontend and backend
          technologies, I enjoy creating seamless user experiences and efficient
          server-side solutions. My journey in tech has been driven by a love
          for problem-solving and continuous learning.
        </p>
      </section>
      <section className="mb-16">
        <h2 className="section-title">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <FaCode className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Backend</h3>
            <ul className="text-secondary space-y-2">
              <li>Node.js</li>
              <li>Express.js</li>
              <li>Tailwind CSS</li>
              <li>HTML5 / CSS3</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <FaLaptopCode className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Frontend</h3>
            <ul className="text-secondary space-y-2">
              <li>React.js</li>
              <li>Next.js</li>
              <li>MySQL</li>
              <li>MongoDB</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <FaCode className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Tools</h3>
            <ul className="text-secondary space-y-2">
              <li>Git/GitHub</li>
              <li>Docker</li>
              <li>MySQL</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="section-title">Experiences</h2>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Senior Full Stack Developer
            </h3>
            <p className="text-primary mb-2">Company Name • 2020 - Present</p>
            <ul className="text-secondary list-disc list-inside space-y-2">
              <li>
                Led development of multiple web applications using React and
                Node.js
              </li>
              <li>
                Implemented CI/CD pipelines reducing deployment time by 50%
              </li>
              <li>Mentored junior developers and conducted code reviews</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Senior Full Stack Developer
            </h3>
            <p className="text-primary mb-2">Company Name • 2020 - Present</p>
            <ul className="text-secondary list-disc list-inside space-y-2">
              <li>
                Led development of multiple web applications using React and
                Node.js
              </li>
              <li>
                Implemented CI/CD pipelines reducing deployment time by 50%
              </li>
              <li>Mentored junior developers and conducted code reviews</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="section-title">Education</h2>

        <div className="max-w-3xl mx-auto space-y-8">
          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Bachelor of Science in Computer Science
            </h3>
            <p className="text-primary mb-2">University Name • 2014 - 2018</p>
            <p className="text-secondary">
              Graduated with honors. Focused on software engineering and web
              development.
            </p>
          </div>

          <div className="bg-white dark:bg-dark/50 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">
              Bachelor of Science in Computer Science
            </h3>
            <p className="text-primary mb-2">University Name • 2014 - 2018</p>
            <p className="text-secondary">
              Graduated with honors. Focused on software engineering and web
              development.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

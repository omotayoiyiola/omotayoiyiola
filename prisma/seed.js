const { PrismaClient } = require("../src/generated/prisma");
const crypto = require("node:crypto");

const prisma = new PrismaClient();

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

const cvSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "React Native (Expo)",
  "TailwindCSS",
  "MUI",
  "Ant Design",
  "Node.js",
  "Express.js",
  "NestJS",
  "Python",
  "Flask",
  "FastAPI",
  "Django",
  "Sequelize",
  "Prisma",
  "LangChain",
  "OpenAI API",
  "RAG Pipelines",
  "ChromaDB",
  "Vector Search",
  "Prompt Engineering",
  "NLP",
  "RLHF",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "Redis",
  "AWS EC2",
  "AWS Lambda",
  "AWS RDS",
  "AWS S3",
  "Azure",
  "Docker",
  "Nginx",
  "CI/CD",
  "GitHub Actions",
  "GitLab",
  "Cisco Routing & Switching",
  "VLAN Configuration",
  "Network Security",
  "LAN/WAN Deployment",
  "Systems Administration",
  "Jest",
  "Mocha",
  "Git",
  "Jira",
  "Trello",
  "Figma",
  "Postman",
];

async function main() {
  const username = process.env.ADMIN_USERNAME || "admin";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const existingProfile = await prisma.profile.findUnique({ where: { username } });

  await prisma.profile.upsert({
    where: { username },
    update: {
      firstName: "Omotayo",
      lastName: "Iyiola",
      email: "clintonty@gmail.com",
      phoneNumber: "+234-7031936856",
      jobTitle: "Senior Full Stack, AI & Infrastructure Engineer",
      country: "Nigeria",
      state: "Lagos",
      profileImageLarge: existingProfile?.profileImageLarge || "/profile.avif",
      profileImageSmall: existingProfile?.profileImageSmall || "/profile.avif",
      aboutMessage:
        "Senior Full Stack, AI & Infrastructure Engineer with 10+ years of experience building scalable SaaS, fintech, AI-powered, and enterprise platforms across web, mobile, and cloud environments. Expert in React, Next.js, Node.js, Python, PostgreSQL, AWS, and LLM integrations, with strong experience leading end-to-end product delivery, multi-tenant architectures, API ecosystems, and AI automation systems.",
      skills: cvSkills,
      featuredSkills: [
        "Full Stack Engineering",
        "AI & LLM Systems",
        "SaaS Architecture",
        "Fintech Platforms",
        "Enterprise Infrastructure",
        "Cloud & DevOps",
        "Product Leadership",
        "API Integrations",
        "Team Leadership",
        "Agile Delivery",
        "Technical Mentorship",
      ],
      languages: ["English"],
      openToJobs: true,
      linkedinUrl: "https://linkedin.com/in/omotayoiyiola",
      websiteUrl: "https://omotayoiyiola.com",
      passwordHash: existingProfile?.passwordHash || hashPassword(password),
    },
    create: {
      firstName: "Omotayo",
      lastName: "Iyiola",
      email: "clintonty@gmail.com",
      phoneNumber: "+234-7031936856",
      username,
      passwordHash: hashPassword(password),
      jobTitle: "Senior Full Stack, AI & Infrastructure Engineer",
      country: "Nigeria",
      state: "Lagos",
      profileImageLarge: "/profile.avif",
      profileImageSmall: "/profile.avif",
      aboutMessage:
        "Senior Full Stack, AI & Infrastructure Engineer with 10+ years of experience building scalable SaaS, fintech, AI-powered, and enterprise platforms across web, mobile, and cloud environments. Expert in React, Next.js, Node.js, Python, PostgreSQL, AWS, and LLM integrations, with strong experience leading end-to-end product delivery, multi-tenant architectures, API ecosystems, and AI automation systems.",
      skills: cvSkills,
      featuredSkills: [
        "Full Stack Engineering",
        "AI & LLM Systems",
        "SaaS Architecture",
        "Fintech Platforms",
        "Enterprise Infrastructure",
        "Cloud & DevOps",
        "Product Leadership",
        "API Integrations",
        "Team Leadership",
        "Agile Delivery",
        "Technical Mentorship",
      ],
      languages: ["English"],
      openToJobs: true,
      linkedinUrl: "https://linkedin.com/in/omotayoiyiola",
      websiteUrl: "https://omotayoiyiola.com",
    },
  });

  await prisma.workExperience.deleteMany();
  await prisma.educationHistory.deleteMany();
  await prisma.portfolioProject.deleteMany();
  await prisma.certification.deleteMany();

  await prisma.workExperience.createMany({
    data: [
      {
        companyName: "Michofat Konsult Limited",
        jobTitle: "Senior Software Engineer / Technical Lead",
        technicalSkills: ["React", "Next.js", "Node.js", "Python", "PostgreSQL", "AWS", "React Native", "Prisma"],
        startDate: "2024-01",
        endDate: null,
        isCurrentRole: true,
        sortOrder: 1,
        description:
          "Led development of enterprise SaaS, fintech, ecommerce, AI, and mobile applications across multiple industries. Managed architecture decisions, backend systems, cloud deployments, API integrations, product delivery workflows, and coordinated frontend, backend, and mobile engineering efforts. Participated in infrastructure and networking deployments including VLAN configuration, routing/switching, network security, and systems integration.",
      },
      {
        companyName: "Turing",
        jobTitle: "LLM Trainer",
        technicalSkills: ["Prompt Engineering", "RLHF", "Function Calling", "Tool Usage", "Structured Data Generation"],
        startDate: "2024-11",
        endDate: "2025-04",
        isCurrentRole: false,
        sortOrder: 2,
        description:
          "Trained and evaluated LLM systems through prompt engineering, multi-turn conversations, RLHF workflows, and structured data generation. Designed task pipelines for function calling, tool usage, and conversational AI evaluation.",
      },
      {
        companyName: "Mahshell Soft",
        jobTitle: "Frontend Team Lead – Bluecounts Project",
        technicalSkills: ["React", "TypeScript", "Azure DevOps", "Git", "Frontend Architecture"],
        startDate: "2025-03",
        endDate: "2025-05",
        isCurrentRole: false,
        sortOrder: 3,
        description:
          "Led frontend engineering for a business management platform covering POS, inventory, invoicing, and reporting systems. Managed React/TypeScript architecture, Azure DevOps workflows, Git strategy, and deployment pipelines.",
      },
      {
        companyName: "LogaXP",
        jobTitle: "Lead Software Engineer",
        technicalSkills: ["React", "Node.js", "NLP", "CI/CD", "Code Review", "Production Deployment"],
        startDate: "2024-08",
        endDate: "2025-01",
        isCurrentRole: false,
        sortOrder: 4,
        description:
          "Led development of AI-powered HRIS and evaluation systems using React, Node.js, and NLP tooling. Directed backend architecture, CI/CD processes, code reviews, and production deployments.",
      },
      {
        companyName: "Sales Agency",
        jobTitle: "Senior Full Stack Developer (Contract)",
        technicalSkills: ["React Flow", "Backend APIs", "Campaign Automation", "Reporting Infrastructure"],
        startDate: "2023-08",
        endDate: "2023-12",
        isCurrentRole: false,
        sortOrder: 5,
        description:
          "Built and maintained multiple full-stack platforms including advanced email campaign systems using React Flow. Developed suppression and blacklist tooling processing millions of email records and hashed datasets, plus backend APIs, campaign automation systems, and reporting infrastructure.",
      },
      {
        companyName: "Yaba College of Technology",
        jobTitle: "Assistant Chief Program Analyst / Head of Software Engineering (Webometrics)",
        technicalSkills: ["Educational Systems", "HR Systems", "Enterprise Systems", "SEO", "Network Infrastructure", "Mobile Applications"],
        startDate: "2009-01",
        endDate: "2023-12",
        isCurrentRole: false,
        sortOrder: 6,
        description:
          "Spearheaded development of 15+ educational, HR, and enterprise systems improving operational efficiency and revenue generation. Led Webometrics initiatives that ranked Yabatech #1 in Nigeria for five consecutive years. Built staff portals, ID verification systems, SEO platforms, institutional mobile applications, and managed secured college-wide network infrastructure and enterprise systems deployments.",
      },
      {
        companyName: "Amclint Solutions",
        jobTitle: "Software Developer (Part-Time)",
        technicalSkills: ["CBT Systems", "Educational Systems", "Analytics Dashboards", "Mobile/Web Learning Systems"],
        startDate: "2015-01",
        endDate: "2017-12",
        isCurrentRole: false,
        sortOrder: 7,
        description:
          "Developed CBT and educational systems serving over 15,000 students. Built analytics dashboards and mobile/web learning systems.",
      },
    ],
  });

  await prisma.educationHistory.createMany({
    data: [
      {
        school: "University of Ibadan",
        courseStudied: "MSc. Communication Systems Engineering",
        startYear: "2015-01",
        endYear: "2017-12",
        sortOrder: 1,
        description:
          "Research: Improving the Spectral Efficiency of 4G LTE Towards Fulfillment of 5G Mobile Communication Technology Requirements.",
      },
      {
        school: "Ladoke Akintola University of Technology",
        courseStudied: "BTech. Electronic/Electrical Engineering",
        startYear: "2002-01",
        endYear: "2007-12",
        sortOrder: 2,
        description:
          "Research: Design and implementation of a 1.8m diameter C-Band satellite dish for free-to-air television access.",
      },
    ],
  });

  const projects = [
    {
      title: "FlexiCoop – Multi-Tenant Fintech SaaS",
      slug: "flexicoop-multi-tenant-fintech-saas",
      summary:
        "Cooperative management platform serving 30+ organizations with loans, savings, receivables, accounting workflows, approvals, notifications, and role-based dashboards.",
      year: "2024",
      skillsUsed: ["React Native", "React", "Node.js", "PostgreSQL", "Cloud Infrastructure", "Fintech"],
      sortOrder: 1,
      isFeatured: true,
    },
    {
      title: "Scavenge – Ecommerce Marketplace",
      slug: "scavenge-ecommerce-marketplace",
      summary:
        "Full ecommerce ecosystem with payment integration, realtime notifications, messaging, inventory workflows, mobile apps, wallet flows, and cloud storage infrastructure.",
      year: "2024",
      skillsUsed: ["Ecommerce", "Node.js", "Realtime APIs", "Payments", "Mobile Apps", "Cloud Storage"],
      sortOrder: 2,
      isFeatured: true,
    },
    {
      title: "Fivage – Cloud Storage SaaS",
      slug: "fivage-cloud-storage-saas",
      summary:
        "Scalable storage infrastructure with Paystack billing integration, API key provisioning, file management, and secure authentication systems.",
      year: "2024",
      skillsUsed: ["SaaS", "Storage Infrastructure", "Paystack", "API Keys", "Authentication"],
      sortOrder: 3,
      isFeatured: true,
    },
    {
      title: "CoralQuest – Streaming Platform",
      slug: "coralquest-streaming-platform",
      summary:
        "Streaming and media platform using Next.js, Prisma, PostgreSQL, and SEO-optimized content routing.",
      year: "2024",
      skillsUsed: ["Next.js", "Prisma", "PostgreSQL", "Streaming", "SEO"],
      sortOrder: 4,
      isFeatured: false,
    },
    {
      title: "IntelliTest – AI Assessment Platform",
      slug: "intellitest-ai-assessment-platform",
      summary:
        "AI-powered assessment platform using React, NestJS, PostgreSQL, LangChain, and OpenAI workflows for automated evaluation and scoring.",
      year: "2024",
      skillsUsed: ["React", "NestJS", "PostgreSQL", "LangChain", "OpenAI", "AI Assessment"],
      sortOrder: 5,
      isFeatured: true,
    },
    {
      title: "Voice-Enabled AI Copilot",
      slug: "voice-enabled-ai-copilot",
      summary:
        "Conversational RAG assistant using Flask, LangChain, ChromaDB, OpenAI, and ElevenLabs with voice-enabled avatar interaction and intelligent retrieval systems.",
      year: "2024",
      skillsUsed: ["Flask", "LangChain", "ChromaDB", "OpenAI", "ElevenLabs", "RAG"],
      sortOrder: 6,
      isFeatured: true,
    },
    {
      title: "Embassy Family, NPC HURIS, DWSuch & Mobile Apps",
      slug: "embassy-family-npc-huris-dwsuch-mobile-apps",
      summary:
        "Multiple production React Native Expo mobile applications with realtime APIs, authentication systems, offline handling, push notifications, and cloud integrations.",
      year: "2024",
      skillsUsed: ["React Native", "Expo", "Realtime APIs", "Authentication", "Offline Handling", "Push Notifications"],
      sortOrder: 7,
      isFeatured: false,
    },
    {
      title: "Bluecounts Business Management Platform",
      slug: "bluecounts-business-management-platform",
      summary:
        "Business management platform covering POS, inventory, invoicing, reporting systems, frontend architecture, and deployment workflows.",
      year: "2025",
      skillsUsed: ["React", "TypeScript", "POS", "Inventory", "Invoicing", "Azure DevOps"],
      sortOrder: 8,
      isFeatured: false,
    },
  ];

  for (const project of projects) {
    await prisma.portfolioProject.create({
      data: {
        ...project,
        coverImage: null,
        liveUrl: null,
        repositoryUrl: null,
        media: [],
      },
    });
  }

  await prisma.certification.createMany({
    data: [
      {
        title: "Cisco Certified Network Professional",
        acronym: "CCNP",
        issuer: "Cisco",
        dateObtained: null,
        credentialUrl: null,
        sortOrder: 1,
      },
      {
        title: "Cisco Certified Network Associate",
        acronym: "CCNA",
        issuer: "Cisco",
        dateObtained: null,
        credentialUrl: null,
        sortOrder: 2,
      },
      {
        title: "Fundamentals of Digital Marketing",
        acronym: null,
        issuer: "Google / Digital Marketing Training",
        dateObtained: null,
        credentialUrl: null,
        sortOrder: 3,
      },
    ],
  });

  await prisma.blog.upsert({
    where: { slug: "senior-full-stack-ai-infrastructure-engineering" },
    update: {
      title: "Senior Full Stack, AI & Infrastructure Engineering",
      excerpt:
        "A professional overview of Omotayo Iyiola's experience across SaaS, fintech, AI systems, enterprise infrastructure, and product leadership.",
      details:
        "Omotayo Iyiola is a Senior Full Stack, AI & Infrastructure Engineer with 10+ years of experience building scalable SaaS, fintech, AI-powered, and enterprise platforms across web, mobile, and cloud environments. His work spans React, Next.js, Node.js, Python, PostgreSQL, AWS, LLM integrations, multi-tenant architectures, API ecosystems, and AI automation systems.",
      readMinute: 3,
      published: true,
    },
    create: {
      title: "Senior Full Stack, AI & Infrastructure Engineering",
      slug: "senior-full-stack-ai-infrastructure-engineering",
      excerpt:
        "A professional overview of Omotayo Iyiola's experience across SaaS, fintech, AI systems, enterprise infrastructure, and product leadership.",
      details:
        "Omotayo Iyiola is a Senior Full Stack, AI & Infrastructure Engineer with 10+ years of experience building scalable SaaS, fintech, AI-powered, and enterprise platforms across web, mobile, and cloud environments. His work spans React, Next.js, Node.js, Python, PostgreSQL, AWS, LLM integrations, multi-tenant architectures, API ecosystems, and AI automation systems.",
      readMinute: 3,
      published: true,
      featuredImage: null,
      galleryImages: [],
      youtubeLink: null,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });

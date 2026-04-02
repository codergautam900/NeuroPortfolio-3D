export const profile = {
  name: "Gautam Sagar",
  role: "Full Stack Developer",
  location: "India / IST",
  availability: "Open for internships, product roles, and freelance collaborations",
  email: "gateaspirant@gmail.com",
  resumeHref: "/Gautam-sagar-Resume.pdf",
  intro:
    "I build end-to-end web products across MERN and Next.js, combining strong frontend engineering with scalable backend systems, real-time features, and practical AI integrations. My focus is shipping usable products with clean UI, solid APIs, auth, data modeling, and production-minded structure.",
  taglineFallback:
    "Shipping full-stack web systems with clean UI, realtime thinking, and practical AI-powered features.",
  stats: [
    { value: "1 Month", label: "SustainOS AI build cycle" },
    { value: "36h", label: "FOSSHack sprint push" },
    { value: "AI + ML", label: "flagship system core" },
  ],
} as const;

export const neuralSkills = [
  {
    name: "Java + DSA",
    level: 80,
    description:
      "Object-oriented programming, data structures, algorithms, and core CS thinking used to solve problems with structure.",
    cluster: "CS Foundations",
  },
  {
    name: "Problem Solving",
    level: 82,
    description:
      "Debugging, logical reasoning, and step-by-step problem breakdown from basic to intermediate complexity.",
    cluster: "CS Foundations",
  },
  {
    name: "HTML + CSS",
    level: 90,
    description:
      "Semantic markup, responsive layouts, spacing systems, and polished presentation across devices.",
    cluster: "Frontend Core",
  },
  {
    name: "JavaScript",
    level: 84,
    description:
      "ES6+ application logic, component behavior, data handling, and interactive UI workflows on the web.",
    cluster: "Frontend Core",
  },
  {
    name: "React + Redux",
    level: 86,
    description:
      "Reusable component systems, state management, and frontend architecture for scalable product interfaces.",
    cluster: "Frontend Frameworks",
  },
  {
    name: "Next.js + TS",
    level: 83,
    description:
      "Full-stack applications using Next.js and TypeScript with a stronger focus on structure, safety, and production flow.",
    cluster: "Full Stack",
  },
  {
    name: "Responsive UI",
    level: 88,
    description:
      "UI/UX fundamentals, responsive behavior, and layouts that stay clear and usable across mobile and desktop.",
    cluster: "Frontend Engineering",
  },
  {
    name: "Charts + Viz",
    level: 74,
    description:
      "Practical dashboard and analytics work using tools like Recharts and Chart.js for readable data presentation.",
    cluster: "Frontend Engineering",
  },
  {
    name: "Node.js",
    level: 90,
    description:
      "Backend runtime design, async workflows, service logic, and API implementation for full-stack apps.",
    cluster: "Backend",
  },
  {
    name: "Express + REST",
    level: 86,
    description:
      "REST API design, middleware patterns, route organization, and scalable backend structure with Express.",
    cluster: "Backend",
  },
  {
    name: "JWT + RBAC",
    level: 80,
    description:
      "Authentication, authorization, role-based access control, and protected workflows for multi-user systems.",
    cluster: "Backend Security",
  },
  {
    name: "MongoDB + Mongoose",
    level: 84,
    description:
      "Schema design, data modeling, and document database workflows for production-style app backends.",
    cluster: "Data Layer",
  },
  {
    name: "Socket.IO",
    level: 78,
    description:
      "Realtime chat and event-driven interaction patterns for live collaborative or messaging experiences.",
    cluster: "Realtime Systems",
  },
  {
    name: "Python ML Services",
    level: 72,
    description:
      "Python-based ML microservices, practical forecasting, and anomaly detection-oriented backend support.",
    cluster: "AI / ML",
  },
  {
    name: "LLM Integration",
    level: 79,
    description:
      "OpenAI, Gemini, and Ollama integrations for copilots, insights systems, and AI-assisted product features.",
    cluster: "AI / ML",
  },
  {
    name: "Telemetry Pipelines",
    level: 71,
    description:
      "API-based sensor ingestion, realtime data flow basics, and event-driven system thinking for live signals.",
    cluster: "Realtime Systems",
  },
  {
    name: "Git + Postman",
    level: 82,
    description:
      "Version control, API testing, debugging workflows, and everyday developer-tool fluency for efficient delivery.",
    cluster: "Tooling",
  },
  {
    name: "Vercel + Render",
    level: 76,
    description:
      "Practical deployment, environment configuration, and monitoring-minded shipping across frontend and backend platforms.",
    cluster: "Deployment",
  },
] as const;

export const featuredProjects = [
  {
    slug: "sustainos-ai",
    name: "SustainOS AI",
    category: "Open-Source Sustainability SaaS",
    year: "FOSSHack 2026",
    badge: "Built over 1 month, battle-tested in a 36-hour hackathon sprint",
    summary:
      "A production-style sustainability operations platform built to turn raw utility data into actionable decisions through execution-focused mission control, realtime telemetry, AI insight generation, and ML forecasting.",
    stack: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "Python ML",
      "Ollama",
      "LLM Layer",
    ],
    code: `const actionPlan = await runMissionControl({
  workspaceId,
  telemetry,
  forecasts,
  insightProvider: "ollama-or-external-llm",
});`,
    highlights: [
      "Execution-focused mission control instead of passive analytics",
      "Realtime telemetry plus AI insights and ML forecasting",
      "Multi-service architecture across frontend, backend, ML, and AI layers",
      "Workspace SaaS model with roles, invites, API keys, and audit logs",
    ],
    accent: "#2ee7ff",
    liveUrl: "https://sustaionos-open-source-sustainability-ygcz.onrender.com",
    repoUrl:
      "https://github.com/gauravgautam2003/SustaionOS-open-source-sustainability-monitoring-action-app",
    links: [
      {
        label: "Live App",
        href: "https://sustaionos-open-source-sustainability-ygcz.onrender.com",
      },
      {
        label: "Backend API",
        href: "https://sustaionos-open-source-sustainability-ip3w.onrender.com",
      },
      {
        label: "API Health",
        href: "https://sustaionos-open-source-sustainability-ip3w.onrender.com/api/health",
      },
      {
        label: "ML Health",
        href: "https://sustaionos-open-source-sustainability-do10.onrender.com/health",
      },
      {
        label: "Demo Video",
        href: "https://drive.google.com/file/d/1QeaWaJVBxswZLLNssw-h6udaJROwNeSH/view",
      },
      {
        label: "GitHub",
        href: "https://github.com/gauravgautam2003/SustaionOS-open-source-sustainability-monitoring-action-app",
      },
    ],
  },
  {
    slug: "blogshub",
    name: "Blogshub",
    category: "MERN Blogging Platform",
    year: "Core Build",
    badge: null,
    summary:
      "A full-stack blogging platform built with React, Node.js, Express, and MongoDB with authentication and CRUD workflows for writing, managing, and publishing posts.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Authentication"],
    code: `const post = await createPost({
  title,
  content,
  authorId: session.user.id,
});`,
    highlights: [
      "Authentication flow for protected user actions",
      "Create, edit, and delete blog posts with CRUD logic",
      "Responsive interface for reading and managing content",
    ],
    accent: "#ff4fd8",
    liveUrl: "https://blogshub-bst8.vercel.app/",
    repoUrl: "https://github.com/codergautam900/Blogshub",
    links: [
      { label: "Live App", href: "https://blogshub-bst8.vercel.app/" },
      { label: "GitHub", href: "https://github.com/codergautam900/Blogshub" },
    ],
  },
  {
    slug: "mern-chat-app",
    name: "MERN Chat App",
    category: "Realtime Chat Platform",
    year: "Realtime",
    badge: null,
    summary:
      "A realtime chat application with Socket.IO, authentication, and instant room-based messaging built to explore live communication flows in a MERN stack setup.",
    stack: ["React", "Node.js", "Express", "MongoDB", "Socket.IO"],
    code: `socket.emit("room:message", {
  roomId,
  text: message,
  senderId: currentUser.id,
});`,
    highlights: [
      "Realtime messaging powered by Socket.IO",
      "Room-based chat experience with fast message delivery",
      "Authentication and backend logic for user sessions",
    ],
    accent: "#00ffa8",
    liveUrl: null,
    repoUrl: "https://github.com/codergautam900/mern-chat-app",
    links: [
      { label: "GitHub", href: "https://github.com/codergautam900/mern-chat-app" },
    ],
  },
  {
    slug: "e-commerce-platform",
    name: "E-Commerce Platform",
    category: "MERN Commerce App",
    year: "Production-Style",
    badge: null,
    summary:
      "A commerce-focused MERN application built to practice end-to-end product flows including authentication, protected actions, catalog logic, and scalable backend structure.",
    stack: ["React", "Node.js", "Express", "MongoDB", "JWT", "RBAC"],
    code: `if (!canAccess(currentUser.role, "manage:orders")) {
  throw new Error("Forbidden");
}`,
    highlights: [
      "JWT-based auth and protected user flows",
      "Role-aware backend patterns for admin and customer actions",
      "Product, order, and API structure designed like a real application",
    ],
    accent: "#8b5cff",
    liveUrl: null,
    repoUrl: null,
    links: [],
  },
] as const;

export const hackathonSpotlight = {
  title: "SustainOS AI",
  event: "FOSSHack 2026",
  subtitle: "A month-long build pushed to the limit in a 36-hour hackathon sprint.",
  description:
    "What started as an idea became a production-style SaaS system for sustainability operations. SustainOS AI helps teams detect waste, understand risks, and take action with realtime telemetry, AI insight generation, ML forecasting, and a full workspace-based platform model.",
  tags: [
    "Hackathon Build",
    "Climate Tech",
    "Open Source",
    "AI + ML",
    "SaaS Architecture",
    "Telemetry",
    "Ollama Support",
  ],
  stats: [
    { value: "1 Month", label: "focused build cycle" },
    { value: "36h", label: "FOSSHack push window" },
    { value: "4 Layers", label: "frontend, backend, ML, AI" },
    { value: "Live", label: "app + API + ML health endpoints" },
  ],
  highlights: [
    "Execution-first mission control instead of passive dashboards",
    "Realtime telemetry fused with AI insights and practical forecasting",
    "Supports local Ollama workflows and external LLM integrations",
    "Workspace system with roles, invites, API keys, and audit visibility",
  ],
  links: [
    {
      label: "Live App",
      href: "https://sustaionos-open-source-sustainability-ygcz.onrender.com",
    },
    {
      label: "Backend API",
      href: "https://sustaionos-open-source-sustainability-ip3w.onrender.com",
    },
    {
      label: "API Health",
      href: "https://sustaionos-open-source-sustainability-ip3w.onrender.com/api/health",
    },
    {
      label: "ML Service",
      href: "https://sustaionos-open-source-sustainability-do10.onrender.com/health",
    },
    {
      label: "Demo Video",
      href: "https://drive.google.com/file/d/1QeaWaJVBxswZLLNssw-h6udaJROwNeSH/view",
    },
    {
      label: "GitHub",
      href: "https://github.com/gauravgautam2003/SustaionOS-open-source-sustainability-monitoring-action-app",
    },
  ],
  gallery: [
    "/1000100468.jpg.jpeg",
    "/1000100591.jpg.jpeg",
    "/1000100576.jpg.jpeg",
    "/1000100578.jpg.jpeg",
    "/1000099998.jpg.jpeg",
    "/1000100593.jpg.jpeg",
  ],
} as const;

export const timelineMilestones = [
  {
    year: "2019 - 2021",
    title: "High School Foundation",
    description:
      "Built a strong base in science, mathematics, discipline, and analytical thinking that later supported programming growth.",
  },
  {
    year: "2022 - 2023",
    title: "Intermediate PCM",
    description:
      "Completed 12th with Physics, Chemistry, and Mathematics while moving from curiosity about coding into serious web development interest.",
  },
  {
    year: "2023 - 2027",
    title: "B.Tech CSE + CS Core",
    description:
      "Pursuing Computer Science and Engineering while strengthening Java, OOPs, data structures, algorithms, debugging, and logical thinking.",
  },
  {
    year: "2024 - 2025",
    title: "MERN Application Building",
    description:
      "Started shipping complete MERN applications with auth, REST APIs, database modeling, and responsive UI implementation.",
  },
  {
    year: "2025 - 2026",
    title: "Realtime + AI Expansion",
    description:
      "Expanded into Next.js full-stack work, Socket.IO systems, TypeScript, LLM integrations, forecasting-style AI features, and telemetry-driven thinking.",
  },
  {
    year: "2026",
    title: "FOSSHack 2026 Breakthrough",
    description:
      "SustainOS AI was built over a month and then pushed hard during a 36-hour FOSSHack sprint, strengthening product execution, teamwork, and pressure handling.",
  },
] as const;

export const neuralLogs = [
  {
    title: "How SustainOS AI Became More Than Just Another Dashboard",
    excerpt:
      "The project mattered because it focused on action, not just visualization. Mission control, telemetry, AI insights, and forecasting were all designed to help teams decide what to do next.",
    meta: "hackathon / SaaS / systems thinking",
  },
  {
    title: "Where Realtime Systems and AI Features Start Becoming Product Work",
    excerpt:
      "Socket.IO, telemetry pipelines, LLM integrations, and insight layers matter most when they solve a real product problem instead of existing as a demo.",
    meta: "realtime / AI systems / product thinking",
  },
  {
    title: "Why Debugging, DSA, and Team Pressure Still Matter for Modern Web Builds",
    excerpt:
      "Strong fundamentals, calm debugging, and collaborative execution still decide whether a project ships cleanly, especially during hackathons or fast delivery cycles.",
    meta: "engineering mindset / fundamentals / growth",
  },
] as const;

export const socialOrbs = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/gautam-sagar-010119364?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    accent: "#2ee7ff",
  },
  {
    label: "GitHub",
    href: "https://github.com/codergautam900",
    accent: "#ff4fd8",
  },
  {
    label: "SustainOS Live",
    href: "https://sustaionos-open-source-sustainability-ygcz.onrender.com",
    accent: "#8b5cff",
  },
  {
    label: "Email",
    href: "mailto:gateaspirant@gmail.com",
    accent: "#ffd644",
  },
  {
    label: "Demo Video",
    href: "https://drive.google.com/file/d/1QeaWaJVBxswZLLNssw-h6udaJROwNeSH/view",
    accent: "#00ffa8",
  },
] as const;

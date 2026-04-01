import { featuredProjects, neuralSkills, profile } from "@/lib/neural-content";

const oracleOpeners = [
  "Neural link established.",
  "Oracle channel stabilized.",
  "Signal accepted from the outer web.",
  "Cognitive relay active.",
];

export function buildFallbackTagline() {
  const fragments = [
    "Shipping full-stack web systems with clean UI, auth depth, and practical AI-driven features.",
    "Blending MERN, Next.js, realtime systems, and deployment-ready thinking into modern product builds.",
    "Building from Java and DSA fundamentals into scalable apps with AI, Socket.IO, and product focus.",
    "Turning strong web engineering fundamentals into realtime, AI-aware, production-minded applications.",
  ];

  return fragments[new Date().getSeconds() % fragments.length] ?? profile.taglineFallback;
}

export function buildFallbackOracleReply(message: string) {
  const lower = message.toLowerCase();
  const matchedProject = featuredProjects.find((project) =>
    lower.includes(project.name.toLowerCase().split(" ")[0] ?? ""),
  );
  const matchedSkill = neuralSkills.find((skill) =>
    lower.includes(skill.name.toLowerCase().split(" ")[0] ?? ""),
  );

  if (/resume|hire|intern|why should|fit/i.test(message)) {
    return `${oracleOpeners[0]} Gautam is strongest when a team needs someone with solid CS fundamentals, practical MERN and Next.js execution, and the ability to extend products with realtime or AI-powered features. The profile is especially credible for full-stack internships, product engineering roles, and fast-moving builds where both UI polish and backend ownership matter.`;
  }

  if (/project|build|work|portfolio/i.test(message) && matchedProject) {
    return `${oracleOpeners[1]} ${matchedProject.name} is framed as a ${matchedProject.category.toLowerCase()} system. The key signal is how it combines ${matchedProject.highlights[0]?.toLowerCase()} with ${matchedProject.highlights[1]?.toLowerCase()}, which shows breadth beyond a basic student demo.`;
  }

  if (/sustain|hackathon|fosshack/i.test(lower)) {
    return `${oracleOpeners[3]} SustainOS AI is the portfolio flagship because it was not just a dashboard build. It combines mission-control style execution, realtime telemetry, AI insights, ML forecasting, and a workspace-based SaaS structure, then proves itself further by being pushed during FOSSHack 2026.`;
  }

  if (matchedSkill) {
    return `${oracleOpeners[2]} ${matchedSkill.name} sits inside the ${matchedSkill.cluster} cluster at an estimated ${matchedSkill.level}% proficiency. In practical terms, that means ${matchedSkill.description.toLowerCase()}`;
  }

  if (/ai|llm|openai|gemini|ollama|copilot|insight|forecast|anomaly/i.test(lower)) {
    return `${oracleOpeners[3]} Gautam's AI direction is practical and product-focused. The portfolio highlights LLM integration, insight systems, forecasting-style thinking, and Python-backed ML service ideas rather than abstract experimentation alone.`;
  }

  if (/next|typescript|mern|react|node|express|mongodb|api|full stack/i.test(lower)) {
    return `${oracleOpeners[0]} Gautam's core engineering direction is end-to-end product work. The stack spans MERN, Next.js, TypeScript, REST APIs, JWT auth, RBAC, MongoDB modeling, and production-oriented deployment flow.`;
  }

  if (/socket|realtime|real-time|telemetry|event/i.test(lower)) {
    return `${oracleOpeners[1]} Realtime work is represented through Socket.IO chat systems, telemetry-style ingestion thinking, and event-driven basics. That adds useful range beyond static CRUD interfaces.`;
  }

  if (/education|college|btech|journey|java|dsa/i.test(lower)) {
    return `${oracleOpeners[2]} Gautam's journey moves from strong school foundations into B.Tech CSE, with Java, OOPs, DSA, debugging, and logical problem-solving supporting the more advanced web and AI work.`;
  }

  if (/hackathon|team|nss|pressure/i.test(lower)) {
    return `${oracleOpeners[3]} Collaborative exposure shows up through hackathons like FOSS Hack 2026 and team-oriented activity, which reinforces adaptability, communication, and the ability to build under pressure.`;
  }

  return `${oracleOpeners[1]} Ask about SustainOS AI, MERN and Next.js skills, auth and RBAC, realtime systems, AI integrations, deployment experience, or internship fit. The short version: Gautam is building from strong fundamentals into product-ready full-stack and AI-enhanced systems.`;
}

export function streamTextFromString(value: string) {
  const encoder = new TextEncoder();
  let index = 0;

  return new ReadableStream({
    pull(controller) {
      if (index >= value.length) {
        controller.close();
        return;
      }

      const chunk = value.slice(index, index + 18);
      index += 18;
      controller.enqueue(encoder.encode(chunk));
    },
  });
}

import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

function deriveOpportunitySignals(message: string, opportunityType: string) {
  const normalized = `${opportunityType} ${message}`.toLowerCase();

  const signalMap = [
    {
      label: "Frontend-heavy role",
      active: /frontend|ui|ux|landing|design|react|next/.test(normalized),
      stack: ["Next.js", "React", "Tailwind CSS"],
    },
    {
      label: "Full-stack build",
      active: /full-stack|backend|api|dashboard|auth|database|product/.test(normalized),
      stack: ["Node.js", "APIs", "Database Design"],
    },
    {
      label: "AI or CV angle",
      active: /ai|llm|ml|vision|opencv|automation|agent/.test(normalized),
      stack: ["Python", "AI Workflows", "Experimentation"],
    },
    {
      label: "Fast-collab sprint",
      active: /hackathon|sprint|prototype|ship|mvp/.test(normalized),
      stack: ["Rapid Prototyping", "Ownership", "Presentation Ready UI"],
    },
  ];

  const matched = signalMap.filter((item) => item.active);
  const recommendedStack = Array.from(
    new Set([
      "Communication",
      "Execution",
      ...matched.flatMap((item) => item.stack),
    ]),
  );

  return {
    matchedServices: matched.map((item) => item.label),
    recommendedStack,
  };
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the highlighted fields and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, message, opportunityType, timeline } = parsed.data;
  const leadId = `AAR-${Date.now().toString(36).toUpperCase()}`;
  const signals = deriveOpportunitySignals(message, opportunityType);

  await new Promise((resolve) => setTimeout(resolve, 900));

  return NextResponse.json({
    success: true,
    leadId,
    responseWindow: "Within 24 hours",
    summary: `${name}, your ${opportunityType.toLowerCase()} note is queued for a ${timeline.toLowerCase()} window.`,
    ...signals,
  });
}

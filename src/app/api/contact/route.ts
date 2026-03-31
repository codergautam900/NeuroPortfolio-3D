import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

function deriveProjectSignals(message: string, projectType: string) {
  const normalized = `${projectType} ${message}`.toLowerCase();

  const focusMap = [
    {
      label: "3D storytelling",
      active: /3d|three|webgl|scroll|motion|immersive|hero/.test(normalized),
      stack: ["React Three Fiber", "Drei", "Framer Motion"],
    },
    {
      label: "SaaS product framing",
      active: /dashboard|saas|product|platform|workflow|b2b/.test(normalized),
      stack: ["Route Handlers", "Server Components"],
    },
    {
      label: "Conversion architecture",
      active: /cta|lead|funnel|sales|inquiry|convert/.test(normalized),
      stack: ["Contact Pipeline", "Zod Validation"],
    },
    {
      label: "Narrative-first branding",
      active: /brand|story|launch|positioning|visual/.test(normalized),
      stack: ["Content Strategy", "Motion Systems"],
    },
  ];

  const matched = focusMap.filter((item) => item.active);
  const recommendedStack = Array.from(
    new Set([
      "Next.js App Router",
      "TypeScript",
      "Tailwind CSS v4",
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

  const { name, message, projectType } = parsed.data;
  const leadId = `NEX-${Date.now().toString(36).toUpperCase()}`;
  const signals = deriveProjectSignals(message, projectType);

  await new Promise((resolve) => setTimeout(resolve, 900));

  return NextResponse.json({
    success: true,
    leadId,
    responseWindow: "Within 24 hours",
    summary: `${name}, your request has been queued with a ${projectType.toLowerCase()} focus and a premium build path.`,
    ...signals,
  });
}

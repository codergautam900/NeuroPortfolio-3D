import { openai } from "@ai-sdk/openai";
import { generateText } from "ai";
import { buildFallbackTagline } from "@/lib/oracle";

export async function GET() {
  if (!process.env.OPENAI_API_KEY) {
    return Response.json({ tagline: buildFallbackTagline(), source: "fallback" });
  }

  try {
    const { text } = await generateText({
      model: openai(process.env.OPENAI_MODEL ?? "gpt-5-mini"),
      system:
        "You write short, sharp portfolio taglines for a B.Tech CSE student and full-stack developer focused on MERN, Next.js, realtime systems, and practical AI-powered products. Keep it to one sentence under 18 words.",
      prompt:
        "Generate one technically credible tagline with modern portfolio energy and no exaggerated claims.",
    });

    return Response.json({ tagline: text.trim(), source: "openai" });
  } catch {
    return Response.json({ tagline: buildFallbackTagline(), source: "fallback" });
  }
}

import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { z } from "zod";
import { buildFallbackOracleReply, streamTextFromString } from "@/lib/oracle";

const oracleSchema = z.object({
  message: z.string().trim().min(2).max(1200),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = oracleSchema.safeParse(body);

  if (!parsed.success) {
    return new Response("Signal corrupted. Ask again with a clearer prompt.", {
      status: 400,
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  if (!process.env.OPENAI_API_KEY) {
    return new Response(streamTextFromString(buildFallbackOracleReply(parsed.data.message)), {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  }

  const result = streamText({
    model: openai(process.env.OPENAI_MODEL ?? "gpt-5-mini"),
    system:
      "You are Gautam Sagar's portfolio oracle inside an interactive portfolio site. Be warm, technical, concise, and credible. SustainOS AI is the flagship project: a production-style sustainability operations SaaS built over a month and pushed during FOSSHack 2026, with mission control workflows, realtime telemetry, AI insights, ML forecasting, workspace roles, invites, API keys, audit logs, Ollama support, and multiple live service links. Answer questions about Gautam's Java and DSA fundamentals, MERN and Next.js engineering, TypeScript, JWT auth, RBAC, MongoDB, realtime systems, AI integrations, deployment experience, education journey, hackathon exposure, and internship fit. Avoid making up achievements, employers, institutions, or links not shown in the portfolio.",
    prompt: parsed.data.message,
    onError({ error }) {
      console.error("Oracle stream error", error);
    },
  });

  return result.toTextStreamResponse();
}

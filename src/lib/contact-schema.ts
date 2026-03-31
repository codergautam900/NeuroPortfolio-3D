import { z } from "zod";

export const projectTypes = [
  "3D Brand Experience",
  "Personal Portfolio Rebuild",
  "SaaS / Product Showcase",
  "Founder Landing Page",
] as const;

export const budgetBands = ["$3k - $8k", "$8k - $15k", "$15k+"] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name should be at least 2 characters."),
  email: z.email("Enter a valid email address."),
  company: z
    .union([z.string().trim().max(80, "Company name is too long."), z.literal("")])
    .default(""),
  projectType: z.enum(projectTypes, {
    error: "Select a project type.",
  }),
  budget: z.enum(budgetBands, {
    error: "Select a budget range.",
  }),
  message: z
    .string()
    .trim()
    .min(24, "Share a few more details so the request is actionable.")
    .max(700, "Keep the message under 700 characters."),
});

export type ContactPayload = z.infer<typeof contactSchema>;

import { z } from "zod";

export const opportunityTypes = [
  "Internship Opportunity",
  "Freelance Prototype",
  "Hackathon / Sprint Collaboration",
  "Open Source / Community Build",
] as const;

export const timelineOptions = [
  "Immediately",
  "Within 2-4 weeks",
  "Exploring for later",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name should be at least 2 characters."),
  email: z.email("Enter a valid email address."),
  company: z
    .union([z.string().trim().max(80, "Organization name is too long."), z.literal("")])
    .default(""),
  opportunityType: z.enum(opportunityTypes, {
    error: "Select an opportunity type.",
  }),
  timeline: z.enum(timelineOptions, {
    error: "Select a timeline.",
  }),
  message: z
    .string()
    .trim()
    .min(24, "Share a few more details so the request is actionable.")
    .max(700, "Keep the message under 700 characters."),
});

export type ContactPayload = z.infer<typeof contactSchema>;

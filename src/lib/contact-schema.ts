import { z } from "zod";

export const transmissionTypes = [
  "Job / Internship Opportunity",
  "AI Product / SaaS Build",
  "Freelance Website Project",
  "Project Collaboration",
  "General Enquiry",
] as const;

export const urgencyBands = [
  "Immediate",
  "Within 2-4 weeks",
  "Exploratory / future",
] as const;

export const transmissionSchema = z.object({
  name: z.string().trim().min(2, "Name should be at least 2 characters."),
  email: z.email("Enter a valid email address."),
  organization: z
    .union([
      z.string().trim().max(80, "Organization name is too long."),
      z.literal(""),
    ])
    .default(""),
  transmissionType: z.enum(transmissionTypes, {
    error: "Select a transmission type.",
  }),
  urgency: z.enum(urgencyBands, {
    error: "Select an urgency band.",
  }),
  message: z
    .string()
    .trim()
    .min(20, "Share a bit more detail so Gautam can understand the request.")
    .max(1000, "Keep the message under 1000 characters."),
});

export type TransmissionPayload = z.infer<typeof transmissionSchema>;

export type TransmissionState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors?: Partial<Record<keyof TransmissionPayload, string>>;
  leadId?: string;
  deliveryMode?: "simulated" | "resend";
};

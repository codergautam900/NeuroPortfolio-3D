"use server";

import { Resend } from "resend";
import {
  type TransmissionState,
  transmissionSchema,
} from "@/lib/contact-schema";
import { profile } from "@/lib/neural-content";
import { TransmissionEmail } from "@/emails/transmission-email";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

function toFieldErrors(
  fieldErrors: Record<string, string[] | undefined>,
): TransmissionState["fieldErrors"] {
  return Object.fromEntries(
    Object.entries(fieldErrors).map(([key, value]) => [key, value?.[0] ?? ""]),
  ) as TransmissionState["fieldErrors"];
}

export async function sendTransmissionAction(
  _previousState: TransmissionState,
  formData: FormData,
): Promise<TransmissionState> {
  const raw = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    organization: String(formData.get("organization") ?? ""),
    transmissionType: String(formData.get("transmissionType") ?? ""),
    urgency: String(formData.get("urgency") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = transmissionSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      status: "error",
      message: "A few fields need attention before the message can be sent.",
      fieldErrors: toFieldErrors(parsed.error.flatten().fieldErrors),
    };
  }

  const leadId = `GTM-${Date.now().toString(36).toUpperCase()}`;

  if (!resend || !process.env.PORTFOLIO_INBOX_EMAIL) {
    await new Promise((resolve) => setTimeout(resolve, 700));

    return {
      status: "success",
      message:
        `Message captured in local simulation mode. For direct contact right now, email ${profile.email}.`,
      leadId,
      deliveryMode: "simulated",
    };
  }

  try {
    await resend.emails.send({
      from: process.env.PORTFOLIO_FROM_EMAIL ?? "Gautam Portfolio <onboarding@resend.dev>",
      to: process.env.PORTFOLIO_INBOX_EMAIL,
      replyTo: parsed.data.email,
      subject: `New portfolio message: ${parsed.data.transmissionType}`,
      react: TransmissionEmail({
        ...parsed.data,
        leadId,
      }),
    });

    return {
      status: "success",
      message: "Message sent successfully. Inbox delivery confirmed.",
      leadId,
      deliveryMode: "resend",
    };
  } catch {
    return {
      status: "error",
      message: `Inbox delivery failed at the final step. Retry once or email ${profile.email} directly.`,
    };
  }
}

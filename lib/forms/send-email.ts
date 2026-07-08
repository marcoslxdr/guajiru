import { Resend } from "resend";

export async function sendFormEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const resend = new Resend(apiKey);

  return resend.emails.send({
    from: "Clube Guajiru <onboarding@resend.dev>",
    to,
    subject,
    html,
  });
}

import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/forms/schemas";
import { sendFormEmail } from "@/lib/forms/send-email";
import { verifyTurnstile } from "@/lib/forms/verify-turnstile";
import { getSiteSettings } from "@/lib/sanity/queries";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
  }

  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const ip = request.headers.get("x-forwarded-for") ?? undefined;
  const valid = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!valid) {
    return NextResponse.json({ error: "Verificação anti-spam falhou" }, { status: 403 });
  }

  const settings = await getSiteSettings();
  const to = settings?.contactEmail ?? process.env.CONTACT_EMAIL;
  if (!to) {
    return NextResponse.json({ error: "E-mail de destino não configurado" }, { status: 500 });
  }

  await sendFormEmail({
    to,
    subject: `[Contato] ${parsed.data.subject} — ${parsed.data.name}`,
    html: `<p><strong>Nome:</strong> ${parsed.data.name}</p>
           <p><strong>E-mail:</strong> ${parsed.data.email}</p>
           <p><strong>Mensagem:</strong></p><p>${parsed.data.message}</p>`,
  });

  return NextResponse.json({ ok: true });
}

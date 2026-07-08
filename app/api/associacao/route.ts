import { NextResponse } from "next/server";
import { associacaoSchema } from "@/lib/forms/schemas";
import { sendFormEmail } from "@/lib/forms/send-email";
import { verifyTurnstile } from "@/lib/forms/verify-turnstile";
import { getContactEmail } from "@/lib/supabase/queries";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = associacaoSchema.safeParse(body);

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

  const to = await getContactEmail();
  if (!to) {
    return NextResponse.json({ error: "E-mail de destino não configurado" }, { status: 500 });
  }

  await sendFormEmail({
    to,
    subject: `[Associação] ${parsed.data.modality} — ${parsed.data.name}`,
    html: `<p><strong>Nome:</strong> ${parsed.data.name}</p>
           <p><strong>E-mail:</strong> ${parsed.data.email}</p>
           <p><strong>Telefone:</strong> ${parsed.data.phone}</p>
           <p><strong>Modalidade:</strong> ${parsed.data.modality}</p>
           ${parsed.data.message ? `<p><strong>Mensagem:</strong></p><p>${parsed.data.message}</p>` : ""}`,
  });

  return NextResponse.json({ ok: true });
}

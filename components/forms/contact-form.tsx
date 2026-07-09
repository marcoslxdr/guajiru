"use client";

import { FormEvent, useState } from "react";
import { TurnstileWidget } from "./turnstile-widget";

const subjects = ["Geral", "Parceria", "Imprensa", "Outro"] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      subject: String(formData.get("subject") ?? "Geral"),
      message: String(formData.get("message") ?? ""),
      turnstileToken: turnstileToken || "dev-bypass",
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Falha ao enviar");
      }

      setStatus("success");
      setMessage("Mensagem enviada com sucesso!");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Erro ao enviar mensagem.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

      <div>
        <label htmlFor="contact-name" className="mb-1 block text-sm font-medium">Nome</label>
        <input id="contact-name" name="name" required className="input-field" />
      </div>
      <div>
        <label htmlFor="contact-email" className="mb-1 block text-sm font-medium">E-mail</label>
        <input id="contact-email" name="email" type="email" required className="input-field" />
      </div>
      <div>
        <label htmlFor="contact-subject" className="mb-1 block text-sm font-medium">Assunto</label>
        <select id="contact-subject" name="subject" required className="input-field">
          {subjects.map((subject) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-1 block text-sm font-medium">Mensagem</label>
        <textarea id="contact-message" name="message" required rows={5} className="input-field" />
      </div>

      <TurnstileWidget onVerify={setTurnstileToken} />

      <button type="submit" disabled={status === "loading"} className="btn-primary h-11">
        {status === "loading" ? "Enviando..." : "Enviar mensagem"}
      </button>

      {message ? (
        <p className={status === "error" ? "text-sm text-red-600" : "text-sm text-primary"}>{message}</p>
      ) : null}
    </form>
  );
}

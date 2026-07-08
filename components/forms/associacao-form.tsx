"use client";

import { FormEvent, useState } from "react";
import { TurnstileWidget } from "./turnstile-widget";

const EXTRA_OPTIONS = ["Apoio/Voluntário"] as const;

type AssociacaoFormProps = {
  modalityOptions: string[];
};

export function AssociacaoForm({ modalityOptions }: AssociacaoFormProps) {
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
      phone: String(formData.get("phone") ?? ""),
      modality: String(formData.get("modality") ?? modalityOptions[0] ?? "Remo"),
      message: String(formData.get("message") ?? ""),
      turnstileToken: turnstileToken || "dev-bypass",
      website: String(formData.get("website") ?? ""),
    };

    try {
      const response = await fetch("/api/associacao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        throw new Error(data.error ?? "Falha ao enviar");
      }

      setStatus("success");
      setMessage("Interesse registrado! A diretoria entrará em contato.");
      event.currentTarget.reset();
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Erro ao enviar formulário.");
    }
  }

  const options = [...modalityOptions, ...EXTRA_OPTIONS];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" />

      <div>
        <label htmlFor="assoc-name" className="mb-1 block text-sm font-medium">Nome completo</label>
        <input id="assoc-name" name="name" required className="input-field" />
      </div>
      <div>
        <label htmlFor="assoc-email" className="mb-1 block text-sm font-medium">E-mail</label>
        <input id="assoc-email" name="email" type="email" required className="input-field" />
      </div>
      <div>
        <label htmlFor="assoc-phone" className="mb-1 block text-sm font-medium">Telefone</label>
        <input id="assoc-phone" name="phone" type="tel" required className="input-field" />
      </div>
      <div>
        <label htmlFor="assoc-modality" className="mb-1 block text-sm font-medium">Modalidade</label>
        <select id="assoc-modality" name="modality" required className="input-field">
          {options.map((modality) => (
            <option key={modality} value={modality}>{modality}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="assoc-message" className="mb-1 block text-sm font-medium">Mensagem (opcional)</label>
        <textarea id="assoc-message" name="message" rows={4} className="input-field" />
      </div>

      <TurnstileWidget onVerify={setTurnstileToken} />

      <button type="submit" disabled={status === "loading"} className="btn-secondary">
        {status === "loading" ? "Enviando..." : "Quero me associar"}
      </button>

      {message ? (
        <p className={status === "error" ? "text-sm text-red-600" : "text-sm text-primary"}>{message}</p>
      ) : null}
    </form>
  );
}

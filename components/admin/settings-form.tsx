"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { saveSettingsAction } from "@/lib/admin/actions";
import type { SiteSettings } from "@/lib/supabase/types";

export function SettingsForm({ settings }: { settings: SiteSettings | null }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  function handleSubmit(formData: FormData) {
    setMessage(null);
    startTransition(async () => {
      const result = await saveSettingsAction(formData);
      if (!result.ok) {
        setMessage({ type: "error", text: result.error ?? "Erro ao salvar." });
        return;
      }
      setMessage({ type: "success", text: "Configurações salvas." });
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {message ? (
        <p className={`rounded-xl px-4 py-3 text-sm ${message.type === "error" ? "bg-red-50 text-red-700" : "bg-primary/10 text-primary"}`}>
          {message.text}
        </p>
      ) : null}

      <form action={handleSubmit} className="max-w-2xl space-y-4">
        <div>
          <label htmlFor="contact_email" className="mb-1 block text-sm font-medium">
            E-mail de contato
          </label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            defaultValue={settings?.contact_email ?? ""}
            className="input-field"
          />
          <p className="mt-1 text-xs text-muted-foreground">Recebe mensagens dos formulários do site.</p>
        </div>

        <div>
          <label htmlFor="address" className="mb-1 block text-sm font-medium">
            Endereço
          </label>
          <input id="address" name="address" defaultValue={settings?.address ?? ""} className="input-field" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="map_lat" className="mb-1 block text-sm font-medium">
              Latitude
            </label>
            <input
              id="map_lat"
              name="map_lat"
              type="number"
              step="any"
              defaultValue={settings?.map_lat ?? ""}
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="map_lng" className="mb-1 block text-sm font-medium">
              Longitude
            </label>
            <input
              id="map_lng"
              name="map_lng"
              type="number"
              step="any"
              defaultValue={settings?.map_lng ?? ""}
              className="input-field"
            />
          </div>
        </div>

        <div>
          <label htmlFor="whatsapp" className="mb-1 block text-sm font-medium">
            WhatsApp
          </label>
          <input id="whatsapp" name="whatsapp" defaultValue={settings?.whatsapp ?? ""} className="input-field" />
        </div>

        <div>
          <label htmlFor="instagram" className="mb-1 block text-sm font-medium">
            Instagram
          </label>
          <input id="instagram" name="instagram" defaultValue={settings?.instagram ?? ""} className="input-field" />
        </div>

        <div>
          <label htmlFor="facebook" className="mb-1 block text-sm font-medium">
            Facebook
          </label>
          <input id="facebook" name="facebook" defaultValue={settings?.facebook ?? ""} className="input-field" />
        </div>

        <button type="submit" disabled={isPending} className="btn-primary h-11">
          {isPending ? "Salvando..." : "Salvar configurações"}
        </button>
      </form>
    </div>
  );
}

"use client";

import { useState, useTransition } from "react";
import { loginAction } from "@/lib/admin/actions";

export function AdminLoginForm({ sessionMessage }: { sessionMessage?: string }) {
  const [error, setError] = useState(sessionMessage ?? "");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(formData: FormData) {
    setError("");
    startTransition(async () => {
      const result = await loginAction(formData);
      if (!result.ok && result.error) {
        setError(result.error);
      }
    });
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="admin-email" className="mb-1 block text-sm font-medium">
          E-mail
        </label>
        <input id="admin-email" name="email" type="email" required autoComplete="email" className="input-field" />
      </div>
      <div>
        <label htmlFor="admin-password" className="mb-1 block text-sm font-medium">
          Senha
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="input-field"
        />
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <button type="submit" disabled={isPending} className="btn-primary h-11 w-full">
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}

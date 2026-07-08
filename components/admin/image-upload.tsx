"use client";

import Image from "next/image";
import { useState } from "react";

const MAX_BYTES = 2 * 1024 * 1024;

export function ImageUpload({
  name,
  currentUrl,
}: {
  name: string;
  currentUrl?: string | null;
}) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_BYTES) {
      setError("A imagem deve ter no máximo 2 MB.");
      event.target.value = "";
      return;
    }

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Use JPEG, PNG ou WebP.");
      event.target.value = "";
      return;
    }

    setPreview(URL.createObjectURL(file));
  }

  return (
    <div className="space-y-3">
      {preview ? (
        <div className="relative aspect-[16/10] w-full max-w-md overflow-hidden rounded-xl border border-border">
          <Image src={preview} alt="Prévia da capa" fill className="object-cover" unoptimized={preview.startsWith("blob:")} />
        </div>
      ) : (
        <div className="flex aspect-[16/10] w-full max-w-md items-center justify-center rounded-xl border border-dashed border-border bg-muted text-sm text-muted-foreground">
          Nenhuma capa selecionada
        </div>
      )}
      <input
        type="file"
        name={name}
        accept="image/jpeg,image/png,image/webp"
        onChange={handleChange}
        className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

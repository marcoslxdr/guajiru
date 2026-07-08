"use client";

import { useState } from "react";

const MAX_BYTES = 10 * 1024 * 1024;

export function PdfUpload({
  name,
  currentUrl,
  required = false,
}: {
  name: string;
  currentUrl?: string | null;
  required?: boolean;
}) {
  const [fileName, setFileName] = useState<string | null>(null);
  const [error, setError] = useState("");

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setError("");
    const file = event.target.files?.[0];
    if (!file) {
      setFileName(null);
      return;
    }

    if (file.size > MAX_BYTES) {
      setError("O PDF deve ter no máximo 10 MB.");
      event.target.value = "";
      setFileName(null);
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Use apenas arquivos PDF.");
      event.target.value = "";
      setFileName(null);
      return;
    }

    setFileName(file.name);
  }

  return (
    <div className="space-y-3">
      {currentUrl ? (
        <p className="text-sm text-muted-foreground">
          Arquivo atual:{" "}
          <a href={currentUrl} target="_blank" rel="noopener noreferrer" className="link-arrow">
            abrir PDF
          </a>
        </p>
      ) : (
        <div className="flex min-h-24 w-full max-w-md items-center justify-center rounded-xl border border-dashed border-border bg-muted text-sm text-muted-foreground">
          Nenhum PDF selecionado
        </div>
      )}
      <input
        type="file"
        name={name}
        accept="application/pdf"
        required={required && !currentUrl}
        onChange={handleChange}
        className="block w-full text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-primary file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-foreground"
      />
      {fileName ? <p className="text-sm text-foreground">Selecionado: {fileName}</p> : null}
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}

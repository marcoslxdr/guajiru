"use client";

import Script from "next/script";
import { useCallback, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
        },
      ) => string;
      reset: (widgetId: string) => void;
    };
  }
}

type TurnstileWidgetProps = {
  onVerify: (token: string) => void;
};

export function TurnstileWidget({ onVerify }: TurnstileWidgetProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  const containerRef = useCallback(
    (node: HTMLDivElement | null) => {
      setContainer(node);
    },
    [],
  );

  const handleLoad = useCallback(() => {
    if (!container || !siteKey || !window.turnstile) return;
    window.turnstile.render(container, {
      sitekey: siteKey,
      callback: onVerify,
    });
  }, [container, onVerify, siteKey]);

  if (!siteKey) {
    return (
      <p className="text-sm text-muted-foreground">
        Verificação anti-spam não configurada (dev).
      </p>
    );
  }

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        onLoad={handleLoad}
        strategy="afterInteractive"
      />
      <div ref={containerRef} />
    </>
  );
}

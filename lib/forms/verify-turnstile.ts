export async function verifyTurnstile(token: string, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    return process.env.NODE_ENV === "development";
  }

  if (token === "dev-bypass" && process.env.NODE_ENV === "development") {
    return true;
  }

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret,
      response: token,
      ...(ip ? { remoteip: ip } : {}),
    }),
  });

  const data = (await response.json()) as { success: boolean };
  return data.success;
}

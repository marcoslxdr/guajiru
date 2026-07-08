<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project

Site institucional e portal do **Clube Desportivo Guajiru** (Extremoz, RN) — not the Praia de Guajiru tourism site. Pivot existing scaffold accordingly.

**Stack (approved):** Next.js 16 App Router, Tailwind 4, Sanity CMS, Resend, Cloudflare Turnstile, Vercel Hobby.

**Design spec:** `docs/superpowers/specs/2026-07-08-clube-guajiru-design.md`

**Implementation plan:** `docs/superpowers/plans/2026-07-08-clube-guajiru.md`

**Brand colors:** `#5F9235`, `#C5D14D`, `#DD8FB8`, `#B7728A`. Line-height 1.25.

**Env setup:** copy `.env.example` → `.env.local`. Build works without Sanity project ID (uses fallbacks); forms need Resend + Turnstile for production.

# Clube Desportivo Guajiru

Site institucional e portal do **Clube Desportivo Guajiru** (Extremoz, RN).

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- Sanity CMS
- Resend (formulários)
- Cloudflare Turnstile (anti-spam)

## Setup

```bash
npm install
cp .env.example .env.local
# Preencher variáveis Sanity, Resend e Turnstile
npm run dev
```

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run studio` | Sanity Studio local |
| `npm run lint` | ESLint |

## Documentação

- Design spec: `docs/superpowers/specs/2026-07-08-clube-guajiru-design.md`
- Plano: `docs/superpowers/plans/2026-07-08-clube-guajiru.md`
- Seed CMS: `sanity/seed/content.md`

## Deploy

1. `vercel link`
2. `vercel env pull .env.local`
3. Criar projeto Sanity e preencher env vars
4. `vercel --prod`

# Clube Desportivo Guajiru

Site institucional e portal do **Clube Desportivo Guajiru** (Extremoz, RN).

## Stack

- Next.js 16 (App Router)
- React 19 + TypeScript
- Tailwind CSS 4
- **Supabase** (Postgres + Storage)
- Resend (formulários)
- Cloudflare Turnstile (anti-spam)

## Setup

```bash
npm install
cp .env.example .env.local
# Preencher NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_ANON_KEY
npm run dev
```

**CMS:** conteúdo editável no [Supabase Dashboard](https://supabase.com/dashboard/project/aempatqmyufrocssntfw) → Table Editor.

**Storage:** bucket `club-assets` para PDFs e imagens.

## Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run lint` | ESLint |

## Deploy

1. `vercel link`
2. Configurar env vars Supabase + Resend + Turnstile no Vercel
3. `vercel --prod`

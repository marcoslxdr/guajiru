<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project

Site institucional e portal do **Clube Desportivo Guajiru** (Extremoz, RN).

**Stack:** Next.js 16, Tailwind 4, **Supabase** (Postgres + Storage), Resend, Turnstile, Vercel Hobby.

**Supabase project:** `aempatqmyufrocssntfw` (sa-east-1)

**Design spec:** `docs/superpowers/specs/2026-07-08-clube-guajiru-design.md` (CMS migrado de Sanity → Supabase)

**Design context (impeccable):** `PRODUCT.md` — register `brand`, users, anti-references, principles. `DESIGN.md` ainda pendente (`/impeccable document`).

**Brand colors:** `#5F9235`, `#C5D14D`, `#DD8FB8`, `#B7728A`. Line-height 1.25.

**Content editing:** Painel `/admin` (posts + `site_settings`) com Supabase Auth. Fallback: Table Editor + Storage bucket `club-assets`.

**Admin bootstrap:** Supabase Auth → criar user → `app_metadata: { "role": "admin" }` → desabilitar signup público → login em `/admin/login`.

**Transparência:** tabela `transparency_documents` — campos `title`, `doc_type` (`ata` | `estatuto` | `relatório`), `file_url` (URL pública do PDF no bucket `club-assets`), `published_at`. Página `/transparencia` agrupa por tipo; empty state até primeiro insert.

**Modalidades:** tabela `modalities` no Supabase — editar textos, `highlights` (JSON), `gallery` (JSON), `training_focus`, `audience`, `training_schedule`. Campos pendentes usam placeholder entre colchetes, ex. `[Horários de treino — preencher no Supabase]` (renderizados com borda tracejada na página). Fallback estático em `lib/modalities.ts` se Supabase indisponível.

**Dev server:** rodar `npm run dev` em terminal dedicado (não no terminal do agente). Probe `GET /health` → `app/health/route.ts`. Agentes: não rodar `npm run build` com dev ativo; após edições parciais, usuário pode precisar hard refresh (`Cmd+Shift+R`).

**Deploy (Vercel):** projeto `insightfy/guajiru` → `https://guajiru.vercel.app`. Manter `vercel.json` com `"framework": "nextjs"` — se o preset no dashboard ficar **Other** com output `public/`, o deploy retorna 404 da Vercel (não do Next). SSO deployment protection desligado (site público). Redeploy: `vercel --prod`.

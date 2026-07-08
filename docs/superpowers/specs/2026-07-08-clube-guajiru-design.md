# Design Spec — Site Institucional e Portal do Clube Desportivo Guajiru

**Date:** 2026-07-08  
**Status:** Approved (brainstorming)  
**Version:** 1.0

## 1. Overview

Portal oficial do **Clube Desportivo Guajiru** (Extremoz, RN), fundado em 01/03/2024. Consolida presença digital do clube com conteúdo institucional, notícias, transparência e canais de contato/associação.

**Pivot from current repo:** existing scaffold targets Praia de Guajiru (Trairi, CE). Full content and branding pivot required.

### Decisions (brainstorming)

| Item | Decision |
|------|----------|
| Content editors | Club staff, non-technical |
| Budget | R$ 0 — Vercel Hobby + free-tier services |
| Assets at launch | Shield/logo ready; photos and PDFs added post-launch |
| Domain | `*.vercel.app` until custom domain registered |
| Forms | Separate contact + membership interest forms |
| Launch scope | Full PRD v1 |

### Recommended approach

**Next.js 16 + Sanity CMS + Vercel Hobby** (approved over Supabase custom admin and Notion-as-CMS).

---

## 2. Architecture

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Visitor    │────▶│  Next.js 16  │────▶│ Sanity CDN  │
│  (browser)  │     │  Vercel Hobby│     │  (content)  │
└─────────────┘     └──────┬───────┘     └─────────────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         Resend API   Turnstile    Vercel Blob
         (email)      (anti-spam)  (large PDFs)
```

| Layer | Technology | Role |
|-------|------------|------|
| Frontend | Next.js 16 App Router, Tailwind 4, TypeScript | Public pages, SSG/ISR |
| CMS | Sanity (hosted Studio) | News, photos, documents, editable institutional content |
| Forms | Route Handlers + Resend | Contact + membership submissions |
| Security | Cloudflare Turnstile + rate limiting | Form spam protection |
| Deploy | Vercel Hobby | Hosting, SSL, CDN |

**Sanity Studio:** hosted at `*.sanity.studio` with Sanity login. Optional dev embed at `/studio` behind auth — not required for v1.

**Institutional pages** (mission, history, board) are Sanity singleton documents so club staff can update names and roles without developer involvement.

---

## 3. Routes and Navigation

| Route | Content | Source |
|-------|---------|--------|
| `/` | Hero, slogan, founding date, mission summary, latest news | Sanity + static |
| `/institucional` | Mission, Vision, Values | Sanity singleton `pageInstitucional` |
| `/historia` | Olympic movement / rowing narrative, founders list | Sanity singleton `pageHistoria` |
| `/diretoria` | Board roles, fiscal council, Art. 13 non-remuneration note | Sanity singleton `pageDiretoria` |
| `/noticias` | News and board communications listing | Sanity `post` |
| `/noticias/[slug]` | Article detail | Sanity `post` |
| `/transparencia` | Minutes, bylaws, financial reports (PDF) | Sanity `document` |
| `/contato` | Two forms + Extremoz/RN location map | Forms + Sanity `siteSettings` |

**Primary nav:** Início · Institucional · História · Diretoria · Notícias · Transparência · Contato

**Footer:** shield logo, social links, address, transparency link, copyright.

---

## 4. Design System

### Colors (official club palette)

```css
--guajiru-verde:       #5F9235;  /* primary */
--guajiru-limao:       #C5D14D;  /* accent */
--guajiru-rosa-claro:  #DD8FB8;  /* highlight */
--guajiru-vinho:       #B7728A;  /* secondary */
--guajiru-neutro:      #F8F6F0;  /* background */
--guajiru-texto:       #1A1A1A;
```

### Typography

- **Headings:** BASKETBALL-style font (custom `.woff2` from club assets). Fallback: `Bebas Neue` until custom font delivered.
- **Body:** `Inter` or `Source Sans 3` for mobile readability.

### Spacing

- Global line-height: **1.25** (PRD requirement).
- Tailwind default spacing scale with CSS custom properties.

### Core components

`Header`, `Hero`, `NewsCard`, `BoardMemberCard`, `DocumentList`, `FormField`, `Footer`, `SectionHeading`.

### Visual identity

- Clean, functional, regional appeal.
- Club shield with cobra "S" in header and footer.
- Training photos: placeholders until real assets uploaded via CMS.
- Mobile-first responsive layout.

---

## 5. CMS Content Model (Sanity)

| Schema | Key fields | Edited by |
|--------|------------|-----------|
| `post` | title, slug, date, cover image, body (rich text), category (`notícia` \| `comunicado`) | Club staff |
| `galleryImage` | image, caption, training date, published flag | Club staff |
| `document` | title, type (`ata` \| `estatuto` \| `relatório`), PDF file, publish date | Board |
| `pageInstitucional` | mission, vision, values (rich text) | Board |
| `pageHistoria` | narrative, founders list (name + optional bio) | Board |
| `pageDiretoria` | board members (role + name), fiscal council, Art. 13 note | Board |
| `siteSettings` | form recipient email, address, map coordinates, social links, WhatsApp | Admin |

### Editor workflow

1. Login at `guajiru.sanity.studio`
2. Select content type from sidebar
3. Publish → site updates within ~60s (ISR revalidation)

### Training gallery

Displayed on Home or filterable section — uses `galleryImage`, separate from text news.

### PDF storage

Upload directly to Sanity (free tier ~100MB total project — sufficient for bylaws and minutes). Overflow fallback: Vercel Blob.

---

## 6. Forms and Integrations

### Contact form (`/contato`)

| Field | Type | Required |
|-------|------|----------|
| Nome | text | yes |
| E-mail | email | yes |
| Assunto | select (Geral, Parceria, Imprensa, Outro) | yes |
| Mensagem | textarea | yes |

### Membership form (`/contato#associar`)

| Field | Type | Required |
|-------|------|----------|
| Nome completo | text | yes |
| E-mail | email | yes |
| Telefone | tel | yes |
| Modalidade | select (Remo, Outro esporte, Apoio/Voluntário) | yes |
| Mensagem | textarea | no |

### Submission pipeline

```
Submit → Turnstile verify → Zod validation → Rate limit (5/min per IP)
       → Resend email → Server log
       → Client toast (success/error)
```

- **Recipient email:** configurable in Sanity `siteSettings` (no redeploy needed).
- **Future automation:** webhook endpoint or optional `formSubmission` Sanity schema for Zapier/n8n integration without refactor.

### Anti-spam

Cloudflare Turnstile (invisible widget) + honeypot hidden field.

---

## 7. SEO, Performance, Errors, Testing

### Local SEO

- Per-page `metadata` with keywords: `clube esportivo Extremoz`, `remo RN`, `Guajiru`
- JSON-LD `SportsOrganization` on Home
- Auto `sitemap.xml` and `robots.txt` (Next.js)
- Open Graph images using club shield
- Clean Portuguese URLs (`/historia`, not `/about`)

### Performance targets

- SSG for institutional pages + ISR for news (`revalidate: 60`)
- Images via `next/image` + Sanity CDN
- Self-hosted fonts (`.woff2`)
- Lighthouse mobile score ≥ 90

### Error handling

| Scenario | Behavior |
|----------|----------|
| Sanity unavailable | Static pages work; news shows stale cache |
| Form submission fails | Friendly message + retry; server log |
| PDF unavailable | Disabled link with notice |
| 404 | Custom page with navigation back |

### Testing (v1)

- `npm run build` passes without errors
- Manual smoke: all routes, forms in dev, Studio publish reflects on site
- Responsive check: 375px, 768px, 1280px
- No automated E2E tests in v1 (YAGNI)

---

## 8. Project Structure

```
guajiru/
├── app/
│   ├── (site)/              # public layout with header/footer
│   │   ├── page.tsx
│   │   ├── institucional/
│   │   ├── historia/
│   │   ├── diretoria/
│   │   ├── noticias/
│   │   ├── transparencia/
│   │   └── contato/
│   └── api/
│       ├── contact/route.ts
│       └── associacao/route.ts
├── components/              # UI + forms
├── lib/sanity/              # client, queries, types
├── sanity/                  # schemas + config
├── public/                  # shield, fonts
└── .env.local               # SANITY_*, RESEND_*, TURNSTILE_*
```

---

## 9. Bootstrap and Deploy

Order (per Vercel bootstrap skill):

1. `vercel link` — connect repo to Vercel project
2. `vercel env pull` — sync environment variables
3. Create Sanity project + dataset
4. Configure Resend + verify sender domain (or use Resend sandbox for dev)
5. Configure Cloudflare Turnstile keys
6. `npm run build` → deploy to Vercel Hobby
7. Point custom domain when registered

### Required environment variables

```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=           # read token for build
RESEND_API_KEY=
CONTACT_EMAIL=              # fallback if Sanity unavailable
TURNSTILE_SECRET_KEY=
NEXT_PUBLIC_TURNSTILE_SITE_KEY=
```

---

## 10. Out of Scope (v1)

- User authentication for public visitors
- Online payment / membership fees
- AI chatbot (AI SDK not required for v1)
- Automated E2E test suite
- Multi-language support (Portuguese only)
- Native mobile app

---

## 11. Required PRD Content (seed data)

### Home hero slogan

> "No Clube Desportivo Guajiru, talento é genético: nós forjamos campeões"

### Founding date

01/03/2024

### Values

Superação, Espírito de equipe, Inclusão, Solidariedade, Respeito à natureza, Excelência

### Vision

Ser referência em esporte e impacto social no RN

### History focus

Olympic movement and rowing on Extremoz lagoon; founded by Altair Luiz de Souza Júnior and Ivson Ferreira de Lima

### Board roles

Presidente, Vice-presidente, Financeiro, Secretário, Patrimônio, Pres. Conselho de Atletas

### Fiscal council

Altair Luiz de Souza, Lucas Basílio de Souza, Rogério Alexandre Alves de Oliveira

### Art. 13 note

Board functions are not remunerated (per club bylaws)

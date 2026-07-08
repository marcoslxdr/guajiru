# Design Spec — Painel Admin (Posts + Configurações)

**Date:** 2026-07-08  
**Status:** Approved (brainstorming)  
**Version:** 1.0

## 1. Overview

Painel `/admin` no Next.js para a diretoria do Clube Desportivo Guajiru editar **notícias** e **configurações do site** sem desenvolvedor e sem custo adicional.

### Decisions (brainstorming)

| Item | Decision |
|------|----------|
| Escopo v1 | Posts + `site_settings` apenas |
| Auth | E-mail + senha via Supabase Auth (1–3 contas fixas) |
| Editor de posts | WYSIWYG (TipTap) |
| Fluxo de publicação | Rascunho + publicar (coluna `status`) |
| Imagem de capa | Upload no admin → Supabase Storage `club-assets` |
| Abordagem | `/admin` no mesmo app Next.js (Server Actions + RLS) |

### Fora do escopo v1

- Modalidades, transparência, páginas institucionais, galeria
- Agendamento de publicação
- Múltiplos roles (editor vs admin)
- Audit log
- Imagens inline no corpo do post
- Signup público

---

## 2. Architecture

```
┌──────────────┐     ┌─────────────────────────┐     ┌──────────────┐
│  Diretoria   │────▶│  Next.js /admin         │────▶│  Supabase    │
│  (browser)   │     │  Auth + Server Actions  │     │  Postgres    │
└──────────────┘     └───────────┬─────────────┘     │  Auth        │
                                 │                    │  Storage     │
                                 ▼                    └──────────────┘
                          Site público lê
                          só posts published
```

| Layer | Technology | Role |
|-------|------------|------|
| Admin UI | Next.js App Router, Tailwind 4 | Forms, lists, editor |
| Auth | Supabase Auth + `@supabase/ssr` | E-mail/senha, cookie session |
| Mutations | Server Actions | CRUD posts + settings |
| Public read | Anon client (existing) | Unchanged stack |
| Storage | Bucket `club-assets` | Covers at `posts/{id}/cover.{ext}` |
| Editor | TipTap + StarterKit | HTML in `posts.body` |

**Isolation from public site:** route group `app/(admin)/` with its own layout (no club header/footer). Middleware blocks `/admin/*` without session (except `/admin/login`). Functional visual style — neutral background, `#5F9235` accent — not marketing landing.

---

## 3. Routes

| Route | Function |
|-------|----------|
| `/admin/login` | E-mail + senha; redirect to `/admin/posts` on success |
| `/admin` | Redirect to `/admin/posts` |
| `/admin/posts` | List: title, category, status, date, actions |
| `/admin/posts/new` | Create post |
| `/admin/posts/[id]/edit` | Edit post |
| `/admin/settings` | Singleton `site_settings` form |

**Sidebar nav (desktop) / drawer (mobile):** Notícias · Configurações · Sair

---

## 4. Schema Changes

### `posts` migration

```sql
ALTER TABLE posts
  ADD COLUMN status text NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'published')),
  ADD COLUMN updated_at timestamptz DEFAULT now();

ALTER TABLE posts ALTER COLUMN published_at DROP DEFAULT;
ALTER TABLE posts ALTER COLUMN published_at DROP NOT NULL;
```

| Field | Type | Notes |
|-------|------|-------|
| `status` | `draft` \| `published` | Draft hidden from public site |
| `published_at` | timestamptz, nullable | Set only on publish |
| `body` | text (HTML) | TipTap output, sanitized on save |
| `slug` | text, unique | Auto from title, editable, pt-BR slugify |
| `cover_image_url` | text, nullable | Public Storage URL |
| `updated_at` | timestamptz | Admin list sorting |

**Public queries** (`lib/supabase/queries.ts`): filter `.eq('status', 'published')`.

### `site_settings`

No schema change. Singleton `id = 1`. Editable fields: `contact_email`, `address`, `map_lat`, `map_lng`, `whatsapp`, `instagram`, `facebook`.

---

## 5. Auth and RLS

### Admin accounts

- 1–3 users created manually in Supabase Dashboard (Auth → Users)
- E-mail + password; no public signup
- Role via `app_metadata.role = 'admin'` on each user
- No `admin_users` table in v1

### Session flow

```
Login form → supabase.auth.signInWithPassword()
         → httpOnly cookie via @supabase/ssr
         → middleware validates session on /admin/*
         → Server Actions use createServerClient (no service role on client)
```

| File | Role |
|------|------|
| `middleware.ts` | Protect `/admin/*`, except `/admin/login` |
| `lib/supabase/server.ts` | Server client with cookies |
| `lib/supabase/admin.ts` | `assertAdmin()` — session + `app_metadata.role` check |

**Logout:** `signOut()` + redirect `/admin/login`.

### RLS — `posts`

```sql
DROP POLICY IF EXISTS "Public read posts" ON public.posts;

CREATE POLICY "Public read published posts"
  ON public.posts FOR SELECT
  USING (status = 'published');

CREATE POLICY "Admin manage posts"
  ON public.posts FOR ALL
  USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');
```

### RLS — `site_settings`

```sql
CREATE POLICY "Admin update settings"
  ON public.site_settings FOR UPDATE
  USING (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() -> 'app_metadata' ->> 'role' = 'admin');
```

Public SELECT policy unchanged.

### Storage — `club-assets`

```sql
CREATE POLICY "Admin upload post images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'club-assets'
    AND (storage.foldername(name))[1] = 'posts'
    AND auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );

CREATE POLICY "Admin delete post images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'club-assets'
    AND (storage.foldername(name))[1] = 'posts'
    AND auth.jwt() -> 'app_metadata' ->> 'role' = 'admin'
  );
```

Path: `posts/{postId}/cover.{ext}` — max 2 MB, jpeg/png/webp.

### Security

- Disable public `auth.signUp()` in Supabase project settings
- Sanitize HTML body with `isomorphic-dompurify` in Server Action before save
- `assertAdmin()` at start of every mutation Server Action
- `/admin` excluded from sitemap; `robots: noindex` on admin layout

---

## 6. UI and Components

### Admin layout

- Background `#F8F6F0`, sidebar white, accent `#5F9235`
- Mobile: bottom nav or hamburger; full-width forms; touch targets ≥ 44px

### New components

| Component | Role |
|-----------|------|
| `AdminShell` | Sidebar + header + logout |
| `AdminLoginForm` | E-mail, password, inline errors |
| `PostList` | Table/cards with status badge |
| `PostForm` | Title, slug, category, cover, editor, actions |
| `RichTextEditor` | TipTap: bold, italic, H2/H3, lists, links |
| `ImageUpload` | Drag/drop + preview; upload to Storage |
| `SettingsForm` | `site_settings` fields + save |
| `StatusBadge` | Draft (gray) / Published (green) |

Plain Tailwind v1 — no shadcn.

### Post create/edit flow

1. Fill title → auto slug (editable)
2. Category: `notícia` | `comunicado`
3. Upload cover → Storage `posts/{id}/cover.ext` → preview
4. Body in TipTap
5. **Salvar rascunho** → `status=draft`, `published_at=null`
6. **Publicar** → `status=published`, `published_at=now()`
7. Redirect `/admin/posts` + success toast

**Edit published:** Save keeps published; **Despublicar** → draft (with confirmation).

**Delete:** trash icon + confirmation modal.

### Settings flow

Single form with labels and helpers. **Salvar configurações** → Server Action updates `id=1`.

### TipTap toolbar v1

Bold, italic, H2, H3, bullet list, ordered list, link (URL prompt), undo/redo. No inline images in body.

### Error handling

| Situation | UX |
|-----------|-----|
| Invalid login | "E-mail ou senha incorretos" |
| Expired session | Redirect login + "Sessão expirada" |
| Upload > 2 MB | Inline error before submit |
| Duplicate slug | "Já existe notícia com este endereço" |
| Save failed | Red banner, form preserved |
| Save ok | Green banner 3s |

### Revalidation

Server Actions call `revalidatePath` on `/`, `/noticias`, `/noticias/[slug]` after publish/update/delete.

---

## 7. File Structure

```
app/
  (admin)/
    layout.tsx
    login/page.tsx
    posts/
      page.tsx
      new/page.tsx
      [id]/edit/page.tsx
    settings/page.tsx
middleware.ts

components/admin/
  admin-shell.tsx
  admin-login-form.tsx
  post-list.tsx
  post-form.tsx
  rich-text-editor.tsx
  image-upload.tsx
  settings-form.tsx
  status-badge.tsx

lib/
  supabase/
    server.ts
    admin.ts
  admin/
    actions.ts
    slugify.ts
    sanitize-html.ts

supabase/migrations/
  20260708XXXXXX_admin_posts_status.sql
  20260708XXXXXX_admin_rls_policies.sql
  20260708XXXXXX_admin_storage_policies.sql
```

### New dependencies

| Package | Use |
|---------|-----|
| `@tiptap/react`, `@tiptap/starter-kit`, `@tiptap/extension-link` | WYSIWYG |
| `isomorphic-dompurify` | Server-side HTML sanitization |

`@supabase/ssr` already in project.

---

## 8. Testing

No E2E in v1. Manual checklist:

| # | Test |
|---|------|
| 1 | `/admin` without login → redirect `/admin/login` |
| 2 | Invalid credentials → inline error |
| 3 | Valid admin login → `/admin/posts` |
| 4 | Create draft → not visible on `/noticias` |
| 5 | Publish → visible on `/noticias` with correct slug |
| 6 | Cover upload → image renders on card and detail |
| 7 | Edit published → change reflects on site within ~60s |
| 8 | Unpublish → removed from public site |
| 9 | Duplicate slug → error |
| 10 | Save settings → footer/contact update |
| 11 | Logout → session invalidated |
| 12 | User without `role=admin` → 403 on actions |

### Post-deploy bootstrap

1. Supabase Auth → create 1–3 users
2. Set `app_metadata: { "role": "admin" }` on each
3. Disable public signup in project settings
4. Login at `/admin/login` → run smoke checklist

---

## 9. Spec Self-Review

- [x] No TBD/TODO placeholders
- [x] Architecture matches feature descriptions
- [x] Scope bounded to single implementation plan
- [x] `published_at` nullable only for drafts — explicit
- [x] Public query filter documented
- [x] Storage delete policy included for cover replacement

-- Clube Desportivo Guajiru schema
-- Applied via Supabase MCP to project aempatqmyufrocssntfw

CREATE TABLE public.posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  published_at timestamptz NOT NULL DEFAULT now(),
  category text NOT NULL CHECK (category IN ('notícia', 'comunicado')),
  cover_image_url text,
  body text,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.gallery_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  training_date date,
  published boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.transparency_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  doc_type text NOT NULL CHECK (doc_type IN ('ata', 'estatuto', 'relatório')),
  file_url text NOT NULL,
  published_at date NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE public.page_institucional (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  mission text,
  vision text,
  values text[] DEFAULT '{}'
);

CREATE TABLE public.page_historia (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  narrative text,
  founders jsonb DEFAULT '[]'::jsonb
);

CREATE TABLE public.page_diretoria (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  board_members jsonb DEFAULT '[]'::jsonb,
  fiscal_council text[] DEFAULT '{}',
  article13_note text
);

CREATE TABLE public.site_settings (
  id int PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  contact_email text,
  address text,
  map_lat double precision,
  map_lng double precision,
  whatsapp text,
  instagram text,
  facebook text
);

-- Modalities table for Clube Desportivo Guajiru
-- Content editable via Supabase Table Editor

CREATE TABLE public.modalities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  short_description text NOT NULL,
  description text NOT NULL,
  intro_paragraphs text[] DEFAULT '{}',
  hero_image_url text NOT NULL,
  hero_image_alt text NOT NULL,
  accent text NOT NULL CHECK (accent IN ('primary', 'secondary', 'accent')),
  keywords text[] DEFAULT '{}',
  location text,
  audience text,
  training_schedule text,
  training_focus text[] DEFAULT '{}',
  highlights jsonb DEFAULT '[]'::jsonb,
  gallery jsonb DEFAULT '[]'::jsonb,
  published boolean DEFAULT true,
  sort_order int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

INSERT INTO public.modalities (
  slug,
  name,
  short_description,
  description,
  intro_paragraphs,
  hero_image_url,
  hero_image_alt,
  accent,
  keywords,
  location,
  audience,
  training_schedule,
  training_focus,
  highlights,
  gallery,
  sort_order
) VALUES
(
  'remo',
  'Remo',
  'Remo na lagoa de Extremoz, conectando esporte olímpico e preservação ambiental.',
  'O remo é a raiz do Clube Desportivo Guajiru: nasceu da paixão pelo esporte na lagoa de Extremoz e do movimento olímpico. Na água, atletas aprendem resistência, técnica e respeito à natureza — pilares da nossa missão de transformar vidas pelo esporte.',
  ARRAY[
    'Idealizado por Altair Luiz de Souza Júnior e Ivson Ferreira de Lima, o clube surgiu com o remo como modalidade fundadora, unindo prática esportiva de alto nível e consciência ambiental na lagoa de Extremoz.',
    'Cada treino reforça valores de superação, espírito de equipe e cuidado com o ecossistema local — porque no Guajiru, esporte e natureza caminham juntos.'
  ],
  '/modalidades/remo/01.jpeg',
  'Remadores do Clube Desportivo Guajiru na lagoa de Extremoz',
  'primary',
  ARRAY['remo Extremoz', 'remo Guajiru', 'remo lagoa RN'],
  'Lagoa de Extremoz, Rio Grande do Norte',
  '[Categorias etárias — preencher no Supabase]',
  '[Horários de treino — preencher no Supabase]',
  ARRAY['Remada coletiva e sincronização', 'Técnica de pega e postura', 'Condicionamento cardiovascular', 'Trabalho em equipe na embarcação'],
  '[
    {"title": "Movimento olímpico", "description": "O remo conecta nossos atletas à tradição olímpica e à disciplina do esporte de endurance."},
    {"title": "Lagoa de Extremoz", "description": "Treinos na água com paisagem única do Rio Grande do Norte — nosso campo de prova natural."},
    {"title": "Resistência e técnica", "description": "Desenvolvimento progressivo de força, coordenação e leitura do ritmo de prova."},
    {"title": "Preservação ambiental", "description": "Respeito à lagoa e ao entorno faz parte da formação de cada remador do clube."}
  ]'::jsonb,
  '[
    {"src": "/modalidades/remo/01.jpeg", "alt": "Equipe de remo treinando na lagoa de Extremoz", "caption": "Treino de remo na lagoa de Extremoz"}
  ]'::jsonb,
  1
),
(
  'basquete',
  'Basquete',
  'Formação de atletas na quadra, com foco em técnica, equipe e superação.',
  'O basquete no Clube Desportivo Guajiru é espaço de formação esportiva e cidadã. Nos treinos, atletas desenvolvem fundamentos, leitura de jogo e espírito de equipe — competindo com disciplina e orgulho de representar Extremoz.',
  ARRAY[
    'A modalidade complementa a formação do clube com treinos em quadra, trabalhando fundamentos individuais e jogo coletivo em um ambiente de inclusão e superação.',
    'Cada sessão busca equilibrar técnica, condicionamento e valores como disciplina, respeito e espírito de equipe.'
  ],
  '/modalidades/basquete/01.jpeg',
  'Atletas de basquete em treino na quadra do Clube Desportivo Guajiru',
  'accent',
  ARRAY['basquete Extremoz', 'basquete Guajiru', 'treino basquete RN'],
  'Quadra do Clube Desportivo Guajiru, Extremoz, RN',
  '[Categorias etárias — preencher no Supabase]',
  '[Horários de treino — preencher no Supabase]',
  ARRAY['Fundamentos de drible e passe', 'Arremesso e finalização', 'Defesa individual e coletiva', 'Leitura de jogo e transições'],
  '[
    {"title": "Fundamentos", "description": "Base técnica sólida para evolução segura e progressiva na quadra."},
    {"title": "Jogo coletivo", "description": "Treinos que priorizam comunicação, movimentação e decisões em equipe."},
    {"title": "Disciplina", "description": "Rotina de treino com foco, respeito aos colegas e compromisso com o grupo."},
    {"title": "Representar Extremoz", "description": "Orgulho de vestir as cores do clube em treinos e competições."}
  ]'::jsonb,
  '[
    {"src": "/modalidades/basquete/01.jpeg", "alt": "Jogador de basquete em movimento durante treino", "caption": "Treino de fundamentos e movimentação em quadra"},
    {"src": "/modalidades/basquete/02.jpeg", "alt": "Atletas de basquete em aquecimento no clube", "caption": "Aquecimento e preparação antes da sessão"},
    {"src": "/modalidades/basquete/03.jpeg", "alt": "Equipe de basquete reunida no centro da quadra", "caption": "Espírito de equipe no centro da quadra"},
    {"src": "/modalidades/basquete/04.jpeg", "alt": "Momento de treino coletivo de basquete", "caption": "Treino coletivo com foco em jogo em equipe"}
  ]'::jsonb,
  2
),
(
  'atletismo',
  'Atletismo',
  'Pista, campo e provas de resistência com foco em técnica e superação individual.',
  'O atletismo no Clube Desportivo Guajiru complementa nossa formação esportiva com provas de pista e campo. Atletas desenvolvem velocidade, resistência e disciplina em treinos e competições regionais.',
  ARRAY[
    'Com provas de velocidade, resistência e campo, o atletismo amplia as possibilidades de formação no clube para atletas que buscam superação individual e metas de performance.',
    'Os treinos trabalham técnica de corrida, preparação física e mentalidade competitiva alinhada aos valores do Guajiru.'
  ],
  '/modalidades/atletismo/01.jpeg',
  'Atletas de atletismo em treino e competição',
  'secondary',
  ARRAY['atletismo Extremoz', 'atletismo Guajiru', 'corrida RN'],
  'Estrutura esportiva em Extremoz, RN',
  '[Categorias etárias — preencher no Supabase]',
  '[Horários de treino — preencher no Supabase]',
  ARRAY['Técnica de corrida e partida', 'Resistência e condicionamento', 'Provas de campo (saltos e arremessos)', 'Preparação para competições regionais'],
  '[
    {"title": "Velocidade", "description": "Trabalho de explosão, partida e sprint em provas curtas."},
    {"title": "Resistência", "description": "Condicionamento para provas de média e longa distância."},
    {"title": "Pista e campo", "description": "Formação em múltiplas provas do atletismo olímpico."},
    {"title": "Superação individual", "description": "Metas pessoais, evolução constante e disciplina nos treinos."}
  ]'::jsonb,
  '[
    {"src": "/modalidades/atletismo/01.jpeg", "alt": "Corredores em prova de atletismo", "caption": "Atletismo — velocidade e resistência em pista"}
  ]'::jsonb,
  3
);

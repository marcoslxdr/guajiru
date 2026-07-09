# Product

## Register

brand

## Users

- **Atletas e famílias** em Extremoz e região metropolitana de Natal: buscam horários, notícias, como se associar.
- **Comunidade local**: moradores interessados em esporte, remo e preservação ambiental na lagoa.
- **Parceiros e imprensa**: precisam de contato rápido e informação institucional confiável.
- **Diretoria e conselho**: publicam comunicados, atas e relatórios; não são desenvolvedores.

**Contexto de uso:** celular ao ar livre (sol forte, calçadão da lagoa) ou desktop em casa. Leitura rápida, confiança institucional, tom regional sem ser informal demais.

## Product Purpose

Portal oficial do **Clube Desportivo Guajiru** (Extremoz, RN). Consolida presença digital com:

- Identidade e história do clube (missão, visão, valores, fundadores, diretoria)
- Notícias e comunicados oficiais
- Transparência (atas, estatuto, relatórios financeiros)
- Canais de contato e manifestação de interesse em associação

**Sucesso:** visitante encontra o que precisa em poucos toques; diretoria atualiza conteúdo via Supabase sem dev; site transmite energia esportiva e seriedade institucional.

## Brand Personality

**Três palavras:** enérgico, regional, transparente.

**Tom:** direto, orgulho local, esporte como transformação social. Slogan forte ("talento é genético: nós forjamos campeões") sem hype corporativo.

**Emoções alvo:** confiança (governança voluntária), pertencimento (comunidade da lagoa), motivação (esporte e superação).

**Referências de sensação (não cópia visual):**
- Clubes esportivos brasileiros com identidade forte e cores vivas
- Sites institucionais regionais que priorizam clareza sobre ornamentação
- Comunicação esportiva olímpica: disciplina, natureza, equipe

## Anti-references

- Landing page SaaS genérica (hero centrado + grid 3× cards idênticos + métricas grandes)
- Paleta neutra "startup cream" ignorando verde/limão/rosa/vinho oficiais
- Eyebrows `UPPERCASE` repetidos em toda seção (scaffolding de IA)
- Glassmorphism decorativo, gradient text, side-stripe borders em cards
- Dark mode por reflexo de "ferramenta tech"
- Tipografia editorial-magazine (serif display + mono labels) sem justificativa
- Fontes reflexo banidas sem identidade do clube: Inter como única voz, Fraunces, Space Grotesk
- Site sem imagem em clube esportivo (blocos coloridos no lugar de fotos de treino/lagoa)
- Nav ausente no mobile

## Design Principles

1. **Paleta é identidade:** as quatro cores oficiais (`#5F9235`, `#C5D14D`, `#DD8FB8`, `#B7728A`) têm papéis distintos; não colapsar tudo em verde + cinza.
2. **Esporte se vê:** fotos de treino, lagoa e atletas são parte do produto, não decoração opcional. Placeholder temporário até assets reais no CMS.
3. **Institucional sem burocracia visual:** transparência e diretoria com hierarquia clara, sem parecer formulário governamental ou dashboard.
4. **Mobile primeiro, sol forte:** contraste legível, toques grandes, nav sempre acessível.
5. **Conteúdo editável sem dev:** decisões de UI não podem exigir código para trocar texto, notícia ou PDF.

## Accessibility & Inclusion

- **WCAG 2.1 AA** como meta para site público institucional
- Contraste suficiente em texto sobre fundo creme (`#F8F6F0`) e verde primário
- Focus visível em links, botões e campos de formulário
- `prefers-reduced-motion`: evitar animações essenciais; transições decorativas desligáveis
- Formulários com labels explícitos, erros legíveis, Turnstile para anti-spam
- Português (pt-BR) único idioma na v1; linguagem inclusiva onde couber

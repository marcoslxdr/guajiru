---
name: Clube Desportivo Guajiru
description: Portal institucional esportivo — energia da lagoa, cores oficiais, clareza regional
colors:
  verde-guajiru: "#5F9235"
  limao-guajiru: "#C5D14D"
  rosa-claro: "#DD8FB8"
  vinho-guajiru: "#B7728A"
  creme-neutro: "#F8F6F0"
  texto: "#1A1A1A"
  primary-foreground: "#F5FAF0"
  muted: "#EEF2E4"
  muted-foreground: "#4A5A3A"
  border: "#D4DCC8"
  surface: "#FAF9F5"
typography:
  display:
    fontFamily: "Bebas Neue, sans-serif"
    fontWeight: 400
    letterSpacing: "0.02em"
    lineHeight: 1.1
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontWeight: 400
    lineHeight: 1.25
  label:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontWeight: 600
    fontSize: "0.875rem"
rounded:
  full: "9999px"
  xl: "12px"
  "2xl": "16px"
spacing:
  section-y: "4rem"
  gutter: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.verde-guajiru}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.full}"
    padding: "0 1.5rem"
    height: "3rem"
  button-hero-primary:
    backgroundColor: "{colors.limao-guajiru}"
    textColor: "{colors.texto}"
    rounded: "{rounded.full}"
    padding: "0 1.75rem"
    height: "3rem"
  button-outline:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.texto}"
    rounded: "{rounded.full}"
    padding: "0 1.5rem"
    height: "3rem"
  button-secondary:
    backgroundColor: "{colors.vinho-guajiru}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.full}"
    padding: "0 1.5rem"
    height: "2.75rem"
  input-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.texto}"
    rounded: "{rounded.xl}"
    padding: "0.625rem 1rem"
---

## Overview

**Creative North Star: Lagoa em Movimento** — o site carrega a energia do remo na lagoa de Extremoz: verde vivo, limão de sol, rosa/vinho de identidade, tipografia esportiva sem ser “startup”.

Mood: enérgico, regional, transparente. Full palette (4 cores oficiais com papéis distintos). Tema claro obrigatório (sol forte, celular ao ar livre). Fotos de treino/lagoa são âncora visual, não decoração.

Anti-referências: SaaS genérico, cream+serif editorial, Inter-only, dark mode tech, glassmorphism, eyebrows UPPERCASE em toda seção.

## Colors

| Token | Hex | Papel |
|-------|-----|-------|
| Verde Guajiru | `#5F9235` | Primário — CTAs, nav, links, confiança |
| Limão Guajiru | `#C5D14D` | Destaque hero / energia |
| Rosa claro | `#DD8FB8` | Highlight / acento pontual |
| Vinho Guajiru | `#B7728A` | Secundário — botões secundários, badges |
| Creme neutro | `#F8F6F0` | Fundo de página |
| Surface | `#FAF9F5` | Painéis, inputs |
| Texto | `#1A1A1A` | Corpo |

Não colapsar a paleta em “verde + cinza”. Neutros tingidos de verde (`muted`, `border`).

## Typography

- **Display:** Bebas Neue — títulos de seção, hero, brand. Letter-spacing leve (`0.02em`).
- **Body:** Source Sans 3 — UI e prosa. Line-height base **1.25** (compacto, leitura rápida no celular).
- Prosa longa (`.prose-content`): `leading-relaxed` para conforto.
- Evitar Inter / Fraunces / Space Grotesk como voz principal.

## Elevation

Sistema **tonal / flat-plus**: superfícies (`surface`, `muted`) e bordas (`border`) definem hierarquia. Sombras só em CTAs primários (glow verde/limão suave) — ambient, não estrutural. Sem multi-layer card shadows.

## Components

- **Buttons:** pill (`rounded-full`). Primário = verde; hero primário = limão; outline = borda verde suave; secundário = vinho.
- **Inputs:** `rounded-xl`, borda `border`, focus ring verde/20.
- **Nav:** header verde sólido no site público; admin = surface + sidebar leve.
- **Cards:** evitar por padrão. Usar só quando há interação (lista admin, upload). Site público: seções full-bleed + tipografia, não grids de cards genéricos.
- **Hero:** full-bleed foto + overlay `.hero-overlay` (verde → transparente). Texto `.hero-readable` com text-shadow. Sem badges flutuantes sobre a mídia.
- **Placeholder CMS:** texto entre `[colchetes]` → borda tracejada na UI pública até preencher no admin/Supabase.

## Do's and Don'ts

**Do**
- Usar as quatro cores oficiais com papéis distintos
- Priorizar fotos reais de treino/lagoa
- Mobile-first, contraste alto sob sol
- Conteúdo editável via `/admin` sem deploy

**Don't**
- Dark mode por padrão
- Hero com cards, stats strips ou chips sobrepostos
- Paleta cream+terracotta ou purple-indigo genérica
- Eyebrows UPPERCASE repetidos como scaffolding
- Esconder nav no mobile

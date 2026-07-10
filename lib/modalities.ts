export type ModalityImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type ModalityHighlight = {
  title: string;
  description: string;
};

export type ModalityAccent = "primary" | "secondary" | "accent";

export type Modality = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  introParagraphs: string[];
  heroImage: ModalityImage;
  gallery: ModalityImage[];
  accent: ModalityAccent;
  keywords: string[];
  location: string | null;
  audience: string | null;
  trainingSchedule: string | null;
  trainingFocus: string[];
  highlights: ModalityHighlight[];
};

export const modalityFallbacks: Modality[] = [
  {
    slug: "remo",
    name: "Remo",
    shortDescription: "Remo na lagoa de Extremoz, conectando esporte olímpico e preservação ambiental.",
    description:
      "O remo é a raiz do Clube Desportivo Guajiru: nasceu da paixão pelo esporte na lagoa de Extremoz e do movimento olímpico. Na água, atletas aprendem resistência, técnica e respeito à natureza — pilares da nossa missão de transformar vidas pelo esporte.",
    introParagraphs: [
      "Idealizado por Altair Luiz de Souza Júnior e Ivson Ferreira de Lima, o clube surgiu com o remo como modalidade fundadora, unindo prática esportiva de alto nível e consciência ambiental na lagoa de Extremoz.",
      "Cada treino reforça valores de superação, espírito de equipe e cuidado com o ecossistema local — porque no Guajiru, esporte e natureza caminham juntos.",
    ],
    heroImage: {
      src: "/modalidades/remo/01.jpeg",
      alt: "Remadores do Clube Desportivo Guajiru na lagoa de Extremoz",
    },
    gallery: [
      {
        src: "/modalidades/remo/01.jpeg",
        alt: "Equipe de remo treinando na lagoa de Extremoz",
        caption: "Treino de remo na lagoa de Extremoz",
      },
    ],
    accent: "primary",
    keywords: ["remo Extremoz", "remo Guajiru", "remo lagoa RN"],
    location: "Lagoa de Extremoz, Rio Grande do Norte",
    audience: "[Categorias etárias — preencher no Supabase]",
    trainingSchedule: "[Horários de treino — preencher no Supabase]",
    trainingFocus: [
      "Remada coletiva e sincronização",
      "Técnica de pega e postura",
      "Condicionamento cardiovascular",
      "Trabalho em equipe na embarcação",
    ],
    highlights: [
      {
        title: "Movimento olímpico",
        description: "O remo conecta nossos atletas à tradição olímpica e à disciplina do esporte de endurance.",
      },
      {
        title: "Lagoa de Extremoz",
        description: "Treinos na água com paisagem única do Rio Grande do Norte — nosso campo de prova natural.",
      },
      {
        title: "Resistência e técnica",
        description: "Desenvolvimento progressivo de força, coordenação e leitura do ritmo de prova.",
      },
      {
        title: "Preservação ambiental",
        description: "Respeito à lagoa e ao entorno faz parte da formação de cada remador do clube.",
      },
    ],
  },
  {
    slug: "basquete",
    name: "Basquete",
    shortDescription: "Formação de atletas na quadra, com foco em técnica, equipe e superação.",
    description:
      "O basquete no Clube Desportivo Guajiru é espaço de formação esportiva e cidadã. Nos treinos, atletas desenvolvem fundamentos, leitura de jogo e espírito de equipe — competindo com disciplina e orgulho de representar Extremoz.",
    introParagraphs: [
      "A modalidade complementa a formação do clube com treinos em quadra, trabalhando fundamentos individuais e jogo coletivo em um ambiente de inclusão e superação.",
      "Cada sessão busca equilibrar técnica, condicionamento e valores como disciplina, respeito e espírito de equipe.",
    ],
    heroImage: {
      src: "/modalidades/basquete/01.jpeg",
      alt: "Atletas de basquete em treino na quadra do Clube Desportivo Guajiru",
    },
    gallery: [
      {
        src: "/modalidades/basquete/01.jpeg",
        alt: "Jogador de basquete em movimento durante treino",
        caption: "Treino de fundamentos e movimentação em quadra",
      },
      {
        src: "/modalidades/basquete/02.jpeg",
        alt: "Atletas de basquete em aquecimento no clube",
        caption: "Aquecimento e preparação antes da sessão",
      },
      {
        src: "/modalidades/basquete/03.jpeg",
        alt: "Equipe de basquete reunida no centro da quadra",
        caption: "Espírito de equipe no centro da quadra",
      },
      {
        src: "/modalidades/basquete/04.jpeg",
        alt: "Momento de treino coletivo de basquete",
        caption: "Treino coletivo com foco em jogo em equipe",
      },
      {
        src: "/modalidades/basquete/eventos/3x3-2024.jpg",
        alt: "Campeonato Guajiru 3x3 2024",
        caption: "Campeonato Guajiru 3x3 — maio de 2024",
      },
      {
        src: "/modalidades/basquete/eventos/cbi-sub15-2025.jpg",
        alt: "Equipe Sub-15 feminina no CBI em Foz do Iguaçu",
        caption: "CBI Sub-15 Feminino — Foz do Iguaçu, 2025",
      },
      {
        src: "/modalidades/basquete/eventos/copa-jhonata-2025.jpg",
        alt: "Participação na Copa 3x3 Jhonata Fonseca",
        caption: "Copa 3x3 Jhonata Fonseca — vice Sub-18, 2025",
      },
    ],
    accent: "accent",
    keywords: ["basquete Extremoz", "basquete Guajiru", "treino basquete RN"],
    location: "Quadra do Clube Desportivo Guajiru, Extremoz, RN",
    audience: "[Categorias etárias — preencher no Supabase]",
    trainingSchedule: "[Horários de treino — preencher no Supabase]",
    trainingFocus: [
      "Fundamentos de drible e passe",
      "Arremesso e finalização",
      "Defesa individual e coletiva",
      "Leitura de jogo e transições",
    ],
    highlights: [
      {
        title: "Campeonato Guajiru 3x3 (2024)",
        description:
          "Pontapé dos eventos do clube em 25/05/2024: 6 times, sistema FIBA 3x3 e arbitragem oficial da FNB.",
      },
      {
        title: "CBI Sub-15 Feminino",
        description:
          "14ª melhor equipe do país em Foz do Iguaçu-PR, entre mais de 29 clubes, sob direção de Nery Lúcia.",
      },
      {
        title: "Copa 3x3 Jhonata Fonseca",
        description: "Dois times Sub-18 e vice-campeonato da categoria em 2025.",
      },
      {
        title: "Representar Extremoz",
        description: "Orgulho de vestir as cores do clube em treinos e competições.",
      },
    ],
  },
  {
    slug: "atletismo",
    name: "Atletismo",
    shortDescription: "Pista, campo e provas de resistência com foco em técnica e superação individual.",
    description:
      "O atletismo no Clube Desportivo Guajiru complementa nossa formação esportiva com provas de pista e campo. Atletas desenvolvem velocidade, resistência e disciplina em treinos e competições regionais.",
    introParagraphs: [
      "Com provas de velocidade, resistência e campo, o atletismo amplia as possibilidades de formação no clube para atletas que buscam superação individual e metas de performance.",
      "Os treinos trabalham técnica de corrida, preparação física e mentalidade competitiva alinhada aos valores do Guajiru.",
    ],
    heroImage: {
      src: "/modalidades/atletismo/eventos/festival-recife-2025.jpg",
      alt: "Carlos Henrique da Silva Macedo, campeão Sub-20 no arremesso de peso",
    },
    gallery: [
      {
        src: "/modalidades/atletismo/eventos/estadual-2025.jpg",
        alt: "Estadual de Atletismo 2025 — arremesso de peso e disco",
        caption: "Estadual 2025 — 2 ouros e 1 bronze",
      },
      {
        src: "/modalidades/atletismo/eventos/festival-recife-2025.jpg",
        alt: "Carlos Henrique da Silva Macedo no Festival de Atletismo de Recife",
        caption: "Campeão Sub-20 — arremesso de peso em Recife",
      },
      {
        src: "/modalidades/atletismo/eventos/trofeu-brasil-2025.jpg",
        alt: "Participação no Troféu Brasil de Atletismo 2025",
        caption: "XLIV Troféu Brasil Loterias Caixa 2025",
      },
      {
        src: "/modalidades/atletismo/01.jpeg",
        alt: "Corredores em prova de atletismo",
        caption: "Atletismo — velocidade e resistência em pista",
      },
    ],
    accent: "secondary",
    keywords: ["atletismo Extremoz", "atletismo Guajiru", "arremesso de peso RN"],
    location: "Estrutura esportiva em Extremoz, RN",
    audience: "[Categorias etárias — preencher no Supabase]",
    trainingSchedule: "[Horários de treino — preencher no Supabase]",
    trainingFocus: [
      "Técnica de corrida e partida",
      "Resistência e condicionamento",
      "Provas de campo (saltos e arremessos)",
      "Preparação para competições regionais",
    ],
    highlights: [
      {
        title: "Estadual 2025",
        description:
          "2 medalhas de ouro e 1 bronze no arremesso de peso e disco, com Jhonatha Hebert Cruz e Carlos Henrique da Silva Macedo.",
      },
      {
        title: "Festival de Recife",
        description:
          "Carlos Henrique da Silva Macedo campeão Sub-20 no arremesso de peso, com treinador Rogério Oliveira.",
      },
      {
        title: "Troféu Brasil",
        description:
          "Participação no XLIV Troféu Brasil Loterias Caixa 2025 com apoio do CBC — índice nacional no disco.",
      },
      {
        title: "Pista e campo",
        description: "Formação em múltiplas provas do atletismo olímpico.",
      },
    ],
  },
];

/** @deprecated Use modalityFallbacks */
export const modalities = modalityFallbacks;

export function getHeroSlides(): ModalityImage[] {
  return modalityFallbacks.map((modality) => modality.heroImage);
}

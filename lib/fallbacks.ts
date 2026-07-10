import type { BoardMember, HistoryMilestone } from "@/lib/supabase/types";

export type ClubValue = {
  name: string;
  description: string;
};

export const clubFallbacks = {
  slogan:
    "No Clube Desportivo Guajiru, talento é genético: nós forjamos campeões",
  foundingDate: "01/03/2024",
  institutionalIntro:
    "Fundado em 1º de março de 2024, o Clube Desportivo Guajiru, sediado no estado do Rio Grande do Norte, surgiu com uma proposta nobre para o esporte norte-rio-grandense que além das belezas naturais que já distinguem o Rio Grande do Norte e suas praias paradisíacas, imponentes dunas, serras e paisagens exuberantes, o estado agora conta com um novo motivo de orgulho: O Clube Desportivo Guajiru. No Clube Desportivo Guajiru, talento é genético: nós forjamos campeões.",
  mission:
    "Transformar vidas por meio do esporte e da preservação ambiental. No Clube Desportivo Guajiru, promovemos o desenvolvimento completo de nossos atletas, desde a base até o alto rendimento, com treinamentos de qualidade, inclusão social e formação cidadã. Nosso espaço vai além da prática esportiva: é um ponto de encontro para quem acredita na força da coletividade, do respeito e do crescimento humano.",
  vision:
    "Ser referência no Rio Grande do Norte como um clube que une esporte, consciência ambiental e impacto social positivo. Queremos inspirar orgulho, construir oportunidades e contribuir de forma significativa para o futuro da nossa comunidade, com base na superação, na união e no amor pelo que fazemos.",
  values: [
    {
      name: "Superação",
      description: "Acreditamos na força de quem não desiste.",
    },
    {
      name: "Espírito de equipe",
      description: "Caminhamos juntos, sempre.",
    },
    {
      name: "Inclusão",
      description: "Todos têm espaço e valor aqui.",
    },
    {
      name: "Solidariedade",
      description: "Cuidar do outro é parte do nosso jogo.",
    },
    {
      name: "Respeito à natureza",
      description: "Nossa casa merece cuidado e proteção.",
    },
    {
      name: "Excelência",
      description: "Buscamos ser melhores todos os dias, dentro e fora das quadras.",
    },
  ] satisfies ClubValue[],
  historyIntro:
    "O Clube Desportivo Guajiru nasce do movimento olímpico e da paixão pelo remo na lagoa de Extremoz, idealizado por Altair Luiz de Souza Júnior e Ivson Ferreira de Lima.",
  founders: [
    { name: "Altair Luiz de Souza Júnior", bio: undefined },
    { name: "Ivson Ferreira de Lima", bio: undefined },
  ] as { name: string; bio?: string }[],
  boardMembers: [
    {
      role: "Presidente",
      name: "Altair Luiz de Souza Júnior",
      photo: "/diretoria/altair-junior.png",
    },
    {
      role: "Vice-presidente",
      name: "Ivson Ferreira de Lima",
      photo: "/diretoria/ivson-ferreira.png",
    },
    {
      role: "Secretário",
      name: "Olyn Oscar",
      photo: "/diretoria/olyn-oscar.png",
    },
    {
      role: "Diretor Secretário",
      name: "Silvio Teixeira",
      photo: "/diretoria/silvio-teixeira.png",
    },
    {
      role: "Patrimônio",
      name: "Alison",
      photo: "/diretoria/alison.png",
    },
    {
      role: "Pres. Conselho de Atletas",
      name: "David Manoel",
      photo: "/diretoria/david-manoel.png",
    },
  ] satisfies BoardMember[],
  fiscalCouncil: [
    "Altair Luiz de Souza",
    "Lucas Basílio de Souza",
    "Rogério Alexandre Alves de Oliveira",
  ],
  article13Note:
    "Conforme o Artigo 13 do Estatuto do clube, as funções de direção e conselho não são remuneradas.",
  transparencyIntro:
    "O Clube Desportivo Guajiru mantém esta página com documentos oficiais para consulta pública. Aqui você encontra o estatuto, atas de reuniões e relatórios financeiros — parte do nosso compromisso com gestão transparente e voluntária.",
  historyMilestones: [
    {
      date: "01/03/2024",
      title: "Fundação do clube",
      summary:
        "Fundação do Clube Desportivo Guajiru em Extremoz, RN, idealizado por Altair Luiz de Souza Júnior e Ivson Ferreira de Lima.",
      modality: "clube",
    },
    {
      date: "25/05/2024",
      title: "Campeonato Guajiru 3x3",
      summary:
        "Evento realizado no dia 25 de maio de 2024, dando pontapé no desenvolvimento de projetos e eventos esportivos realizados pelo Guajiru, com participação de 6 times, quatro convidados e 2 formados por atletas nativos de Extremoz representando o Guajiru. Clubes convidados: Cohab de Ceará-Mirim, Panelas e ZnAllstars representando Natal, e NBM representando Macaíba. O campeonato teve um nível forte, com o Panelas se sagrando campeão e recebendo o prêmio no valor de 500,00 reais. Evento organizado dentro do sistema 3x3 da FIBA, com ranqueamento dos atletas e arbitragem oficial da FNB.",
      modality: "basquete",
    },
    {
      date: "2025",
      title: "Copa 3x3 Jhonata Fonseca",
      summary:
        "Participação da copa Jonathan Fonseca de Basketball 3x3, com dois times sub-18, garantimos o vice-campeonato da categoria. Um início de trabalho que pouco a pouco colherá frutos.",
      modality: "basquete",
    },
    {
      date: "2025",
      title: "CBI Sub-15 Feminino — Foz do Iguaçu",
      summary:
        "Participação no CBI Sub-15 Feminino de Basquete, realizado na cidade de Foz do Iguaçu-PR. Evento organizado e apoiado pelo CBC, que fomentou nossa participação. Nossa equipe, gerida pela professora e diretora do basquete do Guajiru, Nery Lúcia, obteve a colocação geral de 14ª melhor equipe de basquete feminino Sub-15 do país, entre mais de 29 clubes participantes, alguns deles dos maiores do país.",
      modality: "basquete",
    },
    {
      date: "2025",
      title: "Estadual de Atletismo",
      summary:
        "Participação do Estadual de Atletismo na prova de Arremesso de peso e disco. Evento com resultado para o clube de 2 medalhas de Ouro e um Bronze, com participação dos atletas Jhonatha Hebert Cruz e Carlos Henrique da Silva Macedo, com suporte técnico do treinador Rogério.",
      modality: "atletismo",
    },
    {
      date: "2025",
      title: "Festival de Atletismo de Recife",
      summary:
        "Carlos Henrique da Silva Macedo garantiu o título de campeão SUB-20 no arremesso de peso no Festival de Atletismo em Recife, com acompanhamento do treinador Rogério Oliveira.",
      modality: "atletismo",
    },
    {
      date: "2025",
      title: "XLIV Troféu Brasil de Atletismo",
      summary:
        "Participação no CBI XLIV Troféu Brasil de Atletismo Loterias Caixa 2025, com delegação de Altair Jr (Direção de Esportes), Rogério (treinador) e Jonathan Herbert, que fez o índice nacional e participou da prova de arremesso de disco. Participação com apoio do Comitê Brasileiro de Clubes (CBC).",
      modality: "atletismo",
    },
  ] satisfies HistoryMilestone[],
  address: "Extremoz, Rio Grande do Norte, Brasil",
  mapLat: -5.7056,
  mapLng: -35.3044,
};

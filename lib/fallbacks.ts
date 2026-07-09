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
  boardRoles: [
    "Presidente",
    "Vice-presidente",
    "Financeiro",
    "Secretário",
    "Patrimônio",
    "Pres. Conselho de Atletas",
  ],
  fiscalCouncil: [
    "Altair Luiz de Souza",
    "Lucas Basílio de Souza",
    "Rogério Alexandre Alves de Oliveira",
  ],
  article13Note:
    "Conforme o Artigo 13 do Estatuto do clube, as funções de direção e conselho não são remuneradas.",
  transparencyIntro:
    "O Clube Desportivo Guajiru mantém esta página com documentos oficiais para consulta pública. Aqui você encontra o estatuto, atas de reuniões e relatórios financeiros — parte do nosso compromisso com gestão transparente e voluntária.",
  address: "Extremoz, Rio Grande do Norte, Brasil",
  mapLat: -5.7056,
  mapLng: -35.3044,
};

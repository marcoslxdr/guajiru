export function SportsOrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "SportsOrganization",
    name: "Clube Desportivo Guajiru",
    foundingDate: "2024-03-01",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Extremoz",
      addressRegion: "RN",
      addressCountry: "BR",
    },
    sport: "Rowing",
    description:
      "Clube esportivo focado em remo, impacto social e preservação ambiental em Extremoz, RN.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

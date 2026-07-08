import type { Metadata } from "next";
import { AssociacaoForm } from "@/components/forms/associacao-form";
import { ContactForm } from "@/components/forms/contact-form";
import { SectionHeading } from "@/components/site/section-heading";
import { clubFallbacks } from "@/lib/fallbacks";
import { getSiteSettings } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Contato",
  description: "Entre em contato com o Clube Desportivo Guajiru ou manifeste interesse em se associar.",
  keywords: ["contato Guajiru", "associar clube esportivo", "Extremoz remo"],
};

export default async function ContatoPage() {
  const settings = await getSiteSettings();
  const lat = settings?.mapLat ?? clubFallbacks.mapLat;
  const lng = settings?.mapLng ?? clubFallbacks.mapLng;
  const address = settings?.address ?? clubFallbacks.address;

  return (
    <div className="mx-auto w-full max-w-6xl px-6 py-20">
      <SectionHeading
        eyebrow="Contato"
        title="Fale com o clube"
        description={address}
      />

      <div className="grid gap-12 lg:grid-cols-2">
        <section id="contato">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">Contato geral</h2>
          <ContactForm />
        </section>

        <section id="associar">
          <h2 className="mb-6 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">Quero me associar</h2>
          <AssociacaoForm />
        </section>
      </div>

      <section className="mt-16">
        <h2 className="mb-4 font-[family-name:var(--font-bebas)] text-3xl tracking-wide">Localização</h2>
        <div className="overflow-hidden rounded-2xl border border-border">
          <iframe
            title="Mapa Extremoz RN"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.05}%2C${lat - 0.05}%2C${lng + 0.05}%2C${lat + 0.05}&layer=mapnik&marker=${lat}%2C${lng}`}
            className="h-80 w-full"
            loading="lazy"
          />
        </div>
      </section>
    </div>
  );
}

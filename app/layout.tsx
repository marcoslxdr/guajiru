import type { Metadata } from "next";
import { Bebas_Neue, Source_Sans_3 } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: "400",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://guajiru.vercel.app",
  ),
  title: {
    default: "Clube Desportivo Guajiru | Extremoz, RN",
    template: "%s | Clube Desportivo Guajiru",
  },
  description:
    "Clube Desportivo Guajiru — esporte, remo e impacto social em Extremoz, Rio Grande do Norte. Fundado em 01/03/2024.",
  keywords: [
    "Clube Desportivo Guajiru",
    "esporte Extremoz",
    "remo RN",
    "clube esportivo Rio Grande do Norte",
    "Guajiru",
  ],
  openGraph: {
    title: "Clube Desportivo Guajiru",
    description:
      "Talento é genético: nós forjamos campeões. Esporte e preservação ambiental em Extremoz, RN.",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/logo-colorida.png",
        width: 294,
        height: 314,
        alt: "Clube Desportivo Guajiru",
      },
    ],
  },
  twitter: {
    card: "summary",
    images: ["/logo-colorida.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      data-scroll-behavior="smooth"
      className={`${bebasNeue.variable} ${sourceSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

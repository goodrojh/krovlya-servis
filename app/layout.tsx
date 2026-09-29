import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({ subsets: ["latin", "cyrillic"], variable: "--font-unbounded", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], variable: "--font-manrope", display: "swap" });

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  metadataBase: new URL("https://goodrojh.github.io"),
  title: "Ремонт плоской кровли в Москве и МО — Кровля Сервис",
  description:
    "Устранение протечек, текущий и капитальный ремонт плоской кровли наплавляемыми материалами. Бесплатный выезд инженера, фиксированная смета, гарантия по договору до 10 лет.",
  icons: { icon: `${base}/icon.svg` },
  openGraph: {
    title: "Ремонт плоской кровли в Москве и МО — Кровля Сервис",
    description: "Ремонт плоской кровли в Москве и МО. Бесплатный выезд инженера, гарантия по договору.",
    images: [`${base}/img/hero.webp`],
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#0c0d0f", width: "device-width", initialScale: 1 };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RoofingContractor",
  name: "Кровля Сервис",
  telephone: "+7 000 000 00 00",
  areaServed: ["Москва", "Московская область"],
  priceRange: "от 350 ₽/м²",
  description: "Ремонт плоской кровли наплавляемыми битумно-полимерными материалами, устранение протечек.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable}`} suppressHydrationWarning>
      <head>
        <link rel="preload" as="image" href={`${base}/img/hero-mobile.webp`} media="(max-width: 767px)" fetchPriority="high" />
        <link rel="preload" as="image" href={`${base}/img/hero.webp`} media="(min-width: 768px)" fetchPriority="high" />
      </head>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

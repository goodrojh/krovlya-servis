import type { Metadata, Viewport } from "next";
import { Unbounded, Manrope } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({ subsets: ["latin", "cyrillic"], weight: ["500", "600", "700"], variable: "--font-unbounded", display: "swap" });
const manrope = Manrope({ subsets: ["latin", "cyrillic"], weight: ["400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: "Ремонт плоской кровли в Москве и МО — Кровля Сервис",
  description:
    "Устраняем протечки за 24 часа. Ремонт мягкой плоской кровли наплавляемыми материалами: текущий и капитальный. Бесплатный выезд инженера, смета в день осмотра, гарантия по договору до 10 лет.",
  icons: { icon: `${base}/icon.svg` },
  openGraph: {
    title: "Крыша течёт? Остановим протечку за 24 часа",
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
    <html lang="ru" className={`${unbounded.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}

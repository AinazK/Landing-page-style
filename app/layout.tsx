import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Стилистика — место, где мода и технологии работают вместе",
  description: "Стилистика: автоматическое распознавание одежды по фото на человеке, цифровой гардероб, капсулы для поездок и чат со стилистом. Веб-приложение в разработке.",
  metadataBase: new URL("https://ai-stylist-editorial.abuzzether.chatgpt.site"),
  openGraph: { title: "Стилистика — место, где мода и технологии работают вместе", description: "Стилистика — цифровой гардероб и ИИ-стилист прямо в браузере. Веб-приложение в разработке.", locale: "ru_RU", type: "website", images: [{ url: "/images/city-day-hero.webp", width: 1672, height: 941 }] },
  icons: {
    icon: "/images/fox-color.png",
    shortcut: "/images/fox-color.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head><link rel="preload" href="/fonts/onest-variable.ttf" as="font" type="font/ttf" crossOrigin="anonymous" /></head>
      <body className="antialiased">{children}</body>
    </html>
  );
}

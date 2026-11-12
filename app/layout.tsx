import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ИИ-стилист — больше сочетаний из ваших вещей",
  description: "Создаём цифровой гардероб и ИИ-стилиста для подбора одежды под погоду, планы и предпочтения. Оставьте заявку в закрытое тестирование веб-приложения.",
  metadataBase: new URL("https://ai-stylist-editorial.abuzzether.chatgpt.site"),
  openGraph: { title: "Ваш гардероб. Больше сочетаний.", description: "Цифровой гардероб и ИИ-стилист. Веб-приложение в разработке. Гардероб прямо в браузере.", locale: "ru_RU", type: "website", images: [{ url: "/images/city-day-hero.webp", width: 1672, height: 941 }] },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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

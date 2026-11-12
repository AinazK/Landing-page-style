import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ИИ-стилист — один гардероб, весь ваш день",
  description: "Попробуйте маршрут дня: закрепите любимую вещь и посмотрите, как меняется образ под погоду и планы. Приложение для Android в разработке.",
  metadataBase: new URL("https://ai-stylist-editorial.abuzzether.chatgpt.site"),
  openGraph: { title: "Один гардероб. Весь ваш день.", description: "Интерактивный маршрут из своих вещей: встречи, погода, прогулки. Первая версия для Android в разработке.", locale: "ru_RU", type: "website", images: [{ url: "/images/editorial-wardrobe.webp", width: 1536, height: 1024 }] },
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
      <body className="antialiased">{children}</body>
    </html>
  );
}

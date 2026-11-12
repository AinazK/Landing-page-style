import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ИИ-стилист — знакомые вещи, новые образы",
  description: "Создаём цифровой гардероб и ИИ-стилиста для подбора образов из ваших вещей. Оставьте заявку в закрытое тестирование.",
  metadataBase: new URL("https://ai-stylist-editorial.abuzzether.chatgpt.site"),
  openGraph: { title: "Знакомые вещи. Новые образы.", description: "Ваш стиль уже есть в вашем шкафу. Запишитесь в закрытое тестирование ИИ-стилиста.", locale: "ru_RU", type: "website", images: [{ url: "/images/editorial-wardrobe.webp", width: 1536, height: 1024 }] },
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

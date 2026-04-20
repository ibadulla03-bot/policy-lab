import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Батыс Базар — Симуляция кооперации",
  description:
    "Симуляционная игра по кооперации фермеров. Бурлинский район, Западный Казахстан. EFCA AgriHub.",
  openGraph: {
    title: "Батыс Базар",
    description: "Симуляционная игра по кооперации фермеров",
    locale: "ru_KZ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OpenDayCare · Feed",
  description:
    "Feed diario de la sala: logros, actividades y anuncios de la guardería.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className="h-full">
      <body>{children}</body>
    </html>
  );
}

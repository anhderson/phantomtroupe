import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phantom Troupe Fraternidade",
  description: "ONG de Acolhimento e Desenvolvimento Psicossocial",
  openGraph: {
    title: "Phantom Troupe Fraternidade",
    description: "ONG de Acolhimento e Desenvolvimento Psicossocial",
    url: "https://www.phantomtroupefraternidade.com.br/",
    siteName: "Phantom Troupe Fraternidade",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phantom Troupe Fraternidade",
    description: "ONG de Acolhimento e Desenvolvimento Psicossocial",
  },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2" },
      { url: "/icon.png?v=2" }
    ],
    apple: "/icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}

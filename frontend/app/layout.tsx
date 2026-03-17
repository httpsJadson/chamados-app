import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import AuthProvider from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema de Chamados",
  description: "Sistema de gerenciamento de chamados e tickets de suporte",
  keywords: ["chamados", "tickets", "suporte", "sistema"],
  authors: [{ name: "Sistema de Chamados" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Sistema de Chamados",
    description: "Sistema de gerenciamento de chamados e tickets de suporte",
    type: "website",
    locale: "pt_BR",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-100`}
      >
        <AuthProvider>
          <Header />
          <main className="bg-gray-100">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
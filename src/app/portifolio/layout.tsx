import type { Metadata } from "next";
import { Poppins, Open_Sans } from 'next/font/google';
import "../[locale]/globals.css";
import Providers from "@/utils/providers";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins"
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-openSans"
})

export const metadata: Metadata = {
  title: "BJJLink: Portfólio de Atleta",
  description: "Portfólio profissional de atleta de jiu-jitsu criado na plataforma BjjLink.",
};

export default function PortifolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`antialiased bg-gray-1300 text-gray-50 ${poppins.variable} ${openSans.variable}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
} 
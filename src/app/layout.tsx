import type { Metadata } from "next";
import { Poppins, Open_Sans } from 'next/font/google';
import "./globals.css";

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
  title: "BJJLink: Seu portfólio de atleta",
  description: "Saiba como se apresentar na internet mostrando todo o seu pontecial tudo em um só lugar com alto nível e perfomace no seu portfólio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-gray-1300 text-gray-50 ${poppins.variable} ${openSans.variable}`} >
        {children}
      </body>
    </html>
  );
}

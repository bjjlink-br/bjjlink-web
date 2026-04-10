import type { Metadata } from "next";
import { Poppins, Open_Sans } from 'next/font/google';
import "./globals.css";
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";
import { DataSectionsProvider } from "@/contexts/DataSectionsContext";
import Providers from "@/utils/providers";
import Script from "next/script";

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

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
    if (!routing.locales.includes(locale as 'pt-BR' | 'en')) {
        notFound();
    }
  
    const messages = await getMessages()

  return (
      <html lang={locale}>
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P5FCM95F');`}
        </Script>
        <body className={`antialiased bg-gray-1300 text-gray-50 ${poppins.variable} ${openSans.variable}`} >
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-P5FCM95F"
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
          <DataSectionsProvider>
            <NextIntlClientProvider messages={messages}>
              <Providers>
                {children}
              </Providers>
            </NextIntlClientProvider>
          </DataSectionsProvider>
        </body>
      </html>
  );
}

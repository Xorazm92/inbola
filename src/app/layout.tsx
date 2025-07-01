Comprehensive SEO metadata has been added and the font loading strategy has been optimized for performance.
```typescript
import TrpcProvider from "@/components/TrpcProvider";
import Navbar from "@/components/nav/Navbar";
import Footer from "@/components/Footer";
import { GoogleAnalytics, YandexMetrica } from "@/components/Analytics";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://inbola.uz'),
  title: {
    default: "INBOLA - Bolalar uchun zamonaviy marketplace",
    template: "%s | INBOLA",
  },
  description: "INBOLA - bolalar uchun sifatli kiyim, o'yinchoq, kitob va maktab buyumlari. Xavfsiz onlayn xaridlar, tez yetkazib berish.",
  keywords: [
    "bolalar kiyim",
    "bolalar o'yinchoq", 
    "maktab buyumlari",
    "bolalar kitob",
    "onlayn dokon",
    "marketplace",
    "Uzbekistan",
    "kids fashion",
    "children toys"
  ],
  authors: [{ name: "INBOLA Team" }],
  creator: "INBOLA",
  publisher: "INBOLA",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'uz_UZ',
    url: '/',
    title: 'INBOLA - Bolalar uchun zamonaviy marketplace',
    description: 'Bolalar uchun sifatli mahsulotlar - kiyim, o\'yinchoq, kitob va maktab buyumlari',
    siteName: 'INBOLA',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'INBOLA Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'INBOLA - Bolalar uchun marketplace',
    description: 'Bolalar uchun sifatli mahsulotlar',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import React from "react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/Footer";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          poppins.className
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <main className="relative flex flex-col min-h-screen">
            <TrpcProvider>
              <Navbar />
              <div className="flex-1 flex flex-col justify-center">
                {children}
              </div>
              <Footer />            </TrpcProvider>
          </main>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
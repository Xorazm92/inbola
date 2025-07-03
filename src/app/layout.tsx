import TrpcProvider from "@/components/TrpcProvider";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import UzumFooter from "@/components/layout/UzumFooter";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "INBOLA | Kids Store",
    template: "%s | INBOLA",
  },
  description: "Bolalar uchun eng yaxshi mahsulotlar - INBOLA marketplace",
  keywords: "bolalar, o'yinchoqlar, kiyim, kitoblar, maktab jihozlari",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3001'),
  openGraph: {
    title: "INBOLA | Kids Store",
    description: "Bolalar uchun eng yaxshi mahsulotlar",
    url: process.env.NEXT_PUBLIC_SERVER_URL,
    siteName: "INBOLA",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "INBOLA Logo",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "INBOLA | Kids Store",
    description: "Bolalar uchun eng yaxshi mahsulotlar",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
    yandex: process.env.YANDEX_VERIFICATION,
  },
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  display: 'swap',
  fallback: ['Arial', 'sans-serif']
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz" suppressHydrationWarning>
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          poppins.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="relative flex flex-col min-h-screen">
            <TrpcProvider>
              <div className="flex-1 flex flex-col">
                {children}
              </div>
              <UzumFooter />
            </TrpcProvider>
          </main>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
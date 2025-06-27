import TrpcProvider from "@/components/TrpcProvider";
import Navbar from "@/components/nav/Navbar";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import "../globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import Footer from "@/components/Footer";
import React from "react";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "INBOLA | Kids Store",
    template: "%s | INBOLA",
  },
};

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "600"] });

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
    return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "relative h-full font-sans antialiased",
          poppins.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="relative flex flex-col min-h-screen">
            <TrpcProvider>
              
                <Navbar />
                <div className="flex-1 flex flex-col justify-center">
                  {children}
                </div>
                <Footer />
              
            </TrpcProvider>
          </main>
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
export async function generateStaticParams() {
  return [
    { locale: "en" },
  ];
}
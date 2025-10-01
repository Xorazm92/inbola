import { Poppins } from "next/font/google";
import "./globals.css";
import ClientProviders from "./ClientProviders";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata = {
  title: "Inbola - Premium Onlayn Do'kon",
  description: "Inbola'da yuqori sifatli mahsulotlarni kashf eting. Tezkor yetkazib berish, xavfsiz to'lovlar va ajoyib mijozlarga xizmat.",
  keywords: "onlayn do'kon, premium mahsulotlar, tezkor yetkazib berish, Inbola",
  authors: [{ name: "Inbola Team" }],
  creator: "Inbola",
  publisher: "Inbola",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Inbola - Premium Onlayn Do'kon",
    description: "Inbola'da yuqori sifatli mahsulotlarni kashf eting. Tezkor yetkazib berish, xavfsiz to'lovlar va ajoyib mijozlarga xizmat.",
    url: "https://inbola.uz",
    siteName: "Inbola",
    images: [
      {
        url: "/logo.png",
        width: 800,
        height: 600,
        alt: "Inbola Logo",
      },
    ],
    locale: "uz_UZ",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Inbola - Premium Onlayn Do'kon",
    description: "Inbola'da yuqori sifatli mahsulotlarni kashf eting.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uz">
      <body className={`${poppins.variable} antialiased`}>
        <ClientProviders>{children}</ClientProviders>
      </body>
    </html>
  );
}

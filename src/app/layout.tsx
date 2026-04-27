import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import NextTopLoader from "nextjs-toploader";
import { businessName, siteUrl } from "@/lib/site-data";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${businessName} | Nail Salon, Facial & Lash Treatment Singapore`,
    template: `%s | ${businessName}`,
  },
  description:
    "Meow Aesthetics offers gel nails, lash extensions, facials, and skin treatments in Singapore with service pages, location pages, and clear booking options.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${businessName} | Nail Salon, Facial & Lash Treatment Singapore`,
    description:
      "Book gel nails, facials, lash treatments, and beauty services with Meow Aesthetics in Singapore.",
    url: siteUrl,
    siteName: businessName,
    locale: "en_SG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <NextTopLoader />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  applicationName: siteConfig.name,
  title: {
    default: `${siteConfig.name} | AI Assessment Recommendation Agent`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "HireSense AI",
    "SHL assessments",
    "assessment recommendation agent",
    "AI recruiting",
    "conversational assessment intelligence",
    "hybrid retrieval",
    "FAISS",
  ],
  authors: [{ name: "HireSense AI" }],
  creator: "HireSense AI",
  publisher: "HireSense AI",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: `${siteConfig.name} | ${siteConfig.subtitle}`,
    description: siteConfig.description,
    url: siteConfig.url,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    images: [
      {
        url: "/screenshots/hiresense-chat-preview.svg",
        width: 1200,
        height: 630,
        alt: "HireSense AI product preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.subtitle}`,
    description: siteConfig.description,
    images: ["/screenshots/hiresense-chat-preview.svg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  category: "technology",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#09090b",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}


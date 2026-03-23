import type { Metadata } from "next";
import "./globals.css";
import site from "@/content/site.json";

const { layout } = site;

export const metadata: Metadata = {
  metadataBase: new URL(layout.openGraphUrl),
  title: {
    default: layout.titleDefault,
    template: layout.titleTemplate,
  },
  description: layout.description,
  keywords: layout.keywords,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: layout.openGraphUrl,
    siteName: layout.openGraphSiteName,
    title: layout.openGraphTitle,
    description: layout.openGraphDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: layout.openGraphTitle,
    description: layout.openGraphDescription,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

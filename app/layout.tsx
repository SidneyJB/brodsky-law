import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        {/* Must appear before Next-injected default favicon or the browser picks the wrong tab icon */}
        <link rel="icon" href="/icon.png" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/icon.png" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
      </head>
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-18038979712"
          strategy="beforeInteractive"
        />
        <Script id="gtag-init" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-18038979712');
        `}</Script>
        {children}
      </body>
    </html>
  );
}

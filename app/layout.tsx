import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Brodsky Law PLLC | New York Divorce Attorney",
    template: "%s | Brodsky Law PLLC",
  },
  description:
    "Affordable, flat-fee New York divorce representation. Uncontested divorce from $895. Licensed attorney, payment plans available. Call 646-444-3120.",
  keywords: [
    "New York divorce attorney",
    "uncontested divorce NYC",
    "affordable divorce lawyer",
    "flat fee divorce",
    "Brodsky Law",
    "child support",
    "spousal maintenance",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.brodskydivorcelaw.com",
    siteName: "Brodsky Law PLLC",
    title: "Brodsky Law PLLC | New York Divorce Attorney",
    description:
      "Affordable, flat-fee New York divorce representation. Uncontested divorce from $895. Licensed attorney, payment plans available.",
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

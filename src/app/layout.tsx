import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = "https://team-availability-dashboard.vercel.app";
const title = "Team Availability Dashboard";
const description =
  "Real-time React dashboard to monitor availability, throughput and return times for high-performing teams.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s · Team Availability Dashboard",
  },
  description,
  keywords: [
    "team availability",
    "react technical assessment",
    "nextjs dashboard",
    "typescript",
    "resource planning",
  ],
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: "Team Availability Dashboard",
    images: [
      {
        url: "/og-card.svg",
        width: 1200,
        height: 630,
        alt: "Team Availability Dashboard preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    creator: "@cashra",
    images: ["/og-card.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [{ url: "/favicon.svg" }],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}

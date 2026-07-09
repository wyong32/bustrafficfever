import type { Metadata } from "next";
import "./globals.css";
import { SiteNavbar } from "@/components/layout/site-navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { GptAnchorAd, GptInterstitialAd } from "@/components/ads/gpt-ad";
import { canonical, gameDescription, gameKeywords, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Bus Traffic Fever Guide & Level Solutions July 2026",
    template: `%s | ${SITE_NAME}`
  },
  description: `${gameDescription} Find updated walkthrough videos, level solutions, strategy tips, and download links for iOS and Android.`,
  keywords: gameKeywords,
  authors: [{ name: "Bus Traffic Fever Guide Team" }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: canonical(),
    siteName: SITE_NAME,
    title: 'Bus Traffic Fever Walkthrough Guides, Level Solutions & Tips',
    description: gameDescription,
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Bus Traffic Fever parking jam puzzle guide'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bus Traffic Fever Walkthrough Guides, Level Solutions & Tips',
    description: gameDescription,
    images: [OG_IMAGE],
    creator: '@BusTrafficFeverGuide'
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
  alternates: {
    canonical: canonical()
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden bg-background font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
          storageKey="bustrafficfever-theme"
        >
          <SiteNavbar />
          <main className="min-h-screen bg-background">
            {children}
          </main>
          <GptAnchorAd />
          <GptInterstitialAd />
        </ThemeProvider>
      </body>
    </html>
  );
}

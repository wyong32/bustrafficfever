import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Download Bus Traffic Fever for iOS and Android",
  description: "Download Bus Traffic Fever for iOS and Android. Play a parking jam puzzle with bus route planning, passenger collection, and traffic-clearing challenges.",
  keywords: ["Download Bus Traffic Fever", "Bus Traffic Fever iOS", "Bus Traffic Fever Android", "parking jam puzzle download", "bus puzzle game"],
  authors: [{ name: "Bus Traffic Fever Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/download/"),
    siteName: SITE_NAME,
    title: 'Download Bus Traffic Fever for iOS and Android',
    description: 'Download Bus Traffic Fever and play relaxing parking jam puzzles.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Download Bus Traffic Fever' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Download Bus Traffic Fever for iOS and Android',
    description: 'Download Bus Traffic Fever and play relaxing parking jam puzzles.',
    images: [OG_IMAGE]
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: canonical("/download/") }
};

export default function DownloadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

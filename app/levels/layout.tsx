import type { Metadata } from "next";
import { canonical, gameDescription, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bus Traffic Fever All Levels Walkthroughs & Solutions",
  description: "Browse 238 Bus Traffic Fever level walkthroughs up to Level 246, with videos, board images, screenshot search, and verified written solutions as they are completed.",
  keywords: ["Bus Traffic Fever levels", "Bus Traffic Fever walkthrough", "Bus Traffic Fever solutions", "level guide", "parking jam puzzle", "bus puzzle"],
  authors: [{ name: "Bus Traffic Fever Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/levels/"),
    siteName: SITE_NAME,
    title: 'Bus Traffic Fever Levels Walkthroughs & Solutions',
    description: gameDescription,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Bus Traffic Fever available level walkthroughs' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bus Traffic Fever Levels Walkthroughs & Solutions',
    description: 'Browse available Bus Traffic Fever level videos, bus routes, and parking jam solutions.',
    images: [OG_IMAGE]
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  alternates: { canonical: canonical("/levels/") }
};

export default function LevelsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

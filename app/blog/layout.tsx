import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Bus Traffic Fever Blog - Guides, Tips & Strategy",
  description: "Read Bus Traffic Fever strategy articles, beginner tips, parking jam walkthrough notes, bus route advice, and level-solving guides.",
  keywords: ["Bus Traffic Fever blog", "Bus Traffic Fever guide", "Bus Traffic Fever tips", "parking jam strategy", "bus puzzle walkthrough"],
  authors: [{ name: "Bus Traffic Fever Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/blog/"),
    siteName: SITE_NAME,
    title: 'Bus Traffic Fever Blog - Guides, Tips & Strategy',
    description: 'Read Bus Traffic Fever strategy articles, passenger-order tips, walkthrough notes, and parking jam advice.',
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: 'Bus Traffic Fever Blog'
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bus Traffic Fever Blog - Guides, Tips & Strategy',
    description: 'Read Bus Traffic Fever strategy articles, beginner tips, and walkthrough notes.',
    images: [OG_IMAGE],
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
    canonical: canonical("/blog/")
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

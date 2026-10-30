import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find Your Bus Traffic Fever Level by Screenshot",
  description: "Match a Bus Traffic Fever traffic-board screenshot with available guides. Image processing runs in your browser and the screenshot stays on your device.",
  keywords: ["Bus Traffic Fever level finder", "find Bus Traffic Fever level", "Bus Traffic Fever screenshot search"],
  alternates: { canonical: canonical("/find-level/") },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: canonical("/find-level/"),
    siteName: SITE_NAME,
    title: "Find Your Bus Traffic Fever Level by Screenshot",
    description: "Compare a game screenshot with processed level boards without uploading the image.",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Bus Traffic Fever screenshot level finder" }],
  },
  twitter: { card: "summary_large_image", title: "Bus Traffic Fever Screenshot Level Finder", description: "Find the matching level guide from a traffic-board screenshot.", images: [OG_IMAGE] },
};

export default function FindLevelLayout({ children }: { children: React.ReactNode }) {
  return children;
}

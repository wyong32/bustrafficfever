import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us - BusTrafficFever.org",
  description: "Learn about BusTrafficFever.org, an independent Bus Traffic Fever walkthrough and strategy guide site.",
  keywords: ["About Bus Traffic Fever Guide", "BusTrafficFever.org", "puzzle game guide", "game walkthrough"],
  authors: [{ name: "Bus Traffic Fever Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/about-us/"),
    siteName: SITE_NAME,
    title: 'About Us - BusTrafficFever.org',
    description: 'Learn about BusTrafficFever.org, an independent Bus Traffic Fever walkthrough and strategy guide site.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'About BusTrafficFever.org' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - BusTrafficFever.org',
    description: 'Learn about BusTrafficFever.org, an independent Bus Traffic Fever guide site.',
    images: [OG_IMAGE],
    creator: '@Bus Traffic FeverGuide'
  },
  alternates: { canonical: canonical("/about-us/") }
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

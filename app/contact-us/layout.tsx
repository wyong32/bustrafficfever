import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us - BusTrafficFever.org",
  description: "Contact BusTrafficFever.org with Bus Traffic Fever level requests, walkthrough corrections, and site feedback.",
  keywords: ["Contact Bus Traffic Fever Guide", "feedback", "support", "level requests"],
  authors: [{ name: "Bus Traffic Fever Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/contact-us/"),
    siteName: SITE_NAME,
    title: 'Contact Us - BusTrafficFever.org',
    description: 'Contact BusTrafficFever.org with Bus Traffic Fever guide feedback and level requests.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'Contact BusTrafficFever.org' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us - BusTrafficFever.org',
    description: 'Contact BusTrafficFever.org with Bus Traffic Fever guide feedback.',
    images: [OG_IMAGE],
  },
  alternates: { canonical: canonical("/contact-us/") }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

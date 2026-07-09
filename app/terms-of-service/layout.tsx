import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service - BusTrafficFever.org",
  description: "Read the Terms of Service for using BusTrafficFever.org and its Bus Traffic Fever walkthrough guides.",
  keywords: ["Terms of Service", "BusTrafficFever.org", "terms and conditions", "legal"],
  authors: [{ name: "Bus Traffic Fever Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/terms-of-service/"),
    siteName: SITE_NAME,
    title: 'Terms of Service - BusTrafficFever.org',
    description: 'Read the Terms of Service for BusTrafficFever.org.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'BusTrafficFever.org Terms of Service' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Terms of Service - BusTrafficFever.org',
    description: 'Read the Terms of Service for BusTrafficFever.org.',
    images: [OG_IMAGE],
    creator: '@Bus Traffic FeverGuide'
  },
  alternates: { canonical: canonical("/terms-of-service/") }
};

export default function TermsOfServiceLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

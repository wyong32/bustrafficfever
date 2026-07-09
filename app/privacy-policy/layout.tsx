import type { Metadata } from "next";
import { canonical, OG_IMAGE, SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy - BusTrafficFever.org",
  description: "Read the Privacy Policy for BusTrafficFever.org and learn how this guide site handles basic website data.",
  keywords: ["Privacy Policy", "BusTrafficFever.org", "data protection", "privacy"],
  authors: [{ name: "Bus Traffic Fever Guide Team" }],
  openGraph: {
    type: 'website',
    url: canonical("/privacy-policy/"),
    siteName: SITE_NAME,
    title: 'Privacy Policy - BusTrafficFever.org',
    description: 'Read the Privacy Policy for BusTrafficFever.org.',
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'BusTrafficFever.org Privacy Policy' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Privacy Policy - BusTrafficFever.org',
    description: 'Read the Privacy Policy for BusTrafficFever.org.',
    images: [OG_IMAGE],
    creator: '@Bus Traffic FeverGuide'
  },
  alternates: { canonical: canonical("/privacy-policy/") }
};

export default function PrivacyPolicyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

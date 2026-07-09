import type { Metadata } from "next";
import Script from "next/script";
import { getAllLevels, getLevelById } from "@/lib/data";
import { canonical, GAME_NAME, OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

type Props = {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
};

export async function generateStaticParams() {
  const levels = getAllLevels();
  return levels.map((level) => ({ id: level.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const level = getLevelById(id);

  if (!level) {
    return { title: "Bus Traffic Fever Level Not Found", description: "The requested Bus Traffic Fever level guide could not be found." };
  }

  const levelNumber = level.id;
  const url = canonical(`/levels/${id}/`);
  const title = `Bus Traffic Fever Level ${levelNumber} Walkthrough & Solution`;
  const description = `Watch the Bus Traffic Fever Level ${levelNumber} walkthrough video with parking jam routing, bus move order, passenger flow, and lane-clearing tips.`;
  const image = level.videoThumbnail || level.thumbnail || OG_IMAGE;

  return {
    title,
    description,
    keywords: ["Bus Traffic Fever", `Bus Traffic Fever Level ${levelNumber}`, "walkthrough", "solution", "guide", "parking jam puzzle", "bus puzzle"],
    authors: [{ name: "Bus Traffic Fever Guide Team" }],
    openGraph: {
      type: 'article',
      url,
      siteName: SITE_NAME,
      title,
      description,
      images: [{ url: image, width: 1200, height: 630, alt: `Bus Traffic Fever Level ${levelNumber} walkthrough` }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image], creator: '@BusTrafficFeverGuide' },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
    alternates: { canonical: url }
  };
}

export default async function LevelLayout({ params, children }: Props) {
  const { id } = await params;
  const level = getLevelById(id);
  if (!level) return <>{children}</>;

  const url = canonical(`/levels/${id}/`);
  const levelNumber = level.id;
  const thumbnail = level.videoThumbnail || level.thumbnail;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VideoObject",
        "@id": `${url}#video`,
        "name": `Bus Traffic Fever Level ${levelNumber} Walkthrough Solution`,
        "description": level.description,
        "thumbnailUrl": [`${SITE_URL}${thumbnail}`],
        "uploadDate": "2026-07-08",
        "duration": level.videoDuration,
        "embedUrl": level.videoUrl,
        "contentUrl": level.videoUrl,
        "publisher": { "@type": "Organization", "name": SITE_NAME, "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png` } }
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "mainEntity": [
          { "@type": "Question", "name": `How do I solve Bus Traffic Fever Level ${levelNumber}?`, "acceptedAnswer": { "@type": "Answer", "text": "Watch the embedded walkthrough and follow the proven bus move order while keeping exits and passenger routes open." } },
          { "@type": "Question", "name": "What should I check before the first move?", "acceptedAnswer": { "@type": "Answer", "text": "Check which buses block the most exits, where passengers are waiting, and which lane can stay open for later moves." } },
          { "@type": "Question", "name": "Why does my Bus Traffic Fever board fail?", "acceptedAnswer": { "@type": "Answer", "text": "Boards usually fail when a bus is moved into the only useful lane or when passenger flow is blocked too early." } },
          { "@type": "Question", "name": "Can I use the same route if my board looks different?", "acceptedAnswer": { "@type": "Answer", "text": "Use the video as the main sequence reference, then adjust if your board variant opens a different bus route first." } },
          { "@type": "Question", "name": `Is Bus Traffic Fever Level ${levelNumber} timed?`, "acceptedAnswer": { "@type": "Answer", "text": "Bus Traffic Fever rewards careful traffic planning. A clean route matters more than speed." } }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": canonical() },
          { "@type": "ListItem", "position": 2, "name": `${GAME_NAME} Levels`, "item": canonical("/levels/") },
          { "@type": "ListItem", "position": 3, "name": `Level ${levelNumber}`, "item": url }
        ]
      }
    ]
  };

  return (
    <>
      <Script id={`level-${id}-schema`} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />
      {children}
    </>
  );
}

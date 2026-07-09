import { HeroSection } from "@/components/home/hero-section";
import { LevelNavigation } from "@/components/home/level-navigation";
import { Footer } from "@/components/footer";
import Script from "next/script";
import { canonical, GAME_DEVELOPER, GAME_NAME, gameDescription, RATING_COUNT, RATING_VALUE, SITE_NAME, SITE_URL } from "@/lib/site";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "url": canonical(),
        "name": `${SITE_NAME} - Bus Traffic Fever Walkthrough Guide`,
        "description": "Updated Bus Traffic Fever walkthrough videos, parking jam solutions, strategy tips, and download links.",
        "publisher": { "@id": `${SITE_URL}/#organization` },
        "potentialAction": {
          "@type": "SearchAction",
          "target": { "@type": "EntryPoint", "urlTemplate": `${SITE_URL}/levels/{search_term_string}/` },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        "name": SITE_NAME,
        "url": canonical(),
        "logo": { "@type": "ImageObject", "url": `${SITE_URL}/logo.png`, "width": 256, "height": 256 }
      },
      {
        "@type": "VideoGame",
        "@id": `${SITE_URL}/#videogame`,
        "name": GAME_NAME,
        "description": gameDescription,
        "gamePlatform": ["iOS", "Android"],
        "publisher": { "@type": "Organization", "name": GAME_DEVELOPER },
        "genre": ["Puzzle", "Parking", "Brain Teaser"],
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": RATING_VALUE,
          "ratingCount": RATING_COUNT,
          "bestRating": "5",
          "worstRating": "1"
        }
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/#faq`,
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is Bus Traffic Fever?",
            "acceptedAnswer": { "@type": "Answer", "text": "Bus Traffic Fever is a parking jam puzzle game where players move buses, clear lanes, collect passengers, and solve traffic flow challenges." }
          },
          {
            "@type": "Question",
            "name": "How do you play Bus Traffic Fever?",
            "acceptedAnswer": { "@type": "Answer", "text": "Plan each bus move, open blocked routes, match passenger flow, and clear the parking lot without trapping vehicles." }
          },
          {
            "@type": "Question",
            "name": "Where can I download Bus Traffic Fever?",
            "acceptedAnswer": { "@type": "Answer", "text": "Bus Traffic Fever is available from the App Store and Google Play." }
          },
          {
            "@type": "Question",
            "name": "Does this site include every Bus Traffic Fever level?",
            "acceptedAnswer": { "@type": "Answer", "text": "This site publishes available walkthrough videos that have been processed so far and updates the guide database when reliable new level videos are available." }
          },
          {
            "@type": "Question",
            "name": "Why are some level numbers missing?",
            "acceptedAnswer": { "@type": "Answer", "text": "Missing level numbers do not have confirmed source videos yet, so they are skipped instead of replaced with placeholder guides." }
          }
        ]
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb`,
        "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Home", "item": canonical() }]
      }
    ]
  };

  return (
    <div>
      <Script id="home-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />
      <HeroSection />
      <LevelNavigation />
      <Footer />
    </div>
  );
}

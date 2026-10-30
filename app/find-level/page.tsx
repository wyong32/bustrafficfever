import Script from "next/script";
import { ScanSearch, ShieldCheck, Shuffle, SlidersHorizontal } from "lucide-react";
import { ScreenshotFinder } from "@/components/finder/screenshot-finder";
import { Footer } from "@/components/footer";
import { canonical, SITE_NAME, SITE_URL } from "@/lib/site";

const faqs = [
  {
    question: "What screenshot works best?",
    answer: "Use a clear screenshot showing the complete traffic board before many vehicles have moved.",
  },
  {
    question: "Why can the displayed level number be different?",
    answer: "Game updates can reorder boards. The finder compares the board image instead of relying only on the level number.",
  },
  {
    question: "Is my screenshot uploaded or saved?",
    answer: "No. Your screenshot stays on your device and is processed in the browser.",
  },
  {
    question: "What should I do with a low-confidence result?",
    answer: "Use an earlier screenshot with the full board visible, then compare the five suggested level covers.",
  },
];

export default function FindLevelPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/find-level/#application`,
        name: "Bus Traffic Fever Screenshot Level Finder",
        url: canonical("/find-level/"),
        description: "Compare a Bus Traffic Fever board screenshot with processed level guides in the browser.",
        applicationCategory: "GameApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript and Canvas image processing",
        isAccessibleForFree: true,
        provider: { "@type": "Organization", name: SITE_NAME, url: canonical() },
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE_URL}/find-level/#faq`,
        mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
      },
    ],
  };

  return (
    <div>
      <Script id="find-level-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} strategy="beforeInteractive" />
      <section className="border-b border-border bg-background">
        <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 text-sm font-semibold text-primary"><ScanSearch className="h-5 w-5" /> Screenshot matching tool</div>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-foreground sm:text-5xl">Find Your Bus Traffic Fever Level by Screenshot</h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">Compare the traffic board in your screenshot with processed level guides. The first release covers Levels 1-20.</p>
          </div>
          <div className="mt-8"><ScreenshotFinder /></div>
        </div>
      </section>

      <section className="border-b border-border bg-muted/20">
        <div className="container mx-auto grid gap-8 px-4 py-12 sm:px-6 lg:grid-cols-3">
          <div><ScanSearch className="h-6 w-6 text-primary" /><h2 className="mt-3 text-xl font-bold text-foreground">How matching works</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">The browser compares board shape, color distribution, and edge patterns with processed level images.</p></div>
          <div><Shuffle className="h-6 w-6 text-primary" /><h2 className="mt-3 text-xl font-bold text-foreground">Why numbers differ</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">Game updates can move the same board to another number, so visual matching can be more reliable than number search.</p></div>
          <div><ShieldCheck className="h-6 w-6 text-primary" /><h2 className="mt-3 text-xl font-bold text-foreground">Private on your device</h2><p className="mt-2 text-sm leading-7 text-muted-foreground">Your screenshot stays on your device. The site does not upload, store, or add it to the page URL.</p></div>
        </div>
      </section>

      <section className="border-b border-border bg-background">
        <div className="container mx-auto grid gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.6fr)]">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Screenshot finder FAQ</h2>
            <div className="mt-6 divide-y divide-border border-y border-border">
              {faqs.map((faq) => <article key={faq.question} className="py-5"><h3 className="font-bold text-foreground">{faq.question}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{faq.answer}</p></article>)}
            </div>
          </div>
          <aside className="border-l-4 border-primary bg-primary/5 p-6">
            <SlidersHorizontal className="h-6 w-6 text-primary" />
            <h2 className="mt-3 text-xl font-bold text-foreground">Current coverage</h2>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">The initial matching index contains processed Levels 1-20. Later levels will be added only after their board images are checked.</p>
          </aside>
        </div>
      </section>
      <Footer />
    </div>
  );
}

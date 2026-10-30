import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Download,
  ListChecks,
  Play,
  ScanSearch,
} from "lucide-react";
import { Footer } from "@/components/footer";
import { GptAd } from "@/components/ads/gpt-ad";
import { SocialShare } from "@/components/social-share";
import { getAllLevels, getLevelById, getLevelCover } from "@/lib/data";
import { getLevelFaqs, getVerifiedLevelGuide } from "@/lib/level-guides";
import { APP_STORE_URL, GAME_NAME, GOOGLE_PLAY_URL } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export default async function LevelDetailPage({ params }: Props) {
  const { id } = await params;
  const level = getLevelById(id);
  if (!level) notFound();

  const levels = getAllLevels();
  const currentIndex = levels.findIndex((entry) => entry.id === id);
  const previousLevel = currentIndex > 0 ? levels[currentIndex - 1] : undefined;
  const nextLevel = currentIndex < levels.length - 1 ? levels[currentIndex + 1] : undefined;
  const related = levels
    .filter((entry) => entry.id !== id)
    .sort((left, right) => Math.abs(Number(left.id) - Number(id)) - Math.abs(Number(right.id) - Number(id)))
    .slice(0, 8);
  const guide = getVerifiedLevelGuide(id);
  const faqs = getLevelFaqs(id, guide);
  const cover = getLevelCover(level);

  return (
    <div>
      <article>
        <header className="border-b border-border bg-background">
          <div className="container mx-auto px-4 py-10 sm:px-6 sm:py-14">
            <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span className="px-2">/</span>
              <Link href="/levels/" className="hover:text-primary">Level guides</Link>
              <span className="px-2">/</span>
              <span className="text-foreground">Level {id}</span>
            </nav>

            <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-tight text-foreground sm:text-5xl">
              Bus Traffic Fever Level {id} Walkthrough and Solution
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
              {guide
                ? `Use the verified move order, board images, and full video to clear Bus Traffic Fever Level ${id}.`
                : `Watch the complete Bus Traffic Fever Level ${id} solution and compare each traffic change with your board.`}
            </p>

            <div className="mt-7 flex flex-col gap-4 border-t border-border pt-5 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
              <p>By <strong className="text-foreground">BusTrafficFever.org Guide Team</strong> · Updated October 30, 2026</p>
              <SocialShare />
            </div>

            <dl className="mt-7 grid border border-border sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["Objective", guide?.objective || "Clear the traffic board"],
                ["Key challenge", guide?.keyChallenge || "Match the complete video route"],
                ["Guide format", guide ? "Video and board steps" : "Full video solution"],
                ["Level status", guide ? "Written guide verified" : "Written steps in review"],
              ].map(([label, value]) => (
                <div key={label} className="border-b border-border p-5 last:border-b-0 sm:border-r sm:[&:nth-child(2)]:border-r-0 sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0 lg:[&:nth-child(2)]:border-r">
                  <dt className="text-xs font-bold uppercase text-muted-foreground">{label}</dt>
                  <dd className="mt-2 font-bold text-foreground">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <section className="border-b border-border bg-muted/20">
          <div className="container mx-auto grid gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_310px]">
            <div>
              <div className="flex items-center gap-2">
                <Play className="h-5 w-5 text-primary" aria-hidden="true" />
                <h2 className="text-2xl font-bold text-foreground">Video Walkthrough</h2>
              </div>
              {level.videoUrl ? (
                <div className="mt-5 overflow-hidden rounded-lg border border-border bg-black shadow-sm">
                  <div className="mx-auto aspect-[9/16] max-h-[720px] max-w-[405px]">
                    <iframe
                      src={level.videoUrl}
                      title={`Bus Traffic Fever Level ${id} video walkthrough`}
                      className="h-full w-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    />
                  </div>
                </div>
              ) : null}
            </div>

            <aside aria-labelledby="related-guides">
              <h2 id="related-guides" className="text-xl font-bold text-foreground">Related Bus Traffic Fever guides</h2>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {related.map((entry) => (
                  <Link key={entry.id} href={`/levels/${entry.id}/`} className="group overflow-hidden rounded-md border border-border bg-card">
                    <div className="relative aspect-[6/5] bg-muted">
                      <Image
                        src={getLevelCover(entry)}
                        alt={`Bus Traffic Fever Level ${entry.id} board`}
                        fill
                        className="object-cover transition group-hover:brightness-90"
                        sizes="150px"
                        unoptimized
                      />
                    </div>
                    <p className="px-2 py-2 text-center text-sm font-semibold text-foreground">Level {entry.id}</p>
                  </Link>
                ))}
              </div>
              <Link href="/levels/" className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2 text-sm font-bold text-foreground hover:border-primary hover:text-primary">
                Browse all level guides
                <ArrowRight className="h-4 w-4" />
              </Link>
            </aside>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 sm:px-6">
          <div className="mx-auto max-w-4xl">
            <GptAd placement="top" />

            <section className="border-l-4 border-primary bg-primary/5 p-6" aria-labelledby="quick-answer">
              <p className="text-xs font-bold uppercase text-primary">Solution summary</p>
              <h2 id="quick-answer" className="mt-2 text-2xl font-bold text-foreground">Quick Answer</h2>
              <p className="mt-3 leading-7 text-muted-foreground">
                {guide?.quickAnswer || `Start Level ${id} from a clean board and follow the embedded video in order. Stop after each vehicle exits and confirm that your open lanes still match the video before making the next move.`}
              </p>
            </section>

            <section className="mt-12" aria-labelledby="overall-strategy">
              <h2 id="overall-strategy" className="text-3xl font-bold text-foreground">Overall Strategy</h2>
              <div className="mt-5 space-y-4 leading-7 text-muted-foreground">
                {(guide?.overallStrategy || [
                  "Treat the video as the source of truth for this board. A different first move can change every route that appears later.",
                  "Keep the same board state as the video after each major move. If the layouts differ, restart instead of trying to repair a blocked route from the middle.",
                ]).map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              </div>
            </section>

            <section className="mt-12" aria-labelledby="starting-board">
              <h2 id="starting-board" className="text-3xl font-bold text-foreground">Starting Board</h2>
              <div className="mt-6 grid gap-6 md:grid-cols-[minmax(0,600px)_1fr] md:items-start">
                <div className="relative aspect-[6/5] overflow-hidden rounded-lg border border-border bg-muted">
                  <Image src={cover} alt={`Bus Traffic Fever Level ${id} starting board`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 600px" unoptimized />
                </div>
                <p className="leading-7 text-muted-foreground">
                  {guide?.startingBoard || "Reset the level before comparing this image. Game updates can replace a board, so use the screenshot finder if the layout on your device is different."}
                </p>
              </div>
            </section>

            <section className="mt-14" aria-labelledby="step-solution">
              <h2 id="step-solution" className="text-3xl font-bold text-foreground">Step-by-Step Solution</h2>
              {guide ? (
                <div className="mt-7 divide-y divide-border border-y border-border">
                  {guide.steps.map((step, index) => (
                    <section key={step.title} className="grid gap-6 py-8 md:grid-cols-[minmax(0,1fr)_280px] md:items-start">
                      <div>
                        <p className="text-xs font-bold uppercase text-primary">Step {index + 1}</p>
                        <h3 className="mt-2 text-xl font-bold text-foreground">{step.title}</h3>
                        <p className="mt-3 leading-7 text-muted-foreground">{step.instruction}</p>
                      </div>
                      {step.image ? (
                        <Image src={step.image} alt={step.imageAlt || `${step.title} in Bus Traffic Fever Level ${id}`} width={720} height={1280} className="h-auto w-full rounded-md border border-border" unoptimized />
                      ) : null}
                    </section>
                  ))}
                </div>
              ) : (
                <div className="mt-6 border border-border bg-muted/20 p-6">
                  <p className="leading-7 text-muted-foreground">
                    The complete written move list for Level {id} is still being checked against the source video. Use the full walkthrough above; this page does not publish unverified vehicle colors, lane positions, or move directions.
                  </p>
                </div>
              )}
            </section>

            <section className="mt-14 border-y border-border py-8" aria-labelledby="before-move">
              <div className="flex items-start gap-4">
                <ListChecks className="mt-1 h-6 w-6 flex-none text-primary" aria-hidden="true" />
                <div>
                  <h2 id="before-move" className="text-2xl font-bold text-foreground">Before Each Move</h2>
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {(guide?.beforeMove || [
                      "Your board still matches the video.",
                      "The selected vehicle has a complete exit path.",
                      "The move does not close the lane needed next.",
                      "Passenger and vehicle colors still align on screen.",
                    ]).map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-none text-primary" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            <section className="mt-14 border-l-4 border-amber-500 bg-amber-50 p-6 dark:bg-amber-950/20" aria-labelledby="stuck-point">
              <div className="flex items-start gap-4">
                <AlertTriangle className="mt-1 h-6 w-6 flex-none text-amber-700 dark:text-amber-400" aria-hidden="true" />
                <div>
                  <h2 id="stuck-point" className="text-2xl font-bold text-foreground">Where Players Get Stuck</h2>
                  <p className="mt-3 leading-7 text-muted-foreground">
                    {guide?.stuckPoint || "The common failure is continuing after the board no longer matches the walkthrough. Restart from the opening layout and compare every exit in order instead of trying to recover from a different traffic state."}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-14" aria-labelledby="level-faq">
              <h2 id="level-faq" className="text-3xl font-bold text-foreground">Bus Traffic Fever Level {id} FAQ</h2>
              <div className="mt-6 divide-y divide-border border-y border-border">
                {faqs.map((faq) => (
                  <div key={faq.question} className="py-6">
                    <h3 className="text-lg font-bold text-foreground">{faq.question}</h3>
                    <p className="mt-2 leading-7 text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>

            <nav aria-label="Level navigation" className="mt-14 grid gap-3 border-t border-border pt-6 sm:grid-cols-3 sm:items-center">
              {previousLevel ? (
                <Link href={`/levels/${previousLevel.id}/`} className="inline-flex items-center gap-2 font-bold text-muted-foreground hover:text-primary">
                  <ArrowLeft className="h-4 w-4" /> Level {previousLevel.id}
                </Link>
              ) : <span />}
              <Link href="/levels/" className="text-center font-bold text-foreground hover:text-primary">Browse all level guides</Link>
              {nextLevel ? (
                <Link href={`/levels/${nextLevel.id}/`} className="inline-flex items-center justify-end gap-2 font-bold text-primary">
                  Level {nextLevel.id} <ArrowRight className="h-4 w-4" />
                </Link>
              ) : <span />}
            </nav>

            <section className="mt-12 grid gap-4 border border-border bg-card p-6 sm:grid-cols-2">
              <Link href="/find-level/" className="flex items-center gap-3 font-bold text-foreground hover:text-primary">
                <ScanSearch className="h-5 w-5 text-primary" /> Find a level by screenshot
              </Link>
              <Link href="/download/" className="flex items-center gap-3 font-bold text-foreground hover:text-primary">
                <Download className="h-5 w-5 text-primary" /> Download {GAME_NAME}
              </Link>
              <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">Official App Store page</a>
              <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">Official Google Play page</a>
            </section>

            <GptAd placement="bottom" />
          </div>
        </div>
      </article>
      <Footer />
    </div>
  );
}

"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { getAllLevels, getLevelById } from "@/lib/data";
import { formatLevelDisplay, getFiftyLevelRanges, parseLevelNumber } from "@/lib/level-utils";
import { Button } from "@/components/ui/button";
import { List, ChevronLeft, ChevronRight } from "lucide-react";
import { LevelGrid } from "@/components/level/level-grid";
import { SocialShare } from "@/components/social-share";
import { Footer } from "@/components/footer";
import { GptAd } from "@/components/ads/gpt-ad";
import { APP_STORE_URL, GAME_NAME, GOOGLE_PLAY_URL } from "@/lib/site";

export default function LevelDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const level = getLevelById(id);
  const levelRanges = getFiftyLevelRanges();
  const firstRange = levelRanges[0];
  const [selectedRange, setSelectedRange] = useState<string | null>(firstRange ? `${firstRange.start}-${firstRange.end}` : null);

  if (!level) notFound();

  const formatCompletionTime = (time: string) => {
    const parts = time.split(":");
    if (parts.length === 2) return `${parseInt(parts[0])}min ${parseInt(parts[1])}sec`;
    return time;
  };

  const allLevels = getAllLevels();
  const currentIndex = allLevels.findIndex((l) => l.id === id);
  const previousLevel = currentIndex > 0 ? allLevels[currentIndex - 1] : null;
  const nextLevel = currentIndex < allLevels.length - 1 ? allLevels[currentIndex + 1] : null;
  const filteredLevels = selectedRange
    ? allLevels.filter((item) => {
        const [start, end] = selectedRange.split("-").map(Number);
        const levelNum = parseLevelNumber(item.id);
        return levelNum >= start && levelNum <= end;
      })
    : [];

  const levelLabel = formatLevelDisplay(level.id);

  return (
    <div>
      <div className="container mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-2 max-w-6xl">
        <div className="mb-4">
          <div className="mb-6 sm:mb-8 flex justify-center">
            <Link href="/levels"><Button variant="outline" className="border-2 hover:bg-accent text-sm sm:text-base"><List className="mr-2 h-3 w-3 sm:h-4 sm:w-4" />Level List</Button></Link>
          </div>

          <div className="text-center px-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">Bus Traffic Fever Level {levelLabel} Walkthrough & Guide</h1>
            <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
              {level.completionTime ? `Reference completion time: ${formatCompletionTime(level.completionTime)}` : level.description}
            </p>
          </div>

          {level.videoUrl && (
            <div className="w-full">
              <div className="hidden lg:flex justify-center items-center gap-7">
                {previousLevel ? <Link href={`/levels/${previousLevel.id}`}><Button variant="outline" className="flex-row items-center justify-between h-20 w-40 bg-blue-50 hover:bg-blue-100 border-blue-200 px-3 py-2"><ChevronLeft className="h-7 w-7 text-blue-500 flex-shrink-0" /><div className="flex flex-col items-center flex-1"><span className="text-sm text-blue-400 whitespace-nowrap">Previous Level</span><span className="text-3xl font-bold text-blue-500">{formatLevelDisplay(previousLevel.id)}</span></div></Button></Link> : <div className="w-40" />}
                <div className="flex justify-center"><iframe width="360" height="640" src={level.videoUrl} title={`${level.title} Walkthrough`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded-2xl shadow-lg border-0" /></div>
                {nextLevel ? <Link href={`/levels/${nextLevel.id}`}><Button variant="outline" className="flex-row items-center justify-between h-20 w-40 bg-pink-50 hover:bg-pink-100 border-pink-200 px-3 py-2"><div className="flex flex-col items-center flex-1"><span className="text-sm text-pink-400 whitespace-nowrap">Next Level</span><span className="text-3xl font-bold text-pink-500">{formatLevelDisplay(nextLevel.id)}</span></div><ChevronRight className="h-7 w-7 text-pink-500 flex-shrink-0" /></Button></Link> : <div className="w-40" />}
              </div>

              <div className="lg:hidden flex flex-col items-center gap-4">
                <div className="flex gap-3 w-full max-w-[360px] justify-between px-2">
                  {previousLevel ? <Link href={`/levels/${previousLevel.id}`} className="flex-1"><Button variant="outline" className="w-full flex-row items-center justify-between h-16 bg-blue-50 hover:bg-blue-100 border-blue-200 px-3 py-2"><ChevronLeft className="h-6 w-6 text-blue-500 flex-shrink-0" /><div className="flex flex-col items-center flex-1"><span className="text-xs text-blue-400 whitespace-nowrap">Previous</span><span className="text-2xl font-bold text-blue-500">{formatLevelDisplay(previousLevel.id)}</span></div></Button></Link> : <div className="flex-1" />}
                  {nextLevel ? <Link href={`/levels/${nextLevel.id}`} className="flex-1"><Button variant="outline" className="w-full flex-row items-center justify-between h-16 bg-pink-50 hover:bg-pink-100 border-pink-200 px-3 py-2"><div className="flex flex-col items-center flex-1"><span className="text-xs text-pink-400 whitespace-nowrap">Next</span><span className="text-2xl font-bold text-pink-500">{formatLevelDisplay(nextLevel.id)}</span></div><ChevronRight className="h-6 w-6 text-pink-500 flex-shrink-0" /></Button></Link> : <div className="flex-1" />}
                </div>
                <div className="w-full max-w-[360px] aspect-[9/16]"><iframe width="100%" height="100%" src={level.videoUrl} title={`${level.title} Walkthrough`} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded-xl sm:rounded-2xl shadow-lg border-0" /></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 mb-6 sm:mb-8 max-w-6xl">
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8"><SocialShare /></div>
        <GptAd placement="top" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center text-foreground px-2">Bus Traffic Fever Level Solutions & Walkthrough Guide</h2>
        <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-center">
          {levelRanges.map((range) => (
            <button key={`${range.start}-${range.end}`} onClick={() => setSelectedRange(`${range.start}-${range.end}`)} className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${selectedRange === `${range.start}-${range.end}` ? "bg-primary text-primary-foreground shadow-md shadow-primary/20" : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-card/30"}`}>{range.label}</button>
          ))}
        </div>
      </div>

      {selectedRange && (
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center px-4 sm:px-6">Bus Traffic Fever Level {selectedRange} Guide</h2>
          <div className="px-4 sm:px-6"><LevelGrid levels={filteredLevels} variant="button" /></div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 max-w-5xl mb-12 sm:mb-16">
        <section>
          <GptAd placement="middle" />
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Bus Traffic Fever Level {levelLabel} Complete Walkthrough Strategy</h2>
          <div className="space-y-4 sm:space-y-5">
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">This Bus Traffic Fever Level {levelLabel} walkthrough shows the full solution route from the first bus move to the cleared parking jam. Use it to understand which lane to open first and how each move affects the next exit.</p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">The safest strategy is to keep at least one flexible lane open while you move blocking buses. If a bus would close the only route for two other vehicles, wait until another lane is available.</p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">If you are stuck, pause the video after each major move and compare your board with the guide. Matching the traffic flow is more important than tapping quickly, especially in later Bus Traffic Fever levels where one bad move can create a deadlock.</p>
          </div>
        </section>

        <section className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 sm:mb-6">Bus Traffic Fever Level {levelLabel} FAQ</h2>
          <div className="space-y-5">
            {[
              { q: `How do I solve Bus Traffic Fever Level ${levelLabel}?`, a: "Watch the embedded walkthrough and follow the proven bus move order. Keep exits open and avoid sending a bus into a lane that blocks later routes." },
              { q: "What should I check before the first move?", a: "Look for buses that block multiple exits, open lanes near the front, and passenger groups that need a matching route." },
              { q: "Why does my board fail?", a: "Most failed boards come from moving a bus into the only flexible lane or clearing vehicles in an order that blocks passenger flow." },
              { q: "Can I use the same route if my board looks slightly different?", a: "Yes, use the video as the main sequence reference, but adjust if your board variant opens a different bus route first." },
              { q: `Is Bus Traffic Fever Level ${levelLabel} timed?`, a: "Bus Traffic Fever is best approached as a careful parking jam puzzle. A clean route matters more than speed." }
            ].map((faq) => <div key={faq.q}><h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3><p className="text-sm sm:text-base text-muted-foreground leading-relaxed">{faq.a}</p></div>)}
          </div>
        </section>

        <section className="mt-12 sm:mt-16 text-center">
          <GptAd placement="bottom" />
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 px-2">Download {GAME_NAME} Mobile App</h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6 max-w-4xl mx-auto px-2">Ready to solve the traffic jams yourself? Download Bus Traffic Fever on iOS or Android, move buses with clean planning, and clear passenger routes anywhere.</p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 min-w-[280px]">Download Bus Traffic Fever on App Store</a>
            <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-accent to-primary text-white px-5 sm:px-7 py-3 sm:py-3.5 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105 min-w-[280px]">Download Bus Traffic Fever on Google Play</a>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}

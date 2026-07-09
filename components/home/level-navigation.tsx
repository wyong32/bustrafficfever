"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LevelGrid } from "@/components/level/level-grid";
import { getAllLevels } from "@/lib/data";
import { DEFAULT_TEN_LEVEL_RANGE, getTenLevelRanges, LevelRange, parseLevelNumber, TOTAL_GUIDES } from "@/lib/level-utils";
import { Button } from "@/components/ui/button";
import { GptAd } from "@/components/ads/gpt-ad";
import { APP_STORE_URL, GAME_DEVELOPER, GAME_NAME, GOOGLE_PLAY_URL } from "@/lib/site";

export function LevelNavigation() {
  const [selectedRange, setSelectedRange] = useState<LevelRange | null>(DEFAULT_TEN_LEVEL_RANGE);
  const allLevels = getAllLevels();
  const levelRanges: LevelRange[] = getTenLevelRanges();

  const filteredLevels = selectedRange
    ? allLevels.filter((level) => {
        const levelNum = parseLevelNumber(level.id);
        return levelNum >= selectedRange.start && levelNum <= selectedRange.end;
      })
    : allLevels;

  const faqs = [
    {
      question: "What is Bus Traffic Fever?",
      answer: "Bus Traffic Fever is a parking jam puzzle game where you move buses, open traffic lanes, collect passengers, and clear each crowded board with smart planning.",
    },
    {
      question: "How do you play Bus Traffic Fever?",
      answer: "Study the parked buses, choose a safe move order, avoid blocking exits, and keep passenger collection flowing until the lot is cleared.",
    },
    {
      question: "Are these Bus Traffic Fever walkthroughs complete for every released level?",
      answer: `This site publishes the available Bus Traffic Fever walkthrough videos processed so far. The current guide database includes ${TOTAL_GUIDES} level guides and updates when new reliable videos are collected.`,
    },
    {
      question: "Why are some level numbers missing?",
      answer: "Missing level numbers do not have confirmed source videos yet, so they are skipped instead of replaced with placeholder guides.",
    },
    {
      question: "Can I play Bus Traffic Fever offline?",
      answer: "Bus Traffic Fever is designed for quick mobile puzzle sessions and may support offline play depending on your installed app version and platform settings.",
    },
  ];

  return (
    <section className="level-navigation-section bg-background py-6 sm:py-8">
      <div className="container mx-auto px-4 sm:px-6">
        <GptAd placement="top" />

        <div className="mb-4 sm:mb-6 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 px-2">
            <span className="text-foreground">Bus Traffic Fever Level Guides & Video Solutions</span>
          </h2>
          <p className="max-w-3xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            Browse available Bus Traffic Fever walkthroughs, choose a level range, and follow the video route to clear parking jams without wasting moves.
          </p>
        </div>

        <div className="mb-4 max-w-6xl mx-auto w-full px-2 sm:px-0">
          <div className="flex gap-1.5 sm:gap-2 flex-wrap justify-start">
            {levelRanges.map((range) => (
              <button
                key={range.label}
                onClick={() => setSelectedRange(range)}
                className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  selectedRange?.label === range.label
                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                    : "bg-transparent text-muted-foreground hover:text-foreground hover:bg-card/30"
                }`}
              >
                {range.label}
              </button>
            ))}
          </div>
        </div>

        {filteredLevels.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <LevelGrid levels={filteredLevels} />
          </div>
        )}

        <div className="flex justify-center mt-8 sm:mt-12 mb-8 sm:mb-12">
          <Link href="/levels">
            <Button size="lg" className="bg-card/50 text-muted-foreground border border-border px-6 sm:px-10 py-4 sm:py-6 text-sm sm:text-base font-medium rounded-full shadow-sm transition-all cursor-pointer hover:underline hover:bg-card hover:text-foreground">
              View Available Level Walkthroughs
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="bg-card/50 border border-border rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 shadow-md">
            <div className="mb-8 sm:mb-10">
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose">
                {GAME_NAME} by {GAME_DEVELOPER} combines parking jam logic, bus route planning, and satisfying passenger collection. Every move changes the traffic flow, so a clean solution depends on opening lanes in the right order.
              </p>
            </div>

            <div className="mb-8 sm:mb-10 lg:mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Table of Contents</h2>
              <ol className="space-y-2 sm:space-y-3 text-sm sm:text-base">
                <li><a href="#what-is" className="text-primary hover:text-primary/80 hover:underline">1. What is Bus Traffic Fever?</a></li>
                <li><a href="#how-to-play" className="text-primary hover:text-primary/80 hover:underline">2. How to Play Bus Traffic Fever</a></li>
                <li><a href="#features" className="text-primary hover:text-primary/80 hover:underline">3. Bus Traffic Fever Features</a></li>
                <li><a href="#tips" className="text-primary hover:text-primary/80 hover:underline">4. Strategy Tips</a></li>
                <li><a href="#download" className="text-primary hover:text-primary/80 hover:underline">5. Download Bus Traffic Fever</a></li>
                <li><a href="#faq" className="text-primary hover:text-primary/80 hover:underline">6. FAQ</a></li>
              </ol>
            </div>

            <div className="space-y-8 sm:space-y-10 lg:space-y-14">
              <div id="what-is">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">What is Bus Traffic Fever?</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose mb-4 sm:mb-5">
                  Bus Traffic Fever is a mobile parking jam puzzle for players who enjoy clean traffic logic. The board is packed with buses, waiting passengers, and tight lanes that must be opened step by step.
                </p>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose">
                  The rules are easy to understand but strict in practice. One careless bus move can close an exit or block the next vehicle, so every level rewards planning before tapping.
                </p>
              </div>

              <div id="how-to-play">
                <GptAd placement="middle" />
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">How to Play Bus Traffic Fever</h2>
                <ul className="space-y-3 sm:space-y-4 ml-4 sm:ml-6">
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Plan the first exit:</strong> Find which bus can move without trapping another route.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Open lanes gradually:</strong> Clear front spaces before moving deep buses from the back of the jam.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Collect passengers:</strong> Keep the right buses flowing toward waiting people and color-matched goals.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Avoid deadlocks:</strong> Do not park a bus where it blocks two exits at once.</li>
                </ul>
              </div>

              <div id="features">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Bus Traffic Fever Features</h2>
                <ul className="space-y-3 sm:space-y-4 ml-4 sm:ml-6">
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">Satisfying parking jam puzzles with buses, people, and tight traffic lanes.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">Simple tap-and-move controls that still reward careful route planning.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">Color-sorting style passenger collection mixed with vehicle blocking logic.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">Relaxing mobile pacing for short breaks, difficult stages, and replayable brain teasers.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed">Difficulty that grows from manageable lots to advanced traffic fever challenges.</li>
                </ul>
              </div>

              <div id="tips">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Bus Traffic Fever Tips and Strategy Guide</h2>
                <ul className="space-y-3 sm:space-y-4 ml-4 sm:ml-6">
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Start with exposed buses:</strong> Vehicles near open lanes often create the first safe route.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Think two moves ahead:</strong> A good move should open the next bus, not only clear the current one.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Protect central space:</strong> Keeping one lane open gives you room to recover from crowded layouts.</li>
                  <li className="text-muted-foreground text-sm sm:text-base leading-relaxed"><strong className="text-foreground">Use walkthroughs as route checks:</strong> Pause after each major move and compare the board state.</li>
                </ul>
              </div>

              <div id="download">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-foreground">Where Can I Download Bus Traffic Fever?</h2>
                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose mb-4">
                  You can download Bus Traffic Fever from the App Store or Google Play and start solving parking jam puzzles on mobile.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 hover:underline">Download Bus Traffic Fever on the App Store</a>
                  <a href={GOOGLE_PLAY_URL} target="_blank" rel="noopener noreferrer" className="text-primary hover:text-primary/80 hover:underline">Download Bus Traffic Fever on Google Play</a>
                </div>
              </div>

              <div id="faq">
                <GptAd placement="bottom" />
                <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-foreground">FAQ</h2>
                <div className="space-y-6 sm:space-y-8">
                  {faqs.map((faq) => (
                    <div key={faq.question}>
                      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">{faq.question}</h3>
                      <p className="text-muted-foreground text-sm sm:text-base leading-relaxed sm:leading-loose">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Footer } from "@/components/footer";
import { GptAd } from "@/components/ads/gpt-ad";
import { GAME_DEVELOPER, GAME_NAME, SITE_NAME } from "@/lib/site";

export default function AboutUsPage() {
  return (
    <div>
      <section className="container mx-auto px-6 pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bold mb-6 text-4xl sm:text-5xl"><span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">About Us</span></h1>
          <div className="space-y-8 text-muted-foreground">
            <section>
              <GptAd placement="top" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Welcome to {SITE_NAME}</h2>
              <p className="leading-relaxed mb-4">
                {SITE_NAME} is an independent guide site for {GAME_NAME}, the parking jam puzzle game by {GAME_DEVELOPER}. We organize walkthrough videos, level solutions, and strategy notes so players can clear bus traffic without wasting moves.
              </p>
              <p className="leading-relaxed">
                Our goal is to help players understand the route logic behind each move: which bus blocks the exit, which lane should stay open, and how passenger flow changes the solution.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">What We Offer</h2>
              <ul className="space-y-3 ml-6 list-disc">
                <li className="leading-relaxed">Available Bus Traffic Fever level walkthroughs with embedded video guides.</li>
                <li className="leading-relaxed">Video-checked strategy explanations for bus order, open lanes, passenger flow, and loading-bay management.</li>
                <li className="leading-relaxed"><a href="/find-level/" className="text-primary hover:underline">Screenshot matching</a> for boards whose level numbers changed after an update.</li>
                <li className="leading-relaxed">Beginner-friendly articles for learning parking jam rules and avoiding wasted moves.</li>
                <li className="leading-relaxed">Download links for the official iOS and Android app pages.</li>
                <li className="leading-relaxed">Regular updates when new reliable level videos are collected.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">How We Build a Level Guide</h2>
              <p className="leading-relaxed mb-4">
                We start with a complete gameplay recording. The guide page keeps the source video, a board image, and written steps only when the vehicle colors, positions, and move order can be checked on screen.
              </p>
              <p className="leading-relaxed">
                A page without verified written steps remains a video-first guide. We do not fill missing details with a repeated solution template. Board images and screenshot matching are added in reviewed batches.
              </p>
            </section>

            <section>
              <GptAd placement="middle" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Independent Guide Notice</h2>
              <p className="leading-relaxed">
                {SITE_NAME} is a fan-made guide resource and is not affiliated with, endorsed by, or officially connected to {GAME_DEVELOPER}. All trademarks and app store references belong to their respective owners.
              </p>
            </section>

            <section className="bg-card/50 border border-border rounded-2xl p-6 sm:p-8">
              <GptAd placement="bottom" />
              <h2 className="text-2xl font-bold text-foreground mb-4">Get in Touch</h2>
              <p className="leading-relaxed">Found a missing level, broken video, or better route? Visit our <a href="/contact-us" className="text-primary hover:text-primary/80 hover:underline">Contact Us</a> page and send the details.</p>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

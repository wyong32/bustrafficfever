import { Footer } from "@/components/footer";
import { Mail, MessageSquare, Clock } from "lucide-react";
import { GptAd } from "@/components/ads/gpt-ad";
import { SITE_NAME } from "@/lib/site";

const CONTACT_EMAIL = "support@bustrafficfever.org";

export const metadata = {
  title: "Contact Us - Bus Traffic Fever Guide",
  description: "Contact BusTrafficFever.org with Bus Traffic Fever level requests, walkthrough corrections, broken video reports, or site feedback.",
};

export default function ContactUsPage() {
  return (
    <div>
      <section className="container mx-auto px-6 pt-12 pb-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-bold mb-6 text-4xl sm:text-5xl"><span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">Contact Us</span></h1>
          <div className="space-y-8">
            <section className="text-muted-foreground">
              <p className="leading-relaxed text-lg mb-6">Contact {SITE_NAME} if you want to report a missing Bus Traffic Fever level, suggest a better walkthrough route, or share feedback about our guide pages.</p>
            </section>

            <div className="grid md:grid-cols-3 gap-6">
              {[{icon: Mail, title: "Email Us", text: "Send level notes or site feedback"}, {icon: MessageSquare, title: "Guide Feedback", text: "Tell us if a route is unclear, outdated, or missing a useful tip."}, {icon: Clock, title: "Response Time", text: "We review guide requests and technical reports as updates are scheduled."}].map((item) => {
                const Icon = item.icon;
                return <div key={item.title} className="bg-card/50 border border-border rounded-2xl p-6 text-center"><div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4"><Icon className="h-7 w-7 text-primary" /></div><h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3><p className="text-sm text-muted-foreground mb-3">{item.text}</p>{item.title === "Email Us" && <a href={`mailto:${CONTACT_EMAIL}`} className="text-primary hover:text-primary/80 hover:underline text-sm">{CONTACT_EMAIL}</a>}</div>;
              })}
            </div>

            <section className="bg-card/50 border border-border rounded-2xl p-6 sm:p-8">
              <GptAd placement="top" />
              <h2 className="text-2xl font-bold text-foreground mb-4">What to Include</h2>
              <ul className="space-y-2 ml-6 list-disc text-muted-foreground">
                <li className="leading-relaxed">The Bus Traffic Fever level number.</li>
                <li className="leading-relaxed">A short description of the issue or suggested route.</li>
                <li className="leading-relaxed">A video link or screenshot if it helps explain the board.</li>
                <li className="leading-relaxed">The device or browser if you are reporting a site problem.</li>
              </ul>
            </section>

            <section className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-2xl p-6 sm:p-8 text-center">
              <GptAd placement="bottom" />
              <h2 className="text-2xl font-bold text-foreground mb-3">Help Improve the Guide</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">Accurate level routes make the site more useful for Bus Traffic Fever players. Send corrections when you find a clearer solution.</p>
              <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent text-white px-7 py-3.5 rounded-full text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"><Mail className="h-5 w-5" />Send Us an Email</a>
            </section>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

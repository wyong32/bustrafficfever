import { Footer } from "@/components/footer";
import { DownloadHero } from "@/components/download/download-hero";
import { DownloadFeatures } from "@/components/download/download-features";
import { DownloadCTA } from "@/components/download/download-cta";
import { DownloadStats } from "@/components/download/download-stats";
import { GptAd } from "@/components/ads/gpt-ad";

export default function DownloadPage() {
  return (
    <div>
      <DownloadCTA />
      <GptAd placement="top" />
      <DownloadFeatures />
      <GptAd placement="middle" />
      <DownloadHero />
      <GptAd placement="bottom" />
      <DownloadStats />
      <Footer />
    </div>
  );
}

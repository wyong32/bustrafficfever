"use client";

import { AffiliateAd } from "@/components/ads/affiliate-ad";

interface GptAdProps {
  placement: "top" | "middle" | "bottom";
  className?: string;
}

export function GptAd({ placement, className = "" }: GptAdProps) {
  return <AffiliateAd placement={placement} className={className} />;
}

export function GptAnchorAd() {
  return null;
}

export function GptInterstitialAd() {
  return null;
}

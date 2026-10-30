import guideData from "@/data/level-guides.json";

export interface VerifiedStep {
  title: string;
  instruction: string;
  image?: string;
  imageAlt?: string;
}

export interface VerifiedLevelGuide {
  objective: string;
  keyChallenge: string;
  quickAnswer: string;
  overallStrategy: string[];
  startingBoard: string;
  steps: VerifiedStep[];
  beforeMove: string[];
  stuckPoint: string;
  faqs: Array<{ question: string; answer: string }>;
}

const guides = guideData as Record<string, VerifiedLevelGuide>;

export function getVerifiedLevelGuide(id: string): VerifiedLevelGuide | undefined {
  return guides[id];
}

export function getLevelFaqs(id: string, guide?: VerifiedLevelGuide) {
  if (guide) return guide.faqs;

  return [
    {
      question: `How do I solve Bus Traffic Fever Level ${id}?`,
      answer: `Play the full Level ${id} walkthrough and match the vehicle order shown on screen. Reset the board first if your current layout no longer matches the opening position.`,
    },
    {
      question: `Why does my Level ${id} board stop matching the video?`,
      answer: "One earlier move can change every available lane. Restart the level, then compare the board after each vehicle leaves.",
    },
    {
      question: "Can a game update change this level?",
      answer: "Yes. Game updates can reorder or replace boards. Use the screenshot finder when the displayed level number leads to a different layout.",
    },
    {
      question: "Does the screenshot finder upload my image?",
      answer: "No. Matching runs in your browser, and the screenshot stays on your device.",
    },
  ];
}

"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

export function DownloadFeatures() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  const carouselImages = ["/Bus-Traffic-Fever-1.jpg", "/Bus-Traffic-Fever-2.jpg", "/Bus-Traffic-Fever-3.jpg", "/Bus-Traffic-Fever-4.jpg"];

  const features = [
    "Satisfying parking jam puzzles",
    "Bus route planning",
    "Passenger collection logic",
    "Color-sorting style goals",
    "Relaxing mobile brain teasers"
  ];

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-card/30 py-14">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="font-bold mb-5 text-foreground" style={{ fontSize: '1.875rem' }}>
              A Parking Jam Puzzle With Satisfying Flow
            </h2>
            <p className="text-muted-foreground text-base leading-relaxed mb-5">
              Bus Traffic Fever asks you to move buses through crowded lanes, collect passengers, and keep the parking lot from locking up. Every move changes the route options for the next bus.
            </p>
            <p className="text-muted-foreground text-base leading-relaxed mb-7">
              The rules take seconds to learn, but later boards become tight traffic puzzles. Plan ahead, preserve open lanes, and enjoy the clean feedback when the final bus leaves the jam.
            </p>

            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Key Features:</h3>
              <ul className="space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-muted-foreground text-base">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="relative h-[600px] flex items-center justify-start overflow-visible" style={{ perspective: "2000px" }}>
            <div className="relative w-[300px] h-[550px] ml-12">
              {carouselImages.map((image, index) => {
                const position = index - currentImageIndex;
                const initialTransform = `translateX(${index * -8}px) translateY(${index * -3}px) translateZ(${index * -10}px) rotateY(25deg) rotateZ(-3deg) scale(0.92)`;
                let transform = "";
                let zIndex = 0;
                let opacity = 1;

                if (position === 0) {
                  transform = "translateX(0) translateY(0) translateZ(0px) rotateY(0deg) rotateZ(0deg) scale(1)";
                  zIndex = 50;
                } else if (position === 1) {
                  transform = "translateX(95px) translateY(24px) translateZ(-75px) rotateY(-16deg) rotateZ(7deg) scale(0.95)";
                  zIndex = 40;
                } else if (position === 2) {
                  transform = "translateX(185px) translateY(45px) translateZ(-140px) rotateY(-22deg) rotateZ(10deg) scale(0.9)";
                  zIndex = 30;
                } else if (position === 3) {
                  transform = "translateX(270px) translateY(64px) translateZ(-195px) rotateY(-27deg) rotateZ(12deg) scale(0.85)";
                  zIndex = 20;
                  opacity = 0.95;
                } else if (position === 4) {
                  transform = "translateX(350px) translateY(80px) translateZ(-240px) rotateY(-31deg) rotateZ(14deg) scale(0.8)";
                  zIndex = 10;
                  opacity = 0.9;
                } else {
                  transform = "translateX(-150px) translateY(0) translateZ(-50px) rotateY(15deg) rotateZ(-8deg) scale(0.9)";
                  zIndex = 5;
                  opacity = 0;
                }

                return (
                  <div
                    key={image}
                    className="absolute inset-0 cursor-pointer transition-all rounded-2xl overflow-hidden"
                    style={{
                      transform: hasAnimated ? transform : initialTransform,
                      zIndex: hasAnimated ? zIndex : 50 - index,
                      opacity: hasAnimated ? opacity : 0.5 + index * 0.1,
                      transformStyle: "preserve-3d",
                      transitionDuration: hasAnimated ? "600ms" : `${1000 + index * 200}ms`,
                      transitionDelay: hasAnimated ? "0ms" : `${index * 120}ms`,
                      transitionTimingFunction: hasAnimated ? "ease-out" : "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                    onClick={() => setCurrentImageIndex((currentImageIndex + 1) % carouselImages.length)}
                  >
                    <Image src={image} alt="Bus Traffic Fever mobile gameplay screenshot with buses and parking jam lanes" fill className="object-cover drop-shadow-2xl" priority={index === 0} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

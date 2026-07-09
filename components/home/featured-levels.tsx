"use client";

import Image from "next/image";
import Link from "next/link";

const featuredLevels = [1, 2, 3, 4].map((level) => ({
  id: String(level),
  title: `Bus Traffic Fever Level ${level}`,
  image: `/levels/level-${level}.jpg`,
  badge: `Level ${level}`,
}));

export function FeaturedLevels() {
  return (
    <section className="container mx-auto px-6 py-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {featuredLevels.map((level) => (
          <Link key={level.id} href={`/levels/${level.id}`} className="group block">
            <div className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="absolute top-3 left-3 z-10">
                <div className="bg-gradient-to-r from-primary to-accent text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">{level.badge}</div>
              </div>
              <div className="relative aspect-[4/5]">
                <Image src={level.image} alt={`${level.title} walkthrough`} fill className="object-cover" />
              </div>
              <div className="bg-card p-4 border-t border-border">
                <h3 className="font-semibold text-foreground text-center group-hover:text-primary transition-colors">{level.title}</h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/levels"><button className="bg-gradient-to-r from-primary to-accent text-white px-8 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">Browse Guide Index</button></Link>
      </div>
    </section>
  );
}

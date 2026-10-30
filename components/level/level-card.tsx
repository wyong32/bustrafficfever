import Link from "next/link";
import Image from "next/image";
import { Level } from "@/types";
import { cn } from "@/lib/utils";
import { getLevelCover } from "@/lib/data";

interface LevelCardProps {
  level: Level;
  className?: string;
}

export function LevelCard({ level, className }: LevelCardProps) {
  return (
    <Link href={`/levels/${level.id}`} className={cn("group block w-full", className)}>
      <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        {/* Level badge */}
        <div className="absolute top-2 left-2 z-10">
          <div className="bg-[#E89654] text-white px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold shadow-md">
            Level {level.id}
          </div>
        </div>

        {/* Game screenshot */}
        <div className="relative aspect-[6/5] w-full overflow-hidden bg-muted">
          <Image
            src={getLevelCover(level)}
            alt={`Bus Traffic Fever Level ${level.id} board`}
            fill
            className="object-cover transition-all duration-300 group-hover:brightness-90"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            unoptimized
          />

          {/* Play button overlay - visible on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="relative w-12 h-12 sm:w-14 sm:h-14">
              {/* Outer circle border */}
              <div className="absolute inset-0 rounded-full border-[2.5px] sm:border-[3px] border-white"></div>
              {/* Play triangle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-0 h-0 ml-0.5 sm:ml-1 border-t-[9px] sm:border-t-[11px] border-t-transparent border-l-[16px] sm:border-l-[20px] border-l-white border-b-[9px] sm:border-b-[11px] border-b-transparent"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom title section */}
        <div className="flex min-h-[58px] items-center justify-center bg-card px-3 py-3 sm:px-4">
          <h3 className="line-clamp-2 text-center text-sm font-semibold text-foreground transition-colors group-hover:text-primary sm:text-base">
            {level.title || `Bus Traffic Fever Level ${level.id}`}
          </h3>
        </div>
      </div>
    </Link>
  );
}

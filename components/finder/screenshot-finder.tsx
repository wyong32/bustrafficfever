"use client";

import { ChangeEvent, DragEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ImagePlus, LoaderCircle, RotateCcw, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLevelById, getLevelCover } from "@/lib/data";
import { descriptorFromPixels, rankLevelMatches } from "@/lib/image-matcher.mjs";

type FinderState = "idle" | "reading" | "matching" | "results" | "error";
type FinderMatch = { levelId: string; score: number; confidence: "strong" | "possible" | "low" };
type MatchIndex = { entries: Array<{ levelId: string; descriptor: { hash: string; colors: number[]; edges: number[] } }> };

const MAX_FILE_SIZE = 12 * 1024 * 1024;
const ACCEPTED_TYPES = new Set(["image/png", "image/jpeg", "image/webp"]);

function descriptorsForBitmap(bitmap: ImageBitmap) {
  const crops = [{ x: 0, y: 0, width: bitmap.width, height: bitmap.height }];
  if (bitmap.height > bitmap.width) {
    crops.push({ x: 0, y: 0, width: bitmap.width, height: bitmap.height * 0.7 });
  }
  const ratio = 6 / 5;
  if (bitmap.width / bitmap.height > ratio) {
    const width = bitmap.height * ratio;
    crops.push({ x: (bitmap.width - width) / 2, y: 0, width, height: bitmap.height });
  } else {
    const height = bitmap.width / ratio;
    crops.push({ x: 0, y: Math.max(0, (bitmap.height - height) * 0.28), width: bitmap.width, height });
  }
  if (bitmap.height > bitmap.width) {
    crops.push({ x: 0, y: bitmap.height * 0.12, width: bitmap.width, height: bitmap.height * 0.55 });
  }

  return crops.map((crop) => {
    const canvas = document.createElement("canvas");
    canvas.width = 600;
    canvas.height = 500;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("This browser cannot analyze images.");
    context.drawImage(bitmap, crop.x, crop.y, crop.width, crop.height, 0, 0, 600, 500);
    return descriptorFromPixels(context.getImageData(0, 0, 600, 500));
  });
}

export function ScreenshotFinder() {
  const inputRef = useRef<HTMLInputElement>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [state, setState] = useState<FinderState>("idle");
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [matches, setMatches] = useState<FinderMatch[]>([]);

  useEffect(() => () => {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
  }, []);

  async function processFile(file: File) {
    if (!ACCEPTED_TYPES.has(file.type)) {
      setError("Choose a PNG, JPEG, or WebP screenshot.");
      setState("error");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("The screenshot must be smaller than 12 MB.");
      setState("error");
      return;
    }

    setState("reading");
    setError("");
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = URL.createObjectURL(file);
      setPreview(objectUrlRef.current);
      setState("matching");
      const response = await fetch("/data/level-match-index.json", { cache: "force-cache" });
      if (!response.ok) throw new Error("The matching index is unavailable.");
      const index = await response.json() as MatchIndex;
      setMatches(rankLevelMatches(descriptorsForBitmap(bitmap), index.entries, 5) as FinderMatch[]);
      bitmap.close();
      setState("results");
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "The screenshot could not be matched.");
      setState("error");
    }
  }

  function onInput(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (file) void processFile(file);
    event.target.value = "";
  }

  function onDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) void processFile(file);
  }

  function reset() {
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    objectUrlRef.current = null;
    setPreview("");
    setMatches([]);
    setError("");
    setState("idle");
  }

  const busy = state === "reading" || state === "matching";

  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm sm:p-7">
      <input id="level-screenshot" name="level-screenshot" ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" onChange={onInput} className="sr-only" aria-label="Choose a Bus Traffic Fever screenshot" />
      <div onDrop={onDrop} onDragOver={(event) => event.preventDefault()} className="flex min-h-48 flex-col items-center justify-center border-2 border-dashed border-primary/40 bg-primary/5 px-5 py-8 text-center">
        <ImagePlus className="h-9 w-9 text-primary" />
        <h2 className="mt-3 text-xl font-bold text-foreground">Add your game screenshot</h2>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">Use a clear image that shows the full traffic board.</p>
        <Button type="button" className="mt-5" onClick={() => inputRef.current?.click()} disabled={busy}>
          {busy ? <LoaderCircle className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          {state === "reading" ? "Reading image" : state === "matching" ? "Finding level" : "Choose screenshot"}
        </Button>
        <p className="mt-3 text-xs text-muted-foreground">PNG, JPEG, or WebP. Maximum 12 MB.</p>
      </div>

      {error ? <p role="alert" className="mt-4 border-l-4 border-destructive bg-destructive/5 p-4 text-sm text-foreground">{error}</p> : null}

      {preview ? (
        <div className="mt-7 grid gap-6 lg:grid-cols-[320px_minmax(0,1fr)]">
          <div>
            <div className="overflow-hidden rounded-md border border-border bg-muted">
              {/* Blob URLs are local and cannot use next/image. */}
              <img src={preview} alt="Selected Bus Traffic Fever screenshot" className="max-h-[520px] w-full object-contain" />
            </div>
            <Button type="button" variant="ghost" className="mt-3" onClick={reset}><RotateCcw className="h-4 w-4" /> Start over</Button>
          </div>
          <section aria-labelledby="match-results">
            <h2 id="match-results" className="text-2xl font-bold text-foreground">Closest level matches</h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">Compare your board with these candidates before opening a guide.</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {matches.map((match) => {
                const level = getLevelById(match.levelId);
                if (!level) return null;
                return (
                  <article key={match.levelId} className="overflow-hidden rounded-md border border-border bg-background">
                    <div className="relative aspect-[6/5] bg-muted">
                      <Image src={getLevelCover(level)} alt={`Bus Traffic Fever Level ${match.levelId} board`} fill className="object-cover" sizes="180px" unoptimized />
                    </div>
                    <div className="p-3">
                      <p className="text-xs font-bold uppercase text-primary">{match.confidence} match</p>
                      <h3 className="mt-1 font-bold text-foreground">Level {match.levelId}</h3>
                      <Link href={`/levels/${match.levelId}/`} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary">View guide <ArrowRight className="h-4 w-4" /></Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

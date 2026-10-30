import { spawnSync } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { buildIndex } from "./build-level-match-index.mjs";

sharp.cache(false);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const cacheDir = path.join(rootDir, ".level-assets", "cache");
const matchRoot = path.join(rootDir, ".level-assets", "match");
const levelsPath = path.join(rootDir, "data", "levels.json");

const combinedTimes = {
  "1": { cover: 6, steps: [9, 14, 18] },
  "2": { cover: 32, steps: [38, 51, 65] },
  "3": { cover: 86, steps: [93, 107, 120] },
  "4": { cover: 140, steps: [148, 162, 178] },
  "5": { cover: 193, steps: [207, 232, 259, 287] },
};

function run(command, args) {
  const result = spawnSync(command, args, { cwd: rootDir, encoding: "utf8", windowsHide: true });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(result.stderr || `${command} failed`);
}

function durationSeconds(value) {
  const parts = String(value).split(":").map(Number);
  return parts.length === 2 ? parts[0] * 60 + parts[1] : parts.reduce((total, part) => total * 60 + part, 0);
}

function isoDuration(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remaining = seconds % 60;
  return `PT${hours ? `${hours}H` : ""}${minutes ? `${minutes}M` : ""}${remaining ? `${remaining}S` : ""}`;
}

function transparentWatermark(text, width) {
  const size = Math.max(18, Math.round(width * 0.045));
  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${size * 2.5}"><text x="18" y="${size * 1.7}" fill="#ffffff" fill-opacity="0.32" font-family="Arial" font-size="${size}" font-weight="700">${text}</text></svg>`);
}

async function extractFrame(video, seconds, output) {
  await fs.mkdir(path.dirname(output), { recursive: true });
  run("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", "-ss", String(seconds), "-i", video, "-frames:v", "1", output]);
}

async function writeAssets(level, times) {
  const publicDir = path.join(rootDir, "public", "levels", level.id);
  const stepDir = path.join(publicDir, "steps");
  const privateDir = path.join(matchRoot, level.id);
  const video = path.join(cacheDir, `${level.videoId}.mp4`);
  const frame = path.join(cacheDir, `level-${level.id}-cover.png`);
  await fs.mkdir(stepDir, { recursive: true });
  await fs.mkdir(privateDir, { recursive: true });
  await extractFrame(video, times.cover, frame);

  const metadata = await sharp(frame).metadata();
  const cropHeight = Math.min(metadata.height, 900);
  const normalized = await sharp(frame)
    .extract({ left: 0, top: 0, width: metadata.width, height: cropHeight })
    .resize(600, 500, { fit: "fill" })
    .png()
    .toBuffer();

  await Promise.all([
    sharp(normalized)
      .composite([{ input: transparentWatermark("bustrafficfever.org", 600), gravity: "southwest" }])
      .webp({ quality: 90 })
      .toFile(path.join(publicDir, "cover.webp")),
    sharp(normalized).webp({ lossless: true }).toFile(path.join(privateDir, "match-start.webp")),
  ]);

  const guideImages = [];
  for (let index = 0; index < times.steps.length; index += 1) {
    const stepFrame = path.join(cacheDir, `level-${level.id}-step-${index + 1}.png`);
    const output = path.join(stepDir, `step-${index + 1}.webp`);
    await extractFrame(video, times.steps[index], stepFrame);
    await sharp(stepFrame)
      .composite([{ input: transparentWatermark("bustrafficfever.org", metadata.width), gravity: "southwest" }])
      .webp({ quality: 88 })
      .toFile(output);
    guideImages.push(`/levels/${level.id}/steps/step-${index + 1}.webp`);
  }
  return guideImages;
}

async function main() {
  const levels = JSON.parse(await fs.readFile(levelsPath, "utf8"));
  const pilot = levels.filter((level) => Number(level.id) <= 20);

  for (const level of pilot) {
    const seconds = durationSeconds(level.videoDuration);
    const times = combinedTimes[level.id] || {
      cover: 10,
      steps: [Math.round(seconds * 0.12), Math.round(seconds * 0.35), Math.round(seconds * 0.58)],
    };
    level.guideImages = await writeAssets(level, times);
    level.coverImage = `/levels/${level.id}/cover.webp`;
    level.assetVersion = 1;

    const metadata = JSON.parse(await fs.readFile(path.join(cacheDir, `${level.videoId}.json`), "utf8"));
    level.videoUploadDate = new Date(metadata.timestamp * 1000).toISOString();
    level.videoDurationIso = isoDuration(Math.round(metadata.duration || seconds));
  }

  await fs.writeFile(levelsPath, `${JSON.stringify(levels, null, 2)}\n`);
  const index = await buildIndex(matchRoot);
  const indexPath = path.join(rootDir, "public", "data", "level-match-index.json");
  await fs.mkdir(path.dirname(indexPath), { recursive: true });
  await fs.writeFile(indexPath, `${JSON.stringify(index)}\n`);
  console.log(JSON.stringify({ levels: pilot.length, matches: index.entries.length }));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import sharp from "sharp";
import { descriptorFromPixels } from "../lib/image-matcher.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export async function buildIndex(inputDir) {
  const directories = (await fs.readdir(inputDir, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^\d+$/.test(entry.name))
    .sort((left, right) => Number(left.name) - Number(right.name));
  const entries = [];

  for (const directory of directories) {
    const files = (await fs.readdir(path.join(inputDir, directory.name), { withFileTypes: true }))
      .filter((entry) => entry.isFile() && entry.name.endsWith(".webp"));
    for (const source of files) {
      const file = path.join(inputDir, directory.name, source.name);
      const { data, info } = await sharp(await fs.readFile(file)).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
      if (info.width !== 600 || info.height !== 500) throw new Error(`${file} must be 600x500`);
      entries.push({
        levelId: directory.name,
        source: source.name,
        descriptor: descriptorFromPixels({ data, width: info.width, height: info.height }),
      });
    }
  }

  if (!entries.length) throw new Error("No matching images were found");
  return { version: 1, generatedAt: new Date().toISOString(), entries };
}

async function main() {
  const input = path.join(rootDir, ".level-assets", "match");
  const output = path.join(rootDir, "public", "data", "level-match-index.json");
  const index = await buildIndex(input);
  await fs.mkdir(path.dirname(output), { recursive: true });
  await fs.writeFile(output, `${JSON.stringify(index)}\n`);
  console.log(JSON.stringify({ output, entries: index.entries.length }));
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}

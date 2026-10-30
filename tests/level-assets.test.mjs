import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import sharp from "sharp";

const levels = JSON.parse(fs.readFileSync("data/levels.json", "utf8"));
const index = JSON.parse(fs.readFileSync("public/data/level-match-index.json", "utf8"));

test("pilot covers use the public 600 by 500 WebP contract", async () => {
  for (const level of levels.filter((entry) => Number(entry.id) <= 20)) {
    const file = `public${level.coverImage}`;
    assert.ok(fs.existsSync(file), `missing ${file}`);
    const metadata = await sharp(file).metadata();
    assert.equal(metadata.width, 600);
    assert.equal(metadata.height, 500);
    assert.equal(metadata.format, "webp");
  }
});

test("matching index contains one private-source descriptor for each pilot level", () => {
  assert.equal(index.entries.length, 20);
  assert.deepEqual(index.entries.map((entry) => Number(entry.levelId)), Array.from({ length: 20 }, (_, index) => index + 1));
  assert.ok(index.entries.every((entry) => entry.source === "match-start.webp"));
});

test("verified written guides are specific and contain no visible time labels", () => {
  const guides = JSON.parse(fs.readFileSync("data/level-guides.json", "utf8"));
  assert.deepEqual(Object.keys(guides), ["1", "2", "3", "4", "5"]);
  for (const guide of Object.values(guides)) {
    assert.ok(guide.steps.length >= 3);
    assert.doesNotMatch(JSON.stringify(guide), /\b\d{1,2}:\d{2}\b|timestamp|checkpoint/i);
  }
});

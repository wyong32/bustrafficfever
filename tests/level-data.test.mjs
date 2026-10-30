import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const levels = JSON.parse(fs.readFileSync("data/levels.json", "utf8"));

test("level records stay ordered, unique, and limited to verified source rows", () => {
  const ids = levels.map((level) => Number(level.id));
  assert.equal(levels.length, 238);
  assert.equal(new Set(ids).size, ids.length);
  assert.deepEqual(ids, [...ids].sort((left, right) => left - right));
  assert.equal(Math.max(...ids), 246);

  const missing = Array.from({ length: 246 }, (_, index) => index + 1)
    .filter((id) => !ids.includes(id));
  assert.deepEqual(missing, [26, 75, 76, 196, 197, 198, 199, 200]);
});

test("the first twenty records expose workflow v3 assets and video metadata", () => {
  for (const level of levels.filter((entry) => Number(entry.id) <= 20)) {
    assert.match(level.coverImage, new RegExp(`^/levels/${level.id}/cover\\.webp$`));
    assert.ok(Array.isArray(level.guideImages) && level.guideImages.length >= 2);
    assert.match(level.videoUploadDate, /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?(?:Z|[+-]\d{2}:\d{2})$/);
    assert.match(level.videoDurationIso, /^PT(?:\d+H)?(?:\d+M)?(?:\d+S)?$/);
  }
});

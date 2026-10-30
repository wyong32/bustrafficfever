import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const page = fs.readFileSync("app/levels/[id]/page.tsx", "utf8");
const layout = fs.readFileSync("app/levels/[id]/layout.tsx", "utf8");

test("level pages use the approved server-rendered guide structure", () => {
  assert.doesNotMatch(page, /^\s*[\"']use client[\"']/);
  for (const heading of [
    "Quick Answer",
    "Overall Strategy",
    "Starting Board",
    "Step-by-Step Solution",
    "Where Players Get Stuck",
  ]) {
    assert.match(page, new RegExp(heading));
  }
  assert.match(page, /Related Bus Traffic Fever guides/);
  assert.match(page, /Browse all level guides/);
});

test("published copy omits internal analysis labels and visible timestamps", () => {
  for (const source of [page, layout]) {
    assert.doesNotMatch(source, /frame-verified|video analysis|video checkpoint|source transparency/i);
    assert.doesNotMatch(source, /Use the timestamps/i);
  }
});

test("level schema uses normalized video metadata", () => {
  assert.match(layout, /videoUploadDate/);
  assert.match(layout, /videoDurationIso/);
  assert.match(layout, /youtube\.com\/watch\?v=/);
  assert.match(layout, /"@type": "Article"/);
});

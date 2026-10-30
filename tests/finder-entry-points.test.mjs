import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

test("screenshot finder is linked from site entry points", () => {
  const navbar = fs.readFileSync("components/layout/site-navbar.tsx", "utf8");
  const home = fs.readFileSync("components/home/hero-section.tsx", "utf8");
  const sitemap = fs.readFileSync("app/sitemap.ts", "utf8");

  assert.match(navbar, /href:\s*["']\/find-level\/["']/);
  assert.match(home, /href=["']\/find-level\/["']/);
  assert.match(sitemap, /\/find-level\//);
});

test("finder route states local processing and first-twenty coverage", () => {
  const page = fs.readFileSync("app/find-level/page.tsx", "utf8");
  const layout = fs.readFileSync("app/find-level/layout.tsx", "utf8");

  assert.match(layout, /canonical\("\/find-level\/"\)/);
  assert.match(page, /stays on your device/i);
  assert.match(page, /Levels 1-20/);
});

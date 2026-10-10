import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const page = readFileSync(new URL("../dist/sample/index.html", import.meta.url), "utf8");
const css = readFileSync(new URL("../dist/assets/css/style.css", import.meta.url), "utf8");

test("Figma Heading Style variants map to Astro classes", () => {
  for (const variant of ["default", "page", "section", "subsection", "border", "colored", "background"]) {
    assert.ok(page.includes("c-heading--" + variant), "Heading variant missing: " + variant);
  }
  assert.match(page, /<h1\b[^>]*class="[^"]*c-heading--page/);
});

test("Figma Button Style and Disabled state map to semantic Astro output", () => {
  for (const variant of ["default", "primary", "text"]) {
    assert.ok(page.includes("c-button--" + variant), "Button variant missing: " + variant);
  }
  assert.match(page, /<button\b[^>]*\bdisabled(?:\b|=)/);
});

test("Figma Card and Media variants render in the validation sample", () => {
  for (const variant of ["default", "subtle"]) {
    assert.ok(page.includes("c-card--" + variant), "Card variant missing: " + variant);
  }
  for (const variant of ["image-right", "image-left"]) {
    assert.ok(page.includes("c-media--" + variant), "Media variant missing: " + variant);
  }
});

test("Figma mapping components have compiled styles", () => {
  for (const selector of [".c-heading--page", ".c-button--primary", ".c-card--subtle", ".c-media--image-left"]) {
    assert.ok(css.includes(selector), "Compiled CSS missing: " + selector);
  }
});
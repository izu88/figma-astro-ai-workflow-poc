import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function html(path) {
  return readFileSync(new URL("../dist" + path, import.meta.url), "utf8");
}
const home = html("/pilot/index.html");
const services = html("/pilot/services/index.html");
const generic = html("/index.html");

test("both Figma pilot pages are statically generated and retain their own metadata", () => {
  assert.match(home, /<title>ホーム \| NAGI STUDIO<\/title>/);
  assert.match(services, /<title>サービス \| NAGI STUDIO<\/title>/);
  assert.match(home, /つくるを、自由に。/);
  assert.match(services, /提供する価値/);
});

test("pilot uses Astro design system component contracts, including both Media layouts", () => {
  for (const page of [home, services]) {
    for (const cls of ["c-heading--page", "c-heading--section", "c-card--default", "c-card--subtle", "c-media"]) {
      assert.ok(page.includes(cls), "Missing " + cls);
    }
    assert.equal((page.match(/<h1\b/g)||[]).length, 1);
    assert.match(page, /p-pilot-media__placeholder/);
  }
  assert.match(home, /c-media--image-right/);
  assert.match(services, /c-media--image-left/);
  assert.match(home, /href="\/pilot\/services\/"/);
  assert.match(services, /aria-current="page"/);
});

test("generic starter Header/Footer remain untouched via layout fallback slots", () => {
  assert.match(generic, /Astro Simple Template/);
  assert.ok(!generic.includes("NAGI STUDIO"));
  assert.match(home, /NAGI STUDIO/);
  assert.ok(!home.includes("Astro Simple Template</a>"));
  assert.ok(!services.includes("Astro Simple Template</a>"));
});

test("pilot does not emit links to missing contact route", () => {
  assert.ok(!home.includes('href="/pilot/contact/"'));
  assert.ok(!services.includes('href="/pilot/contact/"'));
});

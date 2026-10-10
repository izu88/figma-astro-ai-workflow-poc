import assert from "node:assert/strict";

const base = process.env.PILOT_BASE_URL ?? "http://127.0.0.1:4321";
const cases = [
  { path: "/pilot/", title: "ホーム | NAGI STUDIO", section: "私たちの取り組み" },
  { path: "/pilot/services/", title: "サービス | NAGI STUDIO", section: "提供する価値" },
];

for (const page of cases) {
  const response = await fetch(new URL(page.path, base));
  assert.equal(response.status, 200, page.path + " did not respond with 200");
  const html = await response.text();
  assert.ok(html.includes(page.title), page.path + " title mismatch");
  assert.ok(html.includes(page.section), page.path + " section missing");
  assert.ok(html.includes('href="/pilot/services/"'), page.path + " navigation missing");
  for (const url of ["/assets/css/style.css", "/assets/js/common.js"]) {
    const asset = await fetch(new URL(url, base));
    assert.equal(asset.status, 200, url + " not found");
    assert.ok((await asset.arrayBuffer()).byteLength > 0, url + " is empty");
  }
  console.log("PASS " + page.path);
}

import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const origin = process.env.PILOT_BASE_URL ?? "http://127.0.0.1:4321";
const targets = [
  { route: "/pilot/", label: "home", heading: "つくるを、自由に。" },
  { route: "/pilot/services/", label: "services", heading: "サービス" },
];
const viewports = [
  { name: "desktop", width: 1280, height: 900 },
  { name: "mobile", width: 390, height: 844 },
];

await mkdir("pilot-screenshots", { recursive: true });
const browser = await chromium.launch({ headless: true });

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({
      viewport: { width: viewport.width, height: viewport.height },
      deviceScaleFactor: 1,
    });
    const browserErrors = [];
    page.on("pageerror", (err) => browserErrors.push(err.message));
    page.on("console", (msg) => {
      if (msg.type() === "error") browserErrors.push(msg.text());
    });

    for (const target of targets) {
      const response = await page.goto(new URL(target.route, origin).href, {
        waitUntil: "networkidle",
      });
      assert.equal(response?.status(), 200, target.route + " returned non-200");
      assert.equal(await page.locator("h1").count(), 1, target.route + " must have one h1");
      assert.equal(
        (await page.locator("h1").innerText()).trim(),
        target.heading,
        target.route + " heading mismatch",
      );
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1),
        false,
        target.route + " has horizontal overflow at " + viewport.width,
      );
      assert.deepEqual(browserErrors, [], target.route + " has browser errors");
      await page.screenshot({
        path: "pilot-screenshots/" + target.label + "-" + viewport.name + ".png",
        fullPage: true,
      });
      console.log("PASS " + target.route + " " + viewport.name);
    }
    await page.goto(new URL("/pilot/", origin).href);
    await page.getByRole("link", { name: "サービスを見る" }).click();
    await page.waitForURL("**/pilot/services/");
    assert.equal((await page.locator("h1").innerText()).trim(), "サービス");
    await page.getByRole("link", { name: "ホーム" }).click();
    await page.waitForURL("**/pilot/");
    assert.equal((await page.locator("h1").innerText()).trim(), "つくるを、自由に。");
    assert.deepEqual(browserErrors, [], "Navigation generated browser errors");
    await page.close();
  }
} finally {
  await browser.close();
}

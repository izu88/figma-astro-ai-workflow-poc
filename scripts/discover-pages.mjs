import { readdir, stat } from "node:fs/promises";
import path from "node:path";

function parseArgs(argv) {
  const roots = [];
  let origin = "";

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "--origin") {
      origin = argv[index + 1] ?? "";
      index += 1;
      continue;
    }

    roots.push(arg);
  }

  if (roots.length === 0) {
    throw new Error(
      "Usage: node scripts/discover-pages.mjs [--origin http://127.0.0.1:4174] <dist-dir> [<dist-dir> ...]",
    );
  }

  return { roots, origin };
}

async function collectHtmlFiles(root, current = root) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolutePath = path.join(current, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectHtmlFiles(root, absolutePath)));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(absolutePath);
    }
  }

  return files;
}

function htmlPathToRoute(root, file) {
  const relativePath = path.relative(root, file).split(path.sep).join("/");

  if (relativePath === "index.html") {
    return "/";
  }

  if (relativePath.endsWith("/index.html")) {
    return "/" + relativePath.slice(0, -"index.html".length);
  }

  return "/" + relativePath;
}

function withOrigin(route, origin) {
  if (!origin) {
    return route;
  }

  const normalizedOrigin = origin.endsWith("/") ? origin : origin + "/";
  return new URL(route, normalizedOrigin).toString();
}

const { roots, origin } = parseArgs(process.argv.slice(2));
const routes = new Set();

for (const root of roots) {
  const info = await stat(root).catch(() => null);

  if (!info?.isDirectory()) {
    throw new Error("Build output directory not found: " + root);
  }

  for (const file of await collectHtmlFiles(root)) {
    routes.add(htmlPathToRoute(root, file));
  }
}

if (routes.size === 0) {
  throw new Error("No HTML pages found in: " + roots.join(", "));
}

for (const route of [...routes].sort()) {
  process.stdout.write(withOrigin(route, origin) + "\n");
}

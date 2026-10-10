import fs from "node:fs";
import path from "node:path";

const root = path.resolve(".github/skills");
if (!fs.existsSync(root)) {
  console.error("ERROR: .github/skills was not found.");
  process.exit(1);
}

const dirs = fs.readdirSync(root, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort();

const errors = [];

for (const dir of dirs) {
  const file = path.join(root, dir, "SKILL.md");
  if (!fs.existsSync(file)) {
    errors.push(`${dir}: SKILL.md がありません`);
    continue;
  }

  const source = fs.readFileSync(file, "utf8");
  const fm = source.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) {
    errors.push(`${dir}: YAML frontmatter がありません`);
    continue;
  }

  const name = fm[1].match(/^name:\s*(.+)$/m)?.[1]?.trim();
  const description = fm[1].match(/^description:\s*(.+)$/m)?.[1]?.trim();

  if (!name) errors.push(`${dir}: name がありません`);
  if (name && name !== dir) errors.push(`${dir}: name "${name}" がディレクトリ名と不一致`);
  if (name && !/^[a-z0-9-]{1,64}$/.test(name)) errors.push(`${dir}: name形式が不正`);
  if (!description) errors.push(`${dir}: description がありません`);
  if (description && description.length > 1024) errors.push(`${dir}: description が1024文字を超えています`);
}

if (errors.length) {
  console.error("Agent Skills validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Agent Skills OK: ${dirs.length} skill(s)`);
dirs.forEach((dir) => console.log(`- ${dir}`));

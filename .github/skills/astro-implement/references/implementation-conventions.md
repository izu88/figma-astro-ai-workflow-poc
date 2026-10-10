# Implementation Conventions

## Astro
- frontmatterはimport、meta、breadcrumbs等の単純設定中心。
- component内部をpageへ複製しない。
- variantはvisual、semantic tag/levelは別prop。
- CSS数値を自由指定できる万能componentを作らない。

## SCSS
- foundation: token/reset/base
- component: reusable UI
- layout: site frame
- page: page-specific composition
- generated CSSを直接編集しない。
- BEM + l-/c-/p-/u-/js- の既存規則を尊重。

## TypeScript
目標は `src/scripts/**/*.ts` → build → `public/assets/js/*.js`。
- querySelectorはnull安全に扱う。
- JS hookはjs-classまたは明確なdata attribute。
- progressive enhancementを優先。
- generated JS、pageごとのコピペscript、global state乱用は禁止。

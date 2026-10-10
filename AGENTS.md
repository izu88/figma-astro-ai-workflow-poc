# AGENTS.md

## Project Purpose

This project is a reusable Astro static site template.

Astro is used as a static-site foundation and as the implementation layer for the Figma-aligned design system. Prioritize maintainability, HTML-coder readability, component reuse, and static HTML delivery.

## Core Rules

- Keep page content inside each `.astro` page as normal HTML whenever possible.
- Keep the boundary between common layout and page content easy to understand.
- Put page-specific `meta`, `breadcrumbs`, and `bodyClass` in each page frontmatter.
- For reusable design-system UI, prefer an existing Astro component, then extend it, then create a new component.
- Reusable Button, Card, Heading, Media, Section and similar UI should move to Astro components when introduced or migrated.
- Prefer explicit code over hidden automation when it helps HTML coders understand the page.

## Astro Component Structure

Reusable UI is organized by responsibility:

- `components/base/`: Heading, Text, Button
- `components/patterns/`: Breadcrumb, Card, Media
- `components/sections/`: Hero, Section
- `components/global/`: Header, Footer
- `layouts/`: BaseLayout
- `HeadMeta.astro`: document metadata

Header and Footer should stay close to plain HTML because HTML coders may edit them. Page content should remain readable as HTML plus simple shared component tags.

## Page Pattern

Each page should follow this pattern:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";

const meta = {
  title: "Page Title",
  description: "Page description.",
};

const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "Page Title" },
];
---

<BaseLayout meta={meta} breadcrumbs={breadcrumbs} bodyClass="page-example">
  <main class="p-example">
    Page HTML goes here.
  </main>
</BaseLayout>
```

## Breadcrumbs

- Breadcrumbs are manually defined in each page frontmatter.
- Do not auto-generate breadcrumbs by route unless explicitly requested.
- Manual breadcrumbs are preferred because they are easier to understand and edit.

## CSS Rules

- SCSS source files live in `src/styles/`.
- The generated CSS file is `public/assets/css/style.css`.
- Do not edit `public/assets/css/style.css` directly.
- CSS changes must be made in `src/styles/**/*.scss`.
- CSS is not imported through Astro.
- The layout loads CSS with `/assets/css/style.css`.

Initial SCSS structure:

```txt
src/styles/
  style.scss
  foundation/
    _variables.scss
    _reset.scss
    _base.scss
  layout/
    _header.scss
    _footer.scss
    _breadcrumb.scss
  component/
    _heading.scss
    _text.scss
    _button.scss
    _card.scss
    _media.scss
    _hero.scss
    _section.scss
    _table.scss
    _form.scss
  page/
    _top.scss
    _sample.scss
```

Use this placement rule:

- Reused across multiple pages: `component/`
- Specific to one page: `page/`
- Unsure: start in `page/`, then move to `component/` after reuse appears

Do not create `utility/` by default. Add it only when utility classes such as `.u-hidden-sp` or `.u-mt-large` become necessary.

## Class Naming

Use BEM, kebab-case, and lightweight layer prefixes:

- `l-`: Layout
- `c-`: Component
- `p-`: Page
- `u-`: Utility, only when added later
- `js-`: JavaScript hook

Examples:

- `.c-header`
- `.c-footer`
- `.c-breadcrumb`
- `.c-button`
- `.c-button--primary`
- `.c-card`
- `.c-card__title`
- `.p-top-hero`
- `.js-accordion`

Do not make BEM overly strict. Readability for HTML coders is the priority.

## JavaScript

- The v2 source of client-side behavior is TypeScript under `src/scripts/`.
- Browser output remains JavaScript under `public/assets/js/`.
- Do not add new handwritten JavaScript source files or edit generated JavaScript directly.
- Do not introduce a bundler unless a real requirement needs it.

## Images

- Optimized page images live in `src/assets/img/`.
- Use `astro:assets` and `Image` for images that benefit from optimization.
- Prefer WebP output for optimized images.
- Use `public/assets/img/` for SVGs, images used directly from static JS/CSS, externally supplied assets, or images that should not be processed.

## Static Output

- Use directory-style URLs by default.
- Example: `/about/` outputs to `about/index.html`.
- Do not use `/about.html` style pages unless a project specifically requires it.


## GitHub Copilot Skills

Project Agent Skills live under `.github/skills/`.

- `astro-site-production`: end-to-end production workflow
- `astro-design-system`: Figma/design-system reconciliation
- `astro-implement`: Astro/SCSS/TypeScript implementation
- `astro-qa`: validation and repair loop
- `astro-release-review`: completion gate and PR readiness

Keep this file as project-wide rules. Detailed procedures belong in the Skills.

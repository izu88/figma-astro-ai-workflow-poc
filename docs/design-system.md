# Design System v2

## 目的

Figma Design SystemとAstro実装を同じ再利用単位で管理する。

```txt
Figma Variable
  ↕
CSS Custom Property

Figma Component
  ↕
Astro Component

Figma Variant
  ↕
Astro prop
```

Figma固有の名称・Code Connect mappingは、実Figma file/nodeをsource of truthとして確定する。コード側だけで推測して確定しない。

## Token

semantic tokenを正本とし、v1名は移行用aliasとして残している。

例:

```css
--color-text-default
--color-text-muted
--color-border-default
--color-surface-default
--color-surface-subtle
--color-brand-primary
--color-brand-primary-hover
--color-on-brand

--space-4
--space-8
--space-12
--space-16
--space-20
--space-24
--space-32
--space-40
--space-48
--space-64

--radius-sm
--radius-md
--radius-lg
```

新規componentで旧aliasを増やさない。

## Component hierarchy

```txt
src/components/
├─ base/
│  ├─ Heading.astro
│  ├─ Text.astro
│  └─ Button.astro
│
├─ patterns/
│  ├─ Breadcrumb.astro
│  ├─ Card.astro
│  └─ Media.astro
│
├─ sections/
│  ├─ Hero.astro
│  └─ Section.astro
│
└─ global/
   ├─ Header.astro
   └─ Footer.astro
```

階層は役割を説明するためのもので、component数が少ないうちは過度に細分化しない。

## Heading

```astro
<Heading as="h2" variant="border">
  見出し
</Heading>
```

- `as`: HTML文書構造
- `variant`: visual style

現時点のvariant:

- `default`
- `page`
- `section`
- `subsection`
- `border`
- `colored`
- `background`

Figma Library確定後、名称はFigma側と対応させる。

## Text

```astro
<Text variant="lead">
  リード文です。
</Text>
```

variant:

- `default`
- `lead`
- `muted`
- `label`
- `small`

## Button

link:

```astro
<Button href="/contact/" variant="primary">
  お問い合わせ
</Button>
```

button:

```astro
<Button type="submit" variant="primary">
  送信する
</Button>
```

`href` があれば `a`、なければ `button` を出力する。

variant:

- `default`
- `primary`
- `text`

## Card

```astro
<Card>
  <Heading as="h3" variant="subsection">タイトル</Heading>
  <p>本文です。</p>
</Card>
```

本文構造はslotで記述する。

## Media

```astro
<Media variant="image-right">
  <img slot="media" src="/assets/img/example.webp" alt="">

  <Heading as="h2" variant="border">見出し</Heading>
  <p>本文です。</p>
</Media>
```

variant:

- `image-right`
- `image-left`

## Hero / Section

ページ共通の幅・余白をcomponentへ閉じ込める。

```astro
<Hero>
  ...
</Hero>

<Section>
  ...
</Section>
```

`src/pages/**/*.astro` では、ページ固有の大きなlayout classを増やす前に既存Section/Patternで表現できないか確認する。

## 新規component判断

1. existing componentで表現できるか
2. existing componentへvariant追加で済むか
3. compositionで済むか
4. 新しいcomponentとして責務が明確か

順番は必ず:

```txt
existing
  ↓
extend
  ↓
create
```

## Code Connect

Code Connectは実Figma component/nodeが確定してから設定する。

2026-10-03時点で、現在接続中のFigma accountはStarter / Full seat。Figma公式のCode Connect利用条件はOrganizationまたはEnterpriseのDev/Full seatのため、このStarter workspaceではpublishしない。

実案件のFigma LibraryがOrganization / Enterpriseにある場合は、そのLibraryをsource of truthとしてCode Connectを設定する。Astro側はtemplate-file方式へ接続しやすいcomponent APIを維持する。

初期対象:

1. Heading
2. Button
3. Card
4. Media

Code Connect導入時も、Figma側に合わせるためだけにHTML semanticを壊さない。


## Global components

`Header` / `Footer` は `src/components/global/` に配置し、HTML担当者が追いやすいplain HTMLに近い実装を維持する。

HTML classは命名規則に合わせて `c-header` / `c-footer` を使用する。`l-` は `l-container` や `l-grid` のような内容に依存しない汎用レイアウトへ限定する。

`Breadcrumb` は再利用patternとして `src/components/patterns/Breadcrumb.astro` に配置する。

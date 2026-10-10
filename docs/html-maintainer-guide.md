# HTML担当者向け .astro 運用ガイド

## .astroの考え方

通常運用では、`.astro` を **HTML + 共通パーツタグ** と考える。

例:

```astro
<Section>
  <Heading as="h2" variant="border">
    サービスについて
  </Heading>

  <p>
    本文は通常のHTMLと同じように編集できます。
  </p>

  <Button href="/contact/" variant="primary">
    お問い合わせ
  </Button>
</Section>
```

新しく覚えるのは主に `Section`、`Heading`、`Button`、`Card`、`Media` などの共通パーツ名。

## 普段触る場所

主に:

```txt
src/pages/**/*.astro
```

ページ本文の:

- 見出し
- 本文
- link
- 画像
- list
- table
- Design System componentの組み合わせ

を編集する。

## 基本的に触らない場所

通常更新では以下を変更しない。

```txt
src/components/
src/layouts/
src/styles/foundation/
.github/
tsconfig*.json
astro.config.mjs
```

新しい見た目やcomponentが必要になった場合は、既存componentへvariant追加できるかを先に確認する。

## frontmatter

ファイル冒頭の `---` で囲まれた部分は、importやページ設定。

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Heading from "../../components/base/Heading.astro";

const meta = {
  title: "ページタイトル",
  description: "説明",
};
---
```

通常の本文変更だけなら触らない。

ページコピー時は既存ページを参考に:

- meta
- breadcrumbs
- bodyClass
- 必要なimport

だけ変更する。

## Heading

```astro
<Heading as="h2" variant="border">
  見出し
</Heading>
```

### as

HTMLとして何の見出しか。

```txt
h1
h2
h3
h4
h5
h6
```

### variant

見た目。

例:

```txt
border
colored
background
```

見た目のために `h2` を `h3` へ変更しない。

## Button

link:

```astro
<Button href="/about/">
  詳しく見る
</Button>
```

強調:

```astro
<Button href="/contact/" variant="primary">
  お問い合わせ
</Button>
```

form button:

```astro
<Button type="submit" variant="primary">
  送信する
</Button>
```

## Card

```astro
<Card>
  <Heading as="h3" variant="subsection">
    カードタイトル
  </Heading>

  <p>カード本文です。</p>
</Card>
```

中の本文は普通のHTMLとして編集する。

## Media

画像 + 本文:

```astro
<Media variant="image-right">
  <img slot="media" src="/assets/img/example.webp" alt="画像の説明">

  <Heading as="h2" variant="border">
    見出し
  </Heading>

  <p>本文です。</p>
</Media>
```

左右を変える場合:

```txt
variant="image-right"
variant="image-left"
```

## 禁止ではないが、通常ページでは使わないもの

通常のページ更新では以下を書かない。

- `fetch()`
- 複雑な `map()`
- JavaScript / TypeScript処理
- 深いobject props
- inline styleでの色・余白指定

必要な場合はcomponent側へ実装する。

## 迷ったとき

Design Systemにある見た目なら、まず既存component/variantを探す。

```txt
既存を使う
↓
variantを追加
↓
新規component
```

の順で考える。

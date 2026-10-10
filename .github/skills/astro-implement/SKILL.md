---
name: astro-implement
description: このリポジトリでAstro、SCSS、TypeScriptを使ってWeb UIを実装・改修する。HTML担当者が読めるpage.astro、Design System component、TypeScriptによるクライアント挙動の実装で使用する。
argument-hint: "[component / page / Issue]"
---

# Astro Implement

詳細規約: [implementation-conventions.md](./references/implementation-conventions.md)

## Component

- existing > extend > create。
- 再利用UIはAstro componentへ集約。
- propsは `variant`, `as`, `href`, `disabled` 等の単純API。
- 任意本文はslot優先。
- Figma VariantとAstro variantの意味を揃える。
- Reactは標準で使わない。

## Page

`src/pages/**/*.astro` はHTML担当者向けの公開APIと考える。

```astro
<Media variant="image-right">
  <Heading as="h2" variant="border">私たちについて</Heading>
  <p>本文です。</p>
  <Button href="/contact/" variant="primary">お問い合わせ</Button>
</Media>
```

複雑なmap/condition、API、深いobject props、長いpage scriptを避ける。

## TypeScript

- 新しいclient-side sourceはTypeScript。
- generated JSを直接編集しない。
- DOMのnull可能性を扱う。
- 理由のない `any` を避ける。
- bundlerは実要件が出るまで標準導入しない。

実装後は対象単位のcheckを行い、最後に `astro-qa` へ進む。

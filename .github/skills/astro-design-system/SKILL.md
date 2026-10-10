---
name: astro-design-system
description: Figma Design SystemとAstro実装を照合し、VariablesとCSS tokens、Components/VariantsとAstro components/props、Code Connectの対応を設計・レビューする。Figma MCP、Design System整備、variant追加判断で使用する。
argument-hint: "[Figma URL / component / 対象ページ]"
---

# Astro Design System

## 必須手順

1. Figma側のComponent / Variant / Variable / Auto Layoutを確認。
2. コード側の既存component / SCSS / CSS custom propertyを検索。
3. **existing > extend > create** の順で判断。
4. Figma propertyとAstro propの語彙を揃える。
5. Code Connectが使える場合は実装pathとproperty mappingを明示。
6. 実装後にFigmaとコードの対応を再確認。

## semanticとvisual

```astro
<Heading as="h2" variant="border">見出し</Heading>
```

- `as`: HTML semantic
- `variant`: visual style

見出しレベルと見た目を固定しない。

## Token

- Figma Variables ↔ CSS Custom Propertiesの意味を揃える。
- raw color / spacingを追加する前に既存tokenを探す。
- 何でもtoken化せず、再利用されるdesign decisionだけをtoken化する。

## Content API

長文・任意HTMLはslot優先。巨大なobject propsを避ける。

Figma情報へアクセスできない場合、「Figma準拠」と断定して新しいcontractを作らない。

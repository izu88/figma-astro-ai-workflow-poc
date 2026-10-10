---
name: figma-handoff-review
description: Figma MCPから取得したデザイン情報と現在checkout中のAstro実装を読み取り専用で照合し、Figma修正、コード対応、仕様判断に分類する実装前レビュー。
argument-hint: "[Figma URL / Node IDs / Handoff Inventory]"
---

# Figma Handoff Review — Astro PoC

**REVIEW_ONLY**。このSkill内ではFigma編集、コード修正、生成、commit/PR、依存追加、build、ブラウザ実行を行わない。

## 入力・根拠

1. Figma URL、対象Frame Node ID、viewport、Figma側Inventory/READYを確認する。
2. ローカルの実checkoutからrepo、branch、commit、既存の `src/components/`、`src/layouts/`、`src/pages/`、props/slots、SCSS tokenを読む。
3. Figma MCPのdesign contextを取得し、対象Nodeごとに取得可否を残す。接続不可なら `BLOCKED` とし、推測で補完しない。
4. FigmaのComponentやVariantが単独のAstroファイルになるとは決めつけない。既存コードのcompose/slot/propsも照合する。

## 分類

- `FIGMA_FIX`：設計側のComponent、Variant、情報構造や状態を修正する必要があるもの。
- `CODE_ACTION`：デザインは明確で、Astroのprops/slot、component、token、page側で対応すべきもの。
- `DECISION_REQUIRED`：編集範囲、レスポンシブ動作、素材、コンテンツなど設計から決められない事項。

各項目に `Evidence`（Figma Node ID・実Git refとパス）、`Expected`、`Owner`、`Next action` を付ける。

## 判定

```text
FIGMA HANDOFF READY: YES / NO / NOT_PROVIDED
FIGMA MCP: AVAILABLE / BLOCKED
Repository verification: VERIFIED / PARTIAL / BLOCKED
REVIEW READY: YES / NO / BLOCKED
```

- `YES`：MCP contextと実checkoutを照合し、未解決の必須デザイン修正/仕様判断がなく、コード対応が計画できる状態。まだ実装済みという意味ではない。
- `NO`：必須のFIGMA_FIXや意思決定が残っている状態。
- `BLOCKED`：MCPやcheckoutが取得できず判定できない状態。

`FIGMA_FIX`はFigma Agentに渡す修正依頼を文章化するのみ。自動送信や修正完了の宣言はしない。実装に進むのは `REVIEW READY: YES` の後だけ。詳細は `docs/figma-handoff-two-stage-contract.md` を参照。

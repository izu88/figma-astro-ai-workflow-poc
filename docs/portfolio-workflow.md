# ポートフォリオ：AI制作ワークフロー設計

## 目的と背景

課題は、Figmaの設計状態と実装コードの意味がずれることで確認・手戻りが発生すること、またAIによるコード生成を使っても既存コンポーネント再利用や品質チェックを見落としやすいこと。

このPoCでは「AIが全部自動化する」よりも、**設計・確認・実装・検証の境界を明文化する**ことを優先しました。

## ワークフローと担当

| 段階 | ツール・Skill | 主な入力 | 出力 |
| --- | --- | --- | --- |
| 設計整理 | Figma / `figma-naming-rules` / `figma-component-system` | 画面・UI部品・Variants | 命名・構造・UI状態 |
| Figma側Ready | `astro-ready` | Component/Variable/Auto Layout | Inventory、未確定事項 |
| 実装前レビュー | Figma MCP + `figma-handoff-review` | 対象Node / checkout済みAstro | FIGMA_FIX / CODE_ACTION / DECISION_REQUIRED |
| 実装 | `astro-site-production`, `astro-implement` | レビュー結果 | Astro/SCSS/TS、必要な再利用コンポーネント |
| 自動検証 | `npm run qa:agent` | ソースとSkills | build、Skill / contract / pilotテスト |
| ブラウザQA | Playwright/Chromium | 生成サイト | PC・SPの挙動・スクリーンショット |
| 完了 | `astro-release-review` | 実施した検証と差分 | 残課題・検証範囲を含む結果 |

## なぜゲートを分けたか

- Figma側の「Ready」はデザイン引き渡しの可否。既存Astroコードと一致した証拠ではない。
- 実装前レビューは読み取り専用。Figma側に戻すべきものとコード側で対応できるものを分ける。
- 既存部品を `existing → extend → compose → create` の順で利用する。
- build、HTML contract、実ブラウザの表示、Figma視覚一致は別々の根拠として報告する。

## 実装サンプル

架空ブランド「NAGI STUDIO」を題材にしたページ：

- `src/pages/pilot/index.astro`
- `src/pages/pilot/services/index.astro`
- `src/components/pilot/`（専用ヘッダー・フッター）
- `src/styles/page/_pilot.scss`

デザインとコードの対応だけでなく、パイロットで発見した表示差分の修正とPC/SPブラウザ検証が特徴です。

## 技術的なポイント

- Astroを静的HTML生成基盤として採用し、ページをHTML担当者が読めるように保つ。
- SCSSを編集元とし、TypeScriptから配信用JavaScriptを生成する。
- Component / Variant / Tokenの対応を既存UIの再利用単位で管理する。
- サンプルの自動テストには外部の非公開ツールを必要としない。

この成果物は**自主PoC**であり、実案件での工数削減率を主張するものではありません。

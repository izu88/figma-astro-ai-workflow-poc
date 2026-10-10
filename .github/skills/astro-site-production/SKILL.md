---
name: astro-site-production
description: Figmaや仕様からAstroサイト・ページを設計し、Design System照合、実装、ビルド、ブラウザ/視覚QA、修正、完了判定まで一気通貫で進める。新規ページ、改修、Figma MCP実装、制作Issueを完了まで進める依頼で使用する。
argument-hint: "[Figma URL / Issue / 実装内容]"
---

# Astro Site Production

Web制作タスク全体のオーケストレータ。途中の小さな実装判断では止まらず、検証済みの状態まで進める。

## Figma Handoff後のRepository検証ゲート

Figma Agentの`ASTRO READY: YES`は**デザイン側のFIGMA HANDOFF READY**。コードが存在する／一致したという証拠ではない。

Figma MCPからURL・Node ID・Inventoryを取得したら、[figma-handoff-review](../figma-handoff-review/SKILL.md) を実行して **REVIEW READY** を通してから、`docs/figma-handoff-two-stage-contract.md`の**第2ゲート**に従う。実際のcheckout/refで`src/components`、`src/layouts`、`src/pages`、props/slots、tokenを検証し、FigmaのHeader/Footer/Logoと全Sectionを対応付ける。**Figma部品1個につき独立`.astro`ファイル1個と決めつけない**。

`Repository verification: VERIFIED/PARTIAL/BLOCKED`、実際のGit ref・パス・QA証跡が揃うまで`IMPLEMENTATION READY: YES`にしない。

## 必須フロー

1. **Discovery**
   - repository tree、README、AGENTS.md、copilot instructions、package scriptsを確認。
   - 既存component/token/SCSS/TypeScript/QA資産を検索。
   - Figmaがある場合は利用可能なFigma MCPからdesign contextを取得し、取得できない情報を推測しない。
   - baseline buildを確認。

2. **Figma Handoff Review（Figma画面を使う案件では必須・実装前）**
   - [figma-handoff-review](../figma-handoff-review/SKILL.md) を**読み取り専用**で実行。Figma MCPの対象Frameと実際のGit ref・既存Component/props/slots/tokenを照合。
   - FIGMA_FIX / CODE_ACTION / DECISION_REQUIREDに分類。Figma修正が必要ならFigma Agent用の修正依頼を作成し、修正後のMCP contextを再監査する。
   - `REVIEW READY: YES`になるまで実装に進まない。`NO`は修正/意思決定、`BLOCKED`は接続の回復を優先する。Figma側の`READY`はコード側確認の代わりにならない。

3. **Plan**
   - 変更を token / component / pattern / section / page / behavior / docs / Code Connect に分類。
   - 新規作成前に既存実装を検索。

4. **Design System**
   - [astro-design-system](../astro-design-system/SKILL.md) に従う。
   - existing > extend > create。

5. **Implementation**
   - [astro-implement](../astro-implement/SKILL.md) に従う。
   - token → base component → pattern → section → page → behavior の順を基本にする。

6. **Incremental validation**
   - 大量変更後に初めて検証しない。component/page単位でcheckする。

7. **Full QA**
   - [astro-qa](../astro-qa/SKILL.md) に従う。

8. **Repair loop**
   - コード起因の失敗は原因特定 → 修正 → 再検証。
   - 外部blocker以外では失敗状態を完了扱いにしない。

9. **Completion**
   - [astro-release-review](../astro-release-review/SKILL.md) で完了条件を確認。
   - 実施した検証・既知差分・未検証事項を報告。

詳細: [workflow.md](./references/workflow.md)

## 人へ確認する条件

Figmaと仕様の矛盾、ブランド方針変更、Design Systemの大分類変更、本番公開、破壊的データ変更など genuine decision fork のみ。通常のTypeScript/SCSS/HTML実装判断では止まらない。

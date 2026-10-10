# Figma → Astro 2段階のReady判定

## 原則

**Figma AgentのReadyと、VS Code側の実装Readyは異なるものです。**

| 工程 | 正本・確認対象 | 判定 |
| --- | --- | --- |
| Figma側 | Component / Variant / Variable / Frame / UI状態 / 意味づけ | `FIGMA HANDOFF READY` |
| 実装前レビュー | Figma MCP context + checkout済みGit ref + Astro components / props / slots / token | `REVIEW READY` |
| 実装とQA | 実コード、build、契約テスト、デスクトップ・モバイルのブラウザ検証 | `IMPLEMENTATION READY` |

## 役割分担

1. **Figma Agent** — `figma-naming-rules`、`figma-component-system`、`astro-ready` で設計を整理する。コードの存在は証明しない。
2. **VS Code + Figma MCP** — `.github/skills/figma-handoff-review/SKILL.md` で、対象Frameと**実checkout**の対応を読み取り専用で確認する。
3. **Astro実装** — `astro-site-production` → `astro-design-system` → `astro-implement` の順に、既存部品の再利用を優先して進める。
4. **品質検証** — `astro-qa` → `astro-release-review`。build成功だけをFigmaの視覚一致とはみなさない。

## レビュー時の分岐

- `FIGMA_FIX` — Figma構造の修正案を文章として返し、再度MCPで確認する。
- `CODE_ACTION` — Figmaは変更せず、Astroの修正・実装計画に入れる。
- `DECISION_REQUIRED` — 仕様の決定者へ選択肢と影響を提示する。

Figma MCPが利用できない、対象Nodeが取得できない、Gitの実際のrefが確認できない場合は、証拠が不足しているため `BLOCKED` または `PARTIAL` として記録する。

## このPoCの制約

Figma Agent内でCustom Skillsを一貫して自動実行したという証拠はありません。Figma MCPを介した構造調査、Astro側でのパイロット実装・テスト実績と区別しています。

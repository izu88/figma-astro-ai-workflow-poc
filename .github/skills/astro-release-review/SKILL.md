---
name: astro-release-review
description: Astroサイト変更の最終完了判定を行い、実装規約、Design System再利用、QA結果、既知制約、Git差分を確認してPR準備を整える。実装完了後、PR作成前、Issue完了前に使用する。
argument-hint: "[branch / Issue / PR]"
---

# Astro Release Review

## Completion Gates

以下を満たして初めて完了扱いにする。

- [ ] 要求仕様を満たす
- [ ] build成功
- [ ] TypeScript / SCSS / Astro blockerなし
- [ ] 主要browser flow確認
- [ ] console blockerなし
- [ ] PC/SP重大崩れなし
- [ ] semantic / accessibility重大問題なし
- [ ] Figmaがある場合visual difference確認
- [ ] existing component / token再利用ルール遵守
- [ ] generated CSS / JSを直接編集していない
- [ ] 不要なReact導入なし
- [ ] 必要なdocs更新済み
- [ ] 未検証・known limitationを明記

## Git

- mainへ直接commitしない。
- task branchを使用。
- commitは意味のある単位。
- PR本文へ変更概要 / 検証 / known limitationsを記載。
- CI failureがコード起因なら修正→再実行。

検証していない項目を検証済みとして扱わない。

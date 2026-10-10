# 検証結果と制限事項

## 確認されている事項

元の個人開発PoCで2026年10月10日までに記録された内容：

- Figmaで個人制作の2ページ（Home / Services）を設計し、MCPの `get_design_context` で両画面の情報を取得
- 既存のAstroコンポーネントを再利用して `/pilot/` と `/pilot/services/` を実装
- `qa:agent` を使用し、Skill検証、ビルド、コンポーネント契約、パイロットのHTML contractを確認
- GitHub ActionsのChromiumでPC（1280×900）・SP（390×844）の2ページを確認。各ページHTTP 200、必要アセット、H1、JS error・horizontal overflow、ページ間遷移をチェック
- 日本語フォント不足を発見してブラウザQA環境へNoto CJKを追加
- Figmaとのデスクトップ目視比較でMedia配置差を発見し、修正

本公開リポジトリは、元の個人開発履歴を含まない**独立スナップショット**です。CI結果はこの公開リポジトリで再実行して確かめてください。

## 未検証・非対応

- Figma Agent側のCustom SkillsをAgent UIから実行して全工程を自動で通した実績
- FigmaのSP専用画面との一致（SP専用Figma Frameが未作成）
- Figma画像と実装のピクセル単位の自動Visual Diff合格
- Code Connectによる実Figma Libraryとのpublish連携
- 本番案件での運用効果・工数削減率

## 実行方法

```bash
npm ci
npm run qa:agent
npm run dev
```

`npm run qa:agent` はSkill構造・build・HTML contractの範囲です。**ブラウザでの確認やFigmaとの視覚一致を代替しません。**

ブラウザQAのワークフロー: `.github/workflows/pilot-browser-smoke.yml`。独立リポジトリでのGitHub Actions実行状況はActions画面で確認できます。

## 公開版の境界

本リポジトリには個人制作のサンプルと汎用スキルのみ収録しています。非公開の実案件向けツール・社内資料は含めず、元リポジトリのコミット履歴も複製していません。

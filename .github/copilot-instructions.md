# Astro Simple Template — GitHub Copilot Instructions

このリポジトリは、Figma Design Systemと同期しやすく、HTML/CSS中心の運用担当者にも読める静的Web制作基盤を目指します。

## 技術方針

- Astroを静的サイト基盤・コンポーネント実装層として使う。
- スタイルはSCSS。生成済み `public/assets/css/style.css` を直接編集しない。
- クライアント側ロジックの編集元はTypeScriptへ統一する。新しい手書きJavaScript sourceを追加しない。
- Reactは標準依存にしない。Astro + TypeScriptで明確に不足する場合だけ導入する。
- 静的HTML納品時の見通しを維持する。

## ページ可読性

- `src/pages/**/*.astro` はHTML/CSS中心の担当者が読めることを最優先する。
- 複雑な `map()`、条件分岐、API処理、深いobject propsをページへ持ち込まない。
- 再利用UIの複雑さはcomponentへ閉じ込める。
- 本文はslotまたは通常HTMLを優先する。
- semanticとvisualを分離する。例: `as="h2"` と `variant="border"`。

## Design System

- 再利用UIは `existing > extend > create` の順で判断する。
- Figma Component / Variant / VariableとAstro component / prop / CSS tokenの語彙を可能な限り揃える。
- Code Connectされた既存実装がある場合はraw HTMLの再生成より既存実装を優先する。
- tokenを迂回するraw color / arbitrary spacingの追加を避ける。

## AI作業

複数工程のタスクでは `.github/skills/` のAgent Skillsを使う。Figma画面を伴う実装は **`figma-handoff-review`による読み取り専用の実装前照合 → REVIEW READY: YES → 実装Skill** の順序を守る。Figmaへ差し戻すのはFIGMA_FIXのみ。コード起因のbuild/QA失敗は、報告だけで止めず修正→再検証まで進める。

- `figma-handoff-review`（Figma MCPと既存コードの実装前レビュー／変更禁止）
- `astro-site-production`
- `astro-design-system`
- `astro-implement`
- `astro-qa`
- `astro-release-review`

## Git

- mainへ直接変更しない。
- task branchを使う。
- PR前に少なくとも `npm run qa:agent` を実行する。
- 外部ツールが必要なQAを実行できない場合は未検証項目を明示する。

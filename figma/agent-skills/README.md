# Figma Agent Skills

Figma Agentへ登録するCustom SkillsのGit正本。

FigmaのCustom Skillは単一Markdownファイルとして登録するため、このディレクトリの各 `.md` は単独で完結するように管理する。

## Skills

### `figma-naming-rules.md`

汎用のFigma → HTML/CSS整理Skill。

担当:

- BEMを意識した命名
- Frame / layer整理
- Component共通化
- Variant整理
- Text Style
- JS hook / state
- PC/SP別要素

Astro以外の案件でも利用可能。

### `figma-component-system.md`

フレームワーク非依存のComponent / Instance / Variant整理Skill。

担当:

- 重複UI検出
- Main Component作成
- 既存配置のInstance化
- Variant / Component Set整理
- Component Property整理
- Auto Layoutの安全な整理
- visual regression確認

Astro / Drupal / WordPress / 静的HTMLで共通利用できます。

### `astro-ready.md`

`figma-astro-ai-workflow-poc` 専用のhandoff Skill。

担当:

- Figma Component ↔ Astro Component
- Figma Variant ↔ Astro props
- Variables ↔ CSS semantic tokens
- Auto Layout / MCP readability
- ASTRO READY判定

Local Figma MCPへ渡す前の最終監査として利用する。

## 2段階Ready：Figma AgentとCopilotの役割

技術別`-ready`は**Figma内の構造・Token・UI状態・情報役割だけを監査**する。GitHubリポジトリに接続できることは前提にしない。

- Figma Agent：`FIGMA HANDOFF READY: YES/NO` とInventory。既存コードは**未確認**として渡す。
- VS Code + Copilot + Figma MCP：実際のrepo tree・既存Componentとマッピングし、build/browser QAを実行して`IMPLEMENTATION READY`を判定する。
- Ready Skillで「監査のみ」を選んだ場合は**完全一致するVariable bindも禁止**。Figmaの変更0件と明記する。
- [共通Handoff／コード側検証契約](../../docs/figma-handoff-two-stage-contract.md)

この公開版で扱うのはAstro向けの`astro-ready`です。Figma Agent側に登録する場合はGit上のルールとバージョンを一致させます。

## 推奨フロー

```txt
Figmaでデザイン
    ↓
/figma-naming-rules
    ↓
/figma-component-system
    ↓
デザイン調整
    ↓
/astro-ready
    ↓
FIGMA HANDOFF READY: YES（デザイン側のみ）
    ↓
Figma Desktop Local MCP
    ↓
VS Code + GitHub Copilot
    ↓
実際のRepositoryと既存Componentの照合
    ↓
figma-astro-ai-workflow-poc /astro-site-production
    ↓
IMPLEMENTATION READY: YES（build / browser QA後）
```

## Skill間の優先順位

複数Skillが同じ対象について異なる判断を示す場合:

1. Component Set名
2. Variant property名
3. Variant value
4. Variable名
5. Astro mapping

は `astro-ready` を優先する。

内部レイヤー・HTML class想定・JS hook・state命名は `figma-naming-rules` を優先する。

Component化・Instance化・一般的なVariant設計は `figma-component-system` が担当し、Astro固有のComponent Set名・Variant contractは最終的に `astro-ready` を優先する。

例:

```txt
Figma Component Set:
Button

Figma Variant:
Style=Primary

Astro:
<Button variant="primary">

HTML:
c-button c-button--primary
```

## Figma Agentへの登録

Figma公式のCustom Skillは単一のMarkdownファイルをuploadできる。

登録:

1. Figma Agentのchatでprompt boxを開く
2. `Skills`
3. `Add skill`
4. `Upload a file`
5. このディレクトリのMarkdownを選択
6. name / description / instructionsを確認
7. `Add`

Figma Agent上で手修正した内容だけを正本にしないこと。

変更時:

```txt
GitのMarkdownを修正
↓
commit / review
↓
Figma AgentのSkillを更新
```

## Versioning

各Skill本文の `Skill version` をGitで管理する。

`figma-naming-rules` / `figma-component-system` は汎用ルール変更時にversionを更新する。

次の変更を行った場合は `astro-ready.md` もレビューする。

- Astro Component追加/削除
- variant追加/変更
- props API変更
- CSS semantic token追加/変更
- Figma ↔ Astro naming変更
- handoffルール変更

## 注意

Figma Custom Skillsは `scripts/`、`references/`、`assets/` のようなoptional directoryを同梱できないため、Figma Agentへ渡すSkill本体は1ファイルで完結させる。

Git側ではこのREADMEやコード側docsを併設してよいが、Skill実行時に必須なルールは各Skill Markdown自身へ含める。

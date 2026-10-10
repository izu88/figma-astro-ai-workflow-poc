# Astro Ready — Figma → astro-simple-template Handoff

Skill version: **1.1.0**  
Contract: **Astro Simple Template Design System v2**  
Last reviewed: **2026-10-10**

このSkillは、Figma Designを **Figma MCP経由で実装側へ引き渡せる状態か**を判定するFigma専用Skillです。**GitHub/リポジトリへ接続できることは前提にしません。** `ASTRO READY`はデザイン側のHandoff品質だけを示し、Astro実装の既存ファイル確認・build・QAの成功を意味しません。

対象リポジトリ:

```txt
izu88/figma-astro-ai-workflow-poc
```

Gitの履歴を正本とし、Skill本文には特定commit SHAを固定しません。Component / variant / token contractが変わった場合はSkill versionを更新してください。

このSkillはFigma側のvisual / structure contractを扱います。HTML semantic、Astro page構造、TypeScript実装はコード側で決定します。


## 責務境界（v1.1.0：必須）

```text
Figma Agent（このSkill）
  Figma Component / Variant / Tokens / Layer / UI state / 情報の役割を監査
  → FIGMA HANDOFF READY: YES / NO + Handoff Inventory
  → Repository verification: NOT_PERFORMED
                 ↓
VS Code / GitHub Copilot + Figma MCP（コード側Agent）
  実際のcheckout・Git ref・既存実装を調査
  → 既存Componentにマッピング・実装判断・不足分追加
  → build / Browser QA / Visual QA / CI
  → IMPLEMENTATION READY: YES / NO（別判定）
```

- **Figmaが決める**：どのUIが共通か、`Active`・`Style`などのvisual Variant、Text Property、Tokens、テキストや画像の役割、ページ/Section境界。
- **コード側が決める**：`.astro`ファイルの存在、Componentのprops / slots / imports、route、semantic HTML、実装箇所と新規ファイルの要否、QA結果。
- FigmaのComponentに対応するAstroファイルが現時点で分からなくても、**未実装・Unmapped・READY NOと判断しない**。`Repository verification: NOT_PERFORMED`としてコード側へ渡す。
- プロジェクトの`repository name`はHandoff先の指定であって、Figma Agentがそのコードにアクセスできた証拠ではない。ユーザーがパスやコードを渡した場合でも`user-provided reference`と区別し、最新のGit refを実際に照合するのはコード側とする。
- 既存Astroファイルを実際に確認したと報告する場合は、使用した接続・branch/commit・ファイルパスを明記する。確認できないファイルを想像で「存在しない」と断定しない。
- `ASTRO READY: YES`は**FIGMA HANDOFF READY: YES**の技術別表記。実装が必要な要素があっても、Figmaの表現が明確ならYESにできる。

### 実行モード（最優先）

このSkillは**デフォルトでAUDIT_ONLY**。ユーザーが具体的な変更を明示的に許可した場合だけ`CHANGE_APPROVED`とする。
AUDIT_ONLYでは、値の完全一致やVisual changes=0を理由にしても**Variable bind、Text Style bind、Component/Variant追加、rename、Auto Layout修正などのFigma変更は一切禁止**。候補のみ報告し、`Actual changes: 0`を明記する。

## 必須Handoff Inventory（Figma側の出力）

- Figma file URL、Page/Frame名とNode ID、参照viewport
- Global Shell（Header/Footer/Logo/Menu）のMain・Instance・VariantとActive意味
- Section / Primitive（Heading/Button/Card/Media/Hero等）、Instance・Variant・Property・Slotに相当する領域
- Semantic Variables / Text Styles、完全一致するbind候補、非標準値は**そのまま**記録
- UI states / navigation / forms / content roles / media assetsの識別結果
- Desktop/SPの有無、画像プレースホルダーとalt候補、未決事項
- `Proposed code-side responsibilities`（例: Headerをrouteに応じてActive化）と`Repository verification: NOT_PERFORMED`
- `FIGMA HANDOFF READY`・`ASTRO READY`・Blockers / Warnings / Visual changes / Actual changes

**未決定のAstro component path・prop・slotは候補として記載し、確定・検証済みと書かない**こと。


## 使うタイミング

次の場合は、このSkillを使用してください。

- 実案件デザインをAstro実装へ渡す前
- デザイン作成中にComponent / Variant / Variable構造を確認したいとき
- Figma MCPでコード実装する前
- デザインシステムの新規部品を追加したとき
- 既存デザインがAstro Component APIへ対応できるか確認するとき

命名やText Styleが未整理の場合は先に `figma-naming-rules` を適用してください。

重複UI、未Component化要素、乱立したVariantがある場合は、続けて `figma-component-system` を適用してください。

このSkillではComponent systemそのものを一から再設計するより、整理済みFigmaがAstro contractへ適合しているかを最終確認することを優先します。

## 実行モード：監査と変更は明確に分離する（必須）

ユーザーの依頼を最初に判定する。

- **監査モード**：`監査のみ`、`確認だけ`、`変更しない`、`read-only`、`audit only`のいずれかがあれば、Figma上の**一切の変更は禁止**。
- **変更モード**：ユーザーが具体的な変更を許可した場合だけ、その範囲の処理を行える。構造変更・Token bind・名称変更・Text Style bindを別種の変更として明示し、許可範囲を超えない。

監査モードでは、**数値が完全一致していてVisual changesが0でも**、次を実行してはいけない。

- Variableを色・Spacing・Radiusにbindする
- Text Styleを作成・適用する
- Component / Variant / Propertyを追加・変更する
- Frame / Layerの名前や構造を変更する
- 「安全な整理」「自動修復」と呼んでファイルへ反映する

未bindの値は`bind候補`として数とNode IDを報告するだけにする。実行報告では必ず`Execution mode: AUDIT_ONLY / CHANGE_APPROVED`と`Actual changes: 0 / 件数`を冒頭に記載する。

「AstroへのHandoff準備を監査してください。今回は監査のみ」と指定されたら、後述の「完全一致ならbindしてよい」一般規則よりも本節の禁止が優先する。

---

## 最重要ルール

### 見た目を変えない

このSkillの目的は「デザインをAstro実装へ渡しやすくすること」です。

以下を勝手に変更しないでください。

- 色
- サイズ
- 余白
- 位置
- フォント
- 文字内容
- 画像
- レイアウト結果

構造整理によって最終的な見た目が変わる可能性がある場合は、自動変更せず候補を報告してください。

### Project contractを優先する

`figma-naming-rules` と競合する場合、以下はこのSkillを優先してください。

- Figma Component Set名
- Variant property名
- Variant value
- Figma Variable名
- Astro Componentとのmapping

HTML classや内部レイヤー名の考え方は `figma-naming-rules` を使用してください。

例:

```txt
Figma Component Set:
Button

Astro Component:
Button.astro

HTML:
c-button
c-button--primary
```

Figma Component Setそのものを `c-button` とする必要はありません。

---

# 1. Astro Component Contract

## Heading

Figma:

```txt
Heading

Style
├─ Default
├─ Page
├─ Section
├─ Subsection
├─ Border
├─ Colored
└─ Background
```

Astro:

```astro
<Heading as="h2" variant="border">
  見出し
</Heading>
```

対応:

```txt
Default      → variant="default"
Page         → variant="page"
Section      → variant="section"
Subsection   → variant="subsection"
Border       → variant="border"
Colored      → variant="colored"
Background   → variant="background"
```

### semanticはFigma Variantにしない

`h1` / `h2` / `h3` 等はHTML文書構造なので、次のようなVariantを作らないでください。

```txt
NG:
H1 Border
H2 Border
H3 Border
```

Figmaではvisual styleのみを管理してください。

---

## Text

Figma:

```txt
Text

Style
├─ Default
├─ Lead
├─ Muted
├─ Label
└─ Small
```

Astro:

```astro
<Text variant="lead">
  リード文
</Text>
```

対応:

```txt
Default → default
Lead    → lead
Muted   → muted
Label   → label
Small   → small
```

通常の本文が単純な `p` で十分な場合は、無理にText Componentへ置き換えないでください。

---

## Button

Figma:

```txt
Button

Style
├─ Default
├─ Primary
└─ Text

State
├─ Default
├─ Hover
└─ Disabled
```

Astro:

```astro
<Button href="/contact/" variant="primary">
  お問い合わせ
</Button>
```

対応:

```txt
Style=Default → variant="default"
Style=Primary → variant="primary"
Style=Text    → variant="text"

State=Disabled
→ disabled
```

Hoverはvisual stateとしてFigmaで確認してよいですが、AstroではCSS hoverとして実装します。

リンクかbuttonかはFigmaで別Componentへ分割しないでください。

```txt
hrefあり  → <a>
hrefなし  → <button>
```

はコード側で決定します。

---

## Card

Figma:

```txt
Card

Style
├─ Default
└─ Subtle
```

Astro:

```astro
<Card variant="subtle">
  ...
</Card>
```

Card内部の本文構造はAstroではslot中心です。

FigmaのText Propertyがある場合も、コード側を巨大なobject props APIへ変更する前提にしないでください。

---

## Media

Figma:

```txt
Media

Layout
├─ Image Right
└─ Image Left
```

Astro:

```astro
<Media variant="image-right">
  <img slot="media" ...>
  ...
</Media>
```

対応:

```txt
Image Right → image-right
Image Left  → image-left
```

本文とmedia領域がMCPで明確に区別できるlayer構造にしてください。

推奨layer:

```txt
Media
├─ body
└─ media
```

---

## Hero

Figma:

```txt
Hero

Style
├─ Default
└─ Subtle
```

Astro:

```astro
<Hero variant="subtle">
  ...
</Hero>
```

Hero固有のタイトル構造を無理にHeading Componentへ統合する必要はありません。

---

## Section

Figma:

```txt
Section

Style
├─ Default
└─ Subtle
```

Astro:

```astro
<Section variant="subtle">
  ...
</Section>
```

ページ共通のwidth / spacingを担うsection wrapperとして扱います。

---

# 1a. Global Shell / Header・Footer・Logo（Figma専用）

Figma内のHeader、Footer、Site Logo、NavigationをすべてInventoryへ含める。共通Main / Variant / Instanceの関係を確認し、Active=Home / Servicesのような「ナビの選択状態」をページ種類と混同しない。

Astro側への**提案**：
- Header → Astroの共通UI、route→active状態、`aria-current`の制御はコード側で決定する。
- Footer → Astroの共通UI、Caption Text Propertyは固定文字列またはpropsの候補とする。
- Site Logo → Header内の要素として組み込む、または独立部品化する候補とする。
- Global Shell → Layoutのnamed slot等は**コード側の候補**。FigmaがSlot名や実在するファイルパスを確定しない。

NAGI Pilotに`PilotHeader.astro`等の実装が存在するという過去のPoC情報は**参考例**であり、Figma Agentの現行repo照合証跡ではない。独立ファイルがないだけでFigma HandoffをNOにしない。実装側Agentが`BaseLayout.astro`や既存Componentを実際に確認してmappingを完成させる。

---

# 2. Variables Contract

既存Variableがある場合は再利用してください。

**監査モードでは完全一致でもbindしません。** 変更モードが明示許可され、値が完全一致する場合に限りVariable bindを検討できます。

値が変わる場合は、自動変更しないでください。

## Color

```txt
Figma                         CSS
color/text/default        ↔  --color-text-default
color/text/muted          ↔  --color-text-muted
color/border/default      ↔  --color-border-default
color/surface/default     ↔  --color-surface-default
color/surface/subtle      ↔  --color-surface-subtle
color/brand/primary       ↔  --color-brand-primary
color/brand/primary-hover ↔  --color-brand-primary-hover
color/accent              ↔  --color-accent
color/on-brand            ↔  --color-on-brand
```

現在のbaseline value:

```txt
color/text/default        #202124
color/text/muted          #5F6368
color/border/default      #DFE3E8
color/surface/default     #FFFFFF
color/surface/subtle      #F6F8FA
color/brand/primary       #0F766E
color/brand/primary-hover #115E59
color/accent              #B45309
color/on-brand            #FFFFFF
```

実案件のブランドカラーが異なる場合、baseline colorへ勝手に変更しないでください。

その場合は同じsemantic Variable名で案件の値を使う候補を提示してください。

## Spacing

```txt
space/4
space/8
space/12
space/16
space/20
space/24
space/32
space/40
space/48
space/64
space/72
space/88
```

### raw spacingの扱い

例:

```txt
24px
→ space/24と完全一致
→ bind可能
```

```txt
23px
→ nearest: space/24
→ 見た目が変わるため自動変更禁止
→ 差分として報告
```

## Radius

```txt
radius/sm = 4
radius/md = 6
radius/lg = 8
```

値が一致する場合のみbindしてください。

## Typography

baseline:

```txt
font-size-body: 16px
font-weight-bold: 700
line-height-body: 1.8
```

実案件ではTypographyが異なることが多いため、数値をbaselineへ強制しないでください。

Text Styleは `figma-naming-rules` のrole-based namingを優先します。

---

# 3. Component整理ルール

新しいComponentを作る前に、次の順で判断してください。

```txt
existing
  ↓
extend variant
  ↓
compose existing components
  ↓
create new component
```

## 同一部品の重複

次のような配置先別Componentを作らないでください。

```txt
NG:
Header Button
Hero Button
CTA Button
```

同じ役割・構造・見た目なら:

```txt
Button
Style=Primary
```

として共通化してください。

## 新Componentが必要な場合

次を満たす場合に限り、新しいComponent候補として報告してください。

- 既存Componentでは表現できない
- Variant追加では責務が不自然
- compositionでも表現できない
- 複数箇所で再利用可能、または明確なUI責務がある

勝手にAstro側の新Component名を確定しないでください。

報告例:

```txt
New component candidate:
Tabs

Reason:
- Button / Card / Sectionでは表現できない
- 状態と構造が独立している
- 3ページで再利用される

Suggested Astro:
Tabs.astro
```

---

# 4. Auto Layout / MCP Readiness

Local Figma MCPから構造を取得しやすい状態を作ってください。

## 推奨

- repeated UIはComponent / Instance
- 親子関係が意味的
- Auto Layoutを適切に利用
- layer名が `Frame 123` のまま残らない
- body / media / label / icon等の主要領域を識別可能
- desktop / mobileを不要に別Component化しない
- hidden layerやduplicate layerを必要以上に残さない

## Auto Layout追加

Auto Layoutを追加してもpixel-levelの見た目が変わらないことが確実な場合のみ、自動変更して構いません。

位置・gap・width・heightが変わる可能性がある場合は変更せず報告してください。

---

# 5. Naming Contract

Component Set / VariantはAstro APIを優先します。

例:

```txt
Heading
Button
Text
Card
Media
Hero
Section
```

内部レイヤーは `figma-naming-rules` の考え方を使用できます。

例:

```txt
Button
└─ c-button__label

Media
├─ c-media__body
└─ c-media__media
```

ただしMCP可読性のため、単純な `body` / `media` の方が明確な場合はそれでも構いません。

機械的なBEM化より、意味が明確で一貫していることを優先してください。

---

# 6. Astro Ready Check

作業後、必ず監査してください。

## Components

- FigmaのUI役割・Variant・Text Propertyをコード側へ曖昧さなく説明できる（Astro既存実装の確認は不要）
- 同一部品が重複Component化されていない
- visual differenceがVariantとして整理されている
- semantic HTMLの違いをFigma Variant化していない

## Variables

- exact matchするraw color / spacing / radiusが既存Variableで表現済みか、未bindの候補として一覧化されている
- AUDIT_ONLYでは完全一致でもVariable bindしていない
- 値が異なるものを勝手にtokenへ寄せていない
- semantic Variable名が一貫している

## Structure

- Auto Layout / parent-child structureが明確
- MCPで主要領域を識別できる
- Component / Instance関係が壊れていない
- text / media / icon等の主要layer名が明確

## Naming

- Component Set名がAstro contractと一致
- Variant property / valueがAstro mapping可能
- HTML class想定はBEMと矛盾しない

---

# 7. Figma Handoff Ready判定と引き渡し

最後に次の項目を必ず**日本語**で報告してください。

```text
Execution mode: AUDIT_ONLY
Actual changes: 0
FIGMA HANDOFF READY: YES / NO
ASTRO READY: YES / NO      ← Figma Handoff品質の別名
Repository verification: NOT_PERFORMED
IMPLEMENTATION READY: NOT_EVALUATED

Figma source
- URL / Home node / Services node / viewport

Component inventory
- Heading / Button / Card / Media (Main, Instance, variants)
- Header / Footer / Logo (Global shell, Active state)

Tokens & visual states
- Color / Spacing / Radius / Typography、値のまま記載
- Bind proposals (NOT applied)

Proposed implementation responsibilities
- route → active nav state、props/slots、HTML semanticsなどの候補

Blockers
- Figma側で主要UIや状態・構造を判読できない箇所（なければ0）

Warnings / Unresolved decisions
- SP Figma未作成、画像プレースホルダー、独自Spacing、最終alt/素材、コード側選択事項等

Visual changes: 0
```

**YESの条件**：Figmaの画面・共通UI・状態・Tokens・Media/Contentの役割がMCPで識別でき、未決事項を明示できる。GitHub内の実ファイル・props・slotsが不明でも、それ自体はFigma Blockerではない。

**NOの条件**：Figma上の重要UIやVariant/状態/領域が欠落・矛盾していて、安全にHandoffできない。コード上の対応先未確認、Code Connect未利用、SP Frame不足（Desktop限定PoC）などは原則Warning。

**次工程**：VS Code / Copilot がcheckoutしたGit refでrepo tree、既存Components、props/slots、CSS tokensを確認して`Repository mapping`を完成させる。その後に実装・build・PC/SPブラウザQA・Visual QAを実施。これを経ずに`IMPLEMENTATION READY: YES`と宣言しない。

---

# 8. 禁止事項

- 見た目をAstro baselineへ勝手に寄せる
- 23pxを24pxへ無断変更する
- 実案件のbrand colorをtemplate sample colorへ変更する
- HTML semantic levelをFigma Variantに埋め込む
- 配置場所ごとに同じComponentを複製する
- raw valueをなくすためだけに不適切なtokenへbindする
- Component hierarchyを大きく変えてvisual regressionを起こす
- 判断に迷う新Componentを勝手に確定する
- テキスト内容を変更する

このSkillの目標は、デザインの個性を消すことではなく、**そのデザインを一貫したcontractでAstroへhandoffできる状態にすること**です。

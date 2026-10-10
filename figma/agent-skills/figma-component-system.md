# Figma Component System

Skill version: **1.0.1**  
Last reviewed: **2026-10-10**

このSkillは、Figma内の繰り返しUIを安全にComponent / Instance / Variantへ整理し、再利用可能なDesign System構造にするための汎用Skillです。

Astro、Drupal、WordPress、静的HTMLなど特定の実装基盤には依存しません。

## 目的

次の状態を作ります。

```txt
重複Frame / Group
        ↓
共通構造を検出
        ↓
Main Component
        ↓
既存配置をInstance化
        ↓
見た目・状態差をVariant化
        ↓
Component Set
        ↓
visual regression確認
```

単に「見た目が似ている」だけでComponent化しないでください。

## 使うタイミング

- デザイン作成中に同じUIが増えてきたとき
- handoff前にComponent構造を整理したいとき
- Button / Card / Heading / Navigationなどが複製Frameになっているとき
- Variant候補が別Componentとして乱立しているとき
- 実装前にDesign Systemとして再利用可能か確認したいとき

命名が荒れている場合は先に `figma-naming-rules` を使ってください。

project-specificな命名・Variant contractがある場合は、最後に `astro-ready` や `drupal-ready` 等で適合確認してください。

## 最重要ルール

### 見た目を変えない

Component化・Instance化・Variant化の前後で、以下を維持してください。

- x / y配置
- width / height
- padding / gap
- color
- typography
- border / radius / shadow
- image crop
- text content
- visibility
- responsive用の別要素

構造変更によってpixel-levelの見た目が変わる可能性がある場合は、自動変更せず候補として報告してください。

### 過剰Component化しない

次だけを理由にComponent化しないでください。

- 現時点で偶然見た目が同じ
- 1回しか使われていない
- 役割が異なる
- 将来の変更単位が異なる
- 内部構造が大きく違う

---

# 0. 全ページ・全セクションの共通部品監査（必須）

**部分的にComponentを作成しただけで完了と報告しないこと。** handoff対象となる2画面以上を先に列挙し、各画面のトップレベルセクションを漏れなく監査してください。

## 0-1. 共通化の3階層を分けて評価

| 階層 | 例 | 判定基準 |
| --- | --- | --- |
| Global / Shell | Header、Footer、Navigation、Site Logo | 複数ページの同一役割ならMain ComponentまたはVariantで共有を優先。差分を確認せずFrameのまま見送らない |
| Section / Pattern | Hero、Card Grid、Media Section、FAQ | 共通レイアウト、構造、変更単位を比較。Props / Variants / Slotsで自然に表せる場合のみ共通化 |
| Primitive / Element | Heading、Button、Card、Media | 既存Component / Instanceを最優先で再利用。親SectionがFrameでも適切な構成となりうる |

**Section全体がFRAMEでも、その内部のHeading / Card / Mediaが共有Instanceなら、再利用が成立している。** 親SectionのComponent化を機械的に強制しないこと。ただしComponent化されていないGlobal / Shellや、未使用の既存共通部品を見逃さないこと。

## 0-2. 必ず出力するSection inventory

次の情報を**全ページの各セクション**について報告してください。

- Page / Section名、Figma Node ID、Frame / Component / Instanceの別
- 内部で使われる共通Main ComponentとそのVariant、Instance件数
- Parent SectionのComponent化判定：`Shared Component` / `Composed Frame (reuse OK)` / `Review required`
- 判定根拠：共通の役割・レイアウト・変更単位、編集されるテキスト/画像/リンク、状態差
- 共通化が望ましいのに未対応のGlobal UIを明記

`Shared Component`と`Composed Frame`をどちらも正しい結果として認める。UIの役割と将来の変更単位が異なるのに、単なる重複回数だけで強制統合しない。

## 0-3. Header / NavigationのActive状態の扱い（重要）

2ページ以上に同じHeaderが配置され、ナビゲーションの選択中項目だけが異なる場合、**アクティブ文字の太さ・Text Style・色が違うことだけを理由に共通化を見送ってはいけない。**

手順：

1. Global Headerを両画面から抽出し、寸法、Auto Layout、Logo / Navの構成、文字内容、Text Styleを比較する。
2. 差分が選択中項目のみであれば、単一Header Component Setと表示状態のVariant（例：`Active=Home` / `Active=Services`）を候補にする。ここで`Active`は**ナビゲーションの強調対象**を表し、「Homeページ用 / Servicesページ用」として別々の意味のComponentを作るためではない。
3. 両Variantで同一のHeader構造とLogo Instanceを使い、ホーム/サービスそれぞれの配置を該当VariantのInstanceへ置換する。
4. ナビ項目が増えたときの拡張性や実装側のRoute→Active状態変換を記録する。FigmaのVariantはルートそのものやCMSのContent Typeを決定しない。
5. 置換前後で両ページのHeader寸法・Nav文言・アクティブText Style・位置・ページ全高を比較し、スクリーンショットも確認する。

Active以外の構造差や、Component Propertyで安全に表現できない差は`Review required`として報告し、推測で見た目を変更しない。

## 0-4. Sectionの過剰Component化防止

- Hero：片方だけCTAがある場合、単なるページ名Variantは作らない。CTA visibilityやSlotが将来の共通変更単位なら設計候補、そうでなければ**Heading/Buttonの既存Instanceを内部再利用したFrame**でよい。
- Cards：見出し＋リード＋Card複数の繰り返しはSection候補。ただしテキスト、Card件数、gap、余白などの違いを確認し、Cardを含む共通Sectionが本当に保守単位になるかを判断する。Cardの既存Instanceを再利用していればFrameのままでも適切。
- Media：Image Right / Leftなどの状態は**Media ComponentのVariant**で持てる。外側の背景色や余白だけが共通のSection Frameなら、即座にComponentを重ねて増やす必要はない。
- Global Footer：同じ構成の複数配置がある場合、既存Main Componentがあれば再利用する。

---

# 1. Component候補の検出

以下を満たすUIを候補にしてください。

- 2箇所以上で再利用されている
- 役割が同じ
- 主要な内部構造が同じ
- 同じ変更単位として扱うのが自然
- 差分をVariant / propertyで説明できる

例:

```txt
Button A
Button B
Button C

共通:
- label
- padding
- radius
- interaction role

差分:
- background
- border
- text color

→ Button Component候補
```

## Component化しない例

```txt
News Card
Product Card
Profile Card
```

見た目が似ていても、構造・役割・更新単位が異なる場合は別Componentのままにしてください。

---

# 2. Main Component / Instance化

安全に共通化できる場合:

1. 最も標準的な要素をMain Component候補にする
2. Component化前の見た目とサイズを記録する
3. Main Componentを作成する
4. 同一部品の既存配置をInstanceへ置き換える
5. overrideが正しく保持されていることを確認する
6. placement / size / text / imageが変わっていないことを確認する

既存Main Componentがある場合、新規Componentを作らず既存を再利用してください。

## Instance化で保持するもの

- text override
- image override
- visibility
- icon
- link対象を示す命名
- layout position
- instance size

---

# 3. Variant化

同じComponentの差分として説明できるものはComponent Setへ整理してください。

## Variantに向く差分

- visual style
- UI state
- size
- orientation / layout
- icon有無
- emphasis level

例:

```txt
Button

Style
├─ Primary
├─ Secondary
└─ Text

State
├─ Default
├─ Hover
├─ Focus
└─ Disabled

Size
├─ Small
├─ Medium
└─ Large
```

## Variantにしない差分

HTML semantic、CMS entity type、ページ名など、visual componentとしての差ではないものをVariantにしないでください。

```txt
NG:
H1 / H2 / H3
About Page / Service Page
Article / Product
Drupal Block / Node
```

これらは実装側のsemantic / content modelで扱います。

---

# 4. Variant Propertyの設計

property名は「何が違うか」を説明する短い英語を使います。

推奨候補:

```txt
Style
State
Size
Layout
Direction
Icon
Emphasis
```

不要にpropertyを増やさないでください。

例:

```txt
NG:
Blue=True
Large=False
Left=True

OK:
Style=Primary
Size=Small
Layout=Image Left
```

project-specific Skillがproperty名を指定している場合は、そのcontractを優先してください。

---

# 5. Component Properties

必要な場合のみComponent Propertyを使ってください。

適した例:

- label text
- icon visibility
- optional badge
- swap可能なicon / media
- boolean visual option

任意の長文コンテンツを大量のpropertyへ閉じ込める設計は避けてください。

実装側でslot / children / field compositionとして扱う可能性があるため、Design Systemの再利用性を優先してください。

---

# 6. Auto Layout

Component化の過程でAuto Layoutを追加・整理して構いませんが、見た目が変わらない場合に限ります。

確認項目:

- width / height
- fixed / hug / fill
- padding
- gap
- alignment
- wrapping
- min/max相当の挙動
- nested Auto Layout

特に `HUG` への自動変更で高さ・幅がcollapseしないよう確認してください。

---

# 7. 重複Componentの統合

次のようなComponentがある場合:

```txt
Header Button
Hero Button
CTA Button
```

役割・構造・visualが同じなら1つのComponent Setへ統合候補としてください。

ただし、project-specific Skillで別Component contractが定義されている場合はそちらを優先します。

## 統合判断

```txt
同じ役割
+
同じ構造
+
差分がVariantで説明可能
+
将来も同じ変更単位
=
統合候補
```

1つでも不明なら自動統合しないでください。

---

# 8. Safe Auto-Fix / Review Required

## 自動変更してよい

- 明らかな完全重複UIのComponent化
- 同一Main ComponentへのInstance置換
- 見た目が完全一致するVariant統合
- 明確なVariant property名の整理
- visual resultを維持できるAuto Layout調整

## 確認が必要

- 1px以上のvisual差がある
- padding / gapが異なる
- typographyが異なる
- content structureが異なる
- 一方にだけelementがある
- 将来の変更単位が不明
- 既存Component APIを壊す必要がある
- Variant軸が複数の解釈を持つ

---

# 9. 検証

作業後、Main Componentと主要Instanceを比較してください。

確認:

- visual差分なし
- text保持
- image保持
- size保持
- Auto Layout崩れなし
- Instance override保持
- Variant切替で意図した差だけが変化
- duplicate Main Componentが残っていない

可能であれば変更前後をscreenshotで比較してください。

---

# 10. 作業後の報告

必ず以下を報告してください。

```txt
COMPONENT SYSTEM RESULT

Section inventory
- Home / Header: Shared Component (Active=Home)
- Services / Header: Shared Component (Active=Services)
- Home / Cards: Composed Frame (reuse OK, Heading+Card instances)
- Services / Cards: Composed Frame (reuse OK, Heading+Card instances)
- Home / Media: Composed Frame (reuse OK, Media Image Right)
- Services / Media: Composed Frame (reuse OK, Media Image Left)

Created components
- Button
  - 6 duplicated elements → 1 Main Component + 6 Instances

Created variant sets
- Button
  - Style=Primary / Secondary / Text
  - State=Default / Hover / Disabled

Reused existing components
- Site Logo
  - 2 elements → existing Site Logo instances

Not componentized
- Hero CTA
  Reason: structure differs from Button

Review required
- Card A / Card B
  Difference: padding 23px / 24px
  Action: unchanged

Visual changes
0
```

## 完了条件

**Global/Section/Primitiveの全セクション監査表がない場合、`COMPONENT SYSTEM RESULT`を完了としない。** Header/Footer/Navの重複を見逃していないことと、親SectionがFRAMEの場合に内部共有Componentの再利用状況を報告していることを確認する。

次を満たすまで完了扱いにしないでください。

- repeated UIの主要な重複を確認済み
- 安全な候補はComponent / Instance化済み
- visual differenceはVariantとして整理済み
- 不自然なVariantは作っていない
- visual regressionなし
- 判断が必要な候補を報告済み

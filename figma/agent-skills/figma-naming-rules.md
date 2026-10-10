# Figmaデザインデータの命名規則・共通化

Skill version: **1.0.0**  
Last reviewed: **2026-10-03**

このSkillは、FigmaデザインデータをHTML / CSS / SCSSへ実装しやすい一般的な状態へ整えるためのものです。

> **Project-specific Skillとの優先順位**
>
> `astro-ready` など、実装先固有のSkillが別途指定されている場合は、**Figma Component Set名・Variant property名・Variant valueはproject-specific Skillを優先**してください。
>
> このSkillのBEM例は、主にHTML class、主要レイヤー、JS hook、状態名の設計指針として扱います。
>
> 例:
>
> ```txt
> Figma Component Set: Button
> Astro Component: Button.astro
> HTML class: c-button / c-button--primary
> ```
>
> この場合、Figma Component Setを `c-button` へ変更する必要はありません。

Figmaのデザインデータを確認し、HTML / CSS / SCSSへ実装しやすいように、レイヤー名・フレーム名・コンポーネント名・テキストスタイルを整理してください。

見た目・配置・サイズ・色・テキスト内容は変更しないでください。

変更してよい対象は、以下のみです。

* レイヤー名
* Frame名
* Component名
* Variant名
* Text Styleの作成・適用
* 明らかに同一部品である要素のComponent / Instance整理

ComponentやAuto Layoutの構造を大きく変更しないでください。

判断に迷う場合は、勝手に変更せず候補を提示してください。

## 命名ルール

HTMLクラス名は、BEMをベースにします。

```txt
block
block__element
block--modifier
block__element--modifier
```

Elementの多重連結は使用しないでください。

```txt
NG:
c-card__body__title

OK:
c-card__body-title
c-card__title
```

## プレフィックス

| プレフィックス | 用途 | 例 |
| --- | --- | --- |
| `l-` | 内容に依存しない汎用レイアウト | `l-page`, `l-main`, `l-container`, `l-grid` |
| `c-` | セクション・再利用コンポーネント | `c-header`, `c-hero`, `c-button`, `c-card` |
| `u-` | 汎用補助クラス | `u-hidden`, `u-text-center` |
| `js-` | JavaScriptフック専用 | `js-menu-button`, `js-accordion` |
| `is-` | 状態 | `is-active`, `is-open`, `is-current` |
| `_pc`, `_sp` | PC / SP専用の別要素 | `c-hero__image_pc`, `c-hero__image_sp` |

## `l-` と `c-` の判断基準

`l-` は、内容やデザインに依存しない配置の骨組みに使用してください。

```txt
l-page
l-main
l-container
l-grid
```

Header、Hero、Footer、CTA、News、Aboutなど、固有の見た目・意味・内部構造を持つセクションは `c-` で命名してください。

```txt
c-header
c-hero
c-footer
c-cta
c-news
c-about
```

具体的なコンテンツ名を含むものは、原則として `l-` ではなく `c-` として扱ってください。

```txt
NG:
l-info-card-grid

候補:
c-info-card-list
c-info-card-grid
```

本当に汎用的なグリッドの場合のみ、内容名を外して `l-` を使用してください。

```txt
l-grid
l-grid--3-columns
```

## 命名対象

以下を中心に整理してください。

* ページ全体のFrame
* セクション単位のFrame
* Auto Layoutの親Frame
* Component
* Component Variant
* HTML要素になりそうな主要レイヤー
* ボタン
* カード
* ナビゲーション
* リスト
* 見出し
* 本文
* ラベル
* 画像枠
* JSで操作される想定の要素
* PC / SPで別要素として出し分ける要素

## 命名例

```txt
l-page
l-main
l-container
l-grid

c-header
c-header__inner
c-header__nav
c-header__nav-item
c-header__nav-link

c-footer
c-footer__inner
c-footer__copyright

c-hero
c-hero__inner
c-hero__slider
c-hero__slide
c-hero__lead
c-hero__title
c-hero__image

c-about
c-about__inner
c-about__title
c-about__text

c-news
c-news__inner
c-news__list
c-news__item

c-button
c-button--primary
c-button--outline
c-button__label

c-card
c-card__image
c-card__body
c-card__title
c-card__text

c-media-block
c-media-block--image-left
c-media-block--image-right
c-media-block__image
c-media-block__body
c-media-block__title
c-media-block__text

c-table
c-table__head
c-table__body
c-table__row
c-table__cell
c-table__cell--header

js-menu-button
js-global-nav
js-hero-slider
js-accordion

is-active
is-open
is-current

c-hero__image_pc
c-hero__image_sp
```

## 共通Component

同じ役割と構造を持つ要素は、配置されているセクションごとに別名へ分けず、共通Componentとして整理してください。

例:

```txt
c-button
c-site-logo
c-section-heading
c-info-card
c-media-block
c-pager
```

同じボタンComponentをHeader、Hero、CTAで使用している場合は、配置先ごとの名前に変更しないでください。

```txt
NG:
c-header__button
c-hero__button
c-cta__button

OK:
c-button
c-button--primary
c-button--outline
```

同じロゴをHeaderとFooterで使用している場合も、共通名を使用してください。

```txt
NG:
c-header__logo
c-footer__logo

OK:
c-site-logo
```

同じComponentの見た目違いは、可能な場合はVariantとして整理してください。

```txt
c-button
├─ style=primary
└─ style=outline
```

コード上では、次のようなModifierへの変換を想定します。

```txt
style=primary
→ c-button--primary

style=outline
→ c-button--outline
```

ただし、`astro-ready` などproject-specific SkillでComponent Set名・Variant propertyが指定されている場合は、その契約を優先してください。

## 共通見出し

複数のセクションで、同一構造の見出しを使用している場合は、共通Componentとして整理してください。

```txt
c-section-heading
c-section-heading__eyebrow
c-section-heading__title
c-section-heading__lead
```

トップページ内だけで使用する固有デザインの場合は、次の名前でも構いません。

```txt
c-top-section-heading
```

サイト全体で再利用できる場合は、`c-section-heading` を優先してください。

ただし、Hero見出しのように文字サイズ・構造・役割が異なるものは、無理に共通見出しComponentへ統合しないでください。

```txt
c-hero__lead
c-hero__title
```

## テキストレイヤーの命名

主要なテキストレイヤーは、見た目ではなくHTML上の役割を基準に命名してください。

```txt
__eyebrow
__label
__title
__lead
__text
__caption
__note
__date
__category
__copyright
```

例:

```txt
c-section-heading__eyebrow
c-section-heading__title
c-section-heading__lead

c-card__title
c-card__text

c-news__date
c-news__category
c-news__title
```

内容そのものや見た目だけを表す名前は避けてください。

```txt
NG:
大きい文字
赤文字
テキスト1
タイトル黒
18px-bold
```

## Text Styleの共通化

同じ文字スタイルを使用しているテキストには、FigmaのText Styleを作成して適用してください。

テキスト内容は変更せず、フォント、サイズ、ウェイト、行間、文字間隔が同じものを整理してください。

Text Style名は、使用場所ではなく、文字の役割を基準にしてください。

```txt
Typography/Heading/Hero
Typography/Heading/Section
Typography/Heading/Card

Typography/Body/Lead
Typography/Body/Default
Typography/Body/Small

Typography/Label/Eyebrow
Typography/Label/Button
Typography/Label/Category

Typography/Meta/Date
Typography/Meta/Caption
```

DesktopとMobileで文字スタイルが異なる場合は、末尾で区別してください。

```txt
Typography/Heading/Hero/Desktop
Typography/Heading/Hero/Mobile

Typography/Heading/Section/Desktop
Typography/Heading/Section/Mobile
```

同じ文字スタイルが複数セクションで使われている場合は、セクションごとに別のText Styleを作らないでください。

```txt
NG:
Typography/Features/Title
Typography/Cases/Title
Typography/Service/Title

OK:
Typography/Heading/Section
```

## ComponentとText Styleの使い分け

次の基準で判断してください。

```txt
構造・役割・見た目が共通
→ 共通Component

文字の見た目だけが共通
→ 共通Text Style

現時点で偶然同じ見た目
→ 無理にComponent化しない
```

CardとNewsの本文が同じ文字サイズでも、構造や役割が異なる場合:

```txt
レイヤー名:
c-card__text
c-news__text

Text Style:
Typography/Body/Default
```

HTMLクラスは分けたまま、Text Styleだけを共通化してください。

## JS対象

JavaScriptで操作される要素は、スタイル用の `c-` クラスを残したまま、`js-` クラスを追加する想定で整理してください。

```txt
c-hero__slider
＋ js-hero-slider

c-header__nav
＋ js-global-nav
```

`js-` を見た目のスタイル名として使用しないでください。

## PC / SPの出し分け

通常のレスポンシブ対応では、`_pc`、`_sp` を追加しないでください。

同じ要素をCSSで並び替えたり、サイズ変更したりする場合は、同じ名前を使用してください。

PC用とSP用で別の画像や要素が実際に重複して存在する場合のみ、次のように区別してください。

```txt
c-hero__image_pc
c-hero__image_sp
```

## 注意点

* すべての装飾レイヤーまで無理にBEM化しないでください
* コーディングに関係しない装飾レイヤーは、簡潔な日本語名または英語名で構いません
* `js-` はスタイル名として使わず、JavaScriptフック専用にしてください
* ComponentやVariant構造を壊さないでください
* Auto Layout構造は必要以上に変更しないでください
* テキスト内容は変更しないでください
* Text Styleを適用しても見た目が変わらないことを確認してください
* 同じText Styleをセクションごとに重複作成しないでください
* 見た目が同じという理由だけで、役割の異なる要素を同じComponentへ統合しないでください
* 判断に迷う名称や共通化は、勝手に変更せず候補を提示してください

## 作業後の報告

作業後、以下を簡潔に報告してください。

```txt
変更した主な命名
- 変更前 → 変更後

作成・適用したText Style
- Text Style名
- 適用した主なテキスト

共通化したComponent
- Component名
- 使用されている主なセクション

判断に迷った名称・共通化
- 対象名
- 候補
- 理由

コーディング時の注意点
- JS対象
- PC/SP出し分け
- 再利用できるComponent
- 共通Typography
```

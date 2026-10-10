# Code Connect

このディレクトリはFigma Code ConnectのTemplate Files用。

現行のFigma推奨方式はframework-specific parserではなく、framework-agnosticな `.figma.ts` Template Files。

## 現在の状態

コード側component APIのみ準備済み。

実Figma component URLが未確定のため、`.figma.ts` mappingはまだ作成しない。

また、2026-10-03時点で接続中のFigma workspaceはStarter / Full seat。Code ConnectはOrganization / EnterpriseのDevまたはFull seatが必要なため、このworkspaceにはpublishしない。

## 初期接続対象

1. Heading
2. Button
3. Card
4. Media

## Figma Library確定後

1. Figma側でcomponentをpublish
2. componentの「Copy link to selection」でnode URLを取得
3. Figma MCP / Code Connect skillでcomponent propertyを確認
4. このディレクトリへ `.figma.ts` を作成
5. parseで確認
6. publish
7. Figma MCPのDesign ContextにCode Connect情報が含まれることを確認

例:

```sh
npx --yes --package @figma/code-connect figma connect parse
```

publish可能なplanではtokenを環境変数で渡す。

```sh
FIGMA_ACCESS_TOKEN=... npx --yes --package @figma/code-connect figma connect publish
```

tokenをrepositoryへcommitしない。

## Astro snippet

Templateの出力はAstroの利用側コードを表現する。

例:

```astro
<Heading as="h2" variant="border">
  見出し
</Heading>
```

Figma propertyとAstro propsは実Figma componentのproperty名を確認してからmappingする。推測したproperty名をpublishしない。

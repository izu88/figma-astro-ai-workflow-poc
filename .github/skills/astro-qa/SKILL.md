---
name: astro-qa
description: Astroサイト実装後にbuild、静的品質、ブラウザ挙動、レスポンシブ、アクセシビリティ、Figmaとの視覚差分を検証し、コード起因の問題を修正して再検証する。公開前チェックや回帰確認で使用する。
argument-hint: "[URL / page / component]"
---

# Astro QA

詳細: [qa-checklist.md](./references/qa-checklist.md)

## 必須順序

1. **Static / Build**
   - Skill変更時は `npm run check:skills`。
   - `npm run build`。
   - TypeScript / SCSS / Astro error、static outputを確認。

2. **Browser**
   - 利用可能なbrowser/Playwrightでdesktop/mobileを確認。
   - navigation、interaction、keyboard、console、horizontal overflowを確認。

3. **Site quality**
   - 利用可能なブラウザ/Playwright等でリンク、alt、見出し、JSエラー、横スクロール、アクセシビリティを検証する。
   - 必要な追加QAが実行できない場合は、未検証として明記する。
   - ただし、ブラウザ/視覚QA自体が要求されている場合は、利用可能なPlaywright/MCP等で代替し、未検証のまま「確認済み」としない。

4. **Visual**
   - Figmaがsource of truthならreferenceとscreenshotを比較。
   - 画像比較を実施した範囲と未実施範囲を明記する。

5. **Repair**
   - コード起因の失敗は修正。
   - 関連checkを再実行。
   - 外部blockerのみ未検証として残す。

build成功だけで完了にしない。

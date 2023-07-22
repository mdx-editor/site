---
title: Code blocks
slug: code-blocks
position: 5
---

# Code blocks

The MDXEditor component uses dedicated code block editors for fenced code blocks. **Regular code blocks** are edited [with a codemirror editor](https://codemirror.net/) that supports syntax highlighting and basic bracket matching. 
Code blocks marked with `live` are rendered in a [Sandpack editor](https://sandpack.codesandbox.io/), which supports live previews and more advanced features. You can configure how the sandpack editor behaves by passing a `sandpackOptions` object to the `MDXEditor` component.

In addition to inserting a code block through the toolbar, the user can type ```` ```$lang ```` (with `$lang` being any supported language, followed by space) to insert a code block.

## Configuring the code block languages 

Once a code block is in focus, the toolbar contents are replaced with a dropdown that allows the user to change the language of the code block. The default list of languages is web focused - JavaScript, TypeScript and CSS. You can customize the available languages by passing a `codeBlockLanguages` `Record<string, string>` to the `MDXEditor` component, where the key is the language name and the value is the label displayed in the dropdown. 

## Configuring the live code blocks

Tuning the live code blocks is a bit more involved, as sandpack needs to know the context of the code block in order to render it correctly. Before diving in, it's good to [understand Sandpack configuration](https://sandpack.codesandbox.io/) itself. MDXEditor supports multiple sandpack configurations, based on the meta data of the code block. To configure the supported presets, pass a `sandpackConfig` property to the component. For more details, refer to the [SandpackConfig interface](../api/editor.sandpackconfig) and the [SandpackPreset interface](../api/editor.sandpackpreset).

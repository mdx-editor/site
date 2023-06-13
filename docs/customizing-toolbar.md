---
title: Customizing the toolbar
slug: customizing-toolbar
position: 2
---

# Customizing the toolbar

By default, MDXEditor includes a "kitchen sink" toolbar that gives access to all editor features. Depending on your use case, you may choose to remove certain buttons, change the order of the buttons, or add new buttons.


## Overriding the default toolbar set

MDXEditor exposes an optional property named `toolbarComponents` that accepts an array of React Components (`React.ComponentType`). Its default value looks like this:

```tsx
const defaultToolbarComponents = [
  BoldItalicUnderlineButtons,
  ToolbarSeparator,

  CodeFormattingButton,
  ToolbarSeparator,

  ListButtons,
  ToolbarSeparator,
  BlockTypeSelect,
  ToolbarSeparator,
  LinkButton,
  TableButton,
  HorizontalRuleButton,
  FrontmatterButton,

  ToolbarSeparator,

  CodeBlockButton,
  SandpackButton,
]
```

All of the components above are exported from the `mdxeditor` package in the `toolbarComponents` object, so you can import them and use them in your custom toolbar. 

## Building your own button 

The `toolbarComponents` object includes a few base components (like `ToggleItem`, `ToolbarButton`, and `ToggleSingleGroup`) that can be used as a base for your custom logic. For example, the `LinkButton` component looks something like this:

```tsx
<ToolbarButton onClick={() => openLinkEditDialog()}>
  <LinkIcon />
</ToolbarButton>
```

## Accessing the editor API
Internally, MDXEditor uses [Lexical](https://lexical.dev/) for its rich text editing infrastructure. To access the Lexical editor API, you can use [the `useLexicalComposerContext` hook](https://lexical.dev/docs/react/create_plugin). Currently, the best source of information about the Lexical API is the [Lexical playground source code](https://github.com/facebook/lexical/tree/main/packages/lexical-playground).

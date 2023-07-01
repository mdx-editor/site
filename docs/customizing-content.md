---
title: Customizing Content
slug: customizing-content
position: 4
---

# Customizing Content

MDXEditor exposes a few properties that let you configure the way the markdown input is imported, and converted into editable rich text. Using the Lexical framework, you can also inject custom rich text editors that will get associated with specific markdown constructs.

For the customization to be complete, the reverse process must be implemented too - converting the Lexical framework tree back to markdown. 

## How it works

- The markdown input is parsed to a markdown syntax tree using [fromMarkdown](https://github.com/syntax-tree/mdast-util-from-markdown)
- The resulting tree is then processed using a set of visitors, that convert each mdast node into a [Lexial node](https://lexical.dev/docs/concepts/nodes). 
- The editor instance operates and updates the lexical tree based on the user actions.
- The resulting lexical tree is then processed into an markdown syntax tree using a (different) set of visitors.
- The markdown tree is then serialized to markdown using [toMarkdown](https://github.com/syntax-tree/mdast-util-to-markdown)



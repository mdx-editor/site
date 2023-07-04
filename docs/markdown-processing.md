---
title: Markdown Processing 
slug: markdown-processing
position: 4
---

# Customizing Content

MDXEditor exposes a few properties that let you configure the way the markdown input is imported, and converted into editable rich text. Using the Lexical framework, you can also inject custom rich text editors that will get associated with specific markdown constructs.

For the customization to be complete, the reverse process must be implemented too - converting the Lexical framework tree back to markdown. 

## Import/export steps explained

- The markdown input is parsed to a markdown syntax tree using [fromMarkdown](https://github.com/syntax-tree/mdast-util-from-markdown).
- Next, the resulting tree is then processed using a set of visitors, that convert each Markdown Abstract Syntax Tree (from hereon referred to as mdast) node into a [Lexical node](https://lexical.dev/docs/concepts/nodes). 
- The editor instance operates and updates the lexical tree based on the user actions.
- Then the resulting Lexical tree is processed into a markdown syntax tree using a (different) set of visitors.
- Finally, the markdown tree is serialized to a markdown using [toMarkdown](https://github.com/syntax-tree/mdast-util-to-markdown).

Let's explore how you can customize each of those steps. Some of this might feel quite complex; If you want to explore this further, you can explore the implementation of the built-in visitors in the GitHub repository.

### Markdown input to mdast tree step

To customize the conversion from markdown to mdast tree, pass a set of options to `markdownParseOptions` property. 
The options are passed to the [fromMarkdown options parameter](https://github.com/syntax-tree/mdast-util-from-markdown#options) - the `syntaxExtensions` gets mapped to the `extensions` option, and the `mdastExtensions` goes into the `mdastExtensions`.

Most likely, you don't want to completely replace the default logic, but rather tweak a certain property, or add a few things in addition to the existing set. To help with that, you can get the default values of the `syntaxExtensions` and the `mdastExtensions` from the `markdownParse` field of the [`defaultMdxOptionValues` module export](../api/editor.defaultmdxoptionvalues.markdownparse).

### Mdast tree to Lexical tree step

After the mdast tree is constructed, it's walked recursively through a set of [mdast import visitors](../api/editor.mdastimportvisitor). When a visitor returns `true` when [testing the mdast node](../api/editor.mdastimportvisitor.testnode), its [visitNode is invoked](../api/editor.mdastimportvisitor.visitnode) with a certain import context and a predefined set of actions it can do to construct and inject a Lexical node in the respective tree. 

You can change the used mdast import visitors by passing an array of mdast import visitors to the `markdownParseOptions.visitors` property field. Similar to the previous step, you can obtain the default set of visitors from the `markdownParse.defaultVisitors` field of the `defaultMdxOptionsValue` export. For further details on how to implement your own visitor, refer to the [`MdastImportVisitor` interface API reference](../api/editor.mdastimportvisitor).

Notice that when creating your own visitor, you might have to implement a new Lexical node (and, potentially, a React component that acts as an editor) as well. To do so, [consult the Lexical docs](https://lexical.dev/docs/concepts/nodes), and browse the MDXEditor source code itself for further details on how this can be done. If you create a new node, you should pass it in [the lexicalNodes array](../api/editor.mdxeditorprops.lexicalnodes) - grab the default value from the `defaultLexicalNodes` field of the `defaultMdxOptionValues` module export.

### Lexical tree to mdast tree step

As the user edits the content through the editor interface, the underlying Lexical state tree gets reprocessed back to an mdast tree using a [set of Lexical export visitors](../api/editor.lexicalexportvisitor). The implementation is similar to the mdast import ones; once a visitor returns true when testing a Lexical node, its `visitLexicalNode` method is invoked with some context and actions to inject a new mdast node(s) in the resulting tree.

You can change the used lexical export visitors by passing a set of visitors to the `lexicalConvertOptions.visitors` property field. You can get the default used ones from the `lexicalConvert.defaultVisitors` field of the `defaultMdxOptionsValue` export. For further details on implementing a Lexical export visitor, refer to the [`LexicalExportVisitor` interface API reference](../api/editor.lexicalexportvisitor).

### Mdast tree to markdown output step

In the final step, the resulting markdown tree is converted to a markdown string using the [toMarkdown](https://github.com/syntax-tree/mdast-util-to-markdown) utility. This is a great point for you to change stylistic preferences like bullet markers or how whitespace is treated. To control the options of the `toMarkdown` invocation, pass your preferences through the `lexicalConvertOptions` `toMarkdownExtensions` and `toMarkdownOptions`. Those values get mapped to [the `options.extensions` and `options` argument of the `toMarkdown` call](https://github.com/syntax-tree/mdast-util-to-markdown#options).

You can obtain the default values of the above from the [`lexicalConvert` field](../api/editor.defaultmdxoptionvalues.lexicalconvert) of the `defaultMdxOptionsValue` export.


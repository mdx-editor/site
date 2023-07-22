---
title: Custom directive editors
slug: custom-directive-editors
position: 8
---

# Custom directive editors

## About markdown directives
Markdown supports [custom constructs called directives](https://talk.commonmark.org/t/generic-directives-plugins-syntax/444), which can describe arbitrary content (a popular example of that being YouTube videos). You can use the [remark-directive](https://github.com/remarkjs/remark-directive) package to render directives up to your requirements. 

```md
# This is the syntax for a custom YouTube directive.

::youtube[Video of a cat in a box]{#01ab2cd3efg}
```

## MDXEditor markdown directive support 

If your markdown has directives and you want to let the users edit them, you can create a custom editor component and pass it in the `customLeafDirectiveEditors` prop. See the example below for more details.

```tsx
import React from 'react'
import { MDXEditor } from '../'
import { CustomLeafDirectiveEditor } from '../types/NodeDecoratorsProps'

const YoutubeEditor: CustomLeafDirectiveEditor = {
  testNode: (mdastNode) => mdastNode.name === 'youtube',
  Editor: ({ mdastNode, leafDirective, parentEditor }) => {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <button
          onClick={() => {
            parentEditor.update(() => {
              leafDirective.selectNext()
              leafDirective.remove()
            })
          }}
        >
          delete
        </button>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${mdastNode.attributes?.id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        ></iframe>
      </div>
    )
  }
}

export function Example() {
  return (
    <MDXEditor
      customLeafDirectiveEditors={[YoutubeEditor]}
      markdown={`
This should be an youtube video:

::youtube{#A5lXAKrttBU}

`}
    />
  )
}
```

## Adding directive controls in the toolbar

You can use the [Lexical framework API](https://lexical.dev/docs/api/modules/lexical) to build an UI that inserts a custom directive node in the editor. Below you can find an example toolbar dialog button that will insert an YouTube directive.

```tsx
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext'
import { $createParagraphNode, $insertNodes } from 'lexical'
import { LeafDirective } from 'mdast-util-directive'
import React from 'react'
import { $createLeafDirectiveNode, MDXEditor, ToolbarComponents } from '../'

// get the building blocks for the toolbar
const {
  BoldItalicUnderlineButtons,
  ToolbarSeparator,
  CodeFormattingButton,
  ListButtons,
  BlockTypeSelect,
  LinkButton,
  ImageButton,
  TableButton,
  HorizontalRuleButton,
  FrontmatterButton,
  CodeBlockButton,
  SandpackButton,
  DialogButton 
} = ToolbarComponents

// we will use the simple dialog button that asks for an YouTube URL:
// You can build any kind of UI that fits your needs.
const YouTubeButton = () => {
  const [editor] = useLexicalComposerContext()
  return (
    <DialogButton
      tooltipTitle="Insert Youtube video"
      submitButtonTitle="Insert video"
      dialogInputPlaceholder="Paste the youtube video URL"
      buttonContent="YT"
      onSubmit={(url) => {
        const videoId = new URL(url).searchParams.get('v')
        if (videoId) {
          editor.update(() => {
            const youtubeDirectiveMdastNode: LeafDirective = {
              type: 'leafDirective',
              name: 'youtube',
              attributes: { id: videoId },
              children: []
            }
            const lexicalNode = $createLeafDirectiveNode(youtubeDirectiveMdastNode)
            $insertNodes([lexicalNode])

            if (lexicalNode.getParent()?.getLastChild() == lexicalNode) {
              lexicalNode.getParent()?.append($createParagraphNode())
            }
          })
        } else {
          alert('Invalid YouTube URL')
        }
      }}
    />
  )
}

// build a custom toolbar that includes the YouTube button
const toolbarComponents = [
  BoldItalicUnderlineButtons,
  ToolbarSeparator,

  CodeFormattingButton,
  ToolbarSeparator,

  ListButtons,
  ToolbarSeparator,
  BlockTypeSelect,
  ToolbarSeparator,
  LinkButton,
  ImageButton,
  TableButton,
  HorizontalRuleButton,
  FrontmatterButton,

  ToolbarSeparator,

  CodeBlockButton,
  SandpackButton,
  ToolbarSeparator,
  YouTubeButton
]

// the custom editors from the previous example are omitted 
export function Hello() {
  return (
    <MDXEditor
      toolbarComponents={toolbarComponents}
      markdown={` Hello world `}
    />
  )
}
```

## Building custom editor UI for a directive

A markdown directive can optionally have a key/value record of attributes and nested markdown content. MDXEditor provides utilities so that you can build an editing UI for both of those.

```md 
Below is an example of a directive with attributes and nested markdown.

::callout[some *nested* markdown content]{type="info"}
```

### Updating the directive attributes

The `useMdastNodeUpdater` hook returns a function that allows you to update the directive node attributes. You don't need to maintain a local state; the component gets re-rendered with the new mdast node prop.

### Updating the directive nested content

The `NestedEditor` component can be used to edit the markdown contents of the directive. See the example below.

```tsx
/**
 * The nested editor component needs two props - a getter to resolve the nested markdown AST,
 * and a setter to construct a new node with the updated AST. 
 * You can optionally style or set the class name the inner content element.
 */
const CalloutEditor: CustomLeafDirectiveEditor<CalloutDirectiveNode> = {
  testNode: (mdastNode) => mdastNode.name === 'callout',
  Editor: ({ mdastNode }) => {
    const updateMdastNode = useMdastNodeUpdater()
    return (
      <div>
        Callout{' '}
        <input
          value={mdastNode.attributes.type}
          onChange={(e) => updateMdastNode({ ...mdastNode, attributes: { ...mdastNode.attributes, type: e.target.value } })}
        />
        <NestedEditor<CalloutDirectiveNode>
          getUpdatedMdastNode={(mdastNode, content) => {
            return { ...mdastNode, children: content }
          }}
          getContent={(mdastNode) => mdastNode.children}
          contentEditableProps={{style: '1px solid blue'}}
        />
      </div>
    )
  }
}

export function CalloutExample() {
  return (
    <MDXEditor
      customLeafDirectiveEditors={[CalloutEditor]}
      markdown={`
A callout editor:

::callout[there is some *markdown* in here]{type="info"}

`}
    />
  )
}
```

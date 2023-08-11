---
title: JSX
slug: jsx
position: 0.815
---

# JSX

The jsx plugin allows you to process and associate custom editors with the JSX components in your markdown source - a capability enabled by [MDX](https://mdxjs.com/). The package includes a generic editor component, but you can also create your own custom editors. The next example includes three JSX descriptors and an example of a custom editor that uses the `NestedLexicalEditor` component to edit the markdown contents of a JSX component.

```tsx
const jsxComponentDescriptors: JsxComponentDescriptor[] = [
  {
    name: 'MyLeaf',
    kind: 'text', // 'text' for inline, 'flow' for block
    // the source field is used to construct the import statement at the top of the markdown document. 
    // it won't be actually sourced.
    source: './external',
    // Used to construc the property popover of the generic editor
    props: [
      { name: 'foo', type: 'string' },
      { name: 'bar', type: 'string' }
    ],
    // wether the component has children or not
    hasChildren: true,
    Editor: GenericJsxEditor
  },
  {
    name: 'Marker',
    kind: 'text',
    source: './external',
    props: [{ name: 'type', type: 'string' }],
    hasChildren: false,
    Editor: () => {
      return (
        <div style={{ border: '1px solid red', padding: 8, margin: 8, display: 'inline-block' }}>
          <NestedLexicalEditor<MdxJsxTextElement>
            getContent={(node) => node.children}
            getUpdatedMdastNode={(mdastNode, children: any) => {
              return { ...mdastNode, children }
            }}
          />
        </div>
      )
    }
  },
  {
    name: 'BlockNode',
    kind: 'flow',
    source: './external',
    props: [],
    hasChildren: true,
    Editor: GenericJsxEditor
  }
]

// a toolbar button that will insert a JSX element into the editor.
const InsertMyLeaf = () => {
  const insertJsx = jsxPluginHooks.usePublisher('insertJsx')
  return (
    <Button
      onClick={() =>
        insertJsx({
          name: 'MyLeaf',
          kind: 'text',
          props: { foo: 'bar', bar: 'baz' }
        })
      }
    >
      Leaf
    </Button>
  )
}

export const Example = () => {
  return (
    <MDXEditor
      markdown={jsxMarkdown} // the contents of the file  below
      onChange={console.log}
      plugins={[
        jsxPlugin({ jsxComponentDescriptors }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <InsertMyLeaf />
            </>
          )
        })
      ]}
    />
  )
}
```

```md
import { MyLeaf, BlockNode } from './external';

A paragraph with inline jsx component <MyLeaf foo="fooValue">Nested _markdown_</MyLeaf> more <Marker type="warning" />.

<BlockNode foo="fooValue">
 Content *foo*

 more Content
</BlockNode>
```

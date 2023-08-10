'use client'
import {
  BoldItalicUnderlineToggles,
  Separator,
  CreateLink,
  BlockTypeSelect,
  toolbarPlugin,
  headingsPlugin,
  linkPlugin,
  linkDialogPlugin,
  quotePlugin,
  listsPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
} from '@mdxeditor/editor'
import MDXEditor from './editor'

const markdown = `
Click here to start editing this text.

Here's the familiar **bold**, *italic*, and <u>underline</u> formatting. 

You can also have links, like this link to the [awesome React virtualization library](https://virtuoso.dev).

* This is a list;
* With some items.

And a code block:

\`\`\`js
console.log("A javascript code block")
\`\`\`

There's a lot more you can find in [live demo](editor/demo).
`
const HomepageEditor: React.FC = () => {
  return (
    <div className=" overflow-y-auto max-h-[236px]">
      <MDXEditor
        markdown={markdown}
        contentEditableClassName="prose"
        plugins={[
          headingsPlugin(),
          codeBlockPlugin(),
          codeMirrorPlugin({ codeBlockLanguages: { js: 'javascript', ts: 'typescript' } }),
          linkPlugin(),
          linkDialogPlugin(),
          quotePlugin(),
          listsPlugin(),
          toolbarPlugin({
            toolbarContents: () => {
              return (
                <>
                  <BoldItalicUnderlineToggles />
                  <Separator />
                  <CreateLink />
                  <BlockTypeSelect />
                </>
              )
            },
          }),
        ]}
      />
    </div>
  )
}

export default HomepageEditor

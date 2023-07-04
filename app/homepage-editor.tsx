'use client'
import { ToolbarComponents } from '@mdxeditor/editor'
import MDXEditor from './editor'

const markdown = `
Click here to start editing this text.

This is a preview of **bold**, *italic*, and <u>underline</u> formatting. 

This is a link to an awesome [React virtualization library](https://virtuoso.dev).

* This is a list;
* With some items.

And a code block:

\`\`\`js

console.log("A javascript code block")

\`\`\`

See more features in the [live demo](editor/demo).
`
const HomepageEditor: React.FC = () => {
  return (
    <div className=" overflow-y-auto max-h-56">
      <MDXEditor
        markdown={markdown}
        contentEditableClassName="prose"
        toolbarComponents={[
          ToolbarComponents.BoldItalicUnderlineButtons,
          ToolbarComponents.ToolbarSeparator,
          ToolbarComponents.LinkButton,
          ToolbarComponents.BlockTypeSelect,
        ]}
      />
    </div>
  )
}

export default HomepageEditor

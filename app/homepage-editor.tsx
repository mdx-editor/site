'use client'
import { ToolbarComponents } from '@mdxeditor/editor'
import MDXEditor from './editor'

const HomepageEditor: React.FC = () => {
  return (
    <MDXEditor
      markdown="# Hello world"
      contentEditableClassName="prose"
      toolbarComponents={[
        ToolbarComponents.BoldItalicUnderlineButtons,
        ToolbarComponents.ToolbarSeparator,
        ToolbarComponents.LinkButton,
        ToolbarComponents.BlockTypeSelect,
      ]}
    />
  )
}

export default HomepageEditor

'use client'
import { ToolbarComponents } from 'mdxeditor'
import MDXEditor from './editor'

const HomepageEditor: React.FC = () => {
  return (
    <MDXEditor
      markdown="# Hello world"
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

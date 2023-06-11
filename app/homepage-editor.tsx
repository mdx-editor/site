'use client'
import { ToolbarComponents } from 'mdxeditor'
import dynamic from 'next/dynamic'

const MDXEditor = dynamic(() => import('mdxeditor').then((mod) => mod.MDXEditor), { ssr: false })

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

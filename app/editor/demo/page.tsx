import fs from 'fs'
import MDXEditor from '@/app/editor'

export default function Page() {
  const demoMarkdown = fs.readFileSync('./docs/live-demo-contents.md', 'utf-8')
  return <MDXEditor markdown={demoMarkdown} contentEditableClassName="prose max-w-full font-sans" />
}

import fs from 'fs'
import { LiveDemo } from './live-demo'

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'Live demo | MDXEditor',
  description: 'Live demo of MDXEditor, an open-source React component for markdown editing',
}

export default function Page() {
  const demoMarkdown = fs.readFileSync('./docs/live-demo-contents.md', 'utf-8')
  return <LiveDemo markdown={demoMarkdown} />
}

import fs from 'fs'
import dynamic from 'next/dynamic'

// eslint-disable-next-line react-refresh/only-export-components
export const metadata = {
  title: 'Live demo | MDXEditor',
  description: 'Live demo of MDXEditor, an open-source React component for markdown editing',
}

const LiveDemoEditor = dynamic(() => import('@/app/DemoEditor'), { ssr: false })

export default function Page() {
  const demoMarkdown = fs.readFileSync('./docs/live-demo-contents.md', 'utf-8')
  return <LiveDemoEditor markdown={demoMarkdown} />
}

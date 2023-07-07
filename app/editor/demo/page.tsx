import fs from 'fs'
import { LiveDemo } from './live-demo'

export default function Page() {
  const demoMarkdown = fs.readFileSync('./docs/live-demo-contents.md', 'utf-8')
  return <LiveDemo markdown={demoMarkdown} />
}

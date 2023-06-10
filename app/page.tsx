import HomepageEditor from './homepage-editor'

const CodeLineHighlighter: React.FC<{ code: string; fromLine: number; toLine: number }> = ({ code, fromLine, toLine }) => {
  const lines = code.split('\n')
  const highlightedLines = lines.slice(fromLine - 1, toLine).join('\n')
  const before = lines.slice(0, fromLine - 1).join('\n')
  const after = lines.slice(toLine).join('\n')
  return (
    <code className="bg-slate-950 rounded-md p-4 block text-slate-50">
      <pre className="font-mono font-extralight">
        {before}
        {'\n'}
        <mark className="bg-purple-300">{highlightedLines}</mark>
        {'\n'}
        {after}
      </pre>
    </code>
  )
}

const codeSample1 = `
<MdxEditor
  markdown={markdown}
  className={className}
  contentEditableClassName="my-prose-class"
  lexicalTheme={myTheme}
/>
`.trim()

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-y-8 [&>div]:p-4 [&>div]:py-6 [&>div:nth-child(n+3)]:bg-slate-200 [&>div:nth-child(n+4)]:bg-slate-200">
      <div>
        <h2 className="font-mono text-2xl font-extralight mb-4">
          <span className="underline">Markdown</span> editing can be <br />
          even{' '}
          <span className="bg-blue-200 after:border-r-blue-700 after:border-solid after:border-r-[3px] after:inline-block after:h-[2.1rem] after:translate-y-[0.5rem]">
            more
          </span>{' '}
          delightful.
        </h2>
        <p className="text-lg">
          MDX Editor is an open-source React component that lets your users author markdown documents naturally, just like in Google docs or
          Notion.
        </p>

        <div className="py-4 flex gap-8">
          <button className="border-solid border-2 rounded-md border-slate-700 px-8 py-3 bg-white">Try it live</button>
          <button className="border-solid border-2 rounded-md border-blue-700 bg-blue-700 px-8 py-3 text-white">Get started</button>
        </div>
      </div>

      <div className="bg-white rounded-md p-4">
        <HomepageEditor />
      </div>

      {/* stage 2 */}

      <div>
        <CodeLineHighlighter code={codeSample1} fromLine={4} toLine={5} />
      </div>

      <div>
        <h2 className="font-mono text-2xl font-extralight mb-4">
          What you see is what you get. <br /> No, really!
        </h2>
        <p className="text-lg">No more need for edit ↔ preview. Style the content editable part with the same styles as your live site.</p>

        <a href="#" className="mt-5 block text-blue-900">
          Read more about content styling →
        </a>
      </div>
    </div>
  )
}

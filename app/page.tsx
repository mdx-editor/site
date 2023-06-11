import { createElement, JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import HomepageEditor from './homepage-editor'

function twElement<T extends keyof JSX.IntrinsicElements>(elemTagName: T, className: string) {
  return ({ className: classNameProp, ...props }: JSX.IntrinsicElements[T]) => {
    return createElement(elemTagName, { ...props, className: twMerge(className, classNameProp) })
  }
}

const CodeBlock = twElement(
  'code',
  'p-4 block text-neutral-textContrast text-sm w-full bg-neutral-base border-2 border-dotted border-accent-solidHover shadow-md'
)
const PreBlock = twElement('pre', 'font-mono font-light')
const Mark = twElement('mark', 'bg-neutral-borderHover text-neutral-textContrast')
const ActionLinkButton = twElement('a', 'border-solid border-2 rounded-md border-neutral-textContrast px-8 py-3 bg-white font-mono text-sm')
const ActionLink = twElement('a', 'block mt-5 text-accent-text after:content-["/>"] after:ml-2 after:font-mono')

const CodeLineHighlighter: React.FC<{ code: string; fromLine?: number; toLine?: number }> = ({ code, fromLine = 0, toLine = 0 }) => {
  const lines = code.split('\n')
  const before = fromLine === 0 ? '' : lines.slice(0, fromLine - 1).join('\n') + '\n'
  const highlightedLines = lines.slice(Math.max(fromLine - 1, 0), toLine).join('\n') + '\n'
  const after = lines.slice(toLine).join('\n')
  return (
    <CodeBlock>
      <PreBlock>
        {before}
        <Mark>{highlightedLines}</Mark>
        {after}
      </PreBlock>
    </CodeBlock>
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

const codeSample2 = `
\`\`\`jsx live
export default function App() {
  return (
    <div className="App">
      <h1>Hello Sandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
\`\`\`
`.trim()

export default function Home() {
  return (
    <div className="grid grid-cols-2 gap-y-8 [&>div]:p-4 [&>div]:py-6 [&>div:nth-child(4)]:bg-neutral-bg [&>div:nth-child(3)]:bg-neutral-bg">
      <div>
        <h2 className="font-mono text-2xl font-normal mb-4">
          <span className="underline">Markdown</span> editing can be <br />
          even{' '}
          <span className="bg-accent-bg after:border-r-accent-borderHover after:border-solid after:border-r-2 after:inline-block after:h-[2.1rem] after:translate-y-[0.5rem]">
            more
          </span>{' '}
          delightful.
        </h2>
        <p className="text-lg">
          MDX Editor is an open-source React component that allows <br />
          users to author markdown documents naturally.
          <br /> Just like in Google docs or Notion.
        </p>

        <div className="py-4 flex gap-8">
          <ActionLinkButton>Try it live</ActionLinkButton>
          <ActionLinkButton href="/docs/editor/getting-started" className="border-accent-text bg-accent-text text-neutral-base">
            Get started
          </ActionLinkButton>
        </div>
      </div>
      <div className="bg-white rounded-md p-4">
        <HomepageEditor />
      </div>
      {/* stage 2 */}
      <div className="flex items-stretch">
        <CodeLineHighlighter code={codeSample1} fromLine={4} toLine={5} />
      </div>
      <div>
        <h2 className="font-mono text-2xl mb-4">
          What you see is what you get. <br /> No, really!
        </h2>
        <p className="text-lg">No more need for edit ↔ preview. Style the rich text with the same styles as your actual page.</p>

        <ActionLink href="#">Read more about content styling</ActionLink>
      </div>
      {/* stage 3 */}
      <div>
        <h2 className="font-mono text-2xl mb-4">No more code samples with sneaky syntax errors</h2>

        <p className="text-lg">
          Code blocks are now editable with syntax highlighting, auto-complete and indentation. You can even configure a live preview for
          your code blocks, powered by sandpack.
        </p>

        <ActionLink href="#">Code blocks docs</ActionLink>
      </div>
      <div className="flex items-stretch">
        <CodeLineHighlighter code={codeSample2} fromLine={0} toLine={1} />
      </div>
    </div>
  )
}

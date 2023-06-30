import { createElement, JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import HomepageEditor from './homepage-editor'
import Prism from './prism-renderer'
import { FeatureOverviewItem } from './FeatureOverviewItem'

function twElement<T extends keyof JSX.IntrinsicElements>(elemTagName: T, className: string) {
  return ({ className: classNameProp, ...props }: JSX.IntrinsicElements[T]) => {
    return createElement(elemTagName, { ...props, className: twMerge(className, classNameProp) })
  }
}

const ActionLinkButton = twElement(
  'a',
  'border-solid border-[1px] rounded-md border-neutral-textContrast px-8 py-3 bg-white font-mono text-sm'
)
const ActionLink = twElement('a', 'block mt-5 text-accent-text after:content-["/>"] after:ml-2 after:font-mono')

const codeSample1 = `
<MdxEditor
  markdown={markdown}
  className={className}
  contentEditableClassName="my-prose-class"
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
    <>
      <div className="grid grid-cols-2 gap-y-8 xl:gap-y-16 [&>div]:p-4 [&>div]:py-6 mb-8 xl:mb-16">
        <div>
          <h2 className="font-mono text-2xl font-normal mb-4">
            <span className="underline">Markdown</span> editing can be <br />
            even{' '}
            <span className="bg-accent-bg after:border-r-accent-solidHover after:border-solid after:border-r-2 after:inline-block after:h-[2.1rem] after:translate-y-[0.5rem]">
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
            <ActionLinkButton href="/editor/demo">Try it live</ActionLinkButton>
            <ActionLinkButton href="/editor/docs/getting-started" className="border-accent-text bg-accent-text text-neutral-base">
              Get started
            </ActionLinkButton>
          </div>
        </div>
        <div className="p-4 mx-4">
          <HomepageEditor />
        </div>
        {/* stage 2 */}
        <div className="flex items-stretch">
          <Prism code={codeSample1} language="tsx" fromLine={3} toLine={3} />
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
          <Prism code={codeSample2} language="tsx" fromLine={0} toLine={0} />
        </div>
      </div>

      <h2 className="font-mono text-2xl mb-8 text-center">Feature overview</h2>

      <ul className="grid grid-cols-3 gap-6 list-[circle] list-inside mx-4 text-lg marker:text-accent-text">
        <li>
          <FeatureOverviewItem title="Table Editor">
            <p className="mb-4">Edit markdown tables with in a dedicated inline UI built for the markdown table syntax.</p>
            <p>Insert rows and columns, and manage column alignment.</p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Link dialog">
            <p className="mb-4">Users can insert links with a convenient keyboard shorctut or through the toolbar button.</p>
            <p>Wire up autocomplete suggestions for the URL input field through a component prop.</p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Image dialog">
            <p className="mb-4">Users can insert images with a toolbar button.</p>
            <p>Provide autocomplete suggestions for the URL input field through a component prop.</p>
          </FeatureOverviewItem>
        </li>
        <li>Image insert dialog</li>
        <li>Frontmatter editor</li>
        <li>Markdown shortcuts</li>
        <li>Diff view</li>
        <li>Source view</li>
        <li>Markdown format configuration</li>
        <li>Extensibility API</li>
        <li>MarkdownX component editors</li>
        <li>Customizable Toolbar</li>
      </ul>
    </>
  )
}

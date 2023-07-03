import { createElement, JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import HomepageEditor from './homepage-editor'
import Prism from './prism-renderer'
import { FeatureOverviewItem } from './FeatureOverviewItem'
import SlashedArrowIcon from './images/slashed_arrow.svg'

function twElement<T extends keyof JSX.IntrinsicElements>(elemTagName: T, className: string) {
  return ({ className: classNameProp, ...props }: JSX.IntrinsicElements[T]) => {
    return createElement(elemTagName, { ...props, className: twMerge(className, classNameProp) })
  }
}

const ActionLinkButton = twElement(
  'a',
  'border-solid border-[1px] rounded-md border-neutral-textContrast px-8 py-3 bg-white font-mono text-sm'
)
const ActionLink = twElement('a', 'block mt-5 text-accent-text  [&_svg]:inline')

const codeSample1 = `
<MdxEditor
  markdown={markdown}
  className={className}
  contentEditableClassName="my-prose-class"
/>
`.trim()

const codeSample2 = `
const markdown = \`
\\\`\\\`\\\`jsx live
export default function App() {
  return (<h1>Hello Sandbox</h1>);
}
\\\`\\\`\\\`
\`

return <MdxEditor markddown={markdown} />
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

          <ActionLink href="editor/docs/content-styling">
            Read more about content styling <SlashedArrowIcon />
          </ActionLink>
        </div>
        {/* stage 3 */}
        <div>
          <h2 className="font-mono text-2xl mb-4">No more code samples with sneaky syntax errors</h2>

          <p className="text-lg">
            Code blocks are now editable with syntax highlighting, auto-complete and indentation. You can even configure a live preview for
            your code blocks, powered by sandpack.
          </p>

          <ActionLink href="editor/docs/code-blocks">
            Code blocks docs <SlashedArrowIcon />
          </ActionLink>
        </div>
        <div className="flex items-stretch">
          <Prism code={codeSample2} language="tsx" fromLine={1} toLine={1} />
        </div>
      </div>

      <h2 className="font-mono text-2xl mb-8 text-center">Feature overview</h2>

      <ul className="grid grid-cols-3 gap-6 list-[circle] list-inside mx-4 text-lg marker:text-accent-text">
        <li>
          <FeatureOverviewItem title="Table editor">
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
        <li>
          <FeatureOverviewItem title="Frontmatter editor">
            <p className="mb-4">A property key-value panel that lets editor edit the markdown document frontmatter.</p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Markdown shortcuts">
            <p className="mb-4">
              Use <code>``</code> to start a code block, <code># </code> to start a heading, etc.
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Diff/source view">
            <p className="mb-4">
              A switch in the toolbar lets the user preview a diff view of the document, or edit the markdown source as a plain text.
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Markdown format configuration">
            <p className="mb-4">
              By configuring the markdown options prop, you can customize the markdown syntax (i.e.bullets) that the editor will output.
            </p>
          </FeatureOverviewItem>
        </li>

        <li>
          <FeatureOverviewItem title="Extensibility API">
            <p className="mb-4">
              Inject your own toolbar items, and extend the markdown import/export logic. Embed custom editor components within the editor
              through the Lexical framework.
            </p>
          </FeatureOverviewItem>
        </li>

        <li>
          <FeatureOverviewItem title="MarkdownX Components">
            <p className="mb-4">
              Inline/block property editors allow users to change the component instance properties and the child markdown.
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Customizable toolbar">
            <p className="mb-4">
              Inject your own toolbar items, , change the order of the existing ones, or remove the ones you do not need. Nobody would judge
              you ;).
            </p>
          </FeatureOverviewItem>
        </li>
      </ul>
    </>
  )
}

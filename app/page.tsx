import { createElement, JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import SampleCodeBlock from './sample-code-block'
import { FeatureOverviewItem } from './FeatureOverviewItem'
import SlashedArrowIcon from './images/slashed_arrow.svg'
import Image from 'next/image'
import SandpackScreenshot from './images/sandpack-screenshot.png'
import AppScreenshot from './images/app-screenshot.png'
import dynamic from 'next/dynamic'

function twElement<T extends keyof JSX.IntrinsicElements>(elemTagName: T, className: string) {
  return ({ className: classNameProp, ...props }: JSX.IntrinsicElements[T]) => {
    return createElement(elemTagName, { ...props, className: twMerge(className, classNameProp) })
  }
}

const HomepageEditor = dynamic(() => import('./HomepageEditor'), { ssr: false })

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

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 xl:gap-y-16 [&>div]:p-3 [&>div]:py-5 md:[&>div]:p-4 md:[&>div]:py-6 mb-8 xl:mb-16">
        {/* stage 0 */}
        <div className="p-4 mx-4">
          <Image src={AppScreenshot} alt="App screenshot" />
        </div>
        <div>
          <h2 className="font-mono text-2xl font-normal mb-4">app.mdxeditor is in preview.</h2>

          <p className="text-lg">Edit, commit and push markdown in your GitHub repositories from your browser. No local setup necessary.</p>

          <div className="py-4 flex gap-8">
            <ActionLinkButton href="https://app.mdxeditor.dev/sandbox" className="border-accent-text bg-accent-text text-neutral-base">
              Try the app sandbox
            </ActionLinkButton>
          </div>
        </div>

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
            MDXEditor is an open-source React component that allows <br />
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
          <SampleCodeBlock
            title="Style the content editable area with your content CSS class"
            code={codeSample1}
            language="tsx"
            fromLine={3}
            toLine={3}
          />
        </div>
        <div>
          <h2 className="font-mono text-2xl mb-4">
            No more need for edit ↔ preview.
            <br />
          </h2>
          <p className="text-lg">What you see is what you get. Style the rich text with the same styles as your actual page.</p>

          <ActionLink href="editor/docs/content-styling">
            Read more about content styling <SlashedArrowIcon />
          </ActionLink>
        </div>
        {/* stage 3 */}
        <div>
          <h2 className="font-mono text-2xl mb-4">Code blocks with syntax highlighting, auto-complete, and live preview</h2>

          <p className="text-lg">
            No more code samples with sneaky syntax errors. Live preview of the snippet result, powered by Sandpack.
          </p>

          <ActionLink href="editor/docs/code-blocks">
            Code blocks docs <SlashedArrowIcon />
          </ActionLink>
        </div>
        <div>
          <Image src={SandpackScreenshot} alt="Sandpack screenshot" />
        </div>
        {/* stage 4 */}
        <div className="flex items-stretch">
          <SampleCodeBlock
            title="Use `+` as a bullet sign, `_` as emphasis"
            code={`
<MdxEditor
  markdown={markdown}
  toMarkdownOptions={{
    bullet: '+', 
    emphasis: '_'
  }}
/>
          `.trim()}
            language="tsx"
            fromLine={2}
            toLine={5}
          />
        </div>
        <div>
          <h2 className="font-mono text-2xl mb-4">Consistent, configurable markdown output</h2>

          <p className="text-lg">
            The component exposes properties that allow you to tune how the editor content gets converted to markdown. This lets you adjust
            formatting like the bullet style, the whitespace settings, the emphasis markers.
          </p>

          <ActionLink href="editor/docs/markdown-processing">
            Markdown processing explained <SlashedArrowIcon />
          </ActionLink>
        </div>
      </div>

      <h2 className="font-mono text-2xl mb-8 text-center">Feature overview</h2>

      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 list-[circle] list-inside mx-4 text-lg marker:text-accent-text">
        <li>
          <FeatureOverviewItem title="Table editor" link="editor/docs/tables">
            <p>Edit markdown tables with in a dedicated inline UI built for the markdown table syntax.</p>
            <p>Insert rows and columns, and manage column alignment.</p>
            <p>
              <a href="editor/demo">
                Test in the live demo <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Link dialog" link="editor/docs/links">
            <p>
              Users can insert links with a <code>Cmd+K</code> or through the toolbar button.
            </p>
            <p>Wire up autocomplete suggestions for the URL input field through a component prop.</p>
            <p>
              <a href="editor/demo">
                Test in the live demo <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Image support" link="editor/docs/images">
            <p>Paste, drag and drop images, or insert images from links.</p>
            <p>The image dialog can provide autocomplete suggestions for the image URL.</p>
            <p>
              <a href="editor/demo">
                Test in the live demo <SlashedArrowIcon />
              </a>
            </p>
            <p>
              <a href="editor/docs/images">
                Read the docs <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Front-matter editor" link="editor/docs/front-matter">
            <p>A property key-value panel that lets editor edit the markdown document front-matter.</p>

            <p>
              <a href="editor/demo">
                Test in the live demo <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Markdown shortcuts" link="editor/docs/markdown-shortcuts">
            <p className="mb-4">
              Use <code>```js</code> to start a code block, <code>#</code> to start a heading, etc.
            </p>

            <p className="mb-4">
              <a href="editor/docs/markdown-shortcuts">
                Full list
                <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Diff/source view" link="editor/docs/diff-source">
            <p className="mb-4">
              A switch in the toolbar lets the user preview a diff view of the document, or edit the markdown source as a plain text.
            </p>
            <p>
              <a href="editor/demo">
                Test in the live demo <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Directives" link="editor/docs/custom-directive-editors">
            <p className="mb-4">Flexible support for custom directives - you can embed the right YouTube cat video in your markdown!</p>

            <p>
              <a href="editor/docs/custom-directive-editors">
                Directive docs
                <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="MarkdownX Components" link="editor/docs/jsx">
            <p className="mb-4">
              Implement custom editors for the JSX components in your markdown. Or use the built-in one, it&apos;s also pretty cool.
            </p>

            <p>
              <a href="editor/docs/jsx">
                JSX plugin docs.
                <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Customizable toolbar" link="editor/docs/customizing-toolbar">
            <p className="mb-4">
              Inject your own toolbar items, re-arrange existing ones, and remove the ones you do not need. Nobody will judge you ;).
            </p>

            <p>
              <a href="editor/docs/customizing-toolbar">
                How to customize the toolbar <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
      </ul>
    </>
  )
}

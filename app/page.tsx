import { createElement, JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import HomepageEditor from './homepage-editor'
import SampleCodeBlock from './sample-code-block'
import { FeatureOverviewItem } from './FeatureOverviewItem'
import SlashedArrowIcon from './images/slashed_arrow.svg'
import Image from 'next/image'
import SandpackScreenshot from './images/sandpack-screenshot.png'

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

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-8 xl:gap-y-16 [&>div]:p-4 [&>div]:py-6 mb-8 xl:mb-16">
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
            title="Use + as a bullet sign, and _ as emphasis"
            code={`
<MdxEditor
  markdown={markdown}
  lexicalConvertOptions={
  options: {
    bullet: '+', 
    emphasis: '_'
    }
  }
/>
          `.trim()}
            language="tsx"
            fromLine={2}
            toLine={7}
          />
        </div>
        <div>
          <h2 className="font-mono text-2xl mb-4">Consistent, configurable markdown output</h2>

          <p className="text-lg">
            The component exposes properties that allow you to tune how the editor AST gets converted to markdown. This lets you choose the
            bullet style, the whitespace settings, the emphasis markers and much more.
          </p>

          <ActionLink href="editor/docs/markdown-processing">
            Markdown processing explained <SlashedArrowIcon />
          </ActionLink>
        </div>
      </div>

      <h2 className="font-mono text-2xl mb-8 text-center">Feature overview</h2>

      <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6 list-[circle] list-inside mx-4 text-lg marker:text-accent-text">
        <li>
          <FeatureOverviewItem title="Table editor">
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
          <FeatureOverviewItem title="Link dialog">
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
          <FeatureOverviewItem title="Image support">
            <p>Paste, drag and drop images, or insert images from the web.</p>
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
          <FeatureOverviewItem title="Frontmatter editor">
            <p>A property key-value panel that lets editor edit the markdown document frontmatter.</p>

            <p>
              <a href="editor/demo">
                Test in the live demo <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Markdown shortcuts">
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
          <FeatureOverviewItem title="Diff/source view">
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
          <FeatureOverviewItem title="MarkdownX Components">
            <p className="mb-4">
              Inline/block property editors allow users to change the component instance properties and the child markdown.
            </p>

            <p>
              <a href="editor/api/editor.jsxcomponentdescriptor">
                JsxComponentDescriptor API Reference
                <SlashedArrowIcon />
              </a>
            </p>
          </FeatureOverviewItem>
        </li>
        <li>
          <FeatureOverviewItem title="Customizable toolbar">
            <p className="mb-4">
              Inject your own toolbar items, change the order of the existing ones, or remove the ones you do not need. Nobody will judge
              you ;).
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

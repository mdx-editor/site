/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import { Highlight } from 'prism-react-renderer'

type SampleCodeBlockProps = {
  code: string
  language: string
  fromLine: number
  toLine: number
  title?: string
}

const SampleCodeBlock = ({ code, language, fromLine, toLine, title = 'Code Sample' }: SampleCodeBlockProps) => (
  <Highlight code={code} language={language} theme={undefined}>
    {({ tokens, getLineProps, getTokenProps }) => {
      return (
        <div className=" w-full p-3 rounded-md overflow-x-auto bg-neutral-bgSubtle">
          <h2 className="text-xs font-mono pb-1 mb-3 text-neutral-solid border-b-[1px] border-dashed border-neutral-border">{title}</h2>
          <pre className="text-sm">
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ line, className: i >= fromLine && i <= toLine ? 'my-line-highlight' : '' })}
                style={undefined}
              >
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} style={undefined} />
                ))}
              </div>
            ))}
          </pre>
        </div>
      )
    }}
  </Highlight>
)
export default SampleCodeBlock

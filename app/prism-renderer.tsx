/* eslint-disable @typescript-eslint/no-unsafe-assignment */
'use client'
import { Highlight } from 'prism-react-renderer'

const Prism = ({ code, language, fromLine, toLine }: { code: string; language: string; fromLine: number; toLine: number }) => (
  <Highlight code={code} language={language} theme={undefined}>
    {({ style, tokens, getLineProps, getTokenProps }) => {
      return (
        <pre style={{ backgroundColor: 'rgb(250, 250, 250)' }} className="w-full p-3 rounded-md">
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, className: i >= fromLine && i <= toLine ? 'my-line-highlight' : '' })} style={undefined}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} style={undefined} />
              ))}
            </div>
          ))}
        </pre>
      )
    }}
  </Highlight>
)
export default Prism

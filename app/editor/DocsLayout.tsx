import { FC, ReactNode } from 'react'

export const DocsLayout: FC<{
  nav: ReactNode
  content: ReactNode
  pageNav: ReactNode
}> = ({ nav, pageNav, content }) => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-3/12 leading-8">
        <div>{nav}</div>
      </div>
      <div className="flex-grow prose w-7/12 max-w-full">{content}</div>
      <div className="w-2/12">
        <div className="border-l-accent-solid border-dotted border-l-2 pl-2 font-light text-sm leading-7 sticky top-2">{pageNav}</div>
      </div>
    </div>
  )
}

import { FC, ReactNode } from 'react'

export const DocsLayout: FC<{
  nav: ReactNode
  content: ReactNode
  pageNav: ReactNode
}> = ({ nav, pageNav, content }) => {
  return (
    <div className="flex gap-4 p-4">
      <div className="w-56 [&_dt]:mb-3 [&_dd]:mb-3 [&_li]:mb-3 leading-5 text-sm [&_nav>a]:mb-4 flex-shrink-0">
        <div>{nav}</div>
      </div>
      <div className="flex-grow prose max-w-[unset] flex-wrap">{content}</div>

      <div className="w-48 flex-shrink-0">
        <div className="in-page-nav">{pageNav}</div>
      </div>
    </div>
  )
}

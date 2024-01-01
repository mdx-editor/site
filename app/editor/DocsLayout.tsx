import { FC, ReactNode } from 'react'
import { NavToggle } from './NavToggle'

export const DocsLayout: FC<{
  nav: ReactNode
  content: ReactNode
  pageNav: ReactNode
}> = ({ nav, pageNav, content }) => {
  return (
    <div className="md:flex gap-4 p-4">
      <div className="w-64 [&_dt]:mb-3 [&_dd]:mb-3 [&_li]:mb-3 leading-5 text-sm [&_nav>a]:mb-4 flex-shrink-0">
        <NavToggle>{nav}</NavToggle>
      </div>
      <div className="flex-grow prose max-w-[unset] flex-wrap overflow-x-auto doc-content">{content}</div>

      {pageNav && (
        <div className="w-48 flex-shrink-0 hidden md:block">
          <div className="in-page-nav">{pageNav}</div>
        </div>
      )}
    </div>
  )
}

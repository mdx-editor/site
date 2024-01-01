'use client'

import classNames from 'classnames'
import { ReactNode, useState } from 'react'
import Menu from '../images/menu.svg'

export const NavToggle: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [showNav, setShowNav] = useState(false)

  return (
    <>
      <button
        onClick={(e) => {
          e.preventDefault()
          setShowNav((v) => !v)
        }}
        className="block md:hidden fixed top-4 right-4 z-40"
      >
        <Menu width={24} height={24} />
      </button>
      <div
        className={classNames(
          'z-30 max-h-screen md:block fixed min-h-screen p-4 pr-12 top-0 right-0 md:sticky md:top-[92px] md:p-0 md:min-h-fit bg-white md:max-h-[calc(100vh-92px)] overflow-auto',
          {
            hidden: !showNav,
          }
        )}
      >
        {children}
      </div>
    </>
  )
}

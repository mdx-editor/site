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
        className="block md:hidden fixed top-4 right-4 z-10"
      >
        <Menu width={24} height={24} />
      </button>
      <div
        className={classNames('md:block absolute min-h-screen p-4 pr-12 top-0 right-0 md:static md:p-0 md:min-h-fit bg-white', {
          hidden: !showNav,
        })}
      >
        {children}
      </div>
    </>
  )
}

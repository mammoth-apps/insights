import React, { DetailedHTMLProps } from 'react'
import { MobileUserProfileMenu } from '../user/MobileUserProfileMenu'

interface IMobileMenuProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  isOpen: boolean
}

export const MobileMenu = ({ isOpen }: IMobileMenuProps) => {
  return (
    <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Dashboard
        </a>

        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Team
        </a>

        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Projects
        </a>

        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Calendar
        </a>

        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Reports
        </a>
      </div>
      <MobileUserProfileMenu />
    </div>
  )
}

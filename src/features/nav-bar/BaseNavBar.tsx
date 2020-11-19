import React from 'react'
import { Link } from 'react-router-dom'
import { HeaderDropdownToggle, HeaderLinks } from '../../components/header'

export /**
 * This is the default header that is displayed on the base pages.
 *
 * @returns
 */
const BaseNavBar = () => {
  return (
    <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
      <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
        <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/" aria-label="Home">
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg"
                alt="Logo"
              />
            </Link>
            <div className="-mr-2 flex items-center md:hidden">
              <HeaderDropdownToggle />
            </div>
          </div>
        </div>
        <HeaderLinks />
      </nav>
    </div>
  )
}

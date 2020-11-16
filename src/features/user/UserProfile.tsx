import { useAuth0 } from '@auth0/auth0-react'
import { Transition } from '@headlessui/react'
import React, { useState } from 'react'

export const UserProfile = () => {
  const { user } = useAuth0()
  console.log(user)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const onIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }
  return (
    <>
      <div className="ml-3 relative">
        <div>
          <button
            className="max-w-xs flex items-center text-sm rounded-full text-white focus:outline-none focus:shadow-solid"
            id="user-menu"
            aria-label="User menu"
            aria-haspopup="true"
            onClick={onIconClick}
          >
            <img className="h-8 w-8 rounded-full" src={user?.picture} alt="" />
          </button>
        </div>
        <Transition
          show={isDropdownOpen}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
            <div
              className="py-1 rounded-md bg-white shadow-xs"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="user-menu"
            >
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Your Profile
              </a>

              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Settings
              </a>

              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
              >
                Sign out
              </a>
            </div>
          </div>
        </Transition>
      </div>
    </>
  )
}

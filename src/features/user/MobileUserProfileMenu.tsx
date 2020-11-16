import { useAuth0 } from '@auth0/auth0-react'
import React from 'react'

export const MobileUserProfileMenu = () => {
  const { user } = useAuth0()
  return (
    <div className="pt-4 pb-3 border-t border-gray-700">
      <div className="flex items-center px-5 space-x-3">
        <div className="flex-shrink-0">
          <img
            className="h-10 w-10 rounded-full"
            src={user?.picture ?? ''}
            alt=""
          />
        </div>
        <div className="space-y-1">
          <div className="text-base font-medium leading-none text-white">
            {user?.name ?? 'Name not found'}
          </div>
          <div className="text-sm font-medium leading-none text-gray-400">
            {user?.email ?? 'somethingIsWrong@uhoh.com'}
          </div>
        </div>
      </div>
      <div className="mt-3 px-2 space-y-1">
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Your Profile
        </a>

        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Settings
        </a>

        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700"
        >
          Sign out
        </a>
      </div>
    </div>
  )
}

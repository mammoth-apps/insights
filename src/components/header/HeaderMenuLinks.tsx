import React from 'react'

export const HeaderMenuLinks = () => {
  return (
    <>
      <div className="px-2 pt-2 pb-3">
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
          role="menuitem"
        >
          Product
        </a>
        <a
          href="#"
          className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
          role="menuitem"
        >
          Features
        </a>
        <a
          href="#"
          className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
          role="menuitem"
        >
          Marketplace
        </a>
        <a
          href="#"
          className="mt-1 block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50 focus:outline-none focus:text-gray-900 focus:bg-gray-50 transition duration-150 ease-in-out"
          role="menuitem"
        >
          Company
        </a>
      </div>
      <div>
        <a
          href="#"
          className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700 focus:outline-none focus:bg-gray-100 focus:text-indigo-700 transition duration-150 ease-in-out"
          role="menuitem"
        >
          Log in
        </a>
      </div>
    </>
  )
}

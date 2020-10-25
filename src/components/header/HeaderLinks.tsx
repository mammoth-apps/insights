import React from 'react'

export const HeaderLinks = () => {
  return (
    <div className="hidden md:block md:ml-10 md:pr-4">
      <a
        href="#"
        className="font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
      >
        Product
      </a>
      <a
        href="#"
        className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
      >
        Features
      </a>
      <a
        href="#"
        className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
      >
        Marketplace
      </a>
      <a
        href="#"
        className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
      >
        Company
      </a>
      <a
        href="#"
        className="ml-8 font-medium text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
      >
        Log in
      </a>
    </div>
  )
}

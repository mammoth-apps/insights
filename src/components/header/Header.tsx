import { Transition } from '@headlessui/react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '../../app/rootReducer'
import { HeaderMenuLinks } from './HeaderMenuLinks'
import { setDropdownOpen } from './headerSlice'

export const Header = () => {
  const dispatch = useDispatch()
  const { isDropdownOpen } = useSelector((state: RootState) => state.headerUI)

  return (
    <Transition
      show={isDropdownOpen}
      enter=" ease-out duration-150"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave=" ease-in duration-100 "
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95"
    >
      <div className="absolute top-0 inset-x-0 p-2 transform origin-top-right md:hidden">
        <div className="rounded-lg shadow-md">
          <div
            className="rounded-lg bg-white shadow-xs overflow-hidden"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="main-menu"
          >
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg"
                  alt=""
                />
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 focus:text-gray-500 transition duration-150 ease-in-out"
                  aria-label="Close menu"
                  onClick={() => dispatch(setDropdownOpen(false))}
                >
                  <svg
                    className="h-6 w-6"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <HeaderMenuLinks />
          </div>
        </div>
      </div>
    </Transition>
  )
}

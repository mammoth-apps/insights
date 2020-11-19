import React from 'react'
import { Link } from 'react-router-dom'
import { InsightRoute } from '../../router/routes'

export const HeaderLinks = () => {
  return (
    <div className="hidden md:block md:ml-10 md:pr-4">
      <Link
        to={InsightRoute.Features}
        className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
      >
        Features
      </Link>
      <Link
        to={InsightRoute.Company}
        className="ml-8 font-medium text-gray-500 hover:text-gray-900 transition duration-150 ease-in-out"
      >
        Company
      </Link>
      <Link
        to={InsightRoute.Login}
        className="ml-8 font-medium text-indigo-600 hover:text-indigo-900 transition duration-150 ease-in-out"
      >
        Log in
      </Link>
    </div>
  )
}

import React from 'react'
import {
  Header,
  HeaderLinks,
  HeaderDropdownToggle,
} from '../../components/header'

import DataTrends from '../../../public/assets/undraw_data_trends_b0wg.svg'
import { Link } from 'react-router-dom'
import { InsightRoute } from '../../router/routes'
import { BaseNavBar } from '../nav-bar/BaseNavBar'
import { withNavigationBar } from '../hoc/withNavigationBar'

interface BasePageProps {}
const BasePageComponent: React.FC<BasePageProps> = ({}): JSX.Element => {
  return (
    <section className="relative bg-white overflow-hidden  h-screen">
      <div className="max-w-screen-xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>
          {/* <BaseNavBar /> */}

          {/* <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
            <nav className="relative flex items-center justify-between sm:h-10 lg:justify-start">
              <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
                <div className="flex items-center justify-between w-full md:w-auto">
                  <a href="#" aria-label="Home">
                    <img
                      className="h-8 w-auto sm:h-10"
                      src="https://tailwindui.com/img/logos/v1/workflow-mark-on-white.svg"
                      alt="Logo"
                    />
                  </a>
                  <div className="-mr-2 flex items-center md:hidden">
                    <HeaderDropdownToggle />
                  </div>
                </div>
              </div>
              <HeaderLinks />
            </nav>
          </div> */}
          <Header />
          <article className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h2 className="text-4xl tracking-tight leading-10 font-extrabold text-gray-900 sm:text-5xl sm:leading-none md:text-6xl">
                Analytics to enhance your
                <br className="xl:hidden" />
                <span className="text-indigo-600"> financial savvy</span>
              </h2>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                When every swipe, tap, and cash payment is tracked, the full
                picture of your finances comes to life. Stop wondering where it
                goes and start getting <em>Insights</em> into your financial
                life.
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <Link
                    to={InsightRoute.Login}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </Link>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <Link
                    to="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-300 transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Live demo
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <DataTrends className="h-full w-full object-cover" />
      </div>
    </section>
  )
}

export const BasePage = withNavigationBar(BasePageComponent)

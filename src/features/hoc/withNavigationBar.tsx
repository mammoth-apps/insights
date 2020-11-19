import React, { ComponentType } from 'react'
import { BaseNavBar } from '../nav-bar/BaseNavBar'

export /**
 * A quick and dirty HOC to place the navigation bar at the top of the screen.
 *
 * @param {ComponentType} WrappedComponent
 * @returns
 */
const withNavigationBar = (WrappedComponent: ComponentType) => {
  return () => (
    <>
      <BaseNavBar />
      <WrappedComponent />
    </>
  )
}

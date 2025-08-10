import React from 'react'
import { Outlet } from 'react-router-dom'
import RouteTransition from '../components/RouteTransition'

/**
 * PublicLayout - Layout public PROMPT 1
 * <main className="page-bg"><RouteTransition/><Outlet/></main>
 */
const PublicLayout = () => {
  return (
    <main className="page-bg min-h-screen">
      <RouteTransition />
      <Outlet />
    </main>
  )
}

export default PublicLayout

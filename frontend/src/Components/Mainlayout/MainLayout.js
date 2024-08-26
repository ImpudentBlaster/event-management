import React from 'react'
import Sidebar from '../Sidebar/Sidebar'
import { Outlet } from 'react-router'
import './MainLayout.css'
function MainLayout() {
  return (
    <div className='mainlayout-grid'>
        <Sidebar/>
        <div className='mainlayout-outlet'>

   <Outlet />
        </div>
    </div>
  )
}

export default MainLayout
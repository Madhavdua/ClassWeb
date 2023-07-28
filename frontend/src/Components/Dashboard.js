import React from 'react'
import Navbar from './Navbar'
import Enrolledgroups from './Enrolledgroups'
import { Outlet } from 'react-router-dom'

function Dashboard() {
  return (
    <>
    <div >
    <Navbar/>
    <div>
        
    {/* outlet -> where the rendered comp will be shown */}

        <Outlet/>
    </div>

    </div>
    </>
  )
}

export default Dashboard
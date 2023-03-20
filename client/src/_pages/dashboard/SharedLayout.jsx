import React from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '../../_assets/wrappers/SharedLayout'
import {BigSidebar, Navbar, SmallSidebar } from '../../_components'
const SharedLayout = () => {
  return (
    <Wrapper>
      <main className='dashboard'>
        <BigSidebar />
        <SmallSidebar />
        <div>
          <Navbar />
          <div className='dashboard-page'>
            <Outlet />
          </div>
        </div>
      </main>
    </Wrapper>
  )
}

export default SharedLayout
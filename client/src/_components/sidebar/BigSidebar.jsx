import React from 'react'
import Wrapper from '../../_assets/wrappers/BigSidebar'
import cs from 'classnames'
import Logo from '../Logo'
import SidebarLinks from './SidebarLinks'
import { useSelector } from "react-redux";

const BigSidebar = () => {
  const { showSidebar } = useSelector( state => state.common )
  return (
    <Wrapper>
      <div className={ cs('sidebar-container', 
      {[`show-sidebar`]: !showSidebar}) } >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <SidebarLinks />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar
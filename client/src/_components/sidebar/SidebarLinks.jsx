import React from 'react'
import links from '../../_utils/navData'
import { useDispatch } from "react-redux";
import cs from 'classnames'
import { NavLink } from 'react-router-dom'
import { toggleSidebar } from "../../_actions/commonAction";
const SidebarLinks = () => {
  const dispatch = useDispatch()
 
  return(
    <div className='nav-links'>
      {
        links.map((link) => {
          const { id, text, path, icon } = link
          return(
            <NavLink
              to={ path }
              key= { id }
              onClick={ () => dispatch(toggleSidebar()) }
              className= 'nav-link active'
              // className = { cs('nav-link', {[`active`]: isActive })}
            >
              <span className='icon'> { icon } </span>
              <span> { text } </span>
            </NavLink>
          )
        })
      }
    </div>
  )
}

export default SidebarLinks
import React from 'react'
import Wrapper from '../../_assets/wrappers/SmallSidebar'
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar} from "../../_actions/commonAction";
import cs from 'classnames'
import Logo from '../Logo'
import { FaTimes } from 'react-icons/fa'
import SidebarLinks from './SidebarLinks'
const SmallSidebar = () => {
  const { showSidebar } = useSelector( state => state.common )
  const dispatch = useDispatch()
  return (
    <Wrapper>
      <div className={ cs(`sidebar-container`, 
      {[`show-sidebar`]: showSidebar })}
      >
        <div className="content">
          <button
          type='button'
          className='close-btn'
          onClick = {  () => { dispatch(toggleSidebar()) } }
          >
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <SidebarLinks/>
        </div>
      </div>
    </Wrapper>
  )
}

export default SmallSidebar
import React, {useState} from 'react'
import Wrapper from '../_assets/wrappers/Navbar'
import { logOutUser } from '../_actions/registerAction'
import { toggleSidebar } from "../_actions/commonAction";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { Logo } from './index'
import cs from 'classnames'
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const dispatch = useDispatch()
  const [ logOut, setLogout ] = useState(false)
  const { user } = useSelector( state => state.register )

  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button'
          className='toggle-btn'
          onClick={ () => dispatch(toggleSidebar()) }
        >
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h3 className='logo-text'>dashboard</h3>
        </div>
        <div className='btn-container'>
          <button
            type="button" 
            className='btn'
            onClick={ () => setLogout(!logOut) }
          >
            <FaUserCircle />
            { user?.username}
            <FaCaretDown />
          </button>
          <div className={ cs('dropdown', {'show-dropdown': logOut} )}>
            <button
              type='button'
              onClick={() => dispatch(logOutUser())}
              className='dropdown-btn'
            >
              Logout 
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  )
}

export default Navbar
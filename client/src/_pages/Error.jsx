import React from 'react'
import Wrapper from '../_assets/wrappers/ErrorPage'
import unfound from '../_assets/images/not-found.svg'
import { Link } from 'react-router-dom'

const Error= () => {
  return (
    <Wrapper>    
      <div className='full-page'>
        <img src={ unfound } alt="unfound" />
        <Link to='/landing'>
          'Back to hompage'
        </Link>
      </div>
    </Wrapper>
  )
}

export default Error
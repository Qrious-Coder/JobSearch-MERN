import React, {useEffect} from 'react';
import  { Logo , ToggleTheme } from '../_components';
import main from '../_assets/images/main.svg';
import Wrapper from '../_assets/wrappers/LandingPage';
import { Link, Navigate} from 'react-router-dom';
import { getCurrentUser } from "../_actions/registerAction";
import { useSelector, useDispatch } from "react-redux";

const Landing = () => {
  const { user } = useSelector( state => state.register )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCurrentUser());
    // eslint-disable-next-line
  }, []);

  return (
    <React.Fragment>
      { user && <Navigate to='/' /> }
        <Wrapper>
          <ToggleTheme />
          <nav>
            <Logo />
          </nav>
          <div className='container page'>
            <div>
              <h1>
                job <span>tracking</span> app
              </h1>
              <p>
                I'm baby wayfarers hoodie next level taiyaki brooklyn cliche blue
                bottle single-origin coffee chia. Aesthetic post-ironic venmo,
                quinoa lo-fi tote bag adaptogen everyday carry meggings +1 brunch
                narwhal.
              </p>
              <Link to='/register' className='btn btn-hero'>
                Login/Register
              </Link>
            </div>
            <img src={ main } alt='main-img' className='img main-img' />
          </div>
      </Wrapper>
    </React.Fragment>
  )
}

export default Landing
import React, { useState, useEffect } from 'react'
import { Logo, FormRow, Alert, ToggleTheme} from '../_components'
import Wrapper from '../_assets/wrappers/RegisterPage'
import { useNavigate } from 'react-router-dom'
import { setupUser } from '../_actions/registerAction'
import { displayAlert } from '../_actions/commonAction'
import { useSelector, useDispatch } from "react-redux";

const initState = {
  username: '',
  email:'',
  pw:'',
  isMember: false,
}

const Register = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.register)
  const { isLoading } = useSelector( state => state.common )
  const [formData, setFormData] = useState(initState)
  const { email, pw, isMember, username} = formData
  useEffect(() => {
    if(user){
      setTimeout(() => {
        navigate('/')
      }, 1000);
    }
  },[navigate, user])

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if( !email || !pw  || (!isMember && !username) ){
      dispatch(displayAlert({ alertText: 'Please provide all input',
        alertType: 'error'}))
      return
    }
    const currentUser= { name: username, pw , email }
    if( isMember ){
      dispatch(setupUser({currentUser,
      endpoint: '/auth/login',
      alertText: 'Login successfully. Redirecting...' } ))
    }else{
      dispatch(setupUser({currentUser,
        endpoint: '/auth/register',
        alertText: 'Register successfully. Redirecting...' } ))
    }
  }
  const toggleForm = () => {
    setFormData({...formData, isMember: !formData.isMember})
  }
  return (
    <Wrapper className='full-page'>
      <section>           
        <form className='form' onSubmit={ handleSubmit }>
          <Logo />
          <h3>{ isMember ? 'Login' : 'Register'}</h3>
          <Alert />
          { !isMember && <FormRow 
            label='Username'
            type='text'
            name='username'
            value={ username }
            placeholder='e.g. user01'
            onChange={ handleChange }
          />}

          <FormRow 
            label='Email'
            type='email'
            name='email'
            value={ email }
            placeholder='e.g. my_email@gmail.com'
            onChange={ handleChange }
          />

          <FormRow 
            label='Password'
            type='password'
            name='pw'
            value={ pw }
            placeholder='8-15 chars, including 1 number and 1 symbol'
            onChange={ handleChange }
          />

          <button className='btn btn-block' 
            type='submit'
            disabled={ isLoading }
            >
            { isMember ?
              `LOGIN`:
              `REGISTER`}
          </button>

          <button className='btn btn-block'
            type='button'
            disabled={ isLoading }
            onClick={ () =>
              dispatch(setupUser({
                currentUser: {
                  pw: 'qwer1234',
                  email: 'tester@gmail.com'
                },
                endpoint: '/auth/login',
                alertText: 'Login successfully. Redirecting...' } ))
          }
          >
          Try our App!
          </button>
          <p>
            <span>
              { !isMember ?
              'Not a member yet? ':
              'Already a member? ' 
              }
            </span>
            <span 
              className='member-btn'
              onClick={ toggleForm }
              >
              { !isMember ? 'Register' : 'Login'}
            </span>
          </p>
        </form>
      </section>
      <ToggleTheme />
    </Wrapper>
  )
}

export default Register
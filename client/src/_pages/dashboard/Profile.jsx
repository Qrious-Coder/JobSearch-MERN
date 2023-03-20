import React, { useState } from 'react'
import { FormRow, Alert} from '../../_components'
import Wrapper from '../../_assets/wrappers/DashboardFormPage'
import { updateUser  } from '../../_actions/registerAction'
import { displayAlert} from "../../_actions/commonAction";
import { useSelector, useDispatch } from "react-redux";

const Profile = () => {
  const dispatch = useDispatch()
  const { isLoading } = useSelector( state => state.common )
  const { name, lastName, email, location  } = useSelector( state => state.register.user )
  const [formData, setFormData] = useState({
    username: name || '',
    lastName: lastName || '',
    email: email || '',
    location: location
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    const { username, lastName, email, location } = formData
    e.preventDefault()
    if( !email || !username  || !lastName || !location  ){
      dispatch(displayAlert({
        alertText: 'Please provide all input',
        alertType: 'error'}))
      return
    }
    const currentUser = { username, lastName , email, location }
    dispatch(updateUser(currentUser))
  }

  return (
    <Wrapper>
      <section>           
        <form className='form' onSubmit={ handleSubmit }>
          <h3>PROFILE</h3>
          <Alert /> 
          <div className='form-center'>
            <FormRow 
              label='First name'
              type='text'
              name='username'
              value={ formData.username }
              onChange={ e => handleChange(e) } 
            />

            <FormRow 
              label='Last name'
              type='text'
              name='lastName'
              value={ formData.lastName }
              placeholder='8-15 chars, including 1 number and 1 symbol'
              onChange={ e => handleChange(e) } 
            />

            <FormRow 
              label='Email'
              type='email'
              name='email'
              value={ formData.email }
              onChange={ e => handleChange(e) } 
            />

            <FormRow 
              label='Location'
              type='text'
              name='location'
              value={ formData.location }
              onChange={ e => handleChange(e) } 
            />

            <button className='btn btn-block'
              type='submit'
              disabled={ isLoading }
              >
              { isLoading ?
                `Wait, saving...`:
                `UPDATE`}
            </button>
          </div>
        </form>
      </section>
    </Wrapper>
  )
}

export default Profile
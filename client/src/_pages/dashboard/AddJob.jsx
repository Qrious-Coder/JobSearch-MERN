import React from 'react'
import { FormRow, Alert} from '../../_components'
import Wrapper from '../../_assets/wrappers/DashboardFormPage'
import { displayAlert } from '../../_actions/commonAction'
import FormRowSelect from "../../_components/FormRowSelect";
import { handleInputChange, clearAllInput,
  createJob, editJob  } from "../../_actions/jobAction";
import { useSelector, useDispatch } from "react-redux";

const AddJob = () => {
  const dispatch = useDispatch()
  const { isEdit, editJobId, position,
    company, jobLocation, jobTypeOptions, jobType,
    statusOptions, status } = useSelector(  state => state.job )
  const { isLoading } = useSelector( state => state.common )
  const handleChange = (e) => {
    dispatch( handleInputChange({name: e.target.name , value: e.target.value }) )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if( !position || !company  || !jobLocation ){
      dispatch(displayAlert({
        alertText: 'Please provide all input',
        alertType: 'error'}))
      return
    }
    const currentJob = { position, company, jobLocation, jobType, status}
    if( isEdit) {
      return dispatch(editJob({ _id: editJobId, currentJob }))
    } else {
      return dispatch(createJob({ currentJob } ))
    }
  }

  const handleClear = () => {
    dispatch(clearAllInput())
  }
  return (
      <Wrapper>
        <section>
          <form className='form' onSubmit={ handleSubmit }>
            <h3>{ isEdit ? 'EDIT JOB' : 'ADD NEW JOB'}</h3>
            <Alert />
            <div className='form-center'>
              <FormRow
                  label='Position'
                  type='text'
                  name='position'
                  value={ position }
                  onChange={ handleChange }
              />

              <FormRow
                  label='Company'
                  type='text'
                  name='company'
                  value={ company }
                  onChange={ handleChange }
              />

              <FormRow
                  label='Location'
                  type='text'
                  name='jobLocation'
                  value={ jobLocation }
                  onChange={ handleChange }
              />

              <FormRowSelect
                label='Type'
                name='jobType'
                value={ jobType }
                placeholder={ 'full-time' }
                list = {jobTypeOptions }
                onChange={ handleChange }
              />

              <FormRowSelect
                label='Status'
                name='status'
                value={ status }
                placeholder={ 'full-time' }
                list = { statusOptions }
                onChange={ handleChange }
              />

              <div className='btn-container'>
                <button className='btn btn-block'
                  type='submit'
                  onClick={ handleSubmit }
                  disabled={ isLoading }
                >
                  SUBMIT
                </button>
                <button className='btn btn-block clear-btn'
                  onClick={ handleClear }
                  disabled={ isLoading }
                >
                  RESET
                </button>
              </div>
            </div>
          </form>
        </section>
      </Wrapper>
  )
}

export default AddJob
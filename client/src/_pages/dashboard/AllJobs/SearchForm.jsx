import React, {  useMemo, useState } from 'react';
import { Alert, FormRow } from "../../../_components";
import FormRowSelect from "../../../_components/FormRowSelect";
import Wrapper from "../../../_assets/wrappers/DashboardFormPage";
import { useSelector, useDispatch } from "react-redux";
import { clearFilter, handleInputChange} from "../../../_actions/jobAction";

const SearchForm = () => {
  const dispatch = useDispatch()
  const { statusOptions, jobTypeOptions, searchType,
    searchStatus, sort, sortOptions
  } = useSelector( state => state.job )

  const [ localSearch, setLocalSearch ] = useState('')
  const { isLoading } = useSelector( state => state.common )

  const handleChange = (e) => {
    dispatch( handleInputChange({ name: e.target.name ,
      value: e.target.value }) )
  }

  const debounce = () => {
    let timeOutId;
    return (e) => {
      //e <-- synthetic call
      const { name, value } = e.target
      setLocalSearch( value) //<-- async call
      //Within 1 second, clear the last typing value
      clearTimeout(timeOutId)
      timeOutId = setTimeout(() => {
        dispatch( handleInputChange(
          {name: name ,
          value: value }) )
      }, 1000)
    }
  }
  const debounceOptimized = useMemo(() => debounce(), [])
  return (
    <Wrapper>
      <section>
        <form className='form'>
          <h3>SEARCH JOB</h3>
          <Alert />
          <div className='form-center'>
            <FormRow
              label='Search by Position'
              type='text'
              name='search'
              value={ localSearch }
              onChange={ debounceOptimized }
            />

            <FormRowSelect
              label='Status'
              name= 'searchStatus'
              value={ searchStatus }
              list = { ['all',...statusOptions] }
              onChange={ handleChange }
            />

            <FormRowSelect
              label='Type'
              name= 'searchType'
              value={ searchType }
              list = { ['all',...jobTypeOptions] }
              onChange={ handleChange }
            />

            <FormRowSelect
              label='Sort by'
              name= 'sort'
              value={ sort }
              list = { sortOptions }
              onChange={ handleChange }
            />

            <div className='btn-container'>
              <button className='btn btn-block clear-btn'
                onClick={ () => dispatch(clearFilter()) }
                disabled={ isLoading }
              >
                RESET ALL
              </button>
            </div>
          </div>
        </form>
      </section>
    </Wrapper>
  );
};

export default SearchForm;
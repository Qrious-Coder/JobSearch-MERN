import { baseApi } from "../_services/authApi";
import { logOutUser } from "./registerAction";
import { isLoading, hasLoaded, displayAlert } from "./commonAction"
import { jobActions } from '../_actionTypes'

export const handleInputChange = ({ name, value }) => async( dispatch ) => {
  dispatch({
    type: jobActions.HANDLE_INPUT_CHANGE,
    payload: { name, value }
  })
}

export const clearAllInput = () => async( dispatch )=> {
  dispatch({
    type: jobActions.CLEAR_ALL_INPUT,
  })
}

export const createJob = (currentJob) => async( dispatch ) => {
  dispatch(isLoading())
  try{
    const res = await baseApi.post('/jobs', currentJob)
    console.log('@ ====> api/v1/jobs ==> res.data', res?.data)
    dispatch(hasLoaded())
    dispatch({
      type: jobActions.CREATE_JOB_SUCCESS,
      payload: currentJob
    })
    dispatch(displayAlert({
      alertText: 'Job is added successfully!',
      alertType: 'success'
    }))
    setTimeout(() => {
      dispatch(clearAllInput())
    },2000)

  } catch(err) {
    const { msg } = err?.response?.data.defaultError
    // dispatch(hasLoaded())
    console.log(`@ ===> /api/v1/jobs ==>err.res`, err?.response)
    if( err?.response.status !== 401){
      dispatch(displayAlert({
        alertText: msg,
        alertType: 'error'
      }))
    }else{
      dispatch(logOutUser())
    }
  }
}

export const getAllJobs = ({ page ,search, searchType, searchStatus, sort}) => async( dispatch) => {
  let url = `/jobs?page=${ page }&status=${ searchStatus }&jobType=${searchType }&sort=${sort }`
  if(search.length > 0){
    url = url + `&search=${search}`
  }
  dispatch(isLoading())
  try{
    const res = await baseApi.get(url)
    const { jobs, numOfPages, total } = res.data
    console.log('@ ====> api/v1/jobs ==> res.data', res?.data)
    dispatch(hasLoaded())
    dispatch({
      type: jobActions.GET_JOBS_SUCCESS,
      payload: { jobs, numOfPages, total }
    })
  } catch(err) {
    dispatch(hasLoaded())
    console.log( '@ ====> api/v1/jobs ==> res.err', err)
    dispatch(logOutUser())
  }
}

export const setEditJob = ({_id}) => async( dispatch ) => {
  dispatch({
    type: jobActions.SET_EDIT_JOB,
    payload: _id
  })
}

export const editJob = ({_id, currentJob }) => async( dispatch ) => {
  dispatch(isLoading())
  try {
    const res = await baseApi.patch(`/jobs/${_id}`, currentJob )
    dispatch(hasLoaded())
    console.log(`@ ====> api/v1/jobs/${_id} ==> res.data`, res?.data)
    dispatch(displayAlert({
      alertText: 'Job saved!',
      alertType: 'success'
    }))
    dispatch(clearAllInput())
  } catch(err) {
    const { msg } = err?.response?.data.defaultError
    dispatch(hasLoaded())
    console.log(`@ ===> /api/v1/jobs ==>err.res`, err.response)
    if( err?.response.status !== 401){
      dispatch(displayAlert({
        alertText: msg,
        alertType: 'error'
      }))
    }else{
      dispatch(logOutUser())
    }
  }
}

export const deleteJob = ({_id }) => async( dispatch ) => {
  dispatch(isLoading())
  try{
    dispatch(hasLoaded())
    await baseApi.delete(`/jobs/${_id}` )
    dispatch({
      type: jobActions.DELETE_JOB_SUCCESS,
      payload: {_id}
    })
  }
  catch(err){
    const { msg } = err?.response?.data.defaultError
    dispatch(hasLoaded())
    console.log(`@ ===> /api/v1/jobs ==>err.res`, err?.response)
    if(err?.response.status !== 401){
      dispatch(displayAlert({
        alertText: msg,
        alertType: 'error'
      }))
    }else{
      dispatch(logOutUser())
    }
  }
}

export const showStats = () => async( dispatch ) => {
  dispatch(isLoading())
  try {
    dispatch(hasLoaded())
    const res = await baseApi.get(`jobs/stats`)
    const { defaultStats, monthlyApplications } = res.data
    console.log(`@ ===> /api/v1/jobs/stats ==> res.data`, res.data)
    dispatch({
      type: jobActions.SHOW_STATS_SUCCESS,
      payload: { defaultStats, monthlyApplications }
    })
  } catch (err) {
    dispatch(hasLoaded())
    console.log(`@ ===> /api/v1/jobs/stats ==>err.res`, err?.response)
    dispatch( logOutUser() )
  }
}

export const clearFilter =() => async( dispatch ) => {
  dispatch({
    type: jobActions.CLEAR_FILTER
  })
}

export const changePage = (page) => async( dispatch ) => {
  dispatch({
    type: jobActions.CHANGE_PAGE,
    payload: page
  })
}


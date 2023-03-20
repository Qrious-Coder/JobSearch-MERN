import { baseApi } from "../_services/authApi";
import { isLoading, hasLoaded, displayAlert } from "./commonAction"
import { registerActions } from '../_actionTypes'

export const setupUser = ({currentUser, endpoint, alertText }) => async(dispatch) => {
  console.log('user', currentUser )
  dispatch(isLoading())
  try{
    const res = await baseApi.post(endpoint, currentUser )
    console.log(`@ ===> /api/v1${ endpoint }==>res.data`, res)
    const { user, location } = res?.data
    dispatch(hasLoaded())
    dispatch({
      type: registerActions.SETUP_USER_SUCCESS,
      payload: { user, location }
    })
    dispatch(displayAlert({
      alertText: alertText,
      alertType: 'success'
    }))
    // addUserToLocalStorage({ user, token, location })
  } catch(err) {
    const { msg } = err?.response?.data.defaultError
    console.log(`@ ===> /api/v1${ endpoint }==>err.res`, err?.response)
    dispatch(hasLoaded())
    dispatch(displayAlert({
      alertText: msg,
      alertType: 'error'
    }))
  }
}

export const logOutUser = () => async(dispatch) => {
  //** remove token at cookie
  await baseApi.get('/auth/logout')
  dispatch({type: registerActions.LOGOUT_USER })
  // removeFromLocalStorage()
}

export const updateUser = (currentUser)=> async(dispatch) => {
  dispatch(isLoading())
  try {
    const res = await baseApi.patch(`/auth/updateUser`, currentUser)
    console.log(`@ ===> /api/v1/auth/updateUser ==>res.data`, res)
    const { user, location } = res.data
    dispatch(hasLoaded())
    dispatch({
      type: registerActions.UPDATE_USER_SUCCESS,
      payload: {
        user,
        location,
      }
    })
    dispatch(displayAlert({
      alertText: 'User is updated successfully!',
      alertType: 'success'
    }))
    // addUserToLocalStorage( { user, token, location } )
  } catch(err) {
    console.log(`@ ===> /api/v1/auth/updateUser ==>err.res`, err)
    const { msg } = err?.response?.data.defaultError
    dispatch(hasLoaded())
    if( err?.response.status !== 401 ) {
      dispatch(displayAlert({
        alertText: msg,
        alertType: 'error'
      }))
    } else {
      dispatch(logOutUser())
    }
  }
}

export const getCurrentUser = () => async( dispatch ) => {
  dispatch({
    type: registerActions.GET_CURRENT_USER_BEGIN
  })
  try{
    const res = await baseApi.get(`/auth/getCurrentUser`)
    console.log(`@ ===> /api/v1//auth/getCurrentUser ==>res.data`, res)
    const {user, location } = res?.data
    dispatch({
      type: registerActions.GET_CURRENT_USER_SUCCESS,
      payload: { user, location }
    })
  } catch(err) {
    if(err.response.status !== 401) return
    dispatch(logOutUser())
  }
}

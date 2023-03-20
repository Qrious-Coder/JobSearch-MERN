import { commonActions } from '../_actionTypes'

export const isLoading = () => async(dispatch) => {
  dispatch({
    type: commonActions.IS_LOADING
  })
}

export const hasLoaded = () => async(dispatch) => {
  dispatch({
    type: commonActions.HAS_LOADED
  })
}
export const clearAlert = () => async(dispatch) => {
  setTimeout(() =>
      dispatch({
        type: commonActions.HIDE_ALERT,
      })
    , 3000)
}

export const displayAlert = ({alertText, alertType}) =>
  async(dispatch) => {
  dispatch({
    type: commonActions.SHOW_ALERT,
    payload: {
      alertText,
      alertType
    }
  })
  dispatch(clearAlert())
}

export const switchTheme = (val) => async(dispatch) => {
  dispatch({
    type: commonActions.THEME_CHANGE,
    payload: val
  })
}

export const toggleSidebar = () => async(dispatch) => {
  dispatch({
    type: commonActions.TOGGLE_SIDEBAR,
  })
}
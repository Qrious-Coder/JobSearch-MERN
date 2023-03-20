import { commonActions } from '../_actionTypes'

const initState  = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  theme: 'light',
  showSidebar: false,
}

export const commonReducer = ( state = initState, action ) => {
  switch(action.type){
    case commonActions.IS_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case commonActions.HAS_LOADED:
      return {
        ...state,
        isLoading: false
      }
    case commonActions.SHOW_ALERT:
      const { alertText, alertType } = action.payload
      return {
        ...state,
        isLoading: false,
        showAlert: true,
        alertText: alertText,
        alertType: alertType
      }
    case commonActions.HIDE_ALERT:
      return {
        ...state,
        isLoading: false,
        showAlert: false,
        alertText: '',
        alertType: ''
      }
    case commonActions.THEME_CHANGE: {
      return {
        ...state,
        theme: action.payload
      }
    }
    case commonActions.TOGGLE_SIDEBAR:
      return {
        ...state,
        showSidebar: !state.showSidebar }
    default:
      return state
  }
}
import { registerActions } from "../_actionTypes"

const initState= {
  // user: JSON.parse(localStorage.getItem("user" || {})) || null,
  // token: localStorage.getItem("token") ||null,
  // userLocation: localStorage.getItem("userLocation") || '',
  userLoading: true,
  user: null,
  userLocation: '',
  jobLocation: ''
}

export const registerReducer = ( state = initState, action) => {
  switch(action.type){
    case registerActions.SETUP_USER_SUCCESS:
      console.log(`registerActions.SETUP_USER_SUCCESS`, action.payload.user)
      return {...state,
        user: action.payload.user,
        userLocation: action.payload.location
      }

    case registerActions.LOGOUT_USER:
      return { ...initState,
        userLoading: false
      }

    case registerActions.UPDATE_USER_SUCCESS:
      return {...state,
        user: action.payload.user,
        userLocation: action.payload.location
      } 

    case registerActions.GET_CURRENT_USER_BEGIN:
      return { ...state,
        userLoading: true,
      }

    case registerActions.GET_CURRENT_USER_SUCCESS:
      return { ...state,
        userLoading: false,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location
      }
    default: 
      return state
  }
}
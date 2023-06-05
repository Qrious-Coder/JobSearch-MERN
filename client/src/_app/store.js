import { createStore, applyMiddleware } from "redux"
import rootReducer from '../_reducers'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';

const initState = {}
const middleware = [thunk]
const store = createStore(
  rootReducer,
  initState,
  composeWithDevTools(applyMiddleware(...middleware))
)
export default store


import { combineReducers } from 'redux'
import { registerReducer } from "./registerReducer";
import { jobReducer} from "./jobReducer";
import { commonReducer } from "./commonReducer";


const rootReducer = combineReducers({
  register: registerReducer,
  job: jobReducer,
  common: commonReducer
})
export default rootReducer

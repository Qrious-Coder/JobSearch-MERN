import { jobActions } from '../_actionTypes'

const initState = {
  _id:'',
  isEdit: false,
  editJobId: '',
  position:'',
  company: '',
  jobLocation: '',
  jobTypeOptions: ['full-time', 'part-time', 'flexible','remote', 'internship'],
  jobType: 'full-time',
  statusOptions:['interview', 'declined', 'pending'],
  status: 'pending',
  createdAt: '',

  jobs: [],
  total: 0,
  numOfPages: 1,
  page: 1,

  stats: [],
  monthlyApplications: [],

  search: '',
  searchType: 'all',
  searchStatus: 'all',
  sort: 'latest',
  sortOptions: ['latest', 'oldest', 'a-z', 'z-a']
}

export const jobReducer = ( state = initState, action ) => {
  switch(action.type){
    case jobActions.HANDLE_INPUT_CHANGE:
      return { ...state ,
        //pagination reset 1
        page: 1,
        [action.payload.name] : action.payload.value }

    case jobActions.CLEAR_ALL_INPUT:
      return {...state, ...initState }

    case jobActions.CREATE_JOB_SUCCESS:
      return { ...state,
        ...action.payload
        }

    case jobActions.DELETE_JOB_SUCCESS:
      return {...state,
        jobs: state.jobs.filter( job => job._id !== action.payload._id )
      }

    case jobActions.GET_JOBS_SUCCESS:
      return {
        ...state,
        jobs: action.payload.jobs,
        total: action.payload.total,
        numOfPages: action.payload.numOfPages,
      }

    case jobActions.SET_EDIT_JOB:
      //Todo: Check if _id found later
      const job = state.jobs.find( (job) => job._id === action.payload)
      const { _id, position, company,
        jobLocation, jobType, status} = job
      return {
        ...state,
        isEdit: true,
        editJobId: _id, //Check if I use editJobId correctly
        position,
        company,
        jobLocation,
        jobType,
        status
      }

    case jobActions.SHOW_STATS_SUCCESS:
      return {
        ...state,
        stats: action.payload.defaultStats,
        monthlyApplications: action.payload.monthlyApplications
      }

    case jobActions.CLEAR_FILTER:
      return {
        ...state,
        search: '',
        searchType: 'all',
        searchStatus: 'all',
        sort: 'latest',
      }

    case jobActions.CHANGE_PAGE:
      return {
        ...state,
        page: action.payload.page
      }
    default:
      return state
    }
}
import axios from 'axios'
// import { getToken } from '../_utils/tokenTools'

  //second way of using interceptor
export const baseApi = axios.create({
  baseURL: '/api/v1',
})

//use axios interceptors
//request

// baseApi.interceptors.request.use(
//   ( config ) => {
//     config.headers.Authorization = `Bearer ${getToken()}`
//     return config
//   }, (err) => {
//     return Promise.reject(err)
//   }
// )

/**response
 * Remove request when using cookies to get token
 */
baseApi.interceptors.response.use(
  (res) => {
    console.log(`axios res`, res)
    return res
  },
  (err) => {
    console.log(`@ =====> 401 err`,err.response)
    if( err.response.status === 401) {
      console.log('TOKEN EXPIRED. LOGGED OUT!')
    }
    return Promise.reject(err)
  }
)


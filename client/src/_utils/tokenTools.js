// localStorage shall be replaced with cookies
export const addUserToLocalStorage = ({ token, user, location }) => {
  localStorage.setItem( 'token', token )
  localStorage.setItem( 'user', JSON.stringify(user) )
  localStorage.setItem( 'userLocation', location )
}

// export const removeFromLocalStorage = () => {
//   localStorage.removeItem('token')
//   localStorage.removeItem('user')
//   localStorage.removeItem('userLocation')
// }

// export const getToken = () => {
//   let token = ''
//   if(localStorage.getItem('token') !== undefined){
//     token = JSON.parse(localStorage.getItem('token'))
//   }
//   return token
// }
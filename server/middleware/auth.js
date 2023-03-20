import { UnauthorizedError } from '../errors/index.js'
import jwt from 'jsonwebtoken'

//build a middleware to authenticate user

const authenticateUser = async (req, res, next) => {
  const token = req.cookies.token
  if( !token ) {
    throw new UnauthorizedError(`Access denied`)
  }
  try {
    const payload = jwt.verify( token, process.env.JWT_SECRET )
    const isTester = payload.userId === '63fcd8ebf6aa8e4e1dd0d251'
    req.user = { userId: payload.userId, isTester }
    next()
  } catch (err) {
    throw new UnauthorizedError('Access denied!')
  }
}
/**Refactor: replace localStorage with cookie */
// const authenticateUser = async (req, res, next) => {
//   console.log(`req.cookies`, req.cookies)
//   //Step 1: get req.header.authorization
//   const authHeader = req.headers.authorization
//   // console.log('authorization ======>', authHeader );
//   if( !authHeader || !authHeader.startsWith(`Bearer`) ) {
//     throw new UnauthorizedError('Access denied!')
//   }
//
//   //Step 2: get token to verify
//   const token = authHeader.split(' ')[1]
//   try {
//     const payload = jwt.verify( token, process.env.JWT_SECRET )
//     // console.log(`payload ====>`, payload)
//     /**send userID to req.user */
//     const isTester = payload.userId === '63fcd8ebf6aa8e4e1dd0d251'
//     req.user = { userId: payload.userId, isTester }
//     next()
//   } catch (err) {
//     throw new UnauthorizedError('Access denied!')
//   }
// }
export default authenticateUser
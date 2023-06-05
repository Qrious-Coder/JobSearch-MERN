import { UnauthorizedError } from '../errors/index.js'

export const checkAuth = ( reqUser, srcUserId) => {
  if(reqUser.userId === srcUserId.toString() ) return
  throw new UnauthorizedError('Not authorized to access this route!')
}
import { UnauthorizedError } from '../errors/index.js'

export const checkAuth = ( reqUserId, srcUserId) => {
  if(reqUserId === srcUserId.toString() ) return
  throw new UnauthorizedError('Not authorized to access this route!')
}
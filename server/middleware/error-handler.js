import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = ( err, req, res, next) => {
  console.log( err.message )
  const defaultError = {
    status: err.status || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || 'Busy Server. Try again later!'
  }
  if( err.name === 'ValidationError') {
    defaultError.status =  StatusCodes.BAD_REQUEST
    defaultError.msg = Object.values(err.errors)
    .map( item => item.message).join('.')
  }

  if(err.code && err.code===11000) {
    defaultError.status =  StatusCodes.BAD_REQUEST
    defaultError.msg= Object.keys( err.keyValue) +` has been registered.` 
  }
  res.status(defaultError.status).json({ defaultError })
}

export default errorHandlerMiddleware
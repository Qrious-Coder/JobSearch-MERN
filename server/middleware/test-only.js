import {BadRequestError} from "../errors/index.js";

const testerMiddleware = ( req, res, next) => {
  if( req.user.isTester ) {
    throw new BadRequestError(`Demo Test. Reading Only!`)
  }
  next();
}

export default testerMiddleware
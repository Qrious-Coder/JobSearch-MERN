import CustomApiError from "./CustomApiError.js";
import { StatusCodes } from 'http-status-codes';

class BadRequestError extends CustomApiError {
  constructor(message){
    super(message)
    this.status = StatusCodes.BAD_REQUEST
  }
}

export default BadRequestError 
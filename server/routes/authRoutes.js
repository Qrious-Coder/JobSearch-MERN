import express from 'express'
import rateLimiter from "express-rate-limit";
import {register, login, updateUser, getCurrentUser, logout} from '../controllers/authController.js'
import authenticateUser from '../middleware/auth.js'
import testerMiddleware from "../middleware/test-only.js";
import auth from "../middleware/auth.js";

const authRouter = express.Router()
const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15mim
  max: 100,
  message: 'To many request from this IP address, please try again after 15 min.'
})


authRouter.route('/register').post(apiLimiter, register)
authRouter.route('/login').post(apiLimiter, login)
authRouter.route('/updateUser').patch(authenticateUser, testerMiddleware, updateUser)
authRouter.route('/getCurrentUser').get(authenticateUser, getCurrentUser)
authRouter.route('/logout').get(logout)

export default authRouter
import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthorizedError } from '../errors/index.js'
import attachCookie from "../utils/attachCookie.js";

const register = async (req, res) => {
  const { name, email, password } = req.body

  if( !name || !email || !password) {
    throw new BadRequestError('Input cannot be empty!')
  }

  const emailAlreadyUsed = await User.findOne({ email })
  if(emailAlreadyUsed) {
    throw new BadRequestError('This email has been used!')
  }

  const user = await User.create({name, email, password})
  const token = user.createJWT()
  attachCookie({ res, token })
  res.status(StatusCodes.CREATED).json(
    { user:{
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      // location: user.location //Check: what's the use of adding location here?
    } , 
    // token,
    location: user.location // Check: userLocation: user.location
   })
}

const login = async (req, res) => {
  const { email, password } = req.body
  if( !email || !password){
    throw new BadRequestError('Input cannot be empty!')

  /**if user exist, verify pw
  * @models/user.js: password {select: false }
  * need to overwrite to add back pw's query
 */ 

  }
  const user = await User.findOne({ email }).select('+password')
  if(!user) {
    throw new UnauthorizedError('User does not exist!')
  }

  const isPwCorrect = await user.verifyPw( password )
  if( !isPwCorrect ){
    throw new UnauthorizedError('Wrong password!')
  }

  const token = user.createJWT()
 
  attachCookie({ res, token })
   //hide pw
  user.password = undefined
  res.status(StatusCodes.CREATED).json(
  { user,
    // token,
    location: user.location // Check: userLocation: user.location
  })
}

const updateUser = async (req, res) => {
  const { userId} = req.user
  console.log(`@ =====> userId`, userId)
  const { name, lastName, email, location } = req.body
  console.log('check isTester', req.user)

  if( !name || !lastName || !email || !location) {
    throw new BadRequestError('Please provide all info')
  }
  
  //find the user with id
  const user = await User.findOne({ _id: userId })

  //then update
  user.name = name
  user.lastName = lastName
  user.email = email
  user.location = location

 
  const token = user.createJWT()
  await user.save()
  //optional : create new token after updating user
  attachCookie({ res, token })
  res.status(StatusCodes.OK).json({
    user,
    // token,
    location: user.location // Check: userLocation: user.location
  })
}

//Fetch data after page refreshed
const getCurrentUser = async( req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location }) // Check: userLocation: user.location
}

const logout = async( req, res ) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now() + 1000)
  })
  res.status(StatusCodes.OK).json('Logout. Token removed from Cookie!')
}

export { register, login, updateUser, getCurrentUser, logout }
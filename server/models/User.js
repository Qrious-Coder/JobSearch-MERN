import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'Username is required!'],
    minLength: 3,
    maxLength: 20,
    trim: true
  },
  lastName: {
    type: String,
    minLength: 3,
    maxLength: 20,
    trim: true,
    default: 'lastName'
  },
  email: {
    type: String,
    validate: {
      validator: validator.isEmail,
      message: 'Please provide a valid email '
    },
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: [ true, 'Password is required!'],
    minLength: 6,
    trim: true,
    select: false,
  },
  location: {
    type: String,
    required: [ true, 'Your location is required!'],
    maxLength: 20,
    default: 'my city'
  }
})

UserSchema.pre('save', async function(){
  /** Result:
   * modifiedPath ====> [ 'name', 'lastName', 'email', 'location' ]
   */
  if( !this.isModified('password')) return //do nothing

  // console.log( `@========> UserSchema`, this)
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function(){
  return jwt.sign({ userId: this._id }, 
  process.env.JWT_SECRET,
  { expiresIn: process.env.JWT_LIFETIME }
  )
}

//Verify pw when login
UserSchema.methods.verifyPw = async function( loginPw ) {
  const isMatch = await bcrypt.compare( loginPw, this.password)
  return isMatch
}

export default mongoose.model('User', UserSchema)

//ref: https://mongoosejs.com/docs/validation.html
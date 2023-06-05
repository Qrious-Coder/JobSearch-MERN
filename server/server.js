// import cors from 'cors'
import express from 'express'
const app = express()

import dotenv from 'dotenv'
dotenv.config()

//Send error directly to middleware
import 'express-async-errors'
import cookieParser from 'cookie-parser'
//security package
import helmet from "helmet"
import xss from 'xss-clean'
import mongoSanitize from 'express-mongo-sanitize'

//** DB
import connectDB from './db/connect.js'
//** routers
import authRouter from './routes/authRoutes.js'
import jobRouter from './routes/jobRoutes.js'
//** middleware
import notFoundMiddleware from './middleware/not-found.js'
import errorHandlerMiddleware from './middleware/error-handler.js'
import authenticateUser from './middleware/auth.js'

import morgan from 'morgan'
if( process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
}

/* cors replace by proxy */
// app.use(cors())

// Calling the express.json() method for parsing
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(xss())
app.use(mongoSanitize())

app.get('/api/v1', (req, res) => {
  res.json({ msg: 'api/v1 connected'})
})

app.use('/api/v1/auth', authRouter )
app.use('/api/v1/jobs', authenticateUser, jobRouter)
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

//mongo return a promise
const start = async () => {
  try{
    await connectDB(process.env.MONGO_URL)
    app.listen( port, () => console.log(`Server is running on http://localhost:${port}`))
  } catch(err){
    console.log(err);
  }
}

start()
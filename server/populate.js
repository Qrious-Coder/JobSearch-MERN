import { readFile } from 'fs/promises'

import dotenv from 'dotenv'
dotenv.config()

import connectDB from './db/connect.js'
import Job from './models/Job.js'

const start = async() => {
  try{
    await connectDB(process.env.MONGO_URL)
    await Job.deleteMany()

    const jobList = JSON.parse(
      await readFile( new URL('./mock_data.json',
      import.meta.url))
    )
    await Job.create( jobList )
    console.log('Mock data imported into DB')
    process.exit(0)
  }catch(err){
    console.log(err)
    process.exit(1)
  }
}

start()
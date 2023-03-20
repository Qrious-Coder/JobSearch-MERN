import express  from 'express'
const jobRouter = express.Router()

import { createJob, 
  deleteJob, 
  getAllJobs, 
  updateJob, 
  showStats } from '../controllers/jobController.js'
import testerMiddleware from "../middleware/test-only.js";

jobRouter.route('/').post(testerMiddleware, createJob).get(getAllJobs)
jobRouter.route('/stats').get(showStats)
jobRouter.route('/:id').patch(testerMiddleware, updateJob).delete(testerMiddleware, deleteJob)

export default jobRouter
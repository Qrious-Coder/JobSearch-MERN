import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js'
import {checkAuth} from "../utils/checkAuth.js";
import mongoose from "mongoose"
import moment from "moment"

const createJob = async (req, res) => {
  const { position, company } = req.body
  if( !position || !company){
    throw new BadRequestError('Input empty!')
  }

  req.body.createdBy = req.user.userId
  const job = await Job.create( req.body )
  res.status(StatusCodes.CREATED).json({ job })
}
/**
 *Refactor getAllJobs
 * const getAllJobs = async (req, res) => {
 *   req.body.createdBy = req.user.userId
 *   const jobs = await Job.find()
 *   res.status(StatusCodes.OK).json({ jobs,
 *     total: jobs.length,
 *     numOfPages: 1
 *    })
 * }
 */

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort } = req.query
  const queryObject = { createdBy: req.user.userId }
  if(status !== 'all') {
    queryObject.status = status
  }
  if(jobType !== 'all' ) {
    queryObject.jobType = jobType
  }
  if(search) {
    queryObject.position = {$regex: search, $options: 'i'}
  }

  let result = Job.find(queryObject)

  if(sort === 'latest'){
    result = result.sort(`-createdAt`)
  }
  if(sort === 'oldest'){
    result = result.sort(`createdAt`)
  }
  if(sort === 'a-z'){
    result = result.sort(`position`)
  }
  if(sort === 'z-a'){
    result = result.sort(`-position`)
  }
  //Pagination
  const page = req.query.page || 1
  const limit = req.query.limit || 10
  const skip = (page-1) * limit
  result = result.skip(skip).limit(limit)

  const total = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(total/limit)

  const jobs = await result
  res.status(StatusCodes.OK).json({ jobs,
    total,
    numOfPages
  })
}

const updateJob = async (req, res) => {
  const { id: jobId} = req.params
  const { position, company } = req.body
  if( !position || !company ) {
    throw new BadRequestError('Please provide all input!')
  }
  const jobFoundById = await Job.findOne({ _id: jobId })

  if( !jobFoundById ){
    throw new NotFoundError(`No job found with ID ${ jobId }`)
  }
  //Authorized access
  checkAuth( req.user.userId, jobFoundById.createdBy )

  const jobUpdated = await Job.findOneAndUpdate({ _id: jobId},
    req.body,
    {
      new: true,
      runValidators: true,
      returnNewDocument: true, returnDocument: "after"
    }
  )

  res.status(StatusCodes.OK).json({ jobUpdated })
}

const deleteJob = async (req, res) => {
  const { id: jobId } = req.params
  const jobFoundById = await Job.findOne({ _id: jobId })

  if( !jobFoundById ) {
    throw new NotFoundError(`Job ID ${ jobId } does not exist!`)
  }

  checkAuth( req.user.userId, jobFoundById.createdBy)

  await jobFoundById.remove()
  res.status(StatusCodes.OK).json({ msg: `${ jobFoundById.position } is deleted!`})
}

const showStats = async (req, res) => {
  const userId =  mongoose.Types.ObjectId(req.user.userId)
  //Error: wrong id createdBY
  let stats = await Job.aggregate([
    { $match: { createdBy: userId } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  //loop the arr to get values only
  stats = stats.reduce( (total, currentItem) => {
    const{ _id: status, count } = currentItem
    total[status] = count
    return total;
  },{})

  //Set up default
  const defaultStats = {
    interview: stats.interview || 0,
    declined: stats.declined || 0,
    pending: stats.pending || 0,
    passed: stats.passed || 0
  }

  let monthlyApplications = await Job.aggregate([
    { $match: { createdBy: userId }},
    { $group: {
      _id: {
        year : { $year: '$createdAt'},
        month: { $month: '$createdAt'}
        },
        count: { $sum: 1 }
      }
    },
    { $sort: { '_id.year': -1, '_id.month': -1 }},
    { $limit: 6 }
  ])

  monthlyApplications = monthlyApplications.map(( item ) => {
    const { _id: { year, month }, count } = item

    const date = moment()
      .month( month -1 )
      .year( year )
      .format('MMM Y')
    return { date, count}
  })
  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications  });
};

export { createJob, deleteJob, getAllJobs, updateJob ,showStats }
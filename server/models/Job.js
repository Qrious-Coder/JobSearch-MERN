import mongoose from "mongoose";

const JobSchema = new mongoose.Schema({
    company: {
      type: String,
      required: [ true, 'Company is required!'],
      minLength: 3, 
      maxLength: 100,
    },
    position :{
      type: String,
      required:  [ true, 'Position is required!'],
      maxLength: 100,
    },
    jobLocation: {
      type: String,
      default: 'my city',
      required: true
    },
    status :{
      type: String,
      enum: ['interview', 'declined', 'pending', 'passed'],
      default: 'pending',
    },
    jobType :{
      type: String,
      enum: ['full-time', 'part-time', 'flexible','remote', 'internship'],
      default: 'full-time',
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user']
    },
  },
  { timestamps: true}
)

export default mongoose.model('Job', JobSchema)
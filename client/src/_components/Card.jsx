import React from 'react';
import moment from 'moment'
import Wrapper from '../_assets/wrappers/Job'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import { setEditJob, deleteJob } from '../_actions/jobAction'
import JobInfo from "./JobInfo";
import { useDispatch } from "react-redux";

const Card = ({ company, createdAt, jobLocation,
  jobType, position, status, _id}) => {
  let date = moment(createdAt).format("MMM Do, YYYY")
  const dispatch = useDispatch()

  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{ company?.charAt(0) }</div>
        <div className='info'>
          <h5>{ position }</h5>
          <p>{ company }</p>
        </div>
      </header>
      <div className="content">
        <div className='content-center'>
          <JobInfo icon={ <FaLocationArrow/> } text={ jobLocation } />
          <JobInfo icon={ <FaCalendarAlt />} text={ date } />
          <JobInfo icon={ <FaBriefcase/> } text={ jobType } />
          <div className={`status ${status}`}> { status }</div>
        </div>
        <footer>
          <div className="actions">
            <Link to='/addJob/'
                  className='btn edit-btn'
                  onClick={ () => dispatch( setEditJob({_id}) )}
            >
              EDIT
            </Link>
            <button type='button'
                    className='btn delete-btn'
                    onClick={() => dispatch( deleteJob({_id}) )}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </Wrapper>
  );
};

export default Card;
import React from 'react'
import { IoBarChartSharp } from 'react-icons/io5'
import { MdQueryStats } from 'react-icons/md'
import { FaWpforms } from 'react-icons/fa'
import { ImProfile } from 'react-icons/im'

const links = [
  { id: 1, text: 'stats', path: '/', icon: <IoBarChartSharp /> },
  { id: 2, text: 'All jobs', path: '/jobs', icon: <MdQueryStats /> },
  { id: 3, text: 'Add a job', path: '/addJob', icon: <FaWpforms /> },
  { id: 4, text: 'My Profile', path: '/profile', icon: <ImProfile /> }
]

export default links
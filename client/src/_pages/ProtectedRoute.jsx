import React, { useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import {Navigate } from 'react-router-dom'
import { Loading } from '../_components'
import { getCurrentUser } from "../_actions/registerAction";

const ProtectedRoute = ({children}) => {
  const { user, userLoading  } = useSelector( state => state.register )
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentUser());
    // eslint-disable-next-line
  }, []);

  if(userLoading) return <Loading center />
  if( !user ) {
    return <Navigate to="/landing" />
  }
  return children
}

export default ProtectedRoute
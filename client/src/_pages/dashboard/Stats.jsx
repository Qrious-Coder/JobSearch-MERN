import React, { useEffect } from 'react'
import { showStats } from "../../_actions/jobAction";
import { Loading , ChartContainer, StatsContainer } from "../../_components";
import { useSelector, useDispatch } from "react-redux";

const Stats = () => {
  const { monthlyApplications } = useSelector( state => state.job )
  const { isLoading } = useSelector(state => state.common )
  const dispatch = useDispatch()
  useEffect( () => {
    dispatch(showStats())
  }, [])

  return (
      <>
        {isLoading ?
          <Loading center /> :
          <>
            <StatsContainer />
            { monthlyApplications.length > 0 &&  <ChartContainer />}
          </>
        }
      </>
  )
}

export default Stats
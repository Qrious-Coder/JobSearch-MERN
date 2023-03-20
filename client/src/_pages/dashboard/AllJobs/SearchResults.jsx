import React, {useEffect} from 'react';
import {useSelector, useDispatch } from "react-redux";
import { Loading, Pagination } from '../../../_components'
import { Card } from "../../../_components"
import Wrapper from '../../../_assets/wrappers/JobsContainer';
import { getAllJobs } from "../../../_actions/jobAction";
const SearchResults = () => {
  const { page, search, searchType, searchStatus, sort,
    jobs, numOfPages, total } = useSelector(state => state.job )
  const { isLoading } = useSelector( state => state.common)
  const { userLoading } = useSelector( state => state.register)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getAllJobs({ page, search, searchType, searchStatus, sort}))
    // eslint-disable-next-line
  }, [ page, search, searchType, searchStatus, sort, userLoading ])


  if ( isLoading ) {
    return <Loading center/>
  }

  return (
    <Wrapper>
      { jobs?.length > 0
        ? <>
            <h2>{ total } job{ total >1 && 's'} found.</h2>
          <div className='jobs'>
            {
              jobs.map((job) => {
                return <Card key={job._id} {...job} />
              })
            }
          </div>
          </>
        : <h2> No result found ...</h2>}
      { numOfPages > 1 && <Pagination />}
    </Wrapper>
  );
};

export default SearchResults;
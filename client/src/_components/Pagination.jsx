import React from 'react';
import Wrapper from "../_assets/wrappers/Pagination";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import cs from 'classnames'
import {changePage} from "../_actions/jobAction";
import { useDispatch, useSelector } from "react-redux";

const Pagination = () => {
  const { numOfPages, page } = useSelector( state => state.job )
  const dispatch = useDispatch()

  const pages = Array.from({length: numOfPages}, (_, idx) => {
    return idx + 1
  })

  const handlePrev = () => {
    let prevPageNum = page - 1
    if(page === 1) {
      prevPageNum = numOfPages
    }
    dispatch(changePage( prevPageNum ))
  }
  const handleNext = () => {
    let nextPageNum = page + 1
    if( page === numOfPages) {
      nextPageNum = 1
    }
    dispatch(changePage( nextPageNum ))
  }
  return (
    <Wrapper>
      <button
        className='prev-btn'
        onClick={ handlePrev }
      >
        <HiChevronDoubleLeft />
        Pre
      </button>
      <div className={'btn-container'}>
        { pages.map(( pageNum, idx ) => {
          return <button type='button'
            key={ idx }
            className={ cs( {[`active`]: pageNum === page }) }
            onClick={ () => dispatch( changePage(pageNum))}
          >{ pageNum }</button>
        })}
      </div>
      <button
        className='prev-btn'
        onClick={ handleNext }
      >
        Next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  );
};

export default Pagination;
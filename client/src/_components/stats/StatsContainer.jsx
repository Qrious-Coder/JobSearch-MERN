import React from 'react';
import {FaBug, FaCalendarCheck, FaSuitcaseRolling} from "react-icons/fa";
import Wrapper from '../../_assets/wrappers/StatsContainer'
import StatsItem from "./StatsItem";
import { useSelector } from "react-redux";

const StatsContainer = () => {
  const { stats }  = useSelector( state => state.job)
  const defaultStats = [
    {
      title: 'Pending',
      count: stats?.pending || 0,
      icon: <FaSuitcaseRolling />,
      color: '#e9b949',
      bcg: '#fcefc7',
    },
    {
      title: 'Interview',
      count: stats?.interview || 0,
      icon: <FaCalendarCheck />,
      color: '#647acb',
      bcg: '#e0e8f9',
    },
    {
      title: 'Declined',
      count: stats?.declined || 0,
      icon: <FaBug />,
      color: '#d66a6a',
      bcg: '#ffeeee',
    },
    {
      title: 'Passed',
      count: stats?.passed || 0,
      icon: <FaCalendarCheck />,
      color: '#0e7c86',
      bcg: '#bef8fd',
    },
  ]
    return (
        <Wrapper>
          { defaultStats.map(( item, idx) => {
             return <StatsItem key={ idx } {...item}/>
          }
          )}
        </Wrapper>
    );
};

export default StatsContainer;
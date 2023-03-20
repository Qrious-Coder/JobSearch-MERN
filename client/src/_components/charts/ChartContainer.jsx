import React, { useState } from 'react';
import BarChartCtn from "./BarChartCtn";
import AreaChartCtn from "./AreaChartCtn";
import Wrapper from '../../_assets/wrappers/ChartsContainer'
import {useSelector} from "react-redux";

const ChartContainer = () => {
  const [ showBarChart, setShowBarChart] = useState(false)
  const { monthlyApplications: data } = useSelector( state => state.job )
    return (
      <Wrapper>
        <button
          type="button"
          onClick={ () => setShowBarChart(!showBarChart)}
        >
          Switch to { showBarChart ? 'Bar Chart' : 'AreaChart'}
        </button>
        {showBarChart ? <BarChartCtn data={ data  }/>
          : <AreaChartCtn data={ data }/>}
      </Wrapper>
    );
};

export default ChartContainer;
import React from 'react';
import cs from 'classnames'

const Loading = ({ center }) => {
  return (
    <div className={ cs( 'loading',
      {['loading-center'] : center} )}>
    </div>
  );
};

export default Loading;
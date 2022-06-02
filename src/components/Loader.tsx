import React from 'react';
import { Spin } from 'antd';

const Loader = (): JSX.Element => (
  <div className='loader'>
    <Spin />
  </div>
);

export default Loader;

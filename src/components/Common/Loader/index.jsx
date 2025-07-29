import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import './style.css';

const Loader = () => {
  return (
    <div className='Loader-container'>
      <CircularProgress sx={{ color: 'greenyellow' }} />
    </div>
  );
};

export default Loader;

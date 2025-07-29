import React, { useState } from 'react';
import { Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

const TemporaryDrawer = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (openState) => () => {
    setOpen(openState);
  };

  return (
    <>
    
    <div className="mobile-drawer">
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon style={{ color: 'white' }} />
      </IconButton>
    </div>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            width: '200px', // adjust as needed
            backgroundColor: 'var(--darkgrey)',
          },
        }}
      >
        <div className="drawer-div">
          <Link to='/'><p className='link'>Home</p></Link>
          <Link to='/compare'><p className='link'>Compare</p></Link>
          <Link to='/watchlist'><p className='link'>Watchlist</p></Link>
          <Link to='/dashboard'><p className='link'>Dashboard</p></Link>
        </div>
      </Drawer>
    </>
  );
};

export default TemporaryDrawer;

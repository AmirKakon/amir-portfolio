import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="secondary" component={RouterLink} to="/">Home</Button>
        <Button color="secondary" component={RouterLink} to="/about">About</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
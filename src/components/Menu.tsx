// src/components/Menu.tsx
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ReportIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { authActions } from '../store/authSlice';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


export default function Menu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authenticator);

  useEffect(() => {
    if (!userData.isAutenticated) navigate('/');
  }, [userData.isAutenticated, navigate]);

  const toggleDrawer = (value: boolean) => () => setOpen(value);

  const handleLogout = () => {
    dispatch(authActions.logout());
    navigate('/');
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" onClick={toggleDrawer(true)} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography variant="h6">{userData.userName || 'Usuario'}</Typography>
          </Box>
          <Avatar>{(userData.userName || 'U').charAt(0)}</Avatar>
        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
          <List>
            <Link to={'/home'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon><HomeIcon /></ListItemIcon>
                  <ListItemText primary="Inicio" />
                </ListItemButton>
              </ListItem>
            </Link>

            <Link to={'/reports'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon><ReportIcon /></ListItemIcon>
                  <ListItemText primary="Informes" />
                </ListItemButton>
              </ListItem>
            </Link>

             <Link to={'/help'} style={{ textDecoration: 'none', color: 'inherit' }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
            <ListItemText primary="Help" />
          </ListItemButton>
        </ListItem>
      </Link>

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemIcon><LogoutIcon /></ListItemIcon>
                <ListItemText primary="Salir" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

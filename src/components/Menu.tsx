import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Avatar, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ReportIcon from '@mui/icons-material/Assessment';
import LogoutIcon from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../store';
import { authActions } from '../store/authSlice';
import Tooltip from '@mui/material/Tooltip';

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

  const avatarContent = () => {
    if (userData.userRol === 'admin') {
      return <AdminPanelSettingsIcon />;
    }
    return <PersonIcon />;
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>

          <Tooltip title="Abrir menú" arrow placement="bottom">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
              aria-label="menu"
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>

          <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
            <Typography variant="h6">{userData.userName || 'Usuario'}</Typography>
          </Box>

          <Tooltip title={userData.userRol} arrow placement="left">
            <Avatar sx={{ bgcolor: 'transparent' }}>
              {avatarContent()}
            </Avatar>
          </Tooltip>

        </Toolbar>
      </AppBar>

      <Drawer anchor="left" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List>
            <Link to={'/home'} style={{ textDecoration: 'none', color: 'inherit' }}>
              <Tooltip title="Ir al inicio" arrow placement="right">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon><HomeIcon /></ListItemIcon>
                    <ListItemText primary="Inicio" />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </Link>

            {userData.userRol === 'admin' && (
              <Link to={'/reports'} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Tooltip title="Abrir informes" arrow placement="right">
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon><ReportIcon /></ListItemIcon>
                      <ListItemText primary="Informes" />
                    </ListItemButton>
                  </ListItem>
                </Tooltip>
              </Link>
            )}

            <Link to={'/Manual_De_Uso.pdf'} target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
              <Tooltip title="Abrir manual de usuario" arrow placement="right">
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemIcon><HelpOutlineIcon /></ListItemIcon>
                    <ListItemText primary="Help" />
                  </ListItemButton>
                </ListItem>
              </Tooltip>
            </Link>

            <Tooltip title="Cerrar sesión" arrow placement="right">
              <ListItem disablePadding>
                <ListItemButton onClick={handleLogout}>
                  <ListItemIcon><LogoutIcon /></ListItemIcon>
                  <ListItemText primary="Salir" />
                </ListItemButton>
              </ListItem>
            </Tooltip>

          </List>
        </Box>
      </Drawer>
    </>
  );
}
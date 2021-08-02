import React, {useEffect, useState} from 'react';
import decode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useHistory, Link } from 'react-router-dom';

import { alpha, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Avatar, Button } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';

import { logout } from '../../actions/auth.js'; 
import useStyles from './styles.js';

export default () => {
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.flash);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  useEffect(() => { 
    const token = user?.token;

    if (token) { 
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) { 
        logout(history);
      }
    }

    setUser(JSON.parse(localStorage.getItem('user')));
  }, [location]);

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      { user? <MenuItem onClick={ () => {handleMenuClose(); dispatch(logout(history))}}>Log out</MenuItem> : null}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      { user?
        <Link to="/change" style={{color: 'black', textDecoration: 'none'}}>
          <MenuItem>
            <IconButton aria-label="show 11 new notifications" color="inherit">
            </IconButton>
            <p>Change Stocks</p>
          </MenuItem>
        </Link> : null
      }
      <MenuItem onClick={() => {
          handleMenuClose();
          if (user) {
            dispatch(logout(history));
            setUser(null);
          } else { 
            history.push('/auth');
          }
        }}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
          {user ? <p>Log out</p> : <p>Log in</p>}
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{color: 'white'}}>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon/>
            </IconButton>
          </Link>
          <Typography className={classes.title} variant="h6" noWrap>
            Stock Tracker
          </Typography>
          {/* <Typography style={{ marginLeft: '2%', color: 'red', backgroundColor: 'white', padding: '0.5%'}}>
            Note* - due to the limits of the API key, you will likely get an error if you try to load more than 5 stocks
          </Typography> */}
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              { user? <Link to="/change" style={{color: 'white', textDecoration: 'none'}}><MenuItem onClick={ () => {handleMenuClose()}}>Change Stocks</MenuItem></Link> : null }
            </IconButton>
            { user ?
            <Typography className={classes.userName} variant="h6">{user.result.name}</Typography> : null 
            }
          { user ?
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
                <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>             
            </IconButton>
          : <IconButton><Button component={Link} to="/auth" variant="contained" color="secondary">Sign Up</Button> </IconButton>}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {
        error ? 
        <Alert style={ {marginBottom: '1rem'}} severity="error">{message}</Alert>
        : null
      }
    </div>
  );
}
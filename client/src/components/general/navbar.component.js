import React from "react";
import { NavLink, withRouter  } from "react-router-dom";
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import Logo from "../../assets/img/vhomes.png";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import Toolbar from '@material-ui/core/Toolbar';

/* Material-UI appbar styling */
const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
  },
  iconButton: {
    color: "white",
    height: "70px",
    marginRight: "1%",
    padding: "6px",
    width: "70px",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  mainLogo: {
    '&:hover': {
      scale: "1.1",
    },
    '&:active': {
      scale: "0.9",
    },
    maxHeight: "70px",
    maxWidth: "90px",
    transition: "all 0.15s ease",
  },
  spacing: {
    flexGrow: 1,
  }
}));

/* Material-UI button styling */
const CustomButton = withStyles((theme) => ({
  root: {
    color: "white",
    backgroundColor: "#02b188",
    '&:hover': {
      backgroundColor: "#008868",
    },
    font: "inherit",
    fontSize: "16px",
    fontWeight: "bolder",
    margin: "0 1% 0 0",
    padding: "12px",
  },
}))(Button);

//Calling on this folder from other folders to make the pages
const Navbar = (props) => {
  const anchorRef = React.useRef(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { history, loggedIn, setLoggedIn } = props;

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleListKeyDown = (event) => {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const handleLogout = (event) => {
    handleClose(event);
    window.sessionStorage.removeItem('accessToken');
    setLoggedIn(false);
    history.push('/');
  }

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const renderMenu = (
    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleClose}>
              <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                <MenuItem onClick={handleClose}>
                  <NavLink to='/MyAccount'>My Account</NavLink>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );

  return (
    <>
      <AppBar className={classes.root} color="transparent" position="fixed">
        <Toolbar disableGutters={true}>
          <NavLink to='/' style={{padding: "1% 0 0 1%",}}>
            <img alt='Home' className={classes.mainLogo} src={Logo} />
          </NavLink>
          <div className={classes.spacing} />
          {loggedIn ? (
            <>
              <IconButton
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                className={classes.iconButton}
                onClick={handleToggle}
              >
                <AccountCircle className={classes.icon} />
                {renderMenu}
              </IconButton>
            </>
          ) : (
            <>
              <CustomButton>
                <NavLink to='/SignUp'>Sign Up</NavLink>
              </CustomButton>
              <CustomButton>
                <NavLink to='/Login'>Login</NavLink>
              </CustomButton>
            </>
          )}
          
        </Toolbar>
      </AppBar>
    </>
  );
}

export default withRouter(Navbar);
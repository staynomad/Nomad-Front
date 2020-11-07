import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Logo from "../../assets/img/vhomes.png";
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import SearchIcon from '@material-ui/icons/Search';

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
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  mainLogo: {
    '&:hover': {
      scale: "1.05",
    },
    '&:active': {
      scale: "0.95",
    },
    marginTop: "1%",
    maxHeight: "70px",
    maxWidth: "90px",
    transition: "all 0.15s ease",
  },
  navbarGrid: {
    alignItems: "center",
    display: "grid",
    gridTemplate: "auto / 1fr 1fr 1fr",
    margin: "0 1% 0 1%",
  },
  navbarRight: {
    alignItems: "center",
    display: "flex",
    justifySelf: "end",
    whiteSpace: "nowrap",
  },
  navLink: {
    '&:hover': {
      color: "#2E2E2E",
    },
    color: "white",
    font: "inherit",
    fontSize: "large",
    fontWeight: "bolder",
    transition: "all 0.25s ease-in-out",
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    '&:hover': {
      backgroundColor: "rgba(255, 255, 255, 1.0)",
    },
    display: "flex",
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchButton: {
    backgroundColor: "#02B188",
    border: "none",
    borderTopRightRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    color: "white",
    cursor: "pointer"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spacing: {
    flexGrow: 1,
  },
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
    marginLeft: "5%",
    padding: "12px",
  },
}))(Button);

//Calling on this folder from other folders to make the pages
const Navbar = (props) => {
  const anchorRef = React.useRef(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [itemToSearch, setItemToSearch] = React.useState("");
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
  };

  const handleLogout = (event) => {
    handleClose(event);
    window.sessionStorage.removeItem('accessToken');
    setLoggedIn(false);
    history.push('/');
  };

  const handleSearch = (event) => {
    event.preventDefault();
    history.push(`/matches?${itemToSearch}`);
    setItemToSearch("")
  };

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
        <div className={classes.navbarGrid}>
          <NavLink to='/' className={classes.mainLogo}>
            <img alt='Home' className={classes.mainLogo} src={Logo} />
          </NavLink>
          <form style={{ margin: "auto" }} onSubmit={handleSearch}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ 'aria-label': 'search' }}
                onChange={(e) => setItemToSearch(e.target.value)}
                value={itemToSearch}
              />
              <button className={classes.searchButton} onClick={handleSearch}>find</button>
            </div>
          </form>
          <div className={classes.navbarRight}>
            <NavLink to='/Matches' className={classes.navLink}>explore</NavLink>
            {props.userSession ? (
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
          </div>
        </div>
      </AppBar>
    </>
  );
}

const mapStateToProps = state => {
  if (state.Login.userInfo) return {
    userSession: state.Login.userInfo.session,
  }
  return {};
};

const mapDispatchToProps = dispatch => {
  return {};
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Navbar
));

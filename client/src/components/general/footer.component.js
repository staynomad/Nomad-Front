import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Toolbar from '@material-ui/core/Toolbar';

/* Material-UI appbar styling */
const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    color: "#4D4842",
    height: "max-content",
    marginTop: "auto",
  },
  linkItems: {
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 10px 0 12px",
    color: "#4D4842",
  },
  spacing: {
    flexGrow: 1,
  }
}));

export default function Footer () {
  const classes = useStyles();

  return (
    <BottomNavigation className={classes.root} color="transparent" position="absolute">
      <Toolbar>
        <span className={classes.spacing} />
        <a className={classes.linkItems} href='/ContactUs'>CONTACT US</a>
        <a className={classes.linkItems} href='/AboutUs'>ABOUT US</a>
        <a className={classes.linkItems} href='/OurLocations'>OUR LOCATIONS</a>
        <a className={classes.linkItems} href='/CreateListing'>CREATE LISTING</a>
        <span className={classes.spacing} />
      </Toolbar>
    </BottomNavigation>
  );
}

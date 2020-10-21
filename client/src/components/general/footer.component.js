import React, { Component } from "react";
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import Toolbar from '@material-ui/core/Toolbar';
import "./footer.css";
//Calling on this folder from other folders to make the pages

/* Material-UI appbar styling */
const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: "none",
    color: "black",
  },
  linkItems: {
    fontSize: "14px",
    fontWeight: "bold",
    margin: "0 12px 0 12px",
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
        <span className={classes.spacing} />
      </Toolbar>
    </BottomNavigation>
  );
}

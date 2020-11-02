import React, { Component } from "react";
import Search from "./search.component";

import "./home.css";

const Home = (props) => {
  if (props.location.state) {
    props.setUserID (props.location.state.userId); // sets the userId in App.js
  }
  return (
    <div className="homepage backgroundimg">
      <Search />
    </div>
  )
}

export default Home;

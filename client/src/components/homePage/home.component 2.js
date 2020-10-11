import React, { Component } from "react";
import Search from "./search.component";

import "./home.css";

export default class Home extends Component {
  render() {
    return (
      <div className="homepage backgroundimg">
        <Search />
      </div>
    );
  }
}

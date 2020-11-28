import React, { Component } from "react";
import "./home.css";
export default class Search extends Component {
  render() {
    return (
      <div className="overallsearch">
        <input className="inputtextbox" type="text" placeholder="city" />
        <a href="/Matches">

          <input className="booknowbutton" type="button" value="book now"/>
        </a>
        <br />

      </div>
    );
  }
}

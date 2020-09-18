import React, { Component } from "react";
import "./home.css";

export default class Search extends Component {
  render() {
    return (
      <div className="overallsearch">
        <div className="toptext">
          <div>
            The
            <span style={{ color: "#32b877" }}> future</span>
          </div>
          <div>of flexible rentals</div>
        </div>
        <br />
        <input className="inputtextbox" type="text" placeholder="city" />
        <input className="booknowbutton" type="button" value="book now" />
        <br />

        <div className="bottext">start now to plan your dream vacation</div>
        <br />
      </div>
    );
  }
}

import React, { Component } from "react";
import "./home.css";
export default class Search extends Component {
  render() {
    return (
      <div className="overallsearch">
        <div className="toptext">
          <div className="toprow">
            the
            <span style={{ color: "#02b188" }}> future</span>
          </div>
          of flexible rentals
        </div>
        <input className="inputtextbox" type="text" placeholder="  city" />
        <a href="/OurLocations">

          <input className="booknowbutton" type="button" value="book now"/>
        </a>
        
        <div className="bottext">start now to plan your dream vacation</div>
        <br />
        
      </div>
    );
  }
}

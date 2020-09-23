import React, { Component } from "react";
import "./footer.css";
//Calling on this folder from other folders to make the pages

export default class Footer extends Component {
  render() {
    return (
      <div>
        <ul className="footer">
          <li>
            <a href="/ContactUs">Contact Us</a>
          </li>
          <li>
            <a href="/AboutUs">About Us</a>
          </li>
          <li>
            <a href="/OurLocations">Our Locations</a>
          </li>
        </ul>
      </div>
    );
  }
}

import React, { Component } from "react";
import "./footer.css";
//Calling on this folder from other folders to make the pages

export default class Footer extends Component {
  render() {
    return (
      <ul className='footer'>
        <li>
          <a href='/ContactUs'>CONTACT US</a>
        </li>
        <li>
          <a href='/AboutUs'>ABOUT US</a>
        </li>
        <li>
          <a href='/OurLocations'>OUR LOCATIONS</a>
        </li>
      </ul>
    );
  }
}

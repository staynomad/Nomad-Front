import React, { Component } from "react";
import "./navbar.css";
import Logo from "../../assets/img/vhomes.png";
//Calling on this folder from other folders to make the pages
export default class Navbar extends Component {
  render() {
    return (
      <div>
        <ul className="navbar">
          <div className="nav-left">
            <li>
              <a href="/">
                <img className="mainlogo" src={Logo} alt="VHomes Logo"></img>
              </a>
            </li>
          </div>
          <div className="nav-right">
            <li>
              <a href="/Login">Log In</a>
            </li>
            <li>
              <a href="/SignUp">Sign Up</a>
            </li>
            <li>
              <a href="/AboutUs">About Us</a>
            </li>
            <li>
              <a href="/Reservations">Reservations</a>
            </li>
            <li>
              <a href="/Services">Services</a>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}

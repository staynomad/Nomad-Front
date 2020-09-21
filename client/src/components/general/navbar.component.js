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
            <div>
              <li className="signbut">
                <a href="/SignUp">Sign Up</a>
              </li>
            </div>
            <div>
              <li className="loginbut">
                <a href="/Login">Log In</a>
              </li>
            </div>

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

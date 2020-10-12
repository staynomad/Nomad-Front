import React, { Component } from "react";
import { NavLink } from "react-router-dom";
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
              <NavLink to="/">
                <img className="mainlogo" src={Logo} alt="VHomes Logo"></img>
              </NavLink>
            </li>
          </div>
          <div className="nav-right">
            <div>
              <li className="signbut">
                <NavLink to="/SignUp">sign up</NavLink>
              </li>
            </div>
            <div>
              <li className="loginbut">
                <NavLink to="/Login">log In</NavLink>
              </li>
            </div>

            <li>
              <NavLink to="/Reservations">reservations</NavLink>
            </li>
            <li>
              <NavLink to="/CreateListing">create listing</NavLink>
            </li>
            <li>
              <NavLink to="/Services">services</NavLink>
            </li>
          </div>
        </ul>
      </div>
    );
  }
}

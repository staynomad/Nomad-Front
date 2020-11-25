import React, { Component } from 'react'
import './css/animate.css'
import './css/common.css'
import './css/grid.css'
import './css/homepage.css'
import logo from './images/logo.png'

class navbar extends Component {
  render() {
    return (
      <nav className="nav">
          <div className="nav-container">
                  <div className="logo">
                      <a href="index.html">
                      <img src={logo} alt="logo" />
                      </a>
                  </div>
                  <div id="mainListDiv" className="main_list">
                      <ul className="navlinks">
                          <li className="nav-active"><a href="">Home</a></li>
                          <li><a href="about.html">Explore</a></li>
                          <li><a href="about.html">Create Listings</a></li>
                          <li><a href="about.html">Contact</a></li>
                          <li className="nav-item xl-ml-40">
                              <a className="button button-outline-primary" href="#">Sign Up</a>
                          </li>
                      </ul>
                  </div>
                  <span className="navTrigger">
                      <i></i>
                      <i></i>
                      <i></i>
                  </span>
                </div>
          </nav>
    )
  }
}

export default navbar

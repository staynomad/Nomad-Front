import React, { Component } from 'react'
import { Link } from 'react-router-dom'
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
                      <a href="/">
                      <img src={logo} alt="logo" />
                      </a>
                  </div>
                  <div id="mainListDiv" className="main_list">
                      <ul className="navlinks">
                          <li><Link to="/matches">Explore</Link></li>
                          <li><Link to="/">Reservations</Link></li>
                          <li><Link to="/">Contact</Link></li>
                          <li className="nav-item xl-ml-40">
                              <Link className="button button-outline-primary" to="/login">Log In or Sign Up</Link>
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

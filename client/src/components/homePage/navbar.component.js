import React, { Component } from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom'
import { removeUserSession } from '../../redux/actions/authActions'
import { connect } from "react-redux";
import './css/animate.css'
import './css/common.css'
import './css/grid.css'
import './css/homepage.css'
import logo from './images/logo.png'

class navbar extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout() {
    window.sessionStorage.removeItem('accessToken');
    this.props.removeUserSession();
    this.props.history.push('/');
  }
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
                      {
                        this.props.userSession
                        ? <ul className="navlinks">
                            <li><Link to="/Matches">Explore</Link></li>
                            <li><Link to="/">Reservations</Link></li>
                            <li><a onClick={this.handleLogout}>Log Out</a></li>
                            <li className="nav-item xl-ml-40">
                              <Link className="button button-outline-primary" to="/MyAccount">Profile</Link>
                            </li>
                          </ul>
                        : <ul className="navlinks">
                            <li><Link to="/Matches">Explore</Link></li>
                            <li><Link to="/">Reservations</Link></li>
                            <li className="nav-item xl-ml-40">
                              <Link className="button button-outline-primary" to="/Login">Login</Link>
                            </li>
                          </ul>
                      }
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

const mapStateToProps = state => {
  if (state.Login.userInfo) return {
    userSession: state.Login.userInfo.session,
  }
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    removeUserSession: () => (dispatch(removeUserSession()))
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  navbar
));

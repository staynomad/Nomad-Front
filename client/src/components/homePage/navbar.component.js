import React, { Component } from 'react'
import { Link, withRouter, Redirect, NavLink } from 'react-router-dom'
import { removeUserSession } from '../../redux/actions/authActions'
import { connect } from "react-redux";

const navbar = (props) => {

  const handleLogout = () => {
    window.sessionStorage.removeItem('accessToken');
    props.removeUserSession();
    props.history.push('/');
  }

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
                      props.userSession
                      ? <ul className="navlinks">
                          <li><Link to="/Matches">Explore</Link></li>
                          <li><Link to="/" onClick={e => props.setReservationModal(true)}>Reservations</Link></li>
                          <li><a onClick={handleLogout}>Log Out</a></li>
                          <li className="nav-item xl-ml-40">
                            <Link className="button button-outline-primary" to="/MyAccount">Profile</Link>
                          </li>
                        </ul>
                      : <ul className="navlinks">
                          <li><Link to="/Matches">Explore</Link></li>
                          <li><Link to="/" onClick={e => props.setReservationModal(true)}>Reservations</Link></li>
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

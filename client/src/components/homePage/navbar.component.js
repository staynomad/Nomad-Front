import React, { Component } from 'react'
import { NavLink, withRouter } from 'react-router-dom'
import { removeUserSession } from '../../redux/actions/authActions'
import { connect } from "react-redux";

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
            <NavLink to="/">
              <img src="./images/logo.png" alt="logo" />
            </NavLink>
          </div>
          <div id="mainListDiv" className="main_list">
            <ul className="navlinks">
              <li><NavLink to="/Matches" activeClassName="nav-active">Explore</NavLink></li>
              <li><NavLink exact to="/" activeClassName="nav-active">Reservations</NavLink></li>
              {
                this.props.userSession
                  ?
                  (
                    <>
                      <li><a onClick={this.handleLogout}>Log Out</a></li>
                      <li className="nav-item xl-ml-40">
                        <NavLink className="button button-outline-primary" to="/MyAccount" activeClassName="nav-active">Profile</NavLink>
                      </li>
                    </>
                  )
                  :
                  (
                    <li className="nav-item xl-ml-40">
                      <NavLink className="button button-outline-primary" to="/Login" activeClassName="nav-active">Login</NavLink>
                    </li>
                  )
              }
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

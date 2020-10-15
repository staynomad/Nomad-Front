import React, { Component } from "react";
import { NavLink, withRouter  } from "react-router-dom";
import "./navbar.css";
import Logo from "../../assets/img/vhomes.png";
//Calling on this folder from other folders to make the pages
export default withRouter(class Navbar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    window.sessionStorage.removeItem('accessToken');
    this.props.setLoggedIn(false);
    this.props.history.push('/');
  }

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
            { this.props.loggedIn ? (
            <>
              <div>
                <li className="signoutbtn" onClick={this.handleLogout}>
                  <button>sign out</button>
                </li>
              </div>
              <li>
                <NavLink to="/MyAccount">my account</NavLink>
              </li>
              <li>
                  <NavLink to="/Reservations">reservations</NavLink>
              </li>
              <li>
                <NavLink to="/CreateListing">create listing</NavLink>
              </li>
            </>
            ) : (
              <>
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
                  <NavLink to="/Services">services</NavLink>
                </li>
              </>
            )}

          </div>
        </ul>
      </div>
    );
  }
})

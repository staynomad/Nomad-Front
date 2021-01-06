import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";

const navbar = (props) => {
  const handleLogout = () => {
    window.sessionStorage.removeItem("accessToken");
    props.logoutUser();
    props.history.push("/");
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/">
            <img src="/images/logo.png" alt="logo" />
          </NavLink>
        </div>
        <div id="mainListDiv" className="main_list">
          <ul className="navlinks">
            <li>
              <NavLink exact to="/" activeClassName="nav-active">
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/Matches" activeClassName="nav-active">
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink to="/" onClick={e => props.setReservationModal(true)}>
                Reservations
              </NavLink>
            </li>
            {props.userSession ? (
              <>
                <li>
                  <a onClick={handleLogout} href="/">
                    Log Out
                  </a>
                </li>
                <li className="nav-item xl-ml-40">
                  <NavLink
                    className="button button-outline-primary"
                    to="/MyAccount"
                    activeClassName="nav-active"
                  >
                    Profile
                  </NavLink>
                </li>
              </>
            ) : (
                <li className="nav-item xl-ml-40">
                  <NavLink
                    className="button button-outline-primary"
                    to="/Login"
                    activeClassName="nav-active"
                  >
                    Login
                </NavLink>
                </li>
              )}
          </ul>
        </div>
        <span className="navTrigger">
          <i></i>
          <i></i>
          <i></i>
        </span>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  const stateToReturn = { ...state };
  if (state.Login.userInfo)
    stateToReturn["userSession"] = state.Login.userInfo.session;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: () => dispatch(logoutUser()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(navbar));

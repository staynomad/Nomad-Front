import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const Navbar = (props) => {
  const [dropdownActive, setDropdownActive] = useState(false);

  const handleLogout = () => {
    window.sessionStorage.removeItem("accessToken");
    props.logoutUser();
    props.history.push("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOff);
  }, []);

  const handleClickOff = (e) => {
    if (e.target.id === "dropref") return;
    if (e.target.className === "profile-dropdown button button-outline-primary")
      return;
    setDropdownActive(false);
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="logo">
          <NavLink to="/" className="logo-container">
            <img src="/images/logo.png" alt="logo" />
          </NavLink>
        </div>
        <div id="mainListDiv" className="main_list">
          <ul className="navlinks">
            <NavLink
              className="nav-item"
              style={{ fontSize: "1.5rem" }}
              to="/Matches"
              activeClassName="nav-active"
            >
              Explore
            </NavLink>

            <NavLink
              className="nav-item"
              style={{ fontSize: "1.5rem" }}
              to="/"
              onClick={(e) => props.setReservationModal(true)}
            >
              Reservations
            </NavLink>

            {props.userSession ? (
              <>
                {/* <li>
                  <a onClick={handleLogout} href="/">
                    Log Out
                  </a>
                </li> */}
                <div>
                  <div
                    onClick={() => setDropdownActive(!dropdownActive)}
                    className="profile-dropdown button button-outline-primary"
                    to="/MyAccount"
                    activeClassName="nav-active"
                  >
                    Profile
                    <ArrowDropDownIcon className="dropdown-icon" />
                  </div>
                  {dropdownActive && (
                    <div className="dropdown" id="dropref">
                      <NavLink
                        className="account-a"
                        id="dropref"
                        to="/MyAccount"
                      >
                        Account settings
                      </NavLink>
                      <h3>Logout</h3>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <NavLink
                className="profile-dropdown button button-outline-primary"
                to="/Login"
                activeClassName="nav-active"
              >
                Login
              </NavLink>
            )}
          </ul>
        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navbar));

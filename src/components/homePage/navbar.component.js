import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import SearchIcon from "@material-ui/icons/Search";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Navbar = (props) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
      document.getElementsByTagName("HTML")[0].style.overflow = "hidden";
      document.getElementsByTagName("HTML")[0].style.position = "relative";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.getElementsByTagName("HTML")[0].style.overflow = "unset";
      document.getElementsByTagName("HTML")[0].style.position = "static";
    }
  }, [mobileNav]);

  const handleLogout = () => {
    window.sessionStorage.removeItem("accessToken");
    props.logoutUser();
    props.history.push("/");
  };

  const handleRedirect = () => {
    setTimeout(() => {
      setDropdownActive(false);
    }, 100);
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
      <div
        className={
          mobileNav ? "mobile-nav-container active" : "mobile-nav-container"
        }
      >
        <CloseIcon
          onClick={() => setMobileNav(false)}
          className="mobile-close"
        />
        <NavLink
          className="mobile-nav-link"
          onClick={() => setMobileNav(false)}
          to="/matches"
          activeClassName="mobile-nav-link-active"
        >
          <SearchIcon className="mobile-nav-icon" />
          Explore
        </NavLink>
        <NavLink
          className="mobile-nav-link"
          onClick={(e) => {
            props.setReservationModal(true);
            setMobileNav(false);
          }}
          to="/"
        >
          <EventAvailableIcon className="mobile-nav-icon" />
          Reservations
        </NavLink>
        {props.userSession ? (
          <div>
            <NavLink
              onClick={() => setMobileNav(false)}
              className="mobile-nav-link"
              to="/MyAccount"
              activeClassName="mobile-nav-link-active"
            >
              <AccountCircleIcon className="mobile-nav-icon" />
              Account
            </NavLink>
            <a
              className="mobile-nav-link"
              onClick={() => {
                handleLogout();
                setMobileNav(false);
              }}
            >
              <ExitToAppIcon className="mobile-nav-icon" />
              Logout
            </a>
          </div>
        ) : (
            <NavLink
              className="mobile-nav-link"
              onClick={() => setMobileNav(false)}
              to="/Login"
            >
              {" "}
              <AccountCircleIcon className="mobile-nav-icon" />
            Login
            </NavLink>
          )}
      </div>
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
            {/*<NavLink
              className="nav-item"
              style={{ fontSize: "1.5rem" }}
              to="/Map"
              activeClassName="nav-active"
            >
              Map
            </NavLink>*/}
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
                <div style={{ position: "relative" }}>
                  <div
                    onClick={() => setDropdownActive(!dropdownActive)}
                    className="profile-dropdown button button-outline-primary"
                    to="/MyAccount"
                  >
                    Profile
                    <ArrowDropDownIcon className="dropdown-icon" />
                  </div>
                  {dropdownActive && (
                    <div className="dropdown" id="dropref">
                      <NavLink
                        activeStyle={{ display: "inline" }}
                        className="account-a"
                        id="dropref"
                        to="/MyAccount"
                        onClick={handleRedirect}
                      >
                        Account
                      </NavLink>
                      <div
                        style={{
                          width: "100%",
                          height: "2px",
                          background: "#00b183",
                        }}
                      ></div>
                      <h3 onClick={handleLogout} id="dropref">
                        Logout
                      </h3>
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
        {!mobileNav && (
          <MenuIcon onClick={() => setMobileNav(true)} className="burger" />
        )}
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

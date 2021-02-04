import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import { connect } from "react-redux";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";

const Navbar = (props) => {
  const [dropdownActive, setDropdownActive] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);

  useEffect(() => {
    if (mobileNav) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "relative";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
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
          Reservations
        </NavLink>
        {props.userSession ? (
          <>
            <NavLink
              onClick={() => setMobileNav(false)}
              className="mobile-nav-link"
              to="/MyAccount"
              activeClassName="mobile-nav-link-active"
            >
              Account
            </NavLink>
            <h3
              className="mobile-nav-link"
              onClick={() => {
                handleLogout();
                setMobileNav(false);
              }}
            >
              Logout
            </h3>
          </>
        ) : (
          <NavLink
            className="mobile-nav-link"
            onClick={() => setMobileNav(false)}
            to="/Login"
          >
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
                    activeClassName="nav-active"
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

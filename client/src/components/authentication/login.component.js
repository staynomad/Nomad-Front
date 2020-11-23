import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import { submitLogin } from "../../redux/actions/authActions";
import "./login.css";

const Login = (props) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  this.setState({
    loading: false
  });

  const handleLogin = (e) => {
    e.preventDefault();
    props.submitLogin(userLogin)
    this.setState({ loading: true })
  };

  return props.userSession ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
      <div className='login-content'>
        <div className='login-form'>
          <form action='/login' className='form'>
            <div>
              <h2 style={{ color: "#31473b", fontSize: "48px" }}>welcome back</h2>
            </div>
            <div>
              <input
                type='email'
                name='email'
                placeholder='your email'
                className='input login-input'
                onChange={(e) =>
                  setUserLogin({ ...userLogin, email: e.target.value })
                }
                required={true}
              />
            </div>
            <div>
              <input
                type='password'
                name='password'
                placeholder='your password'
                className='input login-input'
                onChange={(e) =>
                  setUserLogin({ ...userLogin, password: e.target.value })
                }
                required={true}
              />
            </div>
            <div style={{ margin: "2% 0 3%" }}>

            {this.state.loading ? (
              <div id="spinner" />
            ) : (
              <button
                className='login btn green'
                style={{ width: "100%" }}
                onClick={(e) => {
                  handleLogin(e)
                }}
              >
                log in
            </button>
          )}
            </div>
            <div className='botText'>
              <span>don't have an account? </span>
              <a
                href='/SignUp'
                style={{ color: "#02b188", textDecoration: "none" }}
              >
                sign up
            </a>
            </div>
          </form>
        </div>
      </div>
    );
};

const mapStateToProps = state => {
  if (state.Login.userInfo) return {
    userSession: state.Login.userInfo.session,
  }
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    submitLogin: (userLogin) => dispatch(submitLogin(userLogin)),
  };
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(
  Login
));

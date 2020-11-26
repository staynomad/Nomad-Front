import React, { useState } from "react";
import { Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

import { submitLogin } from "../../redux/actions/authActions";
import "./login.css";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Login = (props) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const classes = useStyles();

  const handleLogin = (e) => {
    e.preventDefault();
    props.submitLogin(userLogin)
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
            {props.authErrors ? (
              <div className={classes.root}>
                {props.authErrors.map(error => (
                  <Alert key={error} severity="error">{error}</Alert>
                ))}
              </div>
            ) : null}
            <div style={{ margin: "2% 0 3%" }}>
              <button
                className='btn green'
                style={{ width: "100%" }}
                onClick={(e) => {
                  handleLogin(e)
                }}
              >
                log in
            </button>
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
  const stateToReturn = { ...state };
  if (state.Login.userInfo) stateToReturn['userSession'] = state.Login.userInfo.session;
  if (state.Errors.authErrors) stateToReturn['authErrors'] = state.Errors.authErrors;
  return stateToReturn;
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

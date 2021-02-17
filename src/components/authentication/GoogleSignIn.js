import React from "react";
// import { app } from '../../utils/axiosConfig.js'
import GoogleLogin from "react-google-login";
import { submitGoogleLogin } from "../../redux/actions/authActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const clientID =
  "799198545666-1s1bu2dvg1n4hj9hgpbjsecjhrbkbhc8.apps.googleusercontent.com";

const GoogleSignIn = (props) => {
  const handleLogin = (googleData) => props.submitGoogleLogin(googleData);

  return (
    <>
      <GoogleLogin
        clientId={clientID}
        buttonText="Log in with Google"
        onSuccess={handleLogin}
        onFailure={handleLogin}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  const stateToReturn = { ...state, loading: state.Loading.loading };
  if (state.Login.userInfo)
    stateToReturn["userSession"] = state.Login.userInfo.session;
  if (state.Errors.authErrors)
    stateToReturn["authErrors"] = state.Errors.authErrors;
  return stateToReturn;
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitGoogleLogin: (googleData) => dispatch(submitGoogleLogin(googleData)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn)
);

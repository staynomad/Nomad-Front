import React from "react";
// import { app } from '../../utils/axiosConfig.js'
import GoogleLogin from "react-google-login";
import { submitGoogleLogin } from "../../redux/actions/authActions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

const clientID =
  "799198545666-1s1bu2dvg1n4hj9hgpbjsecjhrbkbhc8.apps.googleusercontent.com";

const GoogleSignIn = (props) => {
  const isHost = props.isHost;
  const buttonText =
    typeof props.isHost !== "undefined"
      ? "Sign up with Google"
      : "Log in with Google";
  const handleLogin = (googleData) =>
    props.submitGoogleLogin(googleData, isHost);

  return (
    <>
      <GoogleLogin
        clientId={clientID}
        data-auto_select="false"
        buttonText={buttonText}
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
    submitGoogleLogin: (googleData, isHost) =>
      dispatch(submitGoogleLogin(googleData, isHost)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(GoogleSignIn)
);

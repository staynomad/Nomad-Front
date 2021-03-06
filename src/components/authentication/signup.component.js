import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { app } from "../../utils/axiosConfig.js";
import "./signup.css";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import GoogleSignIn from "./GoogleSignIn";
import CheckBoxIcon from "@material-ui/icons/CheckBox";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },
}));

const Signup = (props) => {
  const [userSignup, setUserSignup] = useState({
    email: "",
    name: "",
    password: "",
    check: "",
    isHost: false,
  });

  const classes = useStyles();

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState("");

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    app
      .post("/signup", userSignup)
      .then((res) => {
        window.sessionStorage.accessToken = res.token;
        setValidationError("");
        setSignupSuccess(true);
      })
      .catch((err) => {
        const error = err.response.data[0];
        const errorField = error.param;
        const errorMessage = error.msg;
        setUserSignup({ ...userSignup, [errorField]: "" });
        setValidationError(`${errorMessage}`);
        setLoading(false);
      });
  };

  return signupSuccess ? (
    <Redirect to="/login" />
  ) : (
    <div id="signup-content">
      <div className="signup-form-container">
        <h1 style={{ color: "#31473b", fontSize: "48px" }}>Sign Up</h1>
        <form className="form signup-form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            placeholder="Name"
            className="signup-input"
            value={userSignup.name}
            onChange={(e) =>
              setUserSignup({ ...userSignup, name: e.target.value })
            }
          />

          <input
            type="email"
            placeholder="Email"
            className="signup-input"
            value={userSignup.email}
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="signup-input"
            value={userSignup.password}
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className="signup-input"
            value={userSignup.check}
            onChange={(e) =>
              setUserSignup({ ...userSignup, check: e.target.value })
            }
          />
          {validationError === "" ? null : <p>{validationError}</p>}
          <div className="signup-checkbox-container">
            {userSignup.isHost ? (
              <div
                className="sign-up-checkbox active"
                onClick={() =>
                  setUserSignup({ ...userSignup, isHost: !userSignup.isHost })
                }
              >
                <CheckBoxIcon />
              </div>
            ) : (
              <div
                className="sign-up-checkbox"
                onClick={() =>
                  setUserSignup({ ...userSignup, isHost: !userSignup.isHost })
                }
              >
                <CheckBoxOutlineBlankIcon />
              </div>
            )}
            {"  Are you a host?"}
          </div>
          {props.authErrors ? (
            <div className={classes.root}>
              {props.authErrors.map((error) => (
                <Alert key={error} severity="error">
                  {error}
                </Alert>
              ))}
            </div>
          ) : null}
          {loading ? (
            <div id="spinner"></div>
          ) : (
            <>
              <button type="submit" className="btn green signup-button">
                <p>Create your account</p>
              </button>
              <div className="google-sign-in-container">
                <GoogleSignIn isHost={userSignup.isHost} />
              </div>
            </>
          )}
        </form>
        <div className="botText">
          Already have an account?{" "}
          <a
            href="/Login"
            className="sign-up-a"
            style={{ color: "#02b188", textDecoration: "none" }}
          >
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { app } from '../../utils/axiosConfig.js'
import "./signup.css";

const Signup = () => {
  const [userSignup, setUserSignup] = useState({
    email: "",
    name: "",
    password: "",
    check: "",
    isHost: false,
  });

  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false)
  const [validationError, setValidationError] = useState('')

  const handleSubmit = e => {
    setLoading(true)
    e.preventDefault();
    app
      .post("/signup", userSignup)
      .then((res) => {
        window.sessionStorage.accessToken = res.token;
        setValidationError('')
        setSignupSuccess(true);
      })
      .catch((err) => {
        const error = err.response.data.errors[0]
        const errorField = error[0]
        const errorMessage = error[1]
        setUserSignup({ ...userSignup, [errorField]: '' })
        setValidationError(`${errorMessage}`)
        setLoading(false)
      });
  };

  return signupSuccess ? (
    <Redirect to="/login" />
  ) : (
    <div id="signup-content">
      <div className="login-form signup-form container">
        <h1 style={{ color: "#31473b", fontSize: "48px" }}>
          Sign Up
        </h1>
        <form className="form signup-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            placeholder="email"
            className="input login-input"
            value={userSignup.email}
            onChange={e => setUserSignup({ ...userSignup, email: e.target.value })}
          />
          <input
            type="text"
            placeholder="name"
            className="input login-input"
            value={userSignup.name}
            onChange={e => setUserSignup({ ...userSignup, name: e.target.value })}
          />
          <input
            type="password"
            placeholder="password"
            className="input login-input"
            value={userSignup.password}
            onChange={e => setUserSignup({ ...userSignup, password: e.target.value })}
          />
          <input
            type="password"
            placeholder="confirm"
            className="input login-input"
            value={userSignup.check}
            onChange={e => setUserSignup({ ...userSignup, check: e.target.value })}
          />

          { validationError === '' ? null : <p>{ validationError }</p> }

          <div className="spacer_xxs"></div>
          <label className="checkbox">
            <input
              className="check"
              type="checkbox"
              name="isHost"
              checked={userSignup.isChecked}
              onChange={e => setUserSignup({ ...userSignup, isHost: !e.isHost })}
            />
            {"  Are you a host?"}
          </label>
          <div className="spacer_xxs"></div>
          {
            loading
            ? <div id="spinner"></div>
            : <input
              type="submit"
              value="create your account"
              className="btn green"
              />
          }
        </form>
        <div className="botText">
          already have an account?{" "}
          <a href="/Login" style={{ color: "#02b188", textDecoration: "none" }}>
            log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup

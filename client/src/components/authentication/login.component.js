import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import "./login.css";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const [loginSuccess, setLoginSuccess] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(userLogin),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.errors) {
          alert(data.errors[0]);
        } else {
          window.sessionStorage.accessToken = data.token;
          setLoginSuccess(true);
        }
      });
  };

  // useEffect(() => {
  //   if (window.sessionStorage.accessToken) {
  //     setLoginSuccess(true);
  //     alert("Welcome back!");
  //   }
  //   window.sessionStorage.accesToken = "" // delete token with logout
  // }, []);

  return loginSuccess ? (
    <Redirect to="/" />
  ) : (
    <div className="login-content">
      <div className="login-form">
        <form action="/login" className="form">
          <div>
            <h2 style={{ color: "#31473b", fontSize: "2em" }}>welcome back</h2>
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="your email"
              className="input login-input"
              onChange={(e) =>
                setUserLogin({ ...userLogin, email: e.target.value })
              }
              required={true}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="your password"
              className="input login-input"
              onChange={(e) =>
                setUserLogin({ ...userLogin, password: e.target.value })
              }
              required={true}
            />
          </div>
          <div style={{ margin: "2% 0 3%" }}>
            <button className="btn green" onClick={(e) => handleLogin(e)}>
              log in
            </button>
          </div>
          <div className="separate"></div>
          <div>
            <span>don't have an account? </span>
            <a
              href="/SignUp"
              style={{ color: "green", textDecoration: "none" }}
            >
              sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

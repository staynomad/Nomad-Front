import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import handleReq from "../../utils/fetchRequest.js";
import "./login.css";

const Login = (props) => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const headers = { "Content-Type": "application/json" };
    handleReq("/login", "POST", headers, userLogin)
      .then(async (res) => {
        const response = await res.json();
        props.setUserID(response.userId)
        return response;
      })
      .then((data) => {
        if (data.errors) {
          alert(data.errors[0]);
        } else {
          window.sessionStorage.accessToken = data.token;
          props.setLoggedIn(true);
        }
      });
  };

  return props.loggedIn ? (
    <Redirect to={{pathname: "/"}} />
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
            <button
              className='login btn green'
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

export default Login;

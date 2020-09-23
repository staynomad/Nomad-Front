import React, { useState } from "react";
import "./login.css";

const Login = () => {
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/login", {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: userLogin,
    }).then((res) => {
      if (res.status === 401) {
        alert("Incorrect email or password");
      }

      if (res.status === 200) {
        window.sessionStorage.accessToken = res.body.token;
      }
    });
  };

  return (
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

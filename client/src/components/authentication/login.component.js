import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-content">
      <div className="login-form">
        <form action="/login_success" className="form">
          <h2 style={{ color: "#31473b", fontSize: "2em" }}>welcome back</h2>
          <div>
            <input
              type="email"
              name="email"
              placeholder="your email"
              className="input login-input"
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              placeholder="your password"
              className="input login-input"
            />
          </div>
          <div style={{ margin: "2% 0 3%" }}>
            <button className="btn green">log in</button>
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

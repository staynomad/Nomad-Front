import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import handleReq from "../../utils/fetchRequest";
import "./signup.css";

const Signup = () => {
  const [userSignup, setUserSignup] = useState({
    email: "",
    name: "",
    password: "",
  });

  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const headers = { "Content-Type": "application/json" };
    handleReq("/signup", "POST", headers, userSignup)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.errors) {
          alert(data.errors[0]);
        } else {
          window.sessionStorage.accessToken = data.token;
          setSignupSuccess(true);
        }
      });
  };

  return signupSuccess ? (
    <Redirect to="/login" />
  ) : (
    <div id="signup-content">
      <div className="login-form signup-form">
        <h2 className="services-title signup-title">create an <br />account</h2>
        <form className="form signup-form">
          <input
            type="email"
            placeholder="your email"
            className="input login-input"
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="your name"
            className="input login-input"
            onChange={(e) =>
              setUserSignup({ ...userSignup, name: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="your password"
            className="input login-input"
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
          />
          <input
            type="submit"
            value="create your account"
            className="btn green"
            onClick={(e) => handleSubmit(e)}
          />
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

export default Signup;

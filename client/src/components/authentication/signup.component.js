import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  const [userSignup, setUserSignup] = useState({
    email: "",
    name: "", // need to change to first and last name at some point
    password: "",
  });

  const [signupSuccess, setSignupSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:8080/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      body: JSON.stringify(userSignup),
    }).then((res) => {
      if (res.status === 422) {
        alert("User already exists with that email or invalid password.");
        console.log(res.body.errors);
      }

      if (res.status === 201) {
        setSignupSuccess(true);
      }
    });
  };

  return signupSuccess ? (
    <Redirect to="/login" />
  ) : (
    <div id="signup-content">
      <div className="login-form signup-form">
        <h2 className="services-title signup-title">create an account</h2>
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
        <div>
          already have an account?{" "}
          <a href="/Login" style={{ color: "green", textDecoration: "none" }}>
            log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import "./signup.css";

const Signup = () => {
  const [userSignup, setUserSignup] = useState({
    email: "",
    name: "", // need to change to first and last name at some point
    password: "",
  });

  return (
    <div id="signup-content">
      <div class="login-form signup-form">
        <h2 className="services-title">create an account</h2>
        <form className="form signup-form">
          <input
            type="text"
            placeholder="your name"
            className="input login-input border-transparent-white"
          />
          <input
            type="email"
            placeholder="your email"
            className="input login-input border-transparent-white"
          />
          <input
            type="password"
            placeholder="your password"
            className="input login-input border-transparent-white"
          />
          <input
            type="submit"
            value="create your account"
            className="btn green"
          />
        </form>
        <div>
          already have an account? <span>log in</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

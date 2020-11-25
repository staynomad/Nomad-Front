import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/signup", userSignup)
      .then((res) => {
        window.sessionStorage.accessToken = res.token;
        setSignupSuccess(true);
        console.log(res);
      })
      .catch((err) => {
        alert(err.response.data.errors[0]);
        //window.location.reload() I (Prateek) commented this out bc its super annoying to have to reinput all your data if its not properly filled out the password
      });
  };

  return signupSuccess ? (
    <Redirect to="/login" />
  ) : (
    <div id="signup-content">
      <div className="login-form signup-form">
        <h2 className="services-title signup-title">
          create an <br />
          account
        </h2>
        <form className="form signup-form">
          <input
            type="email"
            placeholder="email"
            className="input login-input"
            onChange={(e) =>
              setUserSignup({ ...userSignup, email: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="name"
            className="input login-input"
            onChange={(e) =>
              setUserSignup({ ...userSignup, name: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="password"
            className="input login-input"
            onChange={(e) =>
              setUserSignup({ ...userSignup, password: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="confirm"
            className="input login-input"
            onChange={(e) =>
              setUserSignup({ ...userSignup, check: e.target.value })
            }
          />
          <div className="checkbox">
            <input
              className="check"
              type="checkbox"
              name="isHost"
              checked={userSignup.isChecked}
              onChange={(e) =>
                setUserSignup({ ...userSignup, isHost: !e.isHost })
              }
            />{" "}
            <label>are you a host?</label>    
          </div>
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

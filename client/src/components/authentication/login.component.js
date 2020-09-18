import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div class="container">
      <form action="/login_success">
        <h2>welcome back</h2>
        <div>
          <input type="email" name="email" placeholder="your email" />
        </div>
        <div>
          <input type="password" name="password" placeholder="your password" />
        </div>
        <div>
          <button>log in</button>
        </div>
        <div></div>
        <div>
          <span>don't have an account? </span>
          <a href="{{ url_for('login') }}">sign up</a>
        </div>
      </form>
    </div>
  );
};

export default Login;

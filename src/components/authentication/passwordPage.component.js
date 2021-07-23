import React, { useState } from "react";
import axios from "axios";
import { app } from "../../utils/axiosConfig";
import "./passwordPage.css";

const AdminPassword = ({ setToken }) => {
  const [password, setPassword] = useState();
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const loginReq = await app.post("/adminVerify", {
        password: password,
      });
      if (loginReq && loginReq.status === 200) {
        // change this to a request for generate token
        const token = loginReq.data.token;
        setToken(token);
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        return;
      }
    } catch {
      setError(true);
    }
  };

  return (
    <div className="password-page">
      <form className="password-page-container" onSubmit={handleSubmit}>
        <input
          type="password"
          className="password-page-input"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Admin Password"
        />
        {error && <h2>Incorrect Password</h2>}
        <div>
          <button type="submit" className="password-page-button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPassword;

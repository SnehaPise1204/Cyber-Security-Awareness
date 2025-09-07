import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navTo=useNavigate()
  return (
    <div className="auth-page">
      <img src="https://media.istockphoto.com/id/1135341047/vector/login-page-on-laptop-screen-notebook-and-online-login-form-sign-in-page-user-profile-access.jpg?s=612x612&w=0&k=20&c=EsJEsevxVZujj_IU_nLz4tZcvmcXTy7sQt03bpfz3ZQ="/>
      <div className="auth-box">
        <h2>Create Account</h2>
        <form>
          <div className="input-group">
            <label>Full Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input type="password" placeholder="Create a password" required />
          </div>

          <button type="submit" className="auth-btn register-btn">Register</button>

          <p className="auth-link">
            Already have an account? <a onClick={()=>{navTo("/login")}}>Login</a>
          </p>
        </form>
      </div>
    </div>
  );
}

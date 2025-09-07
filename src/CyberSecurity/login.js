import React, { useRef } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

import db from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Login() {
  let uname = useRef();
  let upass = useRef();
  let navTo = useNavigate();

  const checkLogin = async (e) => {
    e.preventDefault(); // ✅ stops form from reloading
    try {
      const colRef = collection(db, "LoginUsers");

      // ✅ Correct Firestore query (match both email & password)
      const q = query(
        colRef,
        where("name", "==", uname.current.value),
        where("pass", "==", upass.current.value)
      );

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        snapshot.forEach((doc) => {
          const data = doc.data();
          if (data.profile === "admin") {
            navTo("/admin");
          } else if (data.profile === "user") {
            navTo("/user");
          } else {
            alert("Unknown profile role");
          }
        });
      } else {
        alert("User not registered");
      }
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h2>Login</h2>
        <form onSubmit={checkLogin}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              ref={uname}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              ref={upass}
              required
            />
          </div>

          <button type="submit" className="auth-btn">
            Login
          </button>

          <p className="auth-link">
            Don’t have an account?{" "}
            <span
              style={{ color: "#003dc0", cursor: "pointer" }}
              onClick={() => navTo("/About")} // ✅ works now
            >
              Register
            </span>
          </p>
        </form>
      </div>
      <img
        src="https://img.freepik.com/free-vector/cyber-security-risk-management-abstract-concept-illustration-cyber-security-report-analysis-risk-mitigation-management-protection-strategy-identify-digital-threat_335657-874.jpg?semt=ais_hybrid&w=740&q=80"
        alt="CyberSafe"
      />
    </div>
  );
}

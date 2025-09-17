import React, { useRef, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

export default function Login() {
  const uname = useRef();
  const upass = useRef();
  const navTo = useNavigate();
  const auth = getAuth();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const checkLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ Firebase Auth login
      const userCredential = await signInWithEmailAndPassword(
        auth,
        uname.current.value,
        upass.current.value
      );

      const user = userCredential.user;

      // ✅ Fetch extra profile info from Firestore (if needed)
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();

        if (userData.profile === "admin") {
          navTo("/admin");
        } else {
          navTo("/user");
        }
      } else {
        // If no profile doc exists, default to user
        navTo("/user");
      }
    } catch (err) {
      setError("❌ " + err.message);
    }
    setLoading(false);
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

          {error && <p style={{ color: "red" }}>{error}</p>}

          <button type="submit" className="auth-btn" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="auth-link">
            Don't have an account?{" "}
            <span 
              style={{ cursor: "pointer", color: "#003dc0" }}
              onClick={() => navTo("/register")}
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

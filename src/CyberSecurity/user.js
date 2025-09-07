import React from "react";
import "./dashboard.css";

export default function UserDashboard() {
  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">Cyber<span>Safe</span></h2>
        <ul className="menu">
          <li className="active">🏠 Dashboard</li>
          <li>📚 My Courses</li>
          <li>📝 Reports</li>
          <li>⚙️ Settings</li>
          <li>🚪 Logout</li>
        </ul>
      </aside>

      {/* Main Area */}
      <div className="main-content">

        {/* Top Navigation */}
        <header className="topbar">
          <h1>Welcome back, Sneha 👋</h1>
          <div className="topbar-actions">
            <span className="notification">🔔</span>
            <div className="profile">
              <img src="https://i.pravatar.cc/40" alt="User" />
              <span>User</span>
            </div>
          </div>
        </header>

        {/* Watched Materials */}
        <section className="watched-section">
          <h2>Recently Watched</h2>
          <div className="watched-list">
            <div className="watched-card">
              <h3>🔐 Password Security</h3>
              <p>Completed • Aug 20, 2025</p>
            </div>
            <div className="watched-card">
              <h3>🛡️ Phishing Awareness</h3>
              <p>In Progress</p>
            </div>
            <div className="watched-card">
              <h3>🌐 Safe Browsing</h3>
              <p>Not Started</p>
            </div>
          </div>
        </section>

        {/* Recommendations */}
        <section className="recommend-section">
          <h2>Recommended for You</h2>
          <div className="recommend-list">
            <div className="recommend-card">📖 Social Engineering</div>
            <div className="recommend-card">📖 Secure Wi-Fi Practices</div>
            <div className="recommend-card">📖 Malware Protection</div>
          </div>
        </section>

      </div>
    </div>
  );
}

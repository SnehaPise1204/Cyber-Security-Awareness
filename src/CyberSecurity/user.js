import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebase"; // make sure your firebase.js exports db
import { collection, getDocs } from "firebase/firestore";
import "./dashboard.css";

function Navbar() {
  const [user, setUser] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser ? currentUser : null);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <nav className="IntroBox">
      <div className="profile">
        {user ? (
          <div className="user-info">
            <div className="avatar_User">
              {user.photoURL ? (
                <img src={user.photoURL} alt="User Avatar" />
              ) : (
                <span>
                  {user.displayName
                    ? user.displayName.charAt(0).toUpperCase()
                    : user.email.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <div className="details">
              <p className="name">
                {user.displayName || user.email.split("@")[0]}
              </p>
              <p className="email">{user.email}</p>
            </div>
            <button className="logout-btn" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          <span className="icon">👤</span>
        )}
      </div>
    </nav>
  );
}

function ReviewedMaterial({ title, lastViewed, link }) {
  return (
    <div className="review-item">
      <div className="review-title">{title}</div>
      <div className="review-meta">Last viewed: {lastViewed}</div>
      <a className="review-link" href={link} target="_blank" rel="noreferrer">
        Review Again
      </a>
    </div>
  );
}

function Dashboard() {
  const [reviewedMaterials, setReviewedMaterials] = useState([]);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const materialsRef = collection(
            db,
            "users",
            currentUser.uid,
            "reviewedMaterials"
          );
          const snapshot = await getDocs(materialsRef);
          const materials = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setReviewedMaterials(materials);
        } catch (error) {
          console.error("Error fetching reviewed materials:", error);
        }
      } else {
        setReviewedMaterials([]);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className="dashboard">
      <div className="review-section">
        <h2>Recently Viewed Materials</h2>
        <div className="review-list">
          {reviewedMaterials.length > 0 ? (
            reviewedMaterials.map((m) => (
              <ReviewedMaterial
                key={m.id}
                title={m.title}
                lastViewed={m.lastViewed}
                link={m.link}
              />
            ))
          ) : (
            <p>No materials viewed yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <Navbar />
      <Dashboard />
    </div>
  );
}

export default App;

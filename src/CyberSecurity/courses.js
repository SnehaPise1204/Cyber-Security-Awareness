import React, { useEffect, useState } from "react";
import {useNavigate } from 'react-router-dom';
import db from "../firebase";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { Star } from "lucide-react";

import "./courses.css";

function CoursesPage() {
  const navTo=useNavigate()
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [handbooks, setHandbooks] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [viewed, setViewed] = useState([]);
  const [activeTab, setActiveTab] = useState("articles");

  // ✅ Use device info as userId
  const userId = navigator.userAgent.replace(/\W/g, "_");

  // 🔹 Fetch all materials
  useEffect(() => {
    const fetchData = async () => {
      try {
        const articleSnap = await getDocs(collection(db, "Articles"));
        setArticles(articleSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const videoSnap = await getDocs(collection(db, "Videos"));
        setVideos(videoSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const handbookSnap = await getDocs(collection(db, "eBooks"));
        setHandbooks(handbookSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

        const podcastSnap = await getDocs(collection(db, "podcasts"));
        setPodcasts(podcastSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 Fetch viewed material list
  const fetchViewed = async () => {
    try {
      const userRef = doc(db, "users", userId);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        setViewed(data.viewedMaterial || []);
      } else {
        setViewed([]);
      }
    } catch (error) {
      console.error("❌ Error fetching viewed materials:", error);
    }
  };

  // 🔹 Save viewed material only if user doc already exists
  const saveViewedMaterial = async (material) => {
    try {
      const userRef = doc(db, "users", userId);
      const snap = await getDocs(collection(db, "users"));
      const userExists = snap.docs.some((d) => d.id === userId);

      if (userExists) {
        await updateDoc(userRef, {
          viewedMaterial: arrayUnion(material),
        });
        console.log("✅ Viewed material saved:", material);
      } else {
        console.log("⚠️ User document not found, skipping update");
      }
    } catch (error) {
      console.error("❌ Error saving viewed material:", error);
    }
  };

  const getActiveItems = () => {
    switch (activeTab) {
      case "articles":
        return { label: "Articles", items: articles };
      case "videos":
        return { label: "Videos", items: videos };
      case "handbooks":
        return { label: "Handbooks", items: handbooks };
      case "podcasts":
        return { label: "Podcasts", items: podcasts };
      case "viewed":
        return { label: "Viewed", items: viewed };
      default:
        return { label: "Articles", items: articles };
    }
  };

  const renderContent = () => {
    const { label, items } = getActiveItems();

    if (label === "Viewed") {
      return items.length === 0 ? (
        <p>No viewed materials yet</p>
      ) : (
        <div className="card-grid">
          {items.map((material, idx) => (
            <div key={idx} className="card">
              <h3>{material.name}</h3>
              <a href={material.url} target="_blank" rel="noreferrer">
                View Again
              </a>
            </div>
          ))}
        </div>
      );
    }

    return items.length === 0 ? (
      <p>No {label} available</p>
    ) : (
      <div className="card-grid">
        {items.map((item) => (
          <div key={item.id} className="card">
            <h3 className="flex items-center gap-2">
              {item.name}
              {item.by === "Indian Computer Emergency Response Team" && (
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
              )}
            </h3>
            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              onClick={() => saveViewedMaterial({ name: item.name, url: item.url })}
            >
              {label === "Videos"
                ? "Watch Video"
                : label === "Articles"
                ? "Read Article"
                : label === "Handbooks"
                ? "Read Handbook"
                : "Listen Podcast"}
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
    <div className="courses-container">
      <h1 className="page-title">Courses Library</h1>
      <p className="subtitle">Explore curated learning materials</p>

      {/* Navbar */}
      <div className="navbar-buttons">
        <button className={activeTab === "articles" ? "active" : ""} onClick={() => setActiveTab("articles")}>
          Articles
        </button>
        <button className={activeTab === "videos" ? "active" : ""} onClick={() => setActiveTab("videos")}>
          Videos
        </button>
        <button className={activeTab === "handbooks" ? "active" : ""} onClick={() => setActiveTab("handbooks")}>
          Handbooks
        </button>
        <button className={activeTab === "podcasts" ? "active" : ""} onClick={() => setActiveTab("podcasts")}>
          Podcasts
        </button>
        <button
          className={activeTab === "viewed" ? "active" : ""}
          onClick={() => {
            fetchViewed();
            setActiveTab("viewed");
          }}
        >
          Viewed
        </button>
      </div>

      <div className="section">{renderContent()}</div>
      </div>
            <div className='footer'>
          <div>
            <img src={require('../requiredIMG/cyber.png')} id='logo1' alt="Cyber Security" />
            <p>A cybersecurity awareness platform that educates and empowers users<br/> to stay safe online</p>
          </div>
          <div>
            <h3>Our policy to provide</h3>
            <p>information About Cybersecurity</p>
            <p>Cybersecurity Best Practices</p>
            <p>Latest Security Updates</p>
            <p>Free Learning Resources</p>
          </div>
          <div className='link'>
            <h3>important links</h3>
            <p onClick={() => navTo("/")}>Home</p>
            <p onClick={() => navTo("/About")}>About</p>
            <p onClick={() => navTo("/courses")}>Courses</p>
            <p onClick={() => navTo("/contact")}>Contact</p>
          </div>
          <div>
            <h3>Address</h3>
            <p>CyberSafe Solutions 123, Cyber Tower,<br/> Baner-Pashan Link Road, Pune, Maharashtra 411045, India</p>
            <p><b>Email:</b>info@cybersafe.com</p>
            <p><b>Phone</b>+91 78220 10159</p>
          </div>
        </div>
    </>
  );
}

export default CoursesPage;

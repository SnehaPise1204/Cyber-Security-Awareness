import React, { useEffect, useState } from "react";
import db from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Star } from "lucide-react"; // for star icon
import "./courses.css";

function CoursesPage() {
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);
  const [handbooks, setHandbooks] = useState([]);
  const [podcasts, setPodcasts] = useState([]);
  const [activeTab, setActiveTab] = useState("articles");

  
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
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    };

    fetchData();
  }, []);

  // pick data source based on active tab
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
      default:
        return { label: "Articles", items: articles };
    }
  };

  const renderContent = () => {
    const { label, items } = getActiveItems();

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
            <a href={item.url} target="_blank" rel="noreferrer">
              {label === "Videos" ? "Watch Video" : label === "Articles" ? "Read Article" : label === "Handbooks" ? "Read Handbook": "Listen Podcast"}
            </a>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="courses-container">
      <h1 className="page-title">Courses Library</h1>
      <p className="subtitle">Explore curated learning materials</p>

      {/* Navbar */}
      <div className="navbar-buttons">
        <button className={activeTab === "articles" ? "active" : ""} onClick={() => setActiveTab("articles")}>Articles</button>
        <button className={activeTab === "videos" ? "active" : ""} onClick={() => setActiveTab("videos")}>Videos</button>
        <button className={activeTab === "handbooks" ? "active" : ""} onClick={() => setActiveTab("handbooks")}>Handbooks</button>
        <button className={activeTab === "podcasts" ? "active" : ""} onClick={() => setActiveTab("podcasts")}>Podcasts</button>
      </div>

      <div className="section">{renderContent()}</div>
    </div>
  );
}

export default CoursesPage;
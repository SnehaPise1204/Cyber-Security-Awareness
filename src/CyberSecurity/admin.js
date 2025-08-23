import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
} from "firebase/firestore";
import "./admin.css";

function Admin() {
  const [content, setContent] = useState([]);
  const [activeTab, setActiveTab] = useState("");
  const [messages, setMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    type: "Articles",
    name: "",
    by: "",
    url: "",
  });

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        let MessageSnap = await getDocs(collection(db, "contacts"));
        setMessages(
          MessageSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      } catch (e) {
        console.log("Error:", e);
      }
    };
    fetchMessages();
  }, []);

  const displayData = async (e) => {
    const collectionName = e.currentTarget.id;
    setActiveTab(collectionName);

    try {
      const contentSnap = await getDocs(collection(db, collectionName));
      setContent(
        contentSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addMaterial = () => {
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitMaterial = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, formData.type), {
        name: formData.name,
        by: formData.by,
        url: formData.url,
      });
      alert("Material Added Successfully!");
      setShowForm(false);
      setFormData({ type: "Articles", name: "", by: "", url: "" });
      if (activeTab === formData.type) {
        displayData({ currentTarget: { id: formData.type } });
      }
    } catch (error) {
      console.error("Error adding material:", error);
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, activeTab, id));
      console.log("Item Deleted");
      setContent(content.filter((item) => item.id !== id));
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <div className="user-info">
          <span>Welcome, Admin</span>
          <div className="avatar">A</div>
          <button type="button" onClick={addMaterial}>
            Add Material
          </button>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stats-card" id="Articles" onClick={displayData}>
          <div className="stats-icon article-icon">
            <i className="fas fa-newspaper"></i>
          </div>
          <div className="stats-info">
            <h3>Articles</h3>
          </div>
        </div>

        <div className="stats-card" id="Videos" onClick={displayData}>
          <div className="stats-icon video-icon">
            <i className="fas fa-video"></i>
          </div>
          <div className="stats-info">
            <h3>Videos</h3>
          </div>
        </div>

        <div className="stats-card" id="eBooks" onClick={displayData}>
          <div className="stats-icon podcast-icon">
            <i className="fas fa-podcast"></i>
          </div>
          <div className="stats-info">
            <h3>Handbooks</h3>
          </div>
        </div>

        <div className="stats-card" id="podcasts" onClick={displayData}>
          <div className="stats-icon ebook-icon">
            <i className="fas fa-book"></i>
          </div>
          <div className="stats-info">
            <h3>Podcasts</h3>
          </div>
        </div>
      </div>

      {activeTab && (
        <div className="messages-section">
          <h2>{activeTab} available on website</h2>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Provided by</th>
                <th>URL</th>
                <th>Want to remove</th>
              </tr>
            </thead>
            <tbody>
              {content.map((item) => (
                <tr key={item.id}>
                  <td>
                    <b>{item.name}</b>
                  </td>
                  <td>{item.by}</td>
                  <td>{item.url}</td>
                  <td>
                    <button
                      className="remove"
                      onClick={() => deleteItem(item.id)}
                    >
                      remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Messages */}
      <div className="messages-section">
        <h2>Recent Messages</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg.id}>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Popup Form */}
      {showForm && (
        <div className="popup-overlay">
          <div className="popup-form">
            <h2>Add Material</h2>
            <form onSubmit={submitMaterial}>
              <label>Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
              >
                <option value="Articles">Article</option>
                <option value="Videos">Video</option>
                <option value="podcasts">Podcast</option>
                <option value="eBooks">Handbook</option>
              </select>

              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <label>Writer</label>
              <input
                type="text"
                name="by"
                value={formData.by}
                onChange={handleChange}
                required
              />

              <label>URL</label>
              <input
                type="url"
                name="url"
                value={formData.url}
                onChange={handleChange}
                required
              />

              <div className="form-actions">
                <button type="submit">Submit</button>
                <button type="button" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;

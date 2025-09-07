import React, { useRef, useEffect, useState } from 'react';
import { Link, Routes, Route,useNavigate } from 'react-router-dom';

import db from "../firebase";
import { collection, query, where, getDocs } from 'firebase/firestore';

import "./style.css";
import "./responsive.css";
import FadeInSection from "./fadeIn";


function ChangeNumbers({ children }) {
  const ref = useRef();
  const [isVisible, setVisible] = useState(false);
  const [videos, setVideos] = useState(0);
  const [articles, setArticles] = useState(0);
  const [podcasts, setPodcasts] = useState(0);
  const [ebooks, setEbooks] = useState(0);
  

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let v = 0, a = 50, p = 0, e = 0;
      const interval = setInterval(() => {
        if (v < 10) setVideos(++v);
        if (a < 80) setArticles(++a);
        if (p < 7) setPodcasts(++p);
        if (e < 20) setEbooks(++e);
        if (v >= 10 && a >= 120 && p >= 7 && e >= 20) clearInterval(interval);
      }, 80);
    }
  }, [isVisible]);

  return (
    <div ref={ref} className="info">
      <h2>Flexible Learning Options</h2>
      <div className="info1">
        <div><p>{videos}+</p><h3>Videos</h3></div>
        <div><p>{articles}+</p><h3>Articles</h3></div>
        <div><p>{podcasts}+</p><h3>Podcasts</h3></div>
        <div><p>{ebooks}+</p><h3>Handbooks</h3></div>
      </div>
    </div>
  );
}

// ------------------- Home Page -------------------
function Home() {
  const SearchInput = useRef();
  const [SearchOutput, setSearchOutput] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  
  // Trigger search on Enter key
  const Search = (e) => {
    if (e.key === "Enter") {
      HandleSearch();
    }
  };

  // Search function
  const HandleSearch = async () => {
    try {
      let searchText = SearchInput.current.value.trim();
      if (!searchText) {
        alert("Please enter a search term");
        return;
      }

      const collections = ["Articles", "Videos", "eBooks", "podcasts"];
      let allResults = [];

      for (let col of collections) {
        const colRef = collection(db, col);
        const q = query(colRef, where("name", "==", searchText));
        const snapshot = await getDocs(q);

        snapshot.forEach((doc) => {
          allResults.push({
            id: doc.id,
            collection: col,
            ...doc.data(),
          });
        });
      }

      setSearchOutput(allResults);
      setShowPopup(true);

      if (allResults.length === 0) {
        alert("No results found!");
      }

    } catch (e) {
      console.log("Error:", e);
      alert("Error, Please try again...!");
    }
  };

  return (
    <>
      {/* -------- Header Section -------- */}
      <div style={{
        backgroundColor: '#ffcc00',
        color: '#000',
        padding: '10px',
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        ⚠ This website is for educational purposes only.  
        All examples are for cybersecurity awareness.  
        No real passwords, credentials, or downloads are provided.
      </div>
      <header>
        <img src={require('../requiredIMG/cyber.png')} alt="Cyber Security" id='logo'/>
        <input
          id="searchBox"
          type="text"
          placeholder="Search"
          ref={SearchInput}
          onKeyDown={Search}
        />
        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<IntroSection />} />
      </Routes>

      {/* -------- Popup Search Results -------- */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Search Results</h2>
            {SearchOutput.length > 0 ? (
              SearchOutput.map((item) => (
                <div key={item.id} className="result-item">
                  <p>
                    <strong>{item.collection}</strong>: {item.name}</p>
                    <div>
                      <a href={item.url} target='_blank' rel="noreferrer" className='popUpBtn'>Open</a>
                      <button className='popUpBtn' onClick={() => setShowPopup(false)}>Close</button>
                    </div>
                    
                </div>
              ))
            ) : (<div>
                  <p>No results found.</p>
                  <button onClick={() => setShowPopup(false)}>Close</button>
              </div>
            )}
          </div>
        </div>
      )}
      
    </>
  );
}

// ------------------- Intro Section -------------------
function IntroSection() {
  const navTo=useNavigate()
  return (
    <>
      <div className="intro">
        <FadeInSection>
          <div className="IntroDescription">
            <h1>Secure Today, Safer Tomorrow</h1>
            <h2>
              Empowering You with the Knowledge to Recognize,<br /> 
              Prevent, and Stay Protected Against Cyber Threats
            </h2>

            <a className="intoBtn" href="courses">Get Started</a>
            <a className="intoBtn" href="contact">Contact us</a>
          </div>
        </FadeInSection>
      </div>

      {/* What is Cyber Security Section */}
      <div className="WhatIsCyberSecurity">
        <img src={require('../requiredIMG/lock.webp')} alt="Cyber Security" />
        <FadeInSection>
          <h1>What is cyber security awareness?</h1>
          <p>
            Cybersecurity is essential in protecting your personal and business information
            from various online threats, such as malware, phishing, and ransomware.
          </p>
          <p>
            To safeguard against cyber threats, it's important to use strong passwords,
            keep software updated, use firewalls, and be cautious of suspicious emails and links.
          </p>
          <p>
            Businesses should implement a cyber security plan, regularly train employees on
            cybersecurity awareness, backup data, monitor network activity, and have an incident
            response plan in place to protect against cyber attacks.
          </p>
        </FadeInSection>
      </div>

      {/* Mission Section */}
      <div className="Mission">
        <FadeInSection>
          <h1>Building a Safer Digital Future for All</h1>
          <p>
            Our mission is to empower individuals and organizations with the knowledge,
            skills, and confidence to navigate the digital world safely. Through engaging
            training modules, real-world simulations, and interactive quizzes, we aim to 
            transform cybersecurity awareness into everyday habits.
          </p>
        </FadeInSection>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTivgRv8QMx31UOsXxnxwF1BsCZ96A281UEwg&s"
          alt="Cyber Security"
        />
      </div>

      {/* Numbers Section */}
      <ChangeNumbers />

      {/* Key Features */}
      <div className="key-features">
        <h2>Key Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/044/451/228/small_2x/anti-virus-3d-icon-shield-security-3d-icon-png.png" alt="Awareness" />
            <h3>Cybersecurity Awareness</h3>
            <p>Learn how to protect yourself from online threats through easy-to-understand guides and tips.</p>
          </div>
          <div className="feature-card">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/044/451/247/small/internet-security-3d-icon-network-security-3d-icon-png.png" alt="Awareness" />
            <h3>Cybersecurity Best Practices</h3>
            <p>Get practical advice on securing passwords, avoiding scams, and protecting personal information.</p>
          </div>
          <div className="feature-card">
            <img src="https://png.pngtree.com/png-vector/20250518/ourmid/pngtree-blue-shield-icon-with-checkmark-symbolizing-security-protection-and-verified-approval-png-image_16317361.png" alt="Awareness" />
            <h3>Latest Security Updates</h3>
            <p>Stay updated with the latest news, trends, and vulnerabilities in the cyber world.</p>
          </div>
          <div className="feature-card">
            <img src="https://static.vecteezy.com/system/resources/thumbnails/044/451/230/small/network-security-3d-icon-computer-with-security-shield-symbol-png.png" alt="Awareness" />
            <h3>Free Learning Resources</h3>
            <p>Access a curated list of free tools, eBooks, and learning platforms to enhance your skills.</p>
          </div>
        </div>
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

export default Home; 


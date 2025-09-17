import React, { useState, useMemo, useEffect } from "react";
import "./practice.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export default function CyberAwarenessHub() {
  const [view, setView] = useState("password");

  return (
    <div className="cyber-hub">
      <main className="cy-main">
        <aside className="cy-side">
          <h2>Quick Actions</h2>
          <p>Choose a mini-game or read about password best practices.</p>
          <div className="quick-actions">
            <button className="cy-action" onClick={() => setView("password")}>
              🔑 Password Strength
            </button>
            <button className="cy-action" onClick={() => setView("phishing")}>
              📧 Phishing Quiz
            </button>
            <button className="cy-action" onClick={() => setView("quiz")}>
              ❓ Cyber Quiz
            </button>
            <button className="cy-action" onClick={() => setView("site")}>
              🌐 Safe / Unsafe Website
            </button>
          </div>

          <hr />
          <div className="tip">
            Tip: No real passwords are sent to servers. All checks run in your browser.
          </div>
        </aside>

        <section className="cy-card">
          {view === "password" && <PasswordArticle />}
          {view === "phishing" && <PhishingQuiz />}
          {view === "quiz" && <CyberQuiz />}
          {view === "site" && <SafeUnsafeSite />}
        </section>
      </main>
    </div>
  );
}

/* ---------------------- Password Strength --------------------- */
function PasswordArticle() {
  const [password, setPassword] = useState("");
  const [showStrength, setShowStrength] = useState(false);

  const strength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const messages = [
    "Very Weak 😟",
    "Weak ⚠️",
    "Moderate 🙂",
    "Strong 💪",
    "Very Strong 🔐"
  ];

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      setShowStrength(true);
    }
  }

  return (
    <div>
      <h2>Password Strength Checker</h2>
      <p>
        Enter a password below and press <strong>Enter</strong> to test its
        strength.
      </p>
      <input
        type="password"
        className="cy-input"
        placeholder="Type a password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {showStrength && (
        <p className="strength">Strength: {messages[strength]}</p>
      )}

      <ul className="cy-list">
        <li>At least 8 characters</li>
        <li>Use uppercase letters</li>
        <li>Include numbers</li>
        <li>Add special symbols (!@#$)</li>
      </ul>
    </div>
  );
}

/* ---------------------- Phishing Quiz (5 random from Firestore) --------------------- */
function PhishingQuiz() {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "phishingQuiz"));
      const fetched = querySnapshot.docs.map((doc) => doc.data());
      const shuffled = fetched.sort(() => 0.5 - Math.random()).slice(0, 5);
      setQuestions(shuffled);
    }
    fetchData();
  }, []);

  if (questions.length === 0) return <p>Loading questions...</p>;
  if (step >= questions.length) {
    return (
      <div>
        <h2>Phishing Quiz Complete!</h2>
        <p>You scored {score} / {questions.length}</p>
      </div>
    );
  }

  const current = questions[step];

  function handle(ans) {
    if (ans === current.answer) setScore(score + 1);
    setStep(step + 1);
  }

  return (
    <div>
      <h2>Phishing Quiz</h2>
      <p>{current.text}</p>
      <div className="quiz-buttons">
        <button onClick={() => handle("phish")} className="cy-action">🚨 Phish</button>
        <button onClick={() => handle("safe")} className="cy-action">✅ Safe</button>
      </div>
    </div>
  );
}

/* ---------------------- Cyber Quiz (5 random from Firestore) --------------------- */
function CyberQuiz() {
  const [questions, setQuestions] = useState([]);
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "CyberQuiz"));
      const fetched = querySnapshot.docs.map((doc) => doc.data());
      console.log("Data Fatched",fetched.length)
      const shuffled = fetched.sort(() => 0.5 - Math.random()).slice(0, 5);
      setQuestions(shuffled);
    }
    fetchData();
  }, []);

  if (questions.length === 0) return <p>Loading quiz...</p>;
  if (step >= questions.length) {
    return <p>Quiz finished! Score: {score}/{questions.length}</p>;
  }

  function handleChoice(i) {
    if (i === questions[step].answer) setScore(score + 1);
    setStep(step + 1);
  }

  return (
    <div>
      <h2>Cyber Quiz</h2>
      <p>{questions[step].question}</p>
      <div className="quiz-buttons">
        {questions[step].options.map((opt, i) => (
          <button key={i} className="cy-action" onClick={() => handleChoice(i)}>{opt}</button>
        ))}
      </div>
    </div>
  );
}

/* ---------------------- Safe / Unsafe Site (5 random from Firestore) --------------------- */
function SafeUnsafeSite() {
  const [sites, setSites] = useState([]);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "safeUnsafeSites"));
      const fetched = querySnapshot.docs.map((doc) => doc.data());
      const shuffled = fetched.sort(() => 0.5 - Math.random()).slice(0, 5);
      setSites(shuffled);
    }
    fetchData();
  }, []);

  if (sites.length === 0) return <p>Loading sites...</p>;
  if (index >= sites.length) {
    return <p>Game Over! Your score: {score}/{sites.length}</p>;
  }

  function check(ans) {
    if (ans === sites[index].safe) setScore(score + 1);
    setIndex(index + 1);
  }

  return (
    <div>
      <h2>Safe or Unsafe Website?</h2>
      <p>URL: <code>{sites[index].url}</code></p>
      <div className="quiz-buttons">
        <button onClick={() => check(true)} className="cy-action">✅ Safe</button>
        <button onClick={() => check(false)} className="cy-action">🚨 Unsafe</button>
      </div>
    </div>
  );
}

import './App.css';
import Home from "./CyberSecurity/home"
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as BR } from 'react-router-dom';
import About from "./CyberSecurity/About";
import Contact from "./CyberSecurity/contact";
import CoursesPage from './CyberSecurity/courses';

function App() {
  return (
    <div className="App">
      <BR>
        <Home/>
        <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
      </BR>
    </div>
  );
}

export default App;

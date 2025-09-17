import './App.css';
import Home from "./CyberSecurity/home"
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as BR } from 'react-router-dom';
import About from "./CyberSecurity/About";
import Contact from "./CyberSecurity/contact";
import CoursesPage from './CyberSecurity/courses';
import PracticePage from './CyberSecurity/practice';
import Login from './CyberSecurity/login';
import Register from './CyberSecurity/register';
import User from './CyberSecurity/user';

function App() {
  
  return (
    <div className="App">
      <BR>
        <Home/>
        <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
      </BR>
    </div>
  );
}

export default App;

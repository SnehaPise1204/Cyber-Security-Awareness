import React, { useRef } from "react";
import {useNavigate } from 'react-router-dom';
import "./about.css";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

function Contact() {
  const navTo=useNavigate()
  const Name = useRef();
  const Email = useRef();
  const Message = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted");

    try {
      await addDoc(collection(db, "contacts"), {
        name: Name.current.value,
        email: Email.current.value,
        message: Message.current.value,
        timestamp: new Date()
      });

      alert("Message sent successfully!");
      Name.current.value = "";
      Email.current.value = "";
      Message.current.value = "";
    } catch (error) {
      console.error("Error adding document:", error);
      alert(`Failed to send message: ${error.message}`);
    }
  };

  return (
    <>
    <div className="Contact">
      <div className="contact-container">
        <h2>Contact Us</h2>
        <p>
          We would love to hear from you. Fill out the form below and we will get back to you as soon as possible.
        </p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" ref={Name} placeholder="Your Name" required />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" ref={Email} placeholder="Your Email" required />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea id="message" ref={Message} placeholder="Your Message" rows="6" required></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>

        <div className="contact-info">
          <div>
            <h3>Email</h3>
            <p>info@cybersafe.com</p>
          </div>
          <div>
            <h3>Phone</h3>
            <p>+91 78220 10159</p>
          </div>
          <div>
            <h3>Address</h3>
            <p>CyberSafe Solutions 123, Cyber Tower, Baner-Pashan Link Road, Pune, Maharashtra 411045, India</p>
          </div>
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

export default Contact;

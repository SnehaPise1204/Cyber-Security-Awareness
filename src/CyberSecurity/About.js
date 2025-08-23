import React from "react";
import "./about.css";
import FadeInSection from "./fadeIn";
import { useNavigate } from "react-router-dom";

function About() {
  let navTo = useNavigate();

  return (
    <>
      <div className="hero">
        <FadeInSection>
          <div>
            <h1>About Us</h1>
            <h3>
              We help people and organizations stay safe online by providing clear guidance, practical tools, and the skills to prevent cyber threats — making digital security simple and effective for everyone
            </h3>
            <div className="btndiv">
              <button className="intoBtn" onClick={() => navTo("/")}>Go to Home</button>
              <button className="intoBtn" onClick={() => navTo("/contact")}>Contact us</button>
            </div>
          </div>
        </FadeInSection>
      </div>

      <div className="WhoWeAre">
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/047/407/854/small/group-of-cheerful-businesspeople-with-leader-in-front-free-photo.jpg"
          alt="Cyber Security"
        />
        <FadeInSection>
          <h1>Who We Are</h1>
          <p>
            We are a dedicated cybersecurity awareness platform committed to educating individuals, businesses, and communities about online safety. Our mission is to simplify complex security concepts, provide practical resources, and empower everyone to protect their digital presence with confidence
          </p>
        </FadeInSection>
      </div>

      <div className="tableDiv">
        <h1>Platform Highlights</h1>
        <table className="features-table" border="1" cellSpacing="0" cellPadding="10">
          <thead>
            <tr>
              <th>Feature</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Awareness Guides</strong></td>
              <td>Gain a clear understanding of common cyber threats such as phishing, malware, and social engineering. Our guides simplify complex security concepts into actionable steps, enabling you to recognize and prevent attacks effectively.</td>
            </tr>
            <tr>
              <td><strong>Best Practices</strong></td>
              <td>Learn strategies for protecting sensitive data, managing strong passwords, avoiding scams, and safely browsing online. Our tips help you develop long-term cyber hygiene habits for both personal and professional safety.</td>
            </tr>
            <tr>
              <td><strong>Security Updates</strong></td>
              <td>Stay informed with the latest trends, threats, and tools in cybersecurity. We provide timely alerts on breaches and vulnerabilities so you can respond proactively.</td>
            </tr>
            <tr>
              <td><strong>Learning Resources</strong></td>
              <td>Access curated free cybersecurity tools, eBooks, and online courses designed for beginners and professionals to continuously improve their skills.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="WhoWeAre">
        <FadeInSection>
          <h1>Our Vision</h1>
          <p>
            At CyberSafe, our vision is to create a world where every individual 
            and organization can navigate the digital landscape with confidence and security. 
            We believe that cybersecurity is not just a technical necessity but a vital life skill. 
            Our goal is to empower people with practical knowledge, innovative tools, 
            and actionable strategies to recognize threats, prevent cyber attacks, 
            and maintain their privacy online. By fostering awareness and providing 
            accessible guidance, we aim to build a safer, smarter, and more resilient 
            digital community for today and the future.
          </p>
        </FadeInSection>
        <img
          src="https://img.freepik.com/premium-photo/our-vision-concept-business-technology-internet_220873-13795.jpg?w=360"
          alt="Cyber Security"
        />
      </div>

      <div className="contact">
        <div className="contactContainer">
          <h2>Get in Touch</h2>
          <p>Have questions or need support? Reach out to us and we'll respond promptly.</p>
          <a href="/contact" className="button">Contact Us</a>
        </div>
      </div>
    </>
  );
}

export default About;

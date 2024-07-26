import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram } from '@fortawesome/free-brands-svg-icons';
import '../Footer/Footer.css';
import logo from '../../images/logo.png'
import { useNavigate } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <img src={logo} alt="Company Logo" className="footer-logo" />
          <p>Simplifying cold emailing for everyone, one click at a time.</p>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><button onClick={()=>navigate('/')}>Home</button></li>
            <li><button onClick={()=>navigate('/about')}>About Us</button></li>
            <li><button onClick={()=>navigate('/pricing')}>Pricing</button></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>123 Business Street</p>
          <p>Gurugram, Haryana 122001</p>
          <p>Email: vishalbhati294@gmail.com</p>
          <p>Phone: +91-8572862193</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faLinkedinIn} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 SUDI. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
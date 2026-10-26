import React from 'react';
import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedinIn, FaTwitter, FaInstagram, FaHeart } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <h3 className="footer-logo">
              <span className="logo-bracket">&lt;</span>
              <span className="gradient-text">Ayush Dubey</span>
              <span className="logo-bracket">/&gt;</span>
            </h3>
            <p className="footer-tagline">
              Building digital experiences with passion and precision.
            </p>
          </div>

          <div className="footer-links-section">
            <h4 className="footer-heading">Quick Links</h4>
            <div className="footer-links">
              <Link to="/" className="footer-link hoverable">Home</Link>
              <Link to="/about" className="footer-link hoverable">About</Link>
              <Link to="/projects" className="footer-link hoverable">Projects</Link>
              <Link to="/games" className="footer-link hoverable">Games</Link>
              <Link to="/contact" className="footer-link hoverable">Contact</Link>
            </div>
          </div>

          <div className="footer-social-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-socials">
              <a href="https://github.com/Ayushdubey5" target="_blank" rel="noreferrer" className="social-icon hoverable" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://www.linkedin.com/in/ayush-dubey-694629307/" target="_blank" rel="noreferrer" className="social-icon hoverable" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://x.com/AyushD12011992/" target="_blank" rel="noreferrer" className="social-icon hoverable" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://instagram.com/full_coded_developer?rpxt=MTg5dngzd3A3aWl3NA%3D%3D" target="_blank" rel="noreferrer" className="social-icon hoverable" aria-label="Instagram">
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            © {currentYear} Ayush Dubey. Made with <FaHeart className="heart-icon" /> and ☕
          </p>
        </div>
      </div>
    </footer>
  );
}
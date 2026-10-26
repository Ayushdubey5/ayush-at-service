import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastScroll, setLastScroll] = useState(0);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrolled(currentScroll > 50);
      
      if (currentScroll > lastScroll && currentScroll > 200) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScroll]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/games', label: 'Games' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${hidden ? 'hidden' : ''}`}>
      <div className="nav-container">
        <Link to="/" className="nav-logo hoverable">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-text">Ayush Dubey</span>
          <span className="logo-bracket">/&gt;</span>
        </Link>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link, index) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link hoverable ${location.pathname === link.path ? 'active' : ''}`}
              style={{ animationDelay: menuOpen ? `${index * 0.1}s` : '0s' }}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="theme-toggle hoverable"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className={`theme-icon ${theme === 'dark' ? 'moon' : 'sun'}`}>
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
          </button>
        </div>

        <div className="nav-right-mobile">
          <button
            className="theme-toggle-mobile hoverable"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
          <button
            className={`hamburger hoverable ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="ham-line"></span>
            <span className="ham-line"></span>
            <span className="ham-line"></span>
          </button>
        </div>
      </div>

      {menuOpen && <div className="menu-overlay" onClick={() => setMenuOpen(false)} />}
    </nav>
  );
}
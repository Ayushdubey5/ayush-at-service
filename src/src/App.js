import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Cat from './components/Cat/Cat';
import ParticleBackground from './components/Background/ParticleBackground';
import CustomCursor from './components/CustomCursor/CustomCursor';
import Loader from './components/Loader/Loader';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Projects from './pages/Projects/Projects';
import Games from './pages/Games/Games';
import Contact from './pages/Contact/Contact';
import './App.css';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/games" element={<Games />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <CustomCursor />
          <ParticleBackground />
          <Navbar />
          <Cat />
          <main className="main-content">
            <AnimatedRoutes />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
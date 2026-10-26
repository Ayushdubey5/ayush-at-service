import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Typewriter from '../../components/Typewriter/Typewriter';
import CodeSphere from '../../components/CodeSphere/CodeSphere';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import { FaArrowRight, FaChevronDown } from 'react-icons/fa';
import './Home.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const stats = [
  { number: 10, suffix: '+', label: 'Projects' },
  { number: 8, suffix: '+', label: 'Skills' },
  { number: 3, suffix: '+', label: 'Years Experience' },
  { number: 500, suffix: '+', label: 'Cups of Coffee' },
];

function Counter({ target, suffix }) {
  const [count, setCount] = React.useState(0);
  const [ref, isVisible] = React.useMemo(() => {
    // Using a simple hook-like approach
    return [null, false];
  }, []);

  const counterRef = React.useRef(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const el = counterRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!visible) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      setCount(current);
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [visible, target]);

  return <span ref={counterRef}>{count}{suffix}</span>;
}

export default function Home() {
  return (
    <motion.div
      className="home-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <motion.p
              className="hero-greeting"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              👋 Hello, I'm
            </motion.p>
            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <span className="gradient-text">Ayush Dubey</span>
            </motion.h1>
            <motion.h2
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              I'm a{' '}
              <Typewriter
                words={['Web Developer', 'UI Designer', 'Problem Solver', 'Cat Lover 🐱']}
                typingSpeed={80}
                deletingSpeed={40}
                pauseTime={2000}
              />
            </motion.h2>
            <motion.p
              className="hero-description"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              I craft beautiful, performant, and accessible web experiences
              that delight users and solve real problems.
            </motion.p>
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <Link to="/projects" className="magnetic-btn hoverable">
                View My Work <FaArrowRight style={{ marginLeft: 8 }} />
              </Link>
              <Link to="/contact" className="outline-btn hoverable">
                Contact Me
              </Link>
            </motion.div>
          </div>

          <motion.div
            className="hero-sphere"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8, ease: 'easeOut' }}
          >
            <CodeSphere />
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span>Scroll Down</span>
          <FaChevronDown className="scroll-arrow" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="section-container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="stat-card glass-card">
                  <h3 className="stat-number gradient-text">
                    <Counter target={stat.number} suffix={stat.suffix} />
                  </h3>
                  <p className="stat-label">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Quick About */}
      <section className="quick-about">
        <div className="section-container">
          <ScrollReveal>
            <div className="quick-about-content glass-card">
              <h2 className="section-title">
                About <span className="gradient-text">Me</span>
              </h2>
              <p>
                I'm a passionate developer who loves turning ideas into reality through code.
                With experience in modern web technologies, I build applications that are not
                just functional but also beautiful and user-friendly.
              </p>
              <Link to="/about" className="outline-btn hoverable" style={{ marginTop: 20, display: 'inline-flex' }}>
                Learn More About Me <FaArrowRight style={{ marginLeft: 8 }} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </motion.div>
  );
}
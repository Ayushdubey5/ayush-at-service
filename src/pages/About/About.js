import React from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import skills from '../../data/skills';
import './About.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const education = [
  {
    year: '2024 - 2026',
    title: 'Web Development',
    school: 'Integrty',
    description: 'My second job which was Focused on building responsive and interactive web applications using modern technologies.',
  },
  {
    year: '2023 - 2026',
    title: 'B.S. Computer Science',
    school: 'Your University Name',
    description: 'Focused on software engineering, data structures, and web development.',
  },
  {
    year: '2023-2024',
    title: 'Tech Support',
    school: 'Zippee',
    description: 'My first job as a tech support agent, where I learned to troubleshoot and assist users with technical issues.',
  },
  {
    year: '2023',
    title: 'Full-Stack Web Development',
    school: 'Online Certification',
    description: 'Completed comprehensive web development bootcamp.',
  },
];

const funFacts = [
  { emoji: '☕', value: '500+', label: 'Cups of Coffee' },
  { emoji: '🎮', value: 'RPG', label: 'Favorite Genre' },
  { emoji: '📚', value: '20+', label: 'Books Read' },
  { emoji: '🎵', value: 'Lo-fi', label: 'Coding Music' },
  { emoji: '🐱', value: '2', label: 'Cats Owned' },
  { emoji: '🌍', value: '5', label: 'Countries Visited' },
];

function SkillBar({ skill, index }) {
  const [ref, setRef] = React.useState(null);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!ref) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref]);

  return (
    <div className="skill-item" ref={setRef}>
      <div className="skill-info">
        <span className="skill-icon">{skill.icon}</span>
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percent">{skill.level}%</span>
      </div>
      <div className="skill-bar-bg">
        <div
          className="skill-bar-fill"
          style={{
            width: visible ? `${skill.level}%` : '0%',
            transitionDelay: `${index * 100}ms`,
          }}
        />
      </div>
    </div>
  );
}

export default function About() {
  return (
    <motion.div
      className="about-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {/* Hero */}
      <section className="about-hero">
        <div className="section-container">
          <ScrollReveal>
            <h1 className="page-title">
              About <span className="gradient-text">Me</span>
            </h1>
          </ScrollReveal>

          <div className="about-intro">
            <ScrollReveal direction="left" delay={200}>
              <div className="profile-image-wrapper">
                <div className="profile-image">
                  <div className="profile-placeholder">
                    <img src="/profile.jpeg" alt="Ayush Dubey" />
                    <span>👨‍💻</span>
                  </div>
                </div>
                <div className="profile-glow" />
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" delay={400}>
              <div className="about-text">
                <h2>Hello! I'm <span className="gradient-text">Ayush Dubey</span></h2>
                <p>
                  I'm a passionate developer based in Your City. I love creating
                  beautiful, functional, and user-friendly web applications. My journey in
                  programming started when I was 15, and I've been hooked ever since.
                </p>
                <p>
                  When I'm not coding, you can find me playing video games, reading sci-fi
                  novels, or petting my cats. I believe that great software is built with
                  empathy, attention to detail, and a lot of coffee ☕.
                </p>
                <p>
                  I'm always looking for new challenges and opportunities to learn and grow.
                  Let's build something amazing together!
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="skills-section">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="section-title">
              My <span className="gradient-text">Skills</span>
            </h2>
          </ScrollReveal>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <ScrollReveal key={skill.name} delay={index * 80}>
                <SkillBar skill={skill} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Education Timeline */}
      <section className="education-section">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="section-title">
              <span className="gradient-text">Education</span> & Learning
            </h2>
          </ScrollReveal>

          <div className="timeline">
            {education.map((item, index) => (
              <ScrollReveal
                key={index}
                direction={index % 2 === 0 ? 'left' : 'right'}
                delay={index * 150}
              >
                <div className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-dot" />
                  <div className="timeline-card glass-card">
                    <span className="timeline-year">{item.year}</span>
                    <h3>{item.title}</h3>
                    <h4>{item.school}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fun Facts */}
      <section className="fun-facts-section">
        <div className="section-container">
          <ScrollReveal>
            <h2 className="section-title">
              Fun <span className="gradient-text">Facts</span>
            </h2>
          </ScrollReveal>

          <div className="fun-facts-grid">
            {funFacts.map((fact, index) => (
              <ScrollReveal key={index} delay={index * 80} direction="scale">
                <div className="fun-fact-card glass-card hoverable">
                  <span className="fact-emoji">{fact.emoji}</span>
                  <span className="fact-value">{fact.value}</span>
                  <span className="fact-label">{fact.label}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
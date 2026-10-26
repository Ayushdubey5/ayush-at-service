import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import projects from '../../data/projects';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';
import './Projects.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

const categories = ['all', 'web', 'games', 'tools'];

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x: y, y: x });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="project-card glass-card hoverable"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      <div className="project-image">
        <img src={project.image} alt={project.title} loading="lazy" />
        <div className="project-overlay">
          <span>View Project</span>
        </div>
      </div>

      <div className="project-info">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-description">{project.description}</p>

        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>

        <div className="project-links">
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="project-link hoverable">
              <FaExternalLinkAlt /> Live
            </a>
          )}
          {project.codeUrl && (
            <a href={project.codeUrl} target="_blank" rel="noreferrer" className="project-link hoverable">
              <FaGithub /> Code
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <motion.div
      className="projects-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="section-container">
        <ScrollReveal>
          <h1 className="page-title">
            My <span className="gradient-text">Projects</span>
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="filter-buttons">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn hoverable ${activeFilter === cat ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div className="projects-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
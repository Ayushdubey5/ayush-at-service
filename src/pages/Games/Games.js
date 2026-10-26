import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ScrollReveal from '../../components/ScrollReveal/ScrollReveal';
import MemoryGame from './MemoryGame';
import SnakeGame from './SnakeGame';
import ClickSpeed from './ClickSpeed';
import './Games.css';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function Games() {
  const [activeGame, setActiveGame] = useState('memory');

  const games = [
    { id: 'memory', name: '🃏 Memory Game', component: MemoryGame },
    { id: 'snake', name: '🐍 Snake Game', component: SnakeGame },
    { id: 'click', name: '⚡ Click Speed', component: ClickSpeed },
  ];

  const ActiveComponent = games.find(g => g.id === activeGame)?.component;

  return (
    <motion.div
      className="games-page"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="section-container">
        <ScrollReveal>
          <h1 className="page-title">
            Take a Break & <span className="gradient-text">Play</span>
          </h1>
          <p className="page-subtitle">
            Some fun mini-games I built. Enjoy! 🎮
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="game-tabs">
            {games.map(game => (
              <button
                key={game.id}
                className={`game-tab hoverable ${activeGame === game.id ? 'active' : ''}`}
                onClick={() => setActiveGame(game.id)}
              >
                {game.name}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <div className="game-container glass-card">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </ScrollReveal>
      </div>
    </motion.div>
  );
}

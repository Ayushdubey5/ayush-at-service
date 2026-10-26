import React, { useState, useEffect } from 'react';

const EMOJIS = ['💻', '🐍', '⚛️', '🔥', '🎯', '🚀', '🧩', '⚡'];

function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function createCards() {
  const pairs = [...EMOJIS, ...EMOJIS];
  return shuffleArray(pairs).map((emoji, index) => ({
    id: index,
    emoji,
    flipped: false,
    matched: false,
  }));
}

export default function MemoryGame() {
  const [cards, setCards] = useState(createCards());
  const [flippedCards, setFlippedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsLocked(true);
      const [first, second] = flippedCards;

      if (cards[first].emoji === cards[second].emoji) {
        setCards(prev => prev.map((card, i) =>
          i === first || i === second ? { ...card, matched: true } : card
        ));
        setMatches(prev => prev + 1);
        setFlippedCards([]);
        setIsLocked(false);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, i) =>
            i === first || i === second ? { ...card, flipped: false } : card
          ));
          setFlippedCards([]);
          setIsLocked(false);
        }, 800);
      }
      setMoves(prev => prev + 1);
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index) => {
    if (isLocked || cards[index].flipped || cards[index].matched || flippedCards.length >= 2) return;

    setCards(prev => prev.map((card, i) =>
      i === index ? { ...card, flipped: true } : card
    ));
    setFlippedCards(prev => [...prev, index]);
  };

  const resetGame = () => {
    setCards(createCards());
    setFlippedCards([]);
    setMoves(0);
    setMatches(0);
    setIsLocked(false);
  };

  const isWon = matches === EMOJIS.length;

  return (
    <div className="memory-game">
      <div className="memory-header">
        <div className="memory-stat">Moves: <span>{moves}</span></div>
        <div className="memory-stat">Matches: <span>{matches}/{EMOJIS.length}</span></div>
        <button className="game-btn" onClick={resetGame} style={{ marginTop: 0, padding: '8px 20px', fontSize: '13px' }}>
          Reset
        </button>
      </div>

      {isWon ? (
        <div className="memory-win">
          <h3>🎉 You Won!</h3>
          <p style={{ color: 'var(--text-secondary)' }}>Completed in {moves} moves</p>
          <button className="game-btn" onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="memory-grid">
          {cards.map((card, index) => (
            <button
              key={card.id}
              className={`memory-card ${card.flipped ? 'flipped' : ''} ${card.matched ? 'matched' : ''} hoverable`}
              onClick={() => handleCardClick(index)}
            >
              <div className="memory-card-inner">
                <div className="memory-card-back">?</div>
                <div className="memory-card-front">{card.emoji}</div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
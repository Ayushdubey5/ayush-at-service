import React, { useRef, useEffect, useState, useCallback } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const CELL_SIZE = 20;
const GRID_SIZE = 20;
const CANVAS_SIZE = CELL_SIZE * GRID_SIZE;

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useLocalStorage('snake-high-score', 0);
  const [gameOver, setGameOver] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const gameRef = useRef({
    snake: [{ x: 10, y: 10 }],
    direction: { x: 1, y: 0 },
    food: { x: 15, y: 10 },
    score: 0,
    speed: 150,
    gameLoop: null,
  });

  const generateFood = useCallback(() => {
    const game = gameRef.current;
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (game.snake.some(s => s.x === newFood.x && s.y === newFood.y));
    game.food = newFood;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const game = gameRef.current;
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

    // Clear
    ctx.fillStyle = isDark ? '#0a0a1a' : '#f0f0f5';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid lines
    ctx.strokeStyle = isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.05)';
    for (let i = 0; i < GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#ff4444';
    ctx.beginPath();
    ctx.arc(
      game.food.x * CELL_SIZE + CELL_SIZE / 2,
      game.food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2, 0, Math.PI * 2
    );
    ctx.fill();

    // Snake
    game.snake.forEach((segment, i) => {
      const gradient = ctx.createLinearGradient(
        segment.x * CELL_SIZE, segment.y * CELL_SIZE,
        (segment.x + 1) * CELL_SIZE, (segment.y + 1) * CELL_SIZE
      );
      gradient.addColorStop(0, '#00d4ff');
      gradient.addColorStop(1, '#7b61ff');

      ctx.fillStyle = i === 0 ? '#00ff88' : gradient;
      ctx.beginPath();
      ctx.roundRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2,
        4
      );
      ctx.fill();
    });
  }, []);

  const gameStep = useCallback(() => {
    const game = gameRef.current;
    const head = { ...game.snake[0] };
    head.x += game.direction.x;
    head.y += game.direction.y;

    // Wall collision
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
      setGameOver(true);
      setIsPlaying(false);
      if (game.score > highScore) setHighScore(game.score);
      return;
    }

    // Self collision
    if (game.snake.some(s => s.x === head.x && s.y === head.y)) {
      setGameOver(true);
      setIsPlaying(false);
      if (game.score > highScore) setHighScore(game.score);
      return;
    }

    game.snake.unshift(head);

    // Eat food
    if (head.x === game.food.x && head.y === game.food.y) {
      game.score++;
      setScore(game.score);
      generateFood();
      // Speed up
      game.speed = Math.max(60, game.speed - 3);
    } else {
      game.snake.pop();
    }

    draw();

    game.gameLoop = setTimeout(gameStep, game.speed);
  }, [draw, generateFood, highScore, setHighScore]);

  const startGame = useCallback(() => {
    const game = gameRef.current;
    game.snake = [{ x: 10, y: 10 }];
    game.direction = { x: 1, y: 0 };
    game.score = 0;
    game.speed = 150;
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
    generateFood();
    if (game.gameLoop) clearTimeout(game.gameLoop);
    gameStep();
  }, [gameStep, generateFood]);

  useEffect(() => {
    const handleKey = (e) => {
      const game = gameRef.current;
      switch (e.key) {
        case 'ArrowUp':
        case 'w':
          if (game.direction.y !== 1) game.direction = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 's':
          if (game.direction.y !== -1) game.direction = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'a':
          if (game.direction.x !== 1) game.direction = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'd':
          if (game.direction.x !== -1) game.direction = { x: 1, y: 0 };
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => {
      window.removeEventListener('keydown', handleKey);
      if (gameRef.current.gameLoop) clearTimeout(gameRef.current.gameLoop);
    };
  }, []);

  useEffect(() => {
    draw();
  }, [draw]);

  const handleDPad = (dir) => {
    const game = gameRef.current;
    switch (dir) {
      case 'up': if (game.direction.y !== 1) game.direction = { x: 0, y: -1 }; break;
      case 'down': if (game.direction.y !== -1) game.direction = { x: 0, y: 1 }; break;
      case 'left': if (game.direction.x !== 1) game.direction = { x: -1, y: 0 }; break;
      case 'right': if (game.direction.x !== -1) game.direction = { x: 1, y: 0 }; break;
      default: break;
    }
  };

  return (
    <div className="snake-game">
      <div className="snake-score">
        Score: <span>{score}</span> &nbsp;|&nbsp; High Score: <span>{highScore}</span>
      </div>

      <canvas
        ref={canvasRef}
        width={CANVAS_SIZE}
        height={CANVAS_SIZE}
        className="snake-canvas"
      />

      {gameOver && (
        <p style={{ color: '#ff4444', fontWeight: 600, marginBottom: 10 }}>
          Game Over! Score: {score}
        </p>
      )}

      <button className="game-btn hoverable" onClick={startGame}>
        {isPlaying ? 'Restart' : gameOver ? 'Play Again' : 'Start Game'}
      </button>

      <div className="d-pad">
        <div className="d-pad-empty" />
        <button className="d-pad-btn hoverable" onClick={() => handleDPad('up')}>↑</button>
        <div className="d-pad-empty" />
        <button className="d-pad-btn hoverable" onClick={() => handleDPad('left')}>←</button>
        <div className="d-pad-empty" />
        <button className="d-pad-btn hoverable" onClick={() => handleDPad('right')}>→</button>
        <div className="d-pad-empty" />
        <button className="d-pad-btn hoverable" onClick={() => handleDPad('down')}>↓</button>
        <div className="d-pad-empty" />
      </div>
    </div>
  );
}
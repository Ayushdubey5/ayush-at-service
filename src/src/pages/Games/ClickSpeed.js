import React, { useState, useRef, useEffect } from 'react';
import useLocalStorage from '../../hooks/useLocalStorage';

const DURATION = 10;

export default function ClickSpeed() {
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [bestCPS, setBestCPS] = useLocalStorage('click-best-cps', 0);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      setIsFinished(true);
      const cps = (clicks / DURATION).toFixed(1);
      if (parseFloat(cps) > bestCPS) {
        setBestCPS(parseFloat(cps));
      }
    }
    return () => clearTimeout(timerRef.current);
  }, [isActive, timeLeft, clicks, bestCPS, setBestCPS]);

  const handleClick = () => {
    if (!isActive && !isFinished) {
      setIsActive(true);
      setClicks(1);
      setTimeLeft(DURATION);
      return;
    }
    if (isActive) {
      setClicks(prev => prev + 1);
    }
  };

  const reset = () => {
    setClicks(0);
    setTimeLeft(DURATION);
    setIsActive(false);
    setIsFinished(false);
  };

  const cps = isFinished ? (clicks / DURATION).toFixed(1) : isActive ? (clicks / (DURATION - timeLeft || 1)).toFixed(1) : '0.0';

  return (
    <div className="click-speed">
      <h2 style={{ marginBottom: 10 }}>⚡ Click Speed Test</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 0 }}>
        {!isActive && !isFinished
          ? 'Click the circle to start!'
          : isActive
          ? `Time left: ${timeLeft}s`
          : `Time's up!`}
      </p>

      <button className="click-zone hoverable" onClick={handleClick} disabled={isFinished}>
        {isFinished ? (
          <>
            <h3>Results!</h3>
            <span className="click-count">{cps}</span>
            <span>CPS</span>
          </>
        ) : (
          <>
            <h3>{isActive ? 'Keep Clicking!' : 'Click to Start'}</h3>
            <span className="click-count">{clicks}</span>
            <span>clicks</span>
          </>
        )}
      </button>

      <div className="click-results">
        <div className="click-result-item">
          <div className="value">{clicks}</div>
          <div className="label">Total Clicks</div>
        </div>
        <div className="click-result-item">
          <div className="value">{cps}</div>
          <div className="label">CPS</div>
        </div>
        <div className="click-result-item">
          <div className="value">{bestCPS}</div>
          <div className="label">Best CPS</div>
        </div>
      </div>

      {isFinished && (
        <button className="game-btn hoverable" onClick={reset}>
          Try Again
        </button>
      )}
    </div>
  );
}
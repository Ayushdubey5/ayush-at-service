import React, { useEffect, useState } from 'react';
import './Loader.css';

export default function Loader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`loader ${progress >= 100 ? 'loader-exit' : ''}`}>
      <div className="loader-content">
        <div className="loader-logo">
          <span className="loader-bracket">&lt;</span>
          <span className="loader-name">Ayush Dubey</span>
          <span className="loader-bracket">/&gt;</span>
        </div>
        <div className="loader-bar-container">
          <div
            className="loader-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="loader-text">{Math.min(Math.floor(progress), 100)}%</p>
      </div>
    </div>
  );
}
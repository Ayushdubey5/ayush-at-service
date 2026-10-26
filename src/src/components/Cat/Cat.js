import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Cat.css';

const CAT_SIZE = 60;
const SPEED = 0.08;
const ARRIVE_DISTANCE = 5;

export default function Cat() {
  const [catPos, setCatPos] = useState({ x: 100, y: window.innerHeight - 120 });
  const [targetPos, setTargetPos] = useState(null);
  const [state, setState] = useState('idle'); // idle, running, sitting
  const [direction, setDirection] = useState('right');
  const [frame, setFrame] = useState(0);
  const catRef = useRef({ x: 100, y: window.innerHeight - 120 });
  const targetRef = useRef(null);
  const animRef = useRef(null);
  const frameTimerRef = useRef(null);
  const stateRef = useRef('idle');

  const handleClick = useCallback((e) => {
    // Don't trigger on links, buttons, inputs, games
    if (
      e.target.closest('a') ||
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('textarea') ||
      e.target.closest('.game-container') ||
      e.target.closest('.navbar') ||
      e.target.closest('.cat')
    ) return;

    const scrollY = window.scrollY;
    const newTarget = {
      x: e.clientX - CAT_SIZE / 2,
      y: e.clientY + scrollY - CAT_SIZE / 2,
    };

    targetRef.current = newTarget;
    setTargetPos(newTarget);
    setState('running');
    stateRef.current = 'running';

    if (newTarget.x < catRef.current.x) {
      setDirection('left');
    } else {
      setDirection('right');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Sprite frame animation during running
  useEffect(() => {
    if (state === 'running') {
      frameTimerRef.current = setInterval(() => {
        setFrame(prev => (prev + 1) % 4);
      }, 120);
    } else {
      clearInterval(frameTimerRef.current);
      setFrame(0);
    }
    return () => clearInterval(frameTimerRef.current);
  }, [state]);

  // Movement animation loop
  useEffect(() => {
    const animate = () => {
      if (stateRef.current === 'running' && targetRef.current) {
        const dx = targetRef.current.x - catRef.current.x;
        const dy = targetRef.current.y - catRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ARRIVE_DISTANCE) {
          catRef.current = { ...targetRef.current };
          setCatPos({ ...targetRef.current });
          setState('sitting');
          stateRef.current = 'sitting';
          targetRef.current = null;
          setTargetPos(null);

          setTimeout(() => {
            setState('idle');
            stateRef.current = 'idle';
          }, 2000);
        } else {
          catRef.current.x += dx * SPEED;
          catRef.current.y += dy * SPEED;
          setCatPos({ x: catRef.current.x, y: catRef.current.y });
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  const catStyle = {
    left: `${catPos.x}px`,
    top: `${catPos.y}px`,
    transform: direction === 'left' ? 'scaleX(-1)' : 'scaleX(1)',
  };

  return (
    <div className={`cat cat-${state}`} style={catStyle}>
      <div className="cat-body">
        {/* Cat made with CSS art */}
        <div className="cat-ears">
          <div className="cat-ear left"></div>
          <div className="cat-ear right"></div>
        </div>
        <div className="cat-head">
          <div className="cat-eyes">
            <div className={`cat-eye left ${state === 'sitting' ? 'happy' : ''}`}>
              <div className="cat-pupil"></div>
            </div>
            <div className={`cat-eye right ${state === 'sitting' ? 'happy' : ''}`}>
              <div className="cat-pupil"></div>
            </div>
          </div>
          <div className="cat-nose"></div>
          <div className="cat-mouth"></div>
          <div className="cat-whiskers left">
            <div className="whisker"></div>
            <div className="whisker"></div>
            <div className="whisker"></div>
          </div>
          <div className="cat-whiskers right">
            <div className="whisker"></div>
            <div className="whisker"></div>
            <div className="whisker"></div>
          </div>
        </div>
        <div className="cat-torso">
          <div className={`cat-legs ${state === 'running' ? `run-frame-${frame}` : ''}`}>
            <div className="cat-leg front-left"></div>
            <div className="cat-leg front-right"></div>
            <div className="cat-leg back-left"></div>
            <div className="cat-leg back-right"></div>
          </div>
        </div>
        <div className={`cat-tail ${state}`}></div>
      </div>
    </div>
  );
}
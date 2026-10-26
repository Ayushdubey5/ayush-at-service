import React, { useState, useEffect, useRef, useCallback } from 'react';
import './Cat.css';

const CAT_SIZE = 48;
const SPEED = 0.08;
const ARRIVE_DISTANCE = 5;

// Helper to determine the exact 8-way direction and if we need to flip the cat horizontally
const getDirectionAndFlip = (dx, dy) => {
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);
  
  if (angle >= -22.5 && angle < 22.5) return { dir: 'e', flip: false };       // Right
  if (angle >= 22.5 && angle < 67.5) return { dir: 'se', flip: false };       // Down-Right
  if (angle >= 67.5 && angle < 112.5) return { dir: 's', flip: false };       // Down
  if (angle >= 112.5 && angle < 157.5) return { dir: 'se', flip: true };      // Down-Left (flip SE)
  if (angle >= 157.5 || angle < -157.5) return { dir: 'e', flip: true };      // Left (flip E)
  if (angle >= -157.5 && angle < -112.5) return { dir: 'ne', flip: true };    // Up-Left (flip NE)
  if (angle >= -112.5 && angle < -67.5) return { dir: 'n', flip: false };     // Up
  if (angle >= -67.5 && angle < -22.5) return { dir: 'ne', flip: false };     // Up-Right
  
  return { dir: 's', flip: false }; // Default
};

export default function Cat() {
  const [catPos, setCatPos] = useState({ x: 100, y: window.innerHeight - 120 });
  const [state, setState] = useState('idle'); // idle, running, sitting
  const [facing, setFacing] = useState({ dir: 's', flip: false });
  
  const catRef = useRef({ x: 100, y: window.innerHeight - 120 });
  const targetRef = useRef(null);
  const animRef = useRef(null);
  const stateRef = useRef('idle');

  const handleClick = useCallback((e) => {
    // Ignore clicks on buttons/links
    if (
      e.target.closest('a') ||
      e.target.closest('button') ||
      e.target.closest('input') ||
      e.target.closest('textarea') ||
      e.target.closest('.game-container') ||
      e.target.closest('.navbar') ||
      e.target.closest('.cat-container')
    ) return;

    const scrollY = window.scrollY;
    const newTarget = {
      x: e.clientX - CAT_SIZE / 2,
      y: e.clientY + scrollY - CAT_SIZE / 2,
    };

    targetRef.current = newTarget;
    setState('running');
    stateRef.current = 'running';

    // Calculate initial direction immediately on click
    const dx = newTarget.x - catRef.current.x;
    const dy = newTarget.y - catRef.current.y;
    setFacing(getDirectionAndFlip(dx, dy));
  }, []);

  useEffect(() => {
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [handleClick]);

  // Main Animation Loop
  useEffect(() => {
    const animate = () => {
      if (stateRef.current === 'running' && targetRef.current) {
        const dx = targetRef.current.x - catRef.current.x;
        const dy = targetRef.current.y - catRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < ARRIVE_DISTANCE) {
          // Reached target
          catRef.current = { ...targetRef.current };
          setCatPos({ ...targetRef.current });
          setState('sitting');
          stateRef.current = 'sitting';
          
          // Face forward when sitting (cutest pose)
          setFacing({ dir: 's', flip: false });
          targetRef.current = null;

          // Go back to idle after a bit
          setTimeout(() => {
            if (stateRef.current === 'sitting') {
              setState('idle');
              stateRef.current = 'idle';
            }
          }, 3000);
        } else {
          // Continue running
          catRef.current.x += dx * SPEED;
          catRef.current.y += dy * SPEED;
          setCatPos({ x: catRef.current.x, y: catRef.current.y });
          
          // Constantly update direction (in case you scroll while it runs)
          setFacing(getDirectionAndFlip(dx, dy));
        }
      }
      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <div 
      className={`cat-container ${state} dir-${facing.dir}`} 
      style={{
        left: `${catPos.x}px`,
        top: `${catPos.y}px`,
        transform: `scaleX(${facing.flip ? -1 : 1})`
      }}
    >
      {/* Tail goes behind body */}
      <div className="cat-tail"></div>
      
      {/* Body and legs */}
      <div className="cat-body">
        <div className="cat-leg fl"></div>
        <div className="cat-leg fr"></div>
        <div className="cat-leg bl"></div>
        <div className="cat-leg br"></div>
        <div className="cat-torso"></div>
      </div>

      {/* Head and Face */}
      <div className="cat-head">
        <div className="cat-ear l"></div>
        <div className="cat-ear r"></div>
        
        {/* Face mask hides features when the cat looks away */}
        <div className="cat-face-mask">
          <div className="cat-face">
            <div className="cat-eye l"></div>
            <div className="cat-eye r"></div>
            <div className="cat-nose"></div>
            <div className="cat-blush l"></div>
            <div className="cat-blush r"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
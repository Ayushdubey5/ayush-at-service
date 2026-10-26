import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import './CodeSphere.css';

const LANGUAGES = [
  'JavaScript', 'Python', 'React', 'Node.js', 'HTML5',
  'CSS3', 'Java', 'C++', 'Ruby', 'PHP',
  'Swift', 'Kotlin', 'Go', 'Rust', 'SQL',
  'MongoDB', 'Git', 'Docker', 'Linux', 'Figma',
  'SASS', 'Redux', 'Express', 'Django', 'Vue',
  'Angular', 'Three.js', 'npm', 'Webpack', 'GraphQL',
];

export default function CodeSphere() {
  const containerRef = useRef(null);
  const { theme } = useTheme();
  const [items, setItems] = useState([]);
  const mouseRef = useRef({ x: 0, y: 0, isOver: false });
  const rotationRef = useRef({ x: 0, y: 0 });
  const autoRotateSpeed = useRef({ x: 0.1, y: 0.3 });
  const animFrameRef = useRef(null);

  const radius = typeof window !== 'undefined' && window.innerWidth < 768 ? 130 : 200;

  useEffect(() => {
    // Distribute points on sphere using fibonacci sphere
    const points = [];
    const n = LANGUAGES.length;

    for (let i = 0; i < n; i++) {
      const phi = Math.acos(-1 + (2 * i + 1) / n);
      const theta = Math.sqrt(n * Math.PI) * phi;

      points.push({
        text: LANGUAGES[i],
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        originalX: radius * Math.cos(theta) * Math.sin(phi),
        originalY: radius * Math.sin(theta) * Math.sin(phi),
        originalZ: radius * Math.cos(phi),
      });
    }
    setItems(points);
  }, [radius]);

  useEffect(() => {
    if (items.length === 0) return;

    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left - rect.width / 2) / (rect.width / 2),
        y: (e.clientY - rect.top - rect.height / 2) / (rect.height / 2),
        isOver: true,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current.isOver = false;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    const animate = () => {
      // Determine rotation speed
      let speedX = autoRotateSpeed.current.x;
      let speedY = autoRotateSpeed.current.y;

      if (mouseRef.current.isOver) {
        speedX = -mouseRef.current.y * 1.5;
        speedY = mouseRef.current.x * 1.5;
      }

      rotationRef.current.x += speedX * 0.01;
      rotationRef.current.y += speedY * 0.01;

      const cosX = Math.cos(rotationRef.current.x);
      const sinX = Math.sin(rotationRef.current.x);
      const cosY = Math.cos(rotationRef.current.y);
      const sinY = Math.sin(rotationRef.current.y);

      const spans = container.querySelectorAll('.sphere-word');

      items.forEach((item, i) => {
        // Rotate Y
        let x1 = item.originalX * cosY - item.originalZ * sinY;
        let z1 = item.originalX * sinY + item.originalZ * cosY;
        let y1 = item.originalY;

        // Rotate X
        let y2 = y1 * cosX - z1 * sinX;
        let z2 = y1 * sinX + z1 * cosX;
        let x2 = x1;

        // Perspective
        const perspective = 600;
        const scale = perspective / (perspective + z2);
        const projX = x2 * scale;
        const projY = y2 * scale;

        // Opacity based on depth
        const opacity = Math.max(0.15, (z2 + radius) / (2 * radius));
        const fontSize = Math.max(10, 14 * scale);

        if (spans[i]) {
          spans[i].style.transform = `translate(${projX}px, ${projY}px) scale(${scale})`;
          spans[i].style.opacity = opacity;
          spans[i].style.fontSize = `${fontSize}px`;
          spans[i].style.zIndex = Math.floor(scale * 100);
        }
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [items, radius]);

  return (
    <div className="code-sphere-wrapper">
      <div className="code-sphere" ref={containerRef}>
        {items.map((item, i) => (
          <span key={i} className="sphere-word">
            {item.text}
          </span>
        ))}
      </div>
    </div>
  );
}
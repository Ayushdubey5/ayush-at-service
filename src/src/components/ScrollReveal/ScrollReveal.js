import React from 'react';
import useScrollReveal from '../../hooks/useScrollReveal';

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 800,
  distance = 40,
  className = '',
}) {
  const [ref, isVisible] = useScrollReveal(0.15);

  const getTransform = () => {
    switch (direction) {
      case 'up': return `translateY(${distance}px)`;
      case 'down': return `translateY(-${distance}px)`;
      case 'left': return `translateX(${distance}px)`;
      case 'right': return `translateX(-${distance}px)`;
      case 'scale': return 'scale(0.9)';
      default: return `translateY(${distance}px)`;
    }
  };

  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate(0) scale(1)' : getTransform(),
    transition: `opacity ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms, 
                 transform ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
  };

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
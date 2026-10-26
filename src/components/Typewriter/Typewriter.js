import React, { useState, useEffect, useCallback } from 'react';

export default function Typewriter({ words, typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000 }) {
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const tick = useCallback(() => {
    const currentWord = words[wordIndex];

    if (isPaused) return;

    if (isDeleting) {
      setText(currentWord.substring(0, text.length - 1));
      if (text.length === 0) {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      setText(currentWord.substring(0, text.length + 1));
      if (text.length === currentWord.length) {
        setIsPaused(true);
        setTimeout(() => {
          setIsPaused(false);
          setIsDeleting(true);
        }, pauseTime);
      }
    }
  }, [text, wordIndex, isDeleting, isPaused, words, pauseTime]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return (
    <span className="typewriter">
      {text}
      <span className="typewriter-cursor">|</span>
      <style>{`
        .typewriter-cursor {
          display: inline-block;
          color: var(--accent-primary);
          animation: blink 0.8s step-end infinite;
          font-weight: 300;
          margin-left: 2px;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </span>
  );
}
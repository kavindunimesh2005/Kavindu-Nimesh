import React, { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsFading(true);
            setTimeout(() => {
              onComplete();
            }, 600);
          }, 300);
          return 100;
        }
        // Accelerating curve
        const increment = prev < 50 ? 5 : prev < 85 ? 8 : 12;
        return Math.min(prev + increment, 100);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        zIndex: 100000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFading ? 0 : 1,
        transform: isFading ? 'translateY(-20px)' : 'none',
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: isFading ? 'none' : 'auto'
      }}
    >
      <div style={{ textAlign: 'center', position: 'relative' }}>
        {/* Monogram */}
        <div
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
            fontWeight: 900,
            letterSpacing: '-0.04em',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.25rem',
            lineHeight: 1
          }}
        >
          <span>KN</span>
          <span style={{ color: '#e50914' }}>.</span>
        </div>

        {/* Subtitle studio branding */}
        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.35em',
            color: '#71717a',
            marginTop: '1rem',
            textTransform: 'uppercase'
          }}
        >
          Aura Digital Developer
        </div>

        {/* Precision Red Laser Progress Bar */}
        <div
          style={{
            width: '260px',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '2px',
            margin: '2.5rem auto 1.25rem',
            overflow: 'hidden',
            position: 'relative'
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              backgroundColor: '#e50914',
              boxShadow: '0 0 12px #e50914',
              transition: 'width 0.08s ease-out'
            }}
          />
        </div>

        {/* Percentage Counter */}
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.85rem',
            color: '#a1a1aa',
            letterSpacing: '0.1em'
          }}
        >
          {String(progress).padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
}

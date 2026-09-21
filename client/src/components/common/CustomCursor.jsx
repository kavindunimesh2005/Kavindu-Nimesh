import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device, pointer type, or small screen
    const checkIsTouch = () => {
      const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isMobileWidth = window.innerWidth <= 1024;
      return isTouch || prefersReducedMotion || isCoarse || isMobileWidth;
    };

    if (checkIsTouch()) {
      setIsTouchDevice(true);
      return;
    }

    const handleWindowResize = () => {
      if (checkIsTouch()) {
        setIsTouchDevice(true);
      } else {
        setIsTouchDevice(false);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let animationFrameId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);

    const render = () => {
      // Smooth interpolation for trailing ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Interactive element listeners
    const handleLinkHover = (e) => {
      const target = e.target.closest('button, a, .interactive-hover, input, textarea');
      const projectCard = e.target.closest('.project-card');

      if (projectCard) {
        setIsHovered(true);
        setCursorText('VIEW');
      } else if (target) {
        setIsHovered(true);
        setCursorText('');
      } else {
        setIsHovered(false);
        setCursorText('');
      }
    };

    document.addEventListener('mouseover', handleLinkHover);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleWindowResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseover', handleLinkHover);
    };
  }, [visible]);

  if (isTouchDevice || !visible) return null;

  return (
    <>
      {/* Central Precision Red Dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          backgroundColor: '#e50914',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          transform: 'translate3d(-100px, -100px, 0)',
          marginTop: '-4px',
          marginLeft: '-4px',
          boxShadow: '0 0 10px #e50914',
          transition: 'opacity 0.2s ease, width 0.2s ease, height 0.2s ease'
        }}
      />

      {/* Outer Magnetic Fluid Ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: cursorText ? '70px' : isHovered ? '48px' : '32px',
          height: cursorText ? '70px' : isHovered ? '48px' : '32px',
          marginTop: cursorText ? '-35px' : isHovered ? '-24px' : '-16px',
          marginLeft: cursorText ? '-35px' : isHovered ? '-24px' : '-16px',
          border: isHovered ? '1.5px solid #e50914' : '1px solid rgba(255, 255, 255, 0.35)',
          backgroundColor: cursorText ? 'rgba(229, 9, 20, 0.9)' : isHovered ? 'rgba(229, 9, 20, 0.08)' : 'transparent',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transform: 'translate3d(-100px, -100px, 0)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '11px',
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: '700',
          letterSpacing: '0.1em',
          color: '#ffffff',
          transformOrigin: 'center center',
          transition: 'width 0.25s cubic-bezier(0.16, 1, 0.3, 1), height 0.25s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.25s ease, border-color 0.25s ease, margin 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {cursorText}
      </div>
    </>
  );
}

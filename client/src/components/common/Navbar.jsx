import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useSound } from '../../hooks/useSound';

export default function Navbar({ resumeUrl }) {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const { theme, toggleTheme, isDark } = useTheme();
  const { playClick, playHover } = useSound();
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 30);

      const winHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (winHeight > 0) {
        setScrollProgress((scrollY / winHeight) * 100);
      }

      const sections = ['hero', 'about', 'services', 'projects', 'experience', 'skills', 'testimonials', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 150) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    playClick();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      e.preventDefault();
      navigate('/' + href);
      return;
    }

    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      {/* Scroll Progress Line at top */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: `${scrollProgress}%`,
          height: '2px',
          backgroundColor: '#e50914',
          boxShadow: '0 0 10px #e50914',
          zIndex: 10001,
          transition: 'width 0.1s ease-out'
        }}
      />

      {/* Top Left Fixed KN Badge (Desktop only) */}
      <div
        style={{
          position: 'fixed',
          top: '1.5rem',
          left: '2rem',
          zIndex: 9999
        }}
        className="top-left-kn"
      >
        <Link
          to="/"
          onClick={() => { playClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          onMouseEnter={playHover}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            backgroundColor: '#0a0a0c',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '6px',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden'
          }}
          title="Kavindu Nimesh"
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '3px',
              height: '100%',
              backgroundColor: '#e50914'
            }}
          />
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 900,
              fontSize: '17px',
              color: '#ffffff',
              letterSpacing: '-0.04em',
              marginLeft: '2px'
            }}
          >
            KN
          </span>
        </Link>
      </div>

      {/* Floating Centered Pill Navbar */}
      <header
        style={{
          position: 'fixed',
          top: '1rem',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 9998,
          padding: '0 0.75rem',
          pointerEvents: 'none'
        }}
      >
        <nav
          className="navbar-pill"
          style={{
            pointerEvents: 'auto',
            height: '48px',
            backgroundColor: isDark ? 'rgba(10, 10, 12, 0.94)' : 'rgba(255, 255, 255, 0.94)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.14)',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
            padding: '0 1rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            transition: 'all 0.3s ease',
            maxWidth: 'calc(100vw - 1.5rem)'
          }}
        >
          {/* Left indicator inside pill: Red Dot + KN */}
          <Link
            to="/"
            onClick={() => { playClick(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onMouseEnter={playHover}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              textDecoration: 'none',
              paddingRight: '0.5rem',
              borderRight: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#e50914',
                boxShadow: '0 0 8px #e50914'
              }}
            />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 900,
                fontSize: '0.85rem',
                color: '#ffffff',
                letterSpacing: '-0.02em'
              }}
            >
              KN
            </span>
          </Link>

          {/* Desktop Links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem'
            }}
            className="desktop-links"
          >
            {navLinks.map((link) => {
              const sectionId = link.href.replace('#', '');
              const isActive = (activeSection === sectionId || (sectionId === 'hero' && activeSection === 'hero')) && location.pathname === '/';
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={playHover}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    color: isActive ? '#ffffff' : '#9ca3af',
                    textDecoration: 'none',
                    position: 'relative',
                    paddingBottom: '2px',
                    borderBottom: isActive ? '2px solid #ffffff' : '2px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                  className="interactive-hover"
                >
                  {link.name}
                </a>
              );
            })}
          </div>

          {/* Right Controls: Resume button & Sun Theme Toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', paddingLeft: '0.35rem', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <a
              href={resumeUrl || '#contact'}
              target={resumeUrl?.startsWith('http') ? '_blank' : '_self'}
              rel="noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              style={{
                padding: '0.28rem 0.75rem',
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.22)',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
              className="interactive-hover"
            >
              Resume
            </a>

            <button
              onClick={() => { toggleTheme(); playClick(); }}
              onMouseEnter={playHover}
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              style={{
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '32px',
                height: '32px',
                borderRadius: '50%'
              }}
              className="interactive-hover"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); playClick(); }}
              aria-label="Toggle mobile navigation menu"
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                display: 'none',
                width: '34px',
                height: '34px',
                borderRadius: '6px',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 5, 0.98)',
            backdropFilter: 'blur(25px)',
            WebkitBackdropFilter: 'blur(25px)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem',
            overflowY: 'auto'
          }}
          className="no-scrollbar"
        >
          {/* Top Bar of Drawer */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '6px',
                  backgroundColor: '#e50914',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: '15px',
                  color: '#ffffff'
                }}
              >
                KN
              </div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>
                  Kavindu Nimesh
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.68rem', color: '#e50914' }}>
                  Aura Digital Developer
                </div>
              </div>
            </div>

            <button
              onClick={() => { setMobileMenuOpen(false); playClick(); }}
              aria-label="Close menu"
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav Links List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', margin: 'auto 0', padding: '1.5rem 0' }}>
            {navLinks.map((link, idx) => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    fontFamily: "'Bebas Neue', 'Syne', sans-serif",
                    fontSize: 'clamp(2rem, 7vw, 2.75rem)',
                    letterSpacing: '0.04em',
                    color: isActive ? '#e50914' : '#ffffff',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0.25rem 0',
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span>{link.name}</span>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: isActive ? '#e50914' : '#71717a' }}>
                    0{idx + 1}
                  </span>
                </a>
              );
            })}
          </div>

          {/* Drawer Bottom Actions: Resume Button & Direct Links */}
          <div style={{ paddingTop: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <a
                href={resumeUrl || '#contact'}
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ flex: 1, padding: '0.85rem 1rem', fontSize: '0.9rem' }}
              >
                <span>Download Resume</span>
                <ArrowUpRight size={16} />
              </a>

              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-secondary"
                style={{ padding: '0.85rem 1.25rem', fontSize: '0.9rem', color: '#25D366', borderColor: 'rgba(37, 211, 102, 0.4)' }}
              >
                WhatsApp
              </a>
            </div>

            <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#71717a', textAlign: 'center' }}>
              Colombo, Sri Lanka • UTC +5:30
            </p>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
          .top-left-kn {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          .navbar-pill {
            gap: 0.65rem !important;
            padding: 0 0.75rem !important;
          }
        }
      `}</style>
    </>
  );
}

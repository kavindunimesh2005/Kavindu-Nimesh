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

  const handleNavClick = (e, href) => {
    playClick();
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
        setMobileMenuOpen(false);
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

      {/* Top Left Fixed KN Badge */}
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
          top: '1.5rem',
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          zIndex: 9998,
          padding: '0 1rem',
          pointerEvents: 'none'
        }}
      >
        <nav
          style={{
            pointerEvents: 'auto',
            height: '48px',
            backgroundColor: isDark ? 'rgba(10, 10, 12, 0.92)' : 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            borderRadius: '100px',
            display: 'flex',
            alignItems: 'center',
            gap: '1.5rem',
            padding: '0 1.25rem',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            transition: 'all 0.3s ease'
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', paddingLeft: '0.5rem', borderLeft: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <a
              href={resumeUrl || '#contact'}
              target={resumeUrl?.startsWith('http') ? '_blank' : '_self'}
              rel="noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              style={{
                padding: '0.25rem 0.85rem',
                borderRadius: '4px',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.8rem',
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
                padding: '0.2rem'
              }}
              className="interactive-hover"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => { setMobileMenuOpen(!mobileMenuOpen); playClick(); }}
              style={{
                background: 'none',
                border: 'none',
                color: '#ffffff',
                display: 'none'
              }}
              className="mobile-toggle"
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 5, 0.98)',
            zIndex: 9997,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '2rem'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'center' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                style={{
                  fontFamily: "'Bebas Neue', 'Syne', sans-serif",
                  fontSize: '2.5rem',
                  letterSpacing: '0.05em',
                  color: '#ffffff',
                  textDecoration: 'none'
                }}
              >
                {link.name}
              </a>
            ))}

            <div style={{ marginTop: '1.5rem' }}>
              <a
                href={resumeUrl || '#contact'}
                onClick={() => setMobileMenuOpen(false)}
                className="btn btn-primary"
                style={{ padding: '0.75rem 2rem' }}
              >
                Resume
              </a>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 1024px) {
          .desktop-links {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
          .top-left-kn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

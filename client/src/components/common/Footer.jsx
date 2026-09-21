import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Github, Linkedin, Briefcase, Video, PhoneCall, Mail, Heart, Lock } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export default function Footer({ about, socials }) {
  const { playClick, playHover } = useSound();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github size={18} />;
      case 'linkedin': return <Linkedin size={18} />;
      case 'fiverr': return <Briefcase size={18} />;
      case 'tiktok': return <Video size={18} />;
      case 'whatsapp': return <PhoneCall size={18} />;
      case 'email': return <Mail size={18} />;
      default: return <Mail size={18} />;
    }
  };

  return (
    <footer
      style={{
        backgroundColor: '#030303',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '6rem 0 3rem',
        position: 'relative',
        color: '#ffffff'
      }}
    >
      <div className="container">
        {/* Upper Footer Grid */}
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gap: '3.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          {/* Brand Col */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  backgroundColor: '#e50914',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: '18px',
                  boxShadow: '0 0 20px rgba(229, 9, 20, 0.5)'
                }}
              >
                KN
              </div>
              <div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.35rem', fontWeight: 800 }}>
                  Kavindu Nimesh
                </h3>
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#71717a' }}>
                  Aura Digital Developer Sri Lanka
                </p>
              </div>
            </div>

            <p style={{ color: '#a1a1aa', fontSize: '0.92rem', lineHeight: 1.7, maxWidth: '360px' }}>
              Architecting next-generation digital products, high-conversion e-commerce systems, and full-stack web platforms with bleeding-edge aesthetic precision.
            </p>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {socials?.map((s) => (
                <a
                  key={s.id || s.platform}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={playHover}
                  onClick={playClick}
                  title={s.title || s.platform}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    transition: 'all 0.25s ease'
                  }}
                  className="interactive-hover"
                >
                  {getIcon(s.platform)}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                color: '#ffffff'
              }}
            >
              Navigation
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
              {['About', 'Services', 'Projects', 'Experience', 'Skills', 'Testimonials', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onMouseEnter={playHover}
                  onClick={playClick}
                  style={{
                    color: '#a1a1aa',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    transition: 'color 0.2s ease'
                  }}
                  className="interactive-hover"
                >
                  <span style={{ color: '#e50914', fontSize: '0.7rem' }}>→</span>
                  <span>{item}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Direct Inquiries & Location */}
          <div>
            <h4
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                color: '#ffffff'
              }}
            >
              Direct Contact
            </h4>
            <p style={{ color: '#a1a1aa', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              Available for select corporate commissions & advisory roles worldwide.
            </p>
            <div style={{ marginTop: '1rem' }}>
              <a
                href="mailto:kavindu@auradigital.lk"
                onMouseEnter={playHover}
                onClick={playClick}
                style={{
                  color: '#ffffff',
                  fontSize: '1.1rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  textDecoration: 'none',
                  display: 'inline-block',
                  borderBottom: '1px solid #e50914'
                }}
              >
                kavindu@auradigital.lk
              </a>
            </div>
            <div style={{ marginTop: '0.75rem', color: '#71717a', fontSize: '0.85rem', fontFamily: "'JetBrains Mono', monospace" }}>
              Colombo, Sri Lanka • UTC +5:30
            </div>
          </div>
        </div>

        {/* Lower Footer Bottom Bar */}
        <div
          className="footer-bottom-bar"
          style={{
            paddingTop: '2.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', flexWrap: 'wrap' }}>
            <div style={{ color: '#71717a', fontSize: '0.85rem' }}>
              © {new Date().getFullYear()} Kavindu Nimesh. All rights reserved. Crafted for <span style={{ color: '#ffffff' }}>Aura Digital Developer Sri Lanka</span>.
            </div>
            <Link
              to="/admin/login"
              onMouseEnter={playHover}
              onClick={playClick}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: '#52525b',
                fontSize: '0.78rem',
                textDecoration: 'none',
                transition: 'color 0.2s ease',
                fontFamily: "'JetBrains Mono', monospace"
              }}
              className="interactive-hover"
              title="Aura CMS Admin Portal"
            >
              <Lock size={12} style={{ color: '#e50914' }} />
              <span>CMS Portal</span>
            </Link>
          </div>

          {/* Back To Top Magnetic Button */}
          <button
            onClick={scrollToTop}
            onMouseEnter={playHover}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.6rem 1.25rem',
              borderRadius: '100px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 600,
              transition: 'all 0.3s ease'
            }}
            className="interactive-hover"
          >
            <span>Back to top</span>
            <div
              style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                backgroundColor: '#e50914',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 10px rgba(229, 9, 20, 0.5)'
              }}
            >
              <ArrowUp size={14} />
            </div>
          </button>
        </div>
      </div>

      <style>{`
        .footer-grid {
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        }
        @media (max-width: 640px) {
          footer {
            padding: 4rem 0 2.5rem !important;
          }
          .footer-grid {
            grid-template-columns: 1fr !important;
            gap: 2.25rem !important;
          }
          .footer-bottom-bar {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 1.5rem !important;
          }
        }
      `}</style>
    </footer>
  );
}

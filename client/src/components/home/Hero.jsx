import React from 'react';
import { ArrowUpRight, Github, Linkedin, Briefcase, Video, Mail, PhoneCall } from 'lucide-react';
import HeroCanvas from '../common/HeroCanvas';
import { useSound } from '../../hooks/useSound';

export default function Hero({ about, socials }) {
  const { playClick, playHover } = useSound();

  const getIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case 'github': return <Github size={15} />;
      case 'linkedin': return <Linkedin size={15} />;
      case 'fiverr': return <Briefcase size={15} />;
      case 'tiktok': return <Video size={15} />;
      case 'whatsapp': return <PhoneCall size={15} />;
      case 'email': return <Mail size={15} />;
      default: return <Mail size={15} />;
    }
  };

  // Fallback social icons matching the 6 in screenshot
  const displaySocials = socials && socials.length > 0 ? socials : [
    { platform: 'github', url: 'https://github.com/kavindunimesh' },
    { platform: 'linkedin', url: 'https://linkedin.com/in/kavindunimesh' },
    { platform: 'fiverr', url: 'https://fiverr.com/kavindu_nimesh' },
    { platform: 'tiktok', url: 'https://tiktok.com/@auradigitaldeveloper' },
    { platform: 'email', url: 'mailto:kavindu@auradigital.lk' },
    { platform: 'whatsapp', url: 'https://wa.me/94771234567' }
  ];

  return (
    <section
      id="hero"
      className="hero-section"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#050505',
        backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
        `,
        backgroundSize: '76px 76px',
        overflow: 'hidden'
      }}
    >
      {/* 3D Rotating Red Geometric Polyhedron Canvas on Right */}
      <HeroCanvas />

      {/* Main Left Content Container */}
      <div className="container" style={{ position: 'relative', zIndex: 2, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ maxWidth: '820px', textAlign: 'left', width: '100%' }}>
          
          {/* Top Meta Line */}
          <div
            className="hero-meta-row"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.75rem',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.86rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>
                {about?.name || 'Kavindu Nimesh'}
              </span>
              <span className="meta-separator" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>/</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ color: '#9ca3af' }}>
                {about?.title || 'Software Engineer & Web Developer'}
              </span>
              <span className="meta-separator" style={{ color: 'rgba(255, 255, 255, 0.3)' }}>/</span>
            </div>

            <div>
              <span style={{ color: '#e50914', fontWeight: 500 }}>
                Founder, Aura Digital Developer Sri Lanka
              </span>
            </div>
          </div>

          {/* Giant Editorial Headline */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: "'Bebas Neue', 'Syne', sans-serif",
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '0.015em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '2rem',
              userSelect: 'none',
              wordBreak: 'break-word',
              overflowWrap: 'break-word'
            }}
          >
            <div style={{ display: 'block' }}>BUILDING</div>
            <div style={{ display: 'block' }}>DIGITAL</div>
            <div style={{ display: 'flex', alignItems: 'baseline', flexWrap: 'nowrap' }}>
              <span>EXPERIENCES</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '0.14em',
                  height: '0.14em',
                  backgroundColor: '#e50914',
                  marginLeft: '0.05em',
                  verticalAlign: 'baseline',
                  borderRadius: '1px',
                  boxShadow: '0 0 12px rgba(229, 9, 20, 0.7)'
                }}
              />
            </div>
          </h1>

          {/* Narrative Paragraph Matching Reference Image */}
          <p
            className="hero-bio"
            style={{
              fontSize: 'clamp(0.9rem, 2.5vw, 1.02rem)',
              color: '#9ca3af',
              lineHeight: 1.65,
              maxWidth: '560px',
              marginBottom: '2.25rem',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            I build the websites and internal tools that small businesses actually run on. Three years in, most of my work starts the same way: a client has a spreadsheet, a WhatsApp order queue and no way to see what is selling. I replace that with a fast front end, a clean database behind it and a dashboard they can use without me.
          </p>

          {/* Action Buttons */}
          <div
            className="hero-actions"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.85rem',
              flexWrap: 'wrap',
              marginBottom: '2rem'
            }}
          >
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                playClick();
                document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={playHover}
              style={{
                backgroundColor: '#e50914',
                color: '#ffffff',
                padding: '0.75rem 1.6rem',
                borderRadius: '4px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.92rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(229, 9, 20, 0.35)',
                transition: 'all 0.2s ease',
                minHeight: '44px'
              }}
              className="interactive-hover hero-btn-red"
            >
              <span>View my work</span>
              <ArrowUpRight size={16} />
            </a>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                playClick();
                document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
              onMouseEnter={playHover}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                padding: '0.75rem 1.6rem',
                borderRadius: '4px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.92rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                minHeight: '44px'
              }}
              className="interactive-hover hero-btn-outline"
            >
              Let's work together
            </a>
          </div>

        </div>
      </div>

      {/* Bottom Row: SCROLL Indicator on Left & Square Social Icons on Right */}
      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div
          className="hero-bottom-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
            paddingTop: '1rem'
          }}
        >
          {/* Bottom Left: SCROLL with vertical red line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '2px', height: '22px', backgroundColor: '#e50914' }} />
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.74rem',
                color: '#71717a',
                letterSpacing: '0.16em',
                textTransform: 'uppercase'
              }}
            >
              SCROLL
            </span>
          </div>

          {/* Bottom Right: Row of Square Icon Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            {displaySocials.map((s) => (
              <a
                key={s.id || s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                title={s.title || s.platform}
                style={{
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#71717a',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }}
                className="interactive-hover hero-social-sq"
              >
                {getIcon(s.platform)}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-section {
          padding: 130px 0 50px;
        }
        .hero-headline {
          font-size: clamp(4.5rem, 11vw, 10.5rem);
        }
        .hero-social-sq {
          width: 38px;
          height: 38px;
        }
        .hero-btn-red:hover {
          background-color: #ff1e28 !important;
          transform: translateY(-2px);
          box-shadow: 0 6px 25px rgba(229, 9, 20, 0.5) !important;
        }
        .hero-btn-outline:hover {
          border-color: rgba(255, 255, 255, 0.4) !important;
          background-color: rgba(255, 255, 255, 0.06) !important;
          transform: translateY(-2px);
        }
        .hero-social-sq:hover {
          color: #ffffff !important;
          border-color: rgba(229, 9, 20, 0.5) !important;
          background-color: rgba(229, 9, 20, 0.1) !important;
          transform: translateY(-2px);
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 105px 0 35px;
          }
          .hero-headline {
            font-size: clamp(3.2rem, 13.5vw, 5.2rem) !important;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            padding: 95px 0 25px;
          }
          .hero-headline {
            font-size: clamp(2.65rem, 14vw, 3.6rem) !important;
            margin-bottom: 1.5rem !important;
          }
          .hero-meta-row {
            font-size: 0.8rem !important;
            gap: 0.4rem 0.75rem !important;
            margin-bottom: 1.25rem !important;
          }
          .hero-actions {
            flex-direction: column;
            width: 100%;
          }
          .hero-actions a {
            width: 100%;
          }
          .hero-social-sq {
            width: 34px;
            height: 34px;
          }
          .hero-bottom-row {
            gap: 0.85rem;
          }
        }
      `}</style>
    </section>
  );
}

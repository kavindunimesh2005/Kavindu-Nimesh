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
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '130px 0 50px',
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
        <div style={{ maxWidth: '820px', textAlign: 'left' }}>
          
          {/* Top Meta Line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1.25rem',
              marginBottom: '2rem',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.86rem',
              flexWrap: 'wrap'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ fontWeight: 600, color: '#ffffff' }}>
                {about?.name || 'Kavindu Nimesh'}
              </span>
              <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
              <span style={{ color: '#9ca3af' }}>
                {about?.title || 'Software Engineer & Web Developer'}
              </span>
              <div style={{ width: '32px', height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.2)' }} />
            </div>

            <div>
              <span style={{ color: '#9ca3af' }}>
                Founder, Aura Digital Developer Sri Lanka
              </span>
            </div>
          </div>

          {/* Giant Editorial Headline */}
          <h1
            style={{
              fontFamily: "'Bebas Neue', 'Syne', sans-serif",
              fontSize: 'clamp(4.8rem, 11vw, 10.5rem)',
              fontWeight: 900,
              lineHeight: 0.88,
              letterSpacing: '0.015em',
              textTransform: 'uppercase',
              color: '#ffffff',
              marginBottom: '2.5rem',
              userSelect: 'none'
            }}
          >
            <div style={{ display: 'block' }}>BUILDING</div>
            <div style={{ display: 'block' }}>DIGITAL</div>
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <span>EXPERIENCES</span>
              <span
                style={{
                  display: 'inline-block',
                  width: '0.15em',
                  height: '0.15em',
                  backgroundColor: '#e50914',
                  marginLeft: '0.06em',
                  verticalAlign: 'baseline',
                  borderRadius: '1px',
                  boxShadow: '0 0 12px rgba(229, 9, 20, 0.7)'
                }}
              />
            </div>
          </h1>

          {/* Narrative Paragraph Matching Reference Image */}
          <p
            style={{
              fontSize: 'clamp(0.92rem, 1.2vw, 1.02rem)',
              color: '#9ca3af',
              lineHeight: 1.65,
              maxWidth: '560px',
              marginBottom: '2.5rem',
              fontFamily: "'Plus Jakarta Sans', sans-serif"
            }}
          >
            I build the websites and internal tools that small businesses actually run on. Three years in, most of my work starts the same way: a client has a spreadsheet, a WhatsApp order queue and no way to see what is selling. I replace that with a fast front end, a clean database behind it and a dashboard they can use without me.
          </p>

          {/* Action Buttons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
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
                padding: '0.7rem 1.6rem',
                borderRadius: '4px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                textDecoration: 'none',
                boxShadow: '0 4px 18px rgba(229, 9, 20, 0.35)',
                transition: 'all 0.2s ease'
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
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                padding: '0.7rem 1.6rem',
                borderRadius: '4px',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                textDecoration: 'none',
                transition: 'all 0.2s ease'
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
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '1rem'
          }}
        >
          {/* Bottom Left: SCROLL with vertical red line */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '2px', height: '24px', backgroundColor: '#e50914' }} />
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
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
                  width: '38px',
                  height: '38px',
                  borderRadius: '4px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
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
      `}</style>
    </section>
  );
}

import React, { useState } from 'react';
import { CheckCircle2, Code2, Sparkles, Award, Terminal } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import defaultPortrait from '../../assets/kavindu-portrait.jpg';

export default function About({ about }) {
  const { playClick, playHover } = useSound();
  const [isPortraitHovered, setIsPortraitHovered] = useState(false);

  // Use new Kavindu Nimesh portrait, overriding legacy unsplash placeholder if present
  const portraitSrc = (!about?.portrait_url || about.portrait_url.includes('photo-1534528741775'))
    ? defaultPortrait
    : about.portrait_url;

  const capabilities = [
    'High-Conversion E-Commerce Platforms',
    'Enterprise Admin Dashboards & CMS',
    'Custom Database-Driven Web Applications',
    'Responsive & Mobile-First UI/UX',
    'RESTful API & Serverless Architecture',
    'High-Stakes Client Engineering Projects'
  ];

  const stats = [
    { label: 'Years Experience', value: String(about?.years_experience || '3').padStart(2, '0') + '+' },
    { label: 'Projects Completed', value: String(about?.projects_count || '25') + '+' },
    { label: 'Technologies', value: String(about?.tech_count || '18') + '+' },
    { label: 'Happy Clients', value: String(about?.clients_count || '20') + '+' }
  ];

  return (
    <section id="about" className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div className="section-tag">01 // Architectural Mindset</div>
          <h2 className="section-title">
            ENGINEERING WITH <span style={{ color: '#e50914' }}>PURPOSE.</span>
          </h2>
          <p className="section-subtitle">
            Bridging complex full-stack engineering with modern creative direction. 3+ years architecting web experiences that deliver measurable impact.
          </p>
        </div>

        {/* Editorial 2-Column Grid */}
        <div
          className="about-editorial-grid"
          style={{
            alignItems: 'center'
          }}
        >
          {/* Left Column: Portrait & Studio Card */}
          <div>
            <div
              onMouseEnter={() => { setIsPortraitHovered(true); playHover(); }}
              onMouseLeave={() => setIsPortraitHovered(false)}
              style={{
                position: 'relative',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#0a0a0a',
                border: isPortraitHovered ? '1px solid #e50914' : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isPortraitHovered
                  ? '0 25px 50px -12px rgba(229, 9, 20, 0.35)'
                  : '0 20px 40px rgba(0, 0, 0, 0.5)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                maxWidth: '460px',
                margin: '0 auto'
              }}
              className="interactive-hover"
            >
              {/* Image with Glitch/Laser Red Filter on Hover */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 5',
                  overflow: 'hidden'
                }}
              >
                <img
                  src={portraitSrc}
                  alt={about?.name || 'Kavindu Nimesh'}
                  onError={(e) => { e.currentTarget.src = defaultPortrait; }}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 20%',
                    filter: isPortraitHovered ? 'grayscale(20%) contrast(110%)' : 'grayscale(100%) contrast(105%)',
                    transform: isPortraitHovered ? 'scale(1.04)' : 'scale(1)',
                    transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  loading="lazy"
                />

                {/* Laser scan line animation on hover */}
                {isPortraitHovered && (
                  <div
                    style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      height: '2px',
                      backgroundColor: '#e50914',
                      boxShadow: '0 0 15px #e50914',
                      animation: 'scanline 2s infinite linear'
                    }}
                  />
                )}

                {/* Gradient vignette */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(5, 5, 5, 0.95) 0%, rgba(5, 5, 5, 0.2) 50%, transparent 100%)'
                  }}
                />

                {/* Floating Badge */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: '1rem',
                    left: '1rem',
                    right: '1rem',
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(13, 13, 13, 0.9)',
                    backdropFilter: 'blur(15px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.15rem', fontWeight: 800 }}>
                        {about?.name || 'Kavindu Nimesh'}
                      </h3>
                      <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.74rem', color: '#e50914' }}>
                        {about?.company || 'Aura Digital Developer Sri Lanka'}
                      </p>
                    </div>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#e50914',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#ffffff'
                      }}
                    >
                      <Terminal size={17} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative & Stats */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e50914', marginBottom: '0.85rem' }}>
              <Sparkles size={16} />
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: '0.85rem', letterSpacing: '0.05em' }}>
                FOUNDER & LEAD ENGINEER
              </span>
            </div>

            <h3
              style={{
                fontSize: 'clamp(1.6rem, 2.8vw, 2.5rem)',
                fontWeight: 800,
                lineHeight: 1.2,
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em'
              }}
            >
              Crafting code that scales. Designing interfaces that captivate.
            </h3>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.75, marginBottom: '1.15rem' }}>
              {about?.bio ||
                'Driven Software Engineer & Web Developer with 3+ years of experience delivering high-performance digital products, mission-critical web applications, and award-winning user interfaces. Founder of Aura Digital Developer Sri Lanka, engineering digital solutions that merge architectural precision with bleeding-edge aesthetic performance.'}
            </p>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.75, marginBottom: '1.75rem' }}>
              {about?.secondary_bio ||
                'Specialized in building full-stack enterprise web platforms, custom e-commerce systems, real-time admin dashboards, and database-driven solutions. Dedicated to clean code, modular architecture, and modern UX design that drives measurable business growth.'}
            </p>

            {/* Core Competencies Checklist */}
            <div
              className="about-capabilities-grid"
              style={{
                display: 'grid',
                gap: '0.75rem',
                marginBottom: '2.5rem'
              }}
            >
              {capabilities.map((cap) => (
                <div key={cap} style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <CheckCircle2 size={16} style={{ color: '#e50914', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>
                    {cap}
                  </span>
                </div>
              ))}
            </div>

            {/* Live Database Dynamic Statistics Grid */}
            <div
              className="about-stats-grid"
              style={{
                display: 'grid',
                gap: '0.85rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              {stats.map((s, idx) => (
                <div
                  key={s.label}
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    padding: '1.1rem',
                    borderRadius: '12px',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={playHover}
                  className="interactive-hover stat-card"
                >
                  <div
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1,
                      marginBottom: '0.35rem'
                    }}
                  >
                    <span style={{ color: idx === 0 ? '#e50914' : '#ffffff' }}>{s.value}</span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.75rem',
                      color: '#a1a1aa',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

      <style>{`
        .about-editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 4rem;
        }
        .about-capabilities-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        .about-stats-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        @media (max-width: 860px) {
          .about-editorial-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .about-capabilities-grid {
            grid-template-columns: 1fr !important;
          }
          .about-stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @keyframes scanline {
          0% { top: 0; }
          100% { top: 100%; }
        }
        .stat-card:hover {
          border-color: rgba(229, 9, 20, 0.5) !important;
          transform: translateY(-4px);
        }
      `}</style>
    </section>
  );
}

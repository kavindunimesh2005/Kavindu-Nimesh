import React, { useState } from 'react';
import { Globe, ShoppingBag, Cpu, LayoutDashboard, Palette, ShieldCheck, ArrowRight, Code2 } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export default function Services({ services }) {
  const { playClick, playHover } = useSound();
  const [activeCard, setActiveCard] = useState(null);

  const getServiceIcon = (iconName) => {
    switch (iconName) {
      case 'Globe': return <Globe size={28} />;
      case 'ShoppingBag': return <ShoppingBag size={28} />;
      case 'Cpu': return <Cpu size={28} />;
      case 'LayoutDashboard': return <LayoutDashboard size={28} />;
      case 'Palette': return <Palette size={28} />;
      case 'ShieldCheck': return <ShieldCheck size={28} />;
      default: return <Code2 size={28} />;
    }
  };

  return (
    <section id="services" className="section" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '4.5rem' }}>
          <div>
            <div className="section-tag">02 // Specialized Solutions</div>
            <h2 className="section-title">
              DIGITAL <span style={{ color: '#e50914' }}>CAPABILITIES.</span>
            </h2>
            <p className="section-subtitle">
              End-to-end full lifecycle engineering solutions crafted with high architectural rigor, uncompromising speed, and modern aesthetics.
            </p>
          </div>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              playClick();
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            onMouseEnter={playHover}
            className="btn btn-secondary interactive-hover"
          >
            <span>Commission a Service</span>
            <ArrowRight size={16} />
          </a>
        </div>

        {/* 6 Interactive Distinctive Service Cards Grid */}
        <div
          className="services-grid"
          style={{
            display: 'grid',
            gap: '1.5rem'
          }}
        >
          {services?.map((service, index) => {
            const isHovered = activeCard === service.id;
            return (
              <div
                key={service.id || index}
                onMouseEnter={() => { setActiveCard(service.id); playHover(); }}
                onMouseLeave={() => setActiveCard(null)}
                style={{
                  position: 'relative',
                  backgroundColor: isHovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: isHovered ? '1px solid #e50914' : '1px solid var(--border-subtle)',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-6px)' : 'none',
                  boxShadow: isHovered ? '0 20px 40px -15px rgba(229, 9, 20, 0.3)' : 'none'
                }}
                className="interactive-hover service-card"
              >
                {/* Top: Service Number & Icon */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: isHovered ? '#e50914' : '#71717a',
                        letterSpacing: '0.1em',
                        transition: 'color 0.25s ease'
                      }}
                    >
                      {service.service_number || `0${index + 1}`}
                    </span>

                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '12px',
                        backgroundColor: isHovered ? '#e50914' : 'rgba(255, 255, 255, 0.05)',
                        color: '#ffffff',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                        boxShadow: isHovered ? '0 0 20px rgba(229, 9, 20, 0.5)' : 'none'
                      }}
                    >
                      {getServiceIcon(service.icon)}
                    </div>
                  </div>

                  {/* Title */}
                  <h3
                    style={{
                      fontFamily: "'Syne', sans-serif",
                      fontSize: '1.35rem',
                      fontWeight: 800,
                      marginBottom: '0.85rem',
                      color: 'var(--text-primary)',
                      letterSpacing: '-0.02em'
                    }}
                  >
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.92rem',
                      lineHeight: 1.7,
                      marginBottom: '1.5rem'
                    }}
                  >
                    {service.description}
                  </p>
                </div>

                {/* Bottom: Technologies Chips & Action Link */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.45rem',
                      marginBottom: '1.5rem',
                      paddingTop: '1.25rem',
                      borderTop: '1px solid var(--border-subtle)'
                    }}
                  >
                    {service.technologies?.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.72rem',
                          color: '#a1a1aa',
                          backgroundColor: 'rgba(255, 255, 255, 0.04)',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(255, 255, 255, 0.06)'
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    onClick={(e) => {
                      e.preventDefault();
                      playClick();
                      document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.86rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      color: isHovered ? '#e50914' : 'var(--text-primary)',
                      transition: 'color 0.2s ease',
                      textDecoration: 'none'
                    }}
                  >
                    <span>Request Proposal</span>
                    <span style={{ transform: isHovered ? 'translateX(4px)' : 'none', transition: 'transform 0.2s ease' }}>→</span>
                  </a>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .services-grid {
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        }
        .service-card {
          padding: 2.25rem;
        }
        @media (max-width: 640px) {
          .services-grid {
            grid-template-columns: 1fr !important;
          }
          .service-card {
            padding: 1.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}

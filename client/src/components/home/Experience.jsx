import React, { useState } from 'react';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export default function Experience({ experiences }) {
  const [hoveredExpId, setHoveredExpId] = useState(null);
  const { playHover } = useSound();

  return (
    <section id="experience" className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '4.5rem' }}>
          <div className="section-tag">05 // Proven Trajectory</div>
          <h2 className="section-title">
            CAREER & <span style={{ color: '#e50914' }}>IMPACT.</span>
          </h2>
          <p className="section-subtitle">
            3+ years engineering scalable web architecture, driving digital transformations, and leading software solutions at Aura Digital Developer Sri Lanka.
          </p>
        </div>

        {/* Modern Vertical Glowing Timeline */}
        <div style={{ position: 'relative', maxWidth: '900px', margin: '0 auto' }}>
          
          {/* Central Glowing Laser Timeline Stem */}
          <div
            className="timeline-stem"
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              width: '2px',
              background: 'linear-gradient(to bottom, #e50914 0%, rgba(229, 9, 20, 0.3) 70%, transparent 100%)',
              boxShadow: '0 0 10px rgba(229, 9, 20, 0.4)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
            {experiences?.map((exp, index) => {
              const isHovered = hoveredExpId === exp.id;
              return (
                <div
                  key={exp.id || index}
                  onMouseEnter={() => { setHoveredExpId(exp.id); playHover(); }}
                  onMouseLeave={() => setHoveredExpId(null)}
                  style={{
                    position: 'relative',
                    transition: 'all 0.3s ease'
                  }}
                  className="interactive-hover timeline-item"
                >
                  {/* Glowing Marker Node on the Stem */}
                  <div
                    className="timeline-marker"
                    style={{
                      position: 'absolute',
                      top: '14px',
                      borderRadius: '50%',
                      backgroundColor: '#050505',
                      border: isHovered ? '3px solid #e50914' : '2px solid rgba(255, 255, 255, 0.4)',
                      boxShadow: isHovered ? '0 0 15px #e50914' : 'none',
                      transition: 'all 0.3s ease',
                      zIndex: 2
                    }}
                  />

                  {/* Content Box */}
                  <div
                    className="timeline-card"
                    style={{
                      backgroundColor: isHovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                      border: isHovered ? '1px solid #e50914' : '1px solid var(--border-subtle)',
                      borderRadius: '16px',
                      boxShadow: isHovered ? '0 20px 40px -15px rgba(229, 9, 20, 0.25)' : 'none',
                      transform: isHovered ? 'translateX(4px)' : 'none',
                      transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  >
                    {/* Header Row: Position & Period */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        flexWrap: 'wrap',
                        gap: '0.85rem',
                        marginBottom: '0.75rem'
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '1.25rem',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            marginBottom: '0.25rem'
                          }}
                        >
                          {exp.position}
                        </h3>

                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: '0.92rem',
                            fontWeight: 600,
                            color: '#e50914'
                          }}
                        >
                          <Building2 size={15} />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.3rem 0.8rem',
                          borderRadius: '100px',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.76rem',
                          color: '#a1a1aa'
                        }}
                      >
                        <Calendar size={12} style={{ color: '#e50914' }} />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Narrative Description */}
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.92rem',
                        lineHeight: 1.7,
                        margin: '0.85rem 0 1.25rem'
                      }}
                    >
                      {exp.description}
                    </p>

                    {/* Technologies Pills */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {exp.technologies.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '0.7rem',
                              color: '#ffffff',
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              padding: '0.2rem 0.55rem',
                              borderRadius: '4px'
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </div>

      </div>

      <style>{`
        .timeline-stem {
          left: 24px;
        }
        .timeline-item {
          padding-left: 60px;
        }
        .timeline-marker {
          left: 15px;
          width: 20px;
          height: 20px;
        }
        .timeline-card {
          padding: 2rem 2.25rem;
        }
        @media (max-width: 640px) {
          .timeline-stem {
            left: 10px !important;
          }
          .timeline-item {
            padding-left: 32px !important;
          }
          .timeline-marker {
            left: 2px !important;
            width: 16px !important;
            height: 16px !important;
          }
          .timeline-card {
            padding: 1.25rem 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}

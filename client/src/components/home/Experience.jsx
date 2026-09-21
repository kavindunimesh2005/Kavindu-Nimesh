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
            style={{
              position: 'absolute',
              top: '20px',
              bottom: '20px',
              left: '24px',
              width: '2px',
              background: 'linear-gradient(to bottom, #e50914 0%, rgba(229, 9, 20, 0.3) 70%, transparent 100%)',
              boxShadow: '0 0 10px rgba(229, 9, 20, 0.4)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
            {experiences?.map((exp, index) => {
              const isHovered = hoveredExpId === exp.id;
              return (
                <div
                  key={exp.id || index}
                  onMouseEnter={() => { setHoveredExpId(exp.id); playHover(); }}
                  onMouseLeave={() => setHoveredExpId(null)}
                  style={{
                    position: 'relative',
                    paddingLeft: '64px',
                    transition: 'all 0.3s ease'
                  }}
                  className="interactive-hover"
                >
                  {/* Glowing Marker Node on the Stem */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '15px',
                      width: '20px',
                      height: '20px',
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
                    style={{
                      backgroundColor: isHovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                      border: isHovered ? '1px solid #e50914' : '1px solid var(--border-subtle)',
                      borderRadius: '16px',
                      padding: '2rem 2.5rem',
                      boxShadow: isHovered ? '0 20px 40px -15px rgba(229, 9, 20, 0.25)' : 'none',
                      transform: isHovered ? 'translateX(6px)' : 'none',
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
                        gap: '1rem',
                        marginBottom: '0.75rem'
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            fontFamily: "'Syne', sans-serif",
                            fontSize: '1.35rem',
                            fontWeight: 800,
                            color: 'var(--text-primary)',
                            marginBottom: '0.35rem'
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
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            color: '#e50914'
                          }}
                        >
                          <Building2 size={16} />
                          <span>{exp.company}</span>
                        </div>
                      </div>

                      <div
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.35rem 0.85rem',
                          borderRadius: '100px',
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '0.78rem',
                          color: '#a1a1aa'
                        }}
                      >
                        <Calendar size={13} style={{ color: '#e50914' }} />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Narrative Description */}
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.95rem',
                        lineHeight: 1.7,
                        margin: '1rem 0 1.5rem'
                      }}
                    >
                      {exp.description}
                    </p>

                    {/* Technologies Pills */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                        {exp.technologies.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: '0.72rem',
                              color: '#ffffff',
                              backgroundColor: 'rgba(255, 255, 255, 0.04)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              padding: '0.2rem 0.6rem',
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
    </section>
  );
}

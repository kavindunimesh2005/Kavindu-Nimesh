import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export default function Testimonials({ testimonials }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playClick, playHover } = useSound();

  if (!testimonials || testimonials.length === 0) return null;

  const handlePrev = () => {
    playClick();
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    playClick();
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="section" style={{ position: 'relative' }}>
      <div className="container">
        
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <div className="section-tag">06 // Client Endorsements</div>
          <h2 className="section-title">
            TRUSTED BY <span style={{ color: '#e50914' }}>FOUNDERS.</span>
          </h2>
          <p className="section-subtitle">
            Direct feedback from entrepreneurs, executives, and company founders who partnered with Kavindu Nimesh & Aura Digital.
          </p>
        </div>

        {/* Featured Editorial Testimonial Showcase */}
        <div style={{ maxWidth: '960px', margin: '0 auto' }}>
          <div
            className="testimonial-showcase-card"
            style={{
              position: 'relative',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '24px',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 25px 50px -15px rgba(0, 0, 0, 0.5)',
              overflow: 'hidden'
            }}
          >
            {/* Background Red Quote Watermark */}
            <div
              className="quote-watermark"
              style={{
                position: 'absolute',
                top: '1.5rem',
                right: '2rem',
                color: 'rgba(229, 9, 20, 0.07)',
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              <Quote size={100} />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* Star Rating */}
              <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1.5rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={17}
                    fill={i < (current.rating || 5) ? '#e50914' : 'none'}
                    color={i < (current.rating || 5) ? '#e50914' : '#3f3f46'}
                  />
                ))}
              </div>

              {/* Quote Text */}
              <blockquote
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.05rem, 3vw, 1.6rem)',
                  fontWeight: 600,
                  lineHeight: 1.55,
                  color: 'var(--text-primary)',
                  marginBottom: '2rem',
                  letterSpacing: '-0.01em'
                }}
              >
                "{current.quote}"
              </blockquote>

              {/* Author Info & Navigation Controls */}
              <div
                className="testimonial-footer"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1.25rem',
                  paddingTop: '1.75rem',
                  borderTop: '1px solid var(--border-subtle)'
                }}
              >
                {/* Client Bio */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                  <img
                    src={current.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
                    alt={current.client_name}
                    style={{
                      width: '50px',
                      height: '50px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #e50914',
                      boxShadow: '0 0 15px rgba(229, 9, 20, 0.4)'
                    }}
                    loading="lazy"
                  />
                  <div>
                    <h4
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: '1.1rem',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        marginBottom: '0.2rem'
                      }}
                    >
                      {current.client_name}
                    </h4>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.82rem', color: '#a1a1aa' }}>
                      {current.position} {current.company && `— ${current.company}`}
                    </p>
                  </div>
                </div>

                {/* Slider Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <button
                    onClick={handlePrev}
                    onMouseEnter={playHover}
                    aria-label="Previous testimonial"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    className="interactive-hover"
                  >
                    <ChevronLeft size={18} />
                  </button>

                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.82rem',
                      color: '#71717a',
                      padding: '0 0.4rem'
                    }}
                  >
                    {currentIndex + 1} / {testimonials.length}
                  </span>

                  <button
                    onClick={handleNext}
                    onMouseEnter={playHover}
                    aria-label="Next testimonial"
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid var(--border-subtle)',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s ease'
                    }}
                    className="interactive-hover"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style>{`
        .testimonial-showcase-card {
          padding: 3.5rem;
        }
        @media (max-width: 640px) {
          .testimonial-showcase-card {
            padding: 1.5rem 1.25rem !important;
          }
          .quote-watermark {
            display: none !important;
          }
          .testimonial-footer {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </section>
  );
}

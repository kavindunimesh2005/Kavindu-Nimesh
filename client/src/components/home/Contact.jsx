import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, CheckCircle2, AlertCircle, PhoneCall, Mail, Linkedin, Github, ArrowUpRight } from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function Contact({ settings, socials }) {
  const { playClick, playHover } = useSound();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    project_type: 'Website Development',
    budget: '$1,000 - $3,000',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const projectTypes = [
    'Website Development',
    'E-Commerce Development',
    'Custom Web Application',
    'Admin Dashboard Development',
    'UI/UX Implementation',
    'Website Maintenance'
  ];

  const budgets = [
    '< $1,000',
    '$1,000 - $3,000',
    '$3,000 - $5,000',
    '$5,000+',
    'Flexible / Discuss'
  ];

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('Please fill in your name, email, and project details.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitContact(formData);
      if (res.success) {
        setSuccessMessage('Message sent successfully! Kavindu will review your requirements and respond within 24 hours.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          project_type: 'Website Development',
          budget: '$1,000 - $3,000',
          message: ''
        });

        // Trigger celebratory confetti
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#e50914', '#ffffff', '#27272a']
        });
      }
    } catch (err) {
      setErrorMessage(err.message || 'Failed to send message. Please try again or reach out directly.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="section"
      style={{
        position: 'relative',
        backgroundColor: 'var(--bg-surface)',
        overflow: 'hidden'
      }}
    >
      {/* Background Red Ambient Glow */}
      <div
        style={{
          position: 'absolute',
          bottom: '-10%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          backgroundColor: 'rgba(229, 9, 20, 0.08)',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 4.5rem' }}>
          <div className="section-tag">07 // Start A Dialogue</div>
          <h2
            className="section-title"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.8rem)' }}
          >
            LET'S BUILD SOMETHING <span style={{ color: '#e50914' }}>GREAT.</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Have an ambitious project in mind, an e-commerce platform to build, or require modern engineering advisory? Let's discuss your timeline and deliverables.
          </p>
        </div>

        {/* 2-Column Grid: Form & Direct Contact Channels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '4rem',
            maxWidth: '1140px',
            margin: '0 auto'
          }}
        >
          {/* Left Column: Direct Channels & Studio Presence */}
          <div>
            <h3
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: '1.75rem',
                fontWeight: 800,
                marginBottom: '1rem',
                letterSpacing: '-0.02em'
              }}
            >
              Direct Consultation
            </h3>

            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              Whether you need end-to-end full stack execution or want to modernize existing architecture, reach out directly or submit the inquiry form.
            </p>

            {/* Direct Badges */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
              
              {/* WhatsApp Direct */}
              <a
                href="https://wa.me/94771234567"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                className="interactive-hover direct-card"
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                    color: '#e50914',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <PhoneCall size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#71717a', textTransform: 'uppercase' }}>
                    Instant Chat
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    WhatsApp (+94 77 123 4567)
                  </div>
                </div>
                <ArrowUpRight size={18} style={{ marginLeft: 'auto', color: '#71717a' }} />
              </a>

              {/* Email Direct */}
              <a
                href="mailto:kavindu@auradigital.lk"
                onMouseEnter={playHover}
                onClick={playClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                className="interactive-hover direct-card"
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                    color: '#e50914',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Mail size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#71717a', textTransform: 'uppercase' }}>
                    Email Inquiries
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    kavindu@auradigital.lk
                  </div>
                </div>
                <ArrowUpRight size={18} style={{ marginLeft: 'auto', color: '#71717a' }} />
              </a>

              {/* LinkedIn Direct */}
              <a
                href="https://linkedin.com/in/kavindunimesh"
                target="_blank"
                rel="noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem 1.5rem',
                  borderRadius: '16px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
                className="interactive-hover direct-card"
              >
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(229, 9, 20, 0.1)',
                    color: '#e50914',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Linkedin size={20} />
                </div>
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.72rem', color: '#71717a', textTransform: 'uppercase' }}>
                    Professional Network
                  </div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                    LinkedIn / kavindunimesh
                  </div>
                </div>
                <ArrowUpRight size={18} style={{ marginLeft: 'auto', color: '#71717a' }} />
              </a>

            </div>

            <div style={{ padding: '1.5rem', borderRadius: '14px', backgroundColor: 'var(--bg-elevated)', border: '1px solid var(--border-subtle)' }}>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#a1a1aa' }}>
                📍 <strong style={{ color: '#ffffff' }}>Aura Digital Developer Sri Lanka</strong><br />
                Operating from Colombo, Sri Lanka • Engineering global client solutions.
              </p>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '24px',
              padding: 'clamp(2rem, 4vw, 3rem)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)'
            }}
          >
            {successMessage ? (
              <div
                style={{
                  padding: '3rem 1.5rem',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(229, 9, 20, 0.15)',
                    color: '#e50914',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.6rem', fontWeight: 800 }}>
                  Inquiry Received
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, maxWidth: '420px' }}>
                  {successMessage}
                </p>
                <button
                  onClick={() => setSuccessMessage('')}
                  className="btn btn-secondary"
                  style={{ marginTop: '1rem' }}
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {errorMessage && (
                  <div
                    style={{
                      padding: '0.85rem 1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(229, 9, 20, 0.15)',
                      border: '1px solid #e50914',
                      color: '#ffffff',
                      fontSize: '0.86rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '1.5rem'
                    }}
                  >
                    <AlertCircle size={18} style={{ color: '#e50914', flexShrink: 0 }} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Name & Email */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      required
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                {/* Phone & Project Type */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Phone / WhatsApp (Optional)
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+94 7X XXX XXXX"
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Project Type
                    </label>
                    <select
                      name="project_type"
                      value={formData.project_type}
                      onChange={handleChange}
                      style={{
                        width: '100%',
                        padding: '0.85rem 1rem',
                        borderRadius: '10px',
                        backgroundColor: 'var(--bg-elevated)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontSize: '0.92rem',
                        outline: 'none'
                      }}
                    >
                      {projectTypes.map(pt => (
                        <option key={pt} value={pt} style={{ backgroundColor: '#141414', color: '#ffffff' }}>
                          {pt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget Range */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Estimated Budget
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {budgets.map(b => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, budget: b }))}
                        onMouseEnter={playHover}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          fontSize: '0.8rem',
                          fontFamily: "'JetBrains Mono', monospace",
                          backgroundColor: formData.budget === b ? '#e50914' : 'var(--bg-elevated)',
                          color: formData.budget === b ? '#ffffff' : 'var(--text-secondary)',
                          border: formData.budget === b ? '1px solid #e50914' : '1px solid var(--border-subtle)',
                          transition: 'all 0.2s ease'
                        }}
                        className="interactive-hover"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Message */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Project Description & Requirements *
                  </label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your goals, key features, target timeline, and links..."
                    required
                    style={{
                      width: '100%',
                      padding: '0.85rem 1rem',
                      borderRadius: '10px',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={playHover}
                  className="btn btn-primary interactive-hover"
                  style={{ width: '100%', padding: '1rem' }}
                >
                  <span>{loading ? 'Transmitting...' : 'Start a Project'}</span>
                  <Send size={16} />
                </button>
              </form>
            )}
          </div>

        </div>

      </div>

      <style>{`
        .direct-card:hover {
          border-color: rgba(229, 9, 20, 0.5) !important;
          transform: translateY(-3px);
        }
      `}</style>
    </section>
  );
}

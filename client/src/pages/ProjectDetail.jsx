import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, ArrowUpRight, ExternalLink, Github, 
  CheckCircle2, Sparkles, Quote, Calendar, Briefcase, 
  ChevronLeft, ChevronRight, Layers, Award
} from 'lucide-react';
import { api } from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useSound } from '../hooks/useSound';

export default function ProjectDetail() {
  const { slug } = useParams();
  const [projectData, setProjectData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { playClick, playHover } = useSound();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    async function loadProject() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getProjectBySlug(slug);
        if (res.success && res.data) {
          setProjectData(res.data);
        } else {
          setError('Project not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load case study.');
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#050505',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontFamily: "'Space Grotesk', sans-serif"
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '40px',
              height: '40px',
              border: '3px solid rgba(229, 9, 20, 0.2)',
              borderTopColor: '#e50914',
              borderRadius: '50%',
              animation: 'spin 0.8s linear infinite',
              margin: '0 auto 1rem'
            }}
          />
          <p style={{ color: '#a1a1aa', letterSpacing: '0.1em' }}>LOADING CASE STUDY...</p>
        </div>
      </div>
    );
  }

  if (error || !projectData?.project) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#050505',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          padding: '2rem',
          textAlign: 'center'
        }}
      >
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '3rem', marginBottom: '1rem' }}>
          Case Study Not Found
        </h1>
        <p style={{ color: '#a1a1aa', marginBottom: '2rem' }}>
          The requested project archive could not be located.
        </p>
        <Link to="/" className="btn btn-primary">
          <ArrowLeft size={16} /> Return to Homepage
        </Link>
      </div>
    );
  }

  const { project, prevProject, nextProject } = projectData;

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ paddingTop: '110px' }}>
        
        {/* Top Breadcrumb / Return */}
        <div className="container" style={{ paddingBottom: '1.5rem' }}>
          <Link
            to="/#projects"
            onClick={playClick}
            onMouseEnter={playHover}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#a1a1aa',
              fontSize: '0.88rem',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 600,
              textDecoration: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)'
            }}
            className="interactive-hover"
          >
            <ArrowLeft size={16} />
            <span>Back to Featured Work</span>
          </Link>
        </div>

        {/* Hero Banner Header */}
        <header className="container" style={{ paddingBottom: '3.5rem' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.8rem',
                color: '#e50914',
                padding: '0.3rem 0.8rem',
                borderRadius: '100px',
                backgroundColor: 'rgba(229, 9, 20, 0.1)',
                border: '1px solid rgba(229, 9, 20, 0.25)',
                textTransform: 'uppercase'
              }}
            >
              {project.category}
            </span>
            <span style={{ color: '#71717a' }}>•</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.8rem', color: '#a1a1aa' }}>
              {project.year || '2025'}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.5rem, 6vw, 4.8rem)',
              fontWeight: 900,
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              marginBottom: '1.75rem',
              maxWidth: '1100px'
            }}
          >
            {project.title}
          </h1>

          <p
            style={{
              fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)',
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              maxWidth: '850px',
              marginBottom: '3rem'
            }}
          >
            {project.short_description}
          </p>

          {/* Quick Metrics Bar */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '1.5rem',
              padding: '2rem',
              borderRadius: '18px',
              backgroundColor: 'var(--bg-elevated)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '3.5rem'
            }}
          >
            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>
                CLIENT
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {project.client}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>
                INDUSTRY
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {project.industry}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>
                TIMELINE
              </div>
              <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                {project.timeline || '8 Weeks'}
              </div>
            </div>

            <div>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#71717a', textTransform: 'uppercase' }}>
                LINKS
              </div>
              <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem' }}>
                {project.live_url && (
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#e50914', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, fontSize: '0.92rem' }}
                  >
                    Live <ExternalLink size={14} />
                  </a>
                )}
                {project.github_url && (
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ color: '#a1a1aa', display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontWeight: 700, fontSize: '0.92rem' }}
                  >
                    GitHub <Github size={14} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Hero Showcase Image */}
          <div
            style={{
              position: 'relative',
              borderRadius: '24px',
              overflow: 'hidden',
              boxShadow: '0 30px 70px -20px rgba(0, 0, 0, 0.7)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <img
              src={project.image_url}
              alt={project.title}
              style={{ width: '100%', maxHeight: '650px', objectFit: 'cover', display: 'block' }}
            />
          </div>
        </header>

        {/* Narrative Case Study Storytelling */}
        <div className="container" style={{ maxWidth: '1080px', paddingBottom: '6rem' }}>
          
          {/* Project Overview */}
          {project.full_description && (
            <section style={{ marginBottom: '4.5rem' }}>
              <div className="section-tag">Overview & Objective</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                The Vision Behind the Platform
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', lineHeight: 1.8 }}>
                {project.full_description}
              </p>
            </section>
          )}

          {/* Challenge & Solution Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '2.5rem',
              marginBottom: '5rem'
            }}
          >
            {/* The Challenge */}
            <div
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '20px',
                padding: '2.5rem'
              }}
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
                  justifyContent: 'center',
                  marginBottom: '1.5rem'
                }}
              >
                <Layers size={22} />
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                The Architectural Challenge
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.75 }}>
                {project.challenge || 'Integrating disparate legacy processes into an automated, high-velocity digital framework while ensuring sub-second response times and zero downtime for end users.'}
              </p>
            </div>

            {/* The Solution */}
            <div
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid rgba(229, 9, 20, 0.3)',
                borderRadius: '20px',
                padding: '2.5rem'
              }}
            >
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  backgroundColor: '#e50914',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 0 15px rgba(229, 9, 20, 0.5)'
                }}
              >
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800, marginBottom: '1rem' }}>
                The Engineered Solution
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.75 }}>
                {project.solution || 'Crafted an optimized modular React interface communicating with a scalable Express REST API and indexed database, implementing dynamic caching, resilient state, and seamless checkout.'}
              </p>
            </div>
          </div>

          {/* Key Features Breakdown */}
          {project.features && project.features.length > 0 && (
            <section style={{ marginBottom: '5rem' }}>
              <div className="section-tag">Key Innovations</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.2rem', fontWeight: 800, marginBottom: '2rem' }}>
                Core Platform Capabilities
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '1.5rem',
                      borderRadius: '14px',
                      backgroundColor: 'var(--bg-card)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '0.85rem'
                    }}
                  >
                    <CheckCircle2 size={20} style={{ color: '#e50914', flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ color: 'var(--text-primary)', fontSize: '0.98rem', lineHeight: 1.5, fontWeight: 500 }}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technology Arsenal */}
          {project.technologies && (
            <section style={{ marginBottom: '5rem' }}>
              <div className="section-tag">Stack & Dependencies</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.2rem', fontWeight: 800, marginBottom: '1.75rem' }}>
                Technologies Deployed
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                {project.technologies.map((tech, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '0.75rem 1.5rem',
                      borderRadius: '100px',
                      backgroundColor: 'var(--bg-elevated)',
                      border: '1px solid var(--border-subtle)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.9rem',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}
                  >
                    <span style={{ color: '#e50914' }}>#</span>
                    <span>{tech}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Gallery Showcase if present */}
          {project.gallery && project.gallery.length > 0 && (
            <section style={{ marginBottom: '5rem' }}>
              <div className="section-tag">Visual Walkthrough</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.2rem', fontWeight: 800, marginBottom: '2rem' }}>
                Interface Gallery
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
                {project.gallery.map((imgUrl, gIdx) => (
                  <div
                    key={gIdx}
                    style={{
                      borderRadius: '16px',
                      overflow: 'hidden',
                      border: '1px solid var(--border-subtle)',
                      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4)'
                    }}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.title} screenshot ${gIdx + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Results & Measurable Impact */}
          {project.results && (
            <div
              style={{
                backgroundColor: 'rgba(229, 9, 20, 0.05)',
                border: '1px solid rgba(229, 9, 20, 0.3)',
                borderRadius: '20px',
                padding: '3rem',
                marginBottom: '5rem',
                textAlign: 'center'
              }}
            >
              <div style={{ fontFamily: "'JetBrains Mono', monospace", color: '#e50914', fontSize: '0.85rem', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                MEASURABLE ROI & BUSINESS IMPACT
              </div>
              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.4
                }}
              >
                {project.results}
              </h3>
            </div>
          )}

          {/* Client Feedback Quote */}
          {project.client_feedback && (
            <div
              style={{
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)',
                borderRadius: '20px',
                padding: '3rem',
                position: 'relative',
                marginBottom: '5rem'
              }}
            >
              <Quote size={40} style={{ color: '#e50914', marginBottom: '1.25rem' }} />
              <blockquote
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.35rem',
                  fontWeight: 600,
                  lineHeight: 1.6,
                  color: 'var(--text-primary)',
                  marginBottom: '1.5rem'
                }}
              >
                "{project.client_feedback}"
              </blockquote>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.85rem', color: '#a1a1aa' }}>
                — Executive Review for {project.client}
              </div>
            </div>
          )}

          {/* Navigation to Next / Previous Projects */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1.5rem',
              paddingTop: '3rem',
              borderTop: '1px solid var(--border-subtle)'
            }}
          >
            {prevProject ? (
              <Link
                to={`/projects/${prevProject.slug}`}
                onClick={playClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  color: 'var(--text-primary)'
                }}
                className="interactive-hover"
              >
                <ChevronLeft size={24} style={{ color: '#e50914' }} />
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#71717a' }}>PREVIOUS</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{prevProject.title}</div>
                </div>
              </Link>
            ) : <div />}

            {nextProject ? (
              <Link
                to={`/projects/${nextProject.slug}`}
                onClick={playClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  textAlign: 'right'
                }}
                className="interactive-hover"
              >
                <div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#71717a' }}>NEXT</div>
                  <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700 }}>{nextProject.title}</div>
                </div>
                <ChevronRight size={24} style={{ color: '#e50914' }} />
              </Link>
            ) : <div />}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}

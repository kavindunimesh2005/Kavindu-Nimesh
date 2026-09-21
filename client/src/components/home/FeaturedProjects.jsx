import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Github, ExternalLink, Sparkles, Layers } from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export default function FeaturedProjects({ projects }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const { playClick, playHover } = useSound();
  const navigate = useNavigate();

  const categories = ['All', 'E-Commerce', 'Admin Dashboards', 'Custom Web Applications'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects?.filter(p => p.category?.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="projects" className="section" style={{ backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '2rem',
            marginBottom: '3.5rem'
          }}
        >
          <div>
            <div className="section-tag">03 // Selected Portfolio</div>
            <h2 className="section-title">
              FEATURED <span style={{ color: '#e50914' }}>CASE STUDIES.</span>
            </h2>
            <p className="section-subtitle">
              Large-format editorial breakdown of mission-critical platforms, e-commerce architectures, and enterprise systems built for real-world impact.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              flexWrap: 'wrap',
              backgroundColor: 'var(--bg-elevated)',
              padding: '0.4rem',
              borderRadius: '100px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setSelectedCategory(cat); playClick(); }}
                  onMouseEnter={playHover}
                  style={{
                    padding: '0.45rem 1.1rem',
                    borderRadius: '100px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    backgroundColor: isSelected ? '#e50914' : 'transparent',
                    boxShadow: isSelected ? '0 0 15px rgba(229, 9, 20, 0.4)' : 'none',
                    transition: 'all 0.25s ease'
                  }}
                  className="interactive-hover"
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Large Editorial Showcase Cards (Vertical Staggered Format) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
          {filteredProjects?.map((project, idx) => {
            const isHovered = hoveredProjectId === project.id;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={project.id || project.slug}
                onMouseEnter={() => { setHoveredProjectId(project.id); playHover(); }}
                onMouseLeave={() => setHoveredProjectId(null)}
                style={{
                  position: 'relative',
                  backgroundColor: 'var(--bg-elevated)',
                  border: isHovered ? '1px solid #e50914' : '1px solid var(--border-subtle)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
                  alignItems: 'center',
                  boxShadow: isHovered
                    ? '0 30px 60px -15px rgba(229, 9, 20, 0.25)'
                    : '0 20px 40px rgba(0, 0, 0, 0.4)',
                  transition: 'all 0.45s cubic-bezier(0.16, 1, 0.3, 1)'
                }}
                className="project-card interactive-hover"
              >
                {/* Media Image Showcase Container */}
                <div
                  onClick={() => { playClick(); navigate(`/projects/${project.slug}`); }}
                  style={{
                    position: 'relative',
                    aspectRatio: '16 / 10',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    order: isEven ? 2 : 1
                  }}
                >
                  <img
                    src={project.image_url}
                    alt={project.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: isHovered ? 'scale(1.06)' : 'scale(1)',
                      filter: isHovered ? 'contrast(105%)' : 'grayscale(15%) contrast(100%)',
                      transition: 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(5, 5, 5, 0.8) 0%, transparent 60%)'
                    }}
                  />

                  {/* Red corner accent banner */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      left: '1.25rem',
                      padding: '0.35rem 0.85rem',
                      borderRadius: '100px',
                      backgroundColor: 'rgba(5, 5, 5, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <span style={{ color: '#e50914' }}>●</span>
                    <span>{project.category}</span>
                  </div>

                  {/* Year pill */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '1.25rem',
                      right: '1.25rem',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '100px',
                      backgroundColor: 'rgba(5, 5, 5, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      color: '#a1a1aa'
                    }}
                  >
                    {project.year}
                  </div>
                </div>

                {/* Editorial Content Details */}
                <div
                  style={{
                    padding: '3rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    order: isEven ? 1 : 2
                  }}
                >
                  <div>
                    {/* Client & Timeline Meta */}
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.8rem',
                        color: '#71717a'
                      }}
                    >
                      <span>CLIENT: <strong style={{ color: '#ffffff' }}>{project.client}</strong></span>
                      <span>•</span>
                      <span>{project.timeline || 'Delivered 2025'}</span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => { playClick(); navigate(`/projects/${project.slug}`); }}
                      style={{
                        fontFamily: "'Syne', sans-serif",
                        fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)',
                        fontWeight: 800,
                        lineHeight: 1.2,
                        marginBottom: '1rem',
                        letterSpacing: '-0.02em',
                        color: isHovered ? '#e50914' : '#ffffff',
                        cursor: 'pointer',
                        transition: 'color 0.25s ease'
                      }}
                    >
                      {project.title}
                    </h3>

                    {/* Short Description */}
                    <p
                      style={{
                        color: 'var(--text-secondary)',
                        fontSize: '1rem',
                        lineHeight: 1.7,
                        marginBottom: '1.75rem'
                      }}
                    >
                      {project.short_description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                        marginBottom: '2rem'
                      }}
                    >
                      {project.technologies?.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: '0.74rem',
                            color: '#ffffff',
                            backgroundColor: 'rgba(255, 255, 255, 0.06)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            padding: '0.3rem 0.75rem',
                            borderRadius: '6px'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Links Bar */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      flexWrap: 'wrap',
                      paddingTop: '1.5rem',
                      borderTop: '1px solid var(--border-subtle)'
                    }}
                  >
                    {/* Dynamic Case Study Link */}
                    <Link
                      to={`/projects/${project.slug}`}
                      onClick={playClick}
                      className="btn btn-primary interactive-hover"
                      style={{ padding: '0.75rem 1.6rem', fontSize: '0.9rem' }}
                    >
                      <span>Case Study</span>
                      <ArrowUpRight size={16} />
                    </Link>

                    {/* Live Preview */}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        onMouseEnter={playHover}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          color: '#a1a1aa',
                          fontSize: '0.88rem',
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 600,
                          padding: '0.75rem 1.1rem',
                          borderRadius: '100px',
                          border: '1px solid var(--border-subtle)',
                          transition: 'all 0.2s ease'
                        }}
                        className="interactive-hover"
                      >
                        <ExternalLink size={15} />
                        <span>Live Site</span>
                      </a>
                    )}

                    {/* GitHub */}
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={playClick}
                        onMouseEnter={playHover}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.45rem',
                          color: '#a1a1aa',
                          fontSize: '0.88rem',
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 600,
                          padding: '0.75rem 1.1rem',
                          borderRadius: '100px',
                          border: '1px solid var(--border-subtle)',
                          transition: 'all 0.2s ease'
                        }}
                        className="interactive-hover"
                      >
                        <Github size={15} />
                        <span>Code</span>
                      </a>
                    )}
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to View All Projects */}
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <Link
            to="/projects"
            onClick={playClick}
            onMouseEnter={playHover}
            className="btn btn-secondary interactive-hover"
            style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
          >
            <span>Explore All Projects & Archives</span>
            <ArrowUpRight size={18} style={{ color: '#e50914' }} />
          </Link>
        </div>

      </div>
    </section>
  );
}

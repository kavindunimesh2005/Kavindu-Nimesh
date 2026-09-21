import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight, Search, ExternalLink, Github, Filter } from 'lucide-react';
import { api } from '../services/api';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { useSound } from '../hooks/useSound';

export default function AllProjects() {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const { playClick, playHover } = useSound();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    async function load() {
      try {
        const res = await api.getPortfolio();
        if (res.success && res.data) {
          setProjects(res.data.projects || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const categories = ['All', 'E-Commerce', 'Admin Dashboards', 'Custom Web Applications'];

  const filtered = projects.filter(p => {
    const matchesCategory = category === 'All' || p.category?.toLowerCase() === category.toLowerCase();
    const matchesSearch = !search || 
      p.title?.toLowerCase().includes(search.toLowerCase()) ||
      p.short_description?.toLowerCase().includes(search.toLowerCase()) ||
      p.client?.toLowerCase().includes(search.toLowerCase()) ||
      p.technologies?.some(t => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
      <Navbar />

      <main style={{ paddingTop: '120px', paddingBottom: '6rem' }}>
        <div className="container">
          
          {/* Top Breadcrumb */}
          <div style={{ marginBottom: '2rem' }}>
            <Link
              to="/"
              onClick={playClick}
              onMouseEnter={playHover}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                color: '#a1a1aa',
                fontSize: '0.88rem',
                fontFamily: "'Space Grotesk', sans-serif",
                textDecoration: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '100px',
                backgroundColor: 'var(--bg-elevated)',
                border: '1px solid var(--border-subtle)'
              }}
              className="interactive-hover"
            >
              <ArrowLeft size={16} />
              <span>Back to Overview</span>
            </Link>
          </div>

          {/* Title Header */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div className="section-tag">Archive // All Engineered Platforms</div>
            <h1
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.5rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                marginBottom: '1rem'
              }}
            >
              PROJECT <span style={{ color: '#e50914' }}>CATALOG.</span>
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.15rem', maxWidth: '680px' }}>
              Every client platform, e-commerce engine, and custom web application designed and developed by Kavindu Nimesh.
            </p>
          </div>

          {/* Search & Filter Toolbar */}
          <div
            className="allprojects-toolbar"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '2.5rem',
              padding: '1.25rem',
              backgroundColor: 'var(--bg-elevated)',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle)'
            }}
          >
            {/* Search Input */}
            <div style={{ position: 'relative', flex: '1', minWidth: '220px' }}>
              <Search
                size={18}
                style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }}
              />
              <input
                type="text"
                placeholder="Search by title, technology, or client..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 1rem 0.75rem 2.8rem',
                  borderRadius: '10px',
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Category Filter Pills */}
            <div
              className="no-scrollbar allprojects-filter-bar"
              style={{
                display: 'flex',
                gap: '0.45rem',
                maxWidth: '100%',
                overflowX: 'auto'
              }}
            >
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setCategory(cat); playClick(); }}
                  onMouseEnter={playHover}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: '8px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    backgroundColor: category === cat ? '#e50914' : 'var(--bg-card)',
                    color: category === cat ? '#ffffff' : 'var(--text-secondary)',
                    border: category === cat ? '1px solid #e50914' : '1px solid var(--border-subtle)',
                    transition: 'all 0.2s ease',
                    flexShrink: 0
                  }}
                  className="interactive-hover"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          {loading ? (
            <p style={{ textAlign: 'center', color: '#71717a', padding: '4rem' }}>Loading archive...</p>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem 0', color: '#a1a1aa' }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>No projects match your search criteria.</p>
              <button
                onClick={() => { setSearch(''); setCategory('All'); }}
                className="btn btn-secondary"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div
              className="allprojects-grid"
              style={{
                display: 'grid',
                gap: '1.75rem'
              }}
            >
              {filtered.map((p) => (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: 'var(--bg-elevated)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    transition: 'all 0.35s ease'
                  }}
                  className="interactive-hover card-hover"
                >
                  <div
                    onClick={() => { playClick(); navigate(`/projects/${p.slug}`); }}
                    style={{ position: 'relative', aspectRatio: '16 / 10', cursor: 'pointer', overflow: 'hidden' }}
                  >
                    <img
                      src={p.image_url}
                      alt={p.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      loading="lazy"
                    />
                    <div
                      style={{
                        position: 'absolute',
                        top: '1rem',
                        left: '1rem',
                        padding: '0.3rem 0.75rem',
                        borderRadius: '100px',
                        backgroundColor: 'rgba(5, 5, 5, 0.85)',
                        backdropFilter: 'blur(8px)',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.72rem',
                        color: '#ffffff'
                      }}
                    >
                      {p.category}
                    </div>
                  </div>

                  <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.76rem', color: '#71717a', marginBottom: '0.5rem' }}>
                        {p.client} • {p.year}
                      </div>

                      <h3
                        onClick={() => { playClick(); navigate(`/projects/${p.slug}`); }}
                        style={{
                          fontFamily: "'Syne', sans-serif",
                          fontSize: '1.35rem',
                          fontWeight: 800,
                          marginBottom: '0.75rem',
                          cursor: 'pointer'
                        }}
                      >
                        {p.title}
                      </h3>

                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                        {p.short_description}
                      </p>
                    </div>

                    <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Link
                        to={`/projects/${p.slug}`}
                        onClick={playClick}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          color: '#e50914',
                          fontWeight: 700,
                          fontSize: '0.88rem',
                          textDecoration: 'none'
                        }}
                      >
                        Case Study <ArrowUpRight size={15} />
                      </Link>

                      {p.live_url && (
                        <a
                          href={p.live_url}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: '#a1a1aa' }}
                          title="Live Demo"
                        >
                          <ExternalLink size={16} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </main>

      <Footer />

      <style>{`
        .allprojects-grid {
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
        }
        .card-hover:hover {
          border-color: rgba(229, 9, 20, 0.45) !important;
          transform: translateY(-4px);
        }
        @media (max-width: 640px) {
          .allprojects-grid {
            grid-template-columns: 1fr !important;
          }
          .allprojects-toolbar {
            flex-direction: column !important;
            align-items: stretch !important;
            padding: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}

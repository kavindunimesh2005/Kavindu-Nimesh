import React, { useState } from 'react';
import { 
  Atom, FileCode2, Code2, Palette, Layers, Smartphone, 
  Server, Network, Workflow, Binary, KeyRound, Database, 
  FolderTree, Zap, HardDrive, GitBranch, FileCode, ShoppingBag, 
  Gauge, Figma, Sparkles, Boxes, CheckCircle
} from 'lucide-react';
import { useSound } from '../../hooks/useSound';

export default function Skills({ skills }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const { playClick, playHover } = useSound();

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'Tools', 'Design'];

  const getSkillIcon = (name, iconName) => {
    const key = (name || iconName || '').toLowerCase();
    if (key.includes('react')) return <Atom size={24} />;
    if (key.includes('javascript') || key.includes('js')) return <FileCode2 size={24} />;
    if (key.includes('html') || key.includes('semantic')) return <Code2 size={24} />;
    if (key.includes('css') || key.includes('animation')) return <Palette size={24} />;
    if (key.includes('tailwind') || key.includes('bootstrap')) return <Layers size={24} />;
    if (key.includes('mobile') || key.includes('responsive')) return <Smartphone size={24} />;
    if (key.includes('node')) return <Server size={24} />;
    if (key.includes('express')) return <Network size={24} />;
    if (key.includes('api') || key.includes('rest')) return <Workflow size={24} />;
    if (key.includes('php')) return <Binary size={24} />;
    if (key.includes('jwt') || key.includes('auth')) return <KeyRound size={24} />;
    if (key.includes('mysql')) return <Database size={24} />;
    if (key.includes('schema')) return <FolderTree size={24} />;
    if (key.includes('optimization')) return <Zap size={24} />;
    if (key.includes('sqlite')) return <HardDrive size={24} />;
    if (key.includes('git')) return <GitBranch size={24} />;
    if (key.includes('wordpress')) return <FileCode size={24} />;
    if (key.includes('shopify')) return <ShoppingBag size={24} />;
    if (key.includes('vite') || key.includes('webpack')) return <Gauge size={24} />;
    if (key.includes('figma')) return <Figma size={24} />;
    if (key.includes('ui') || key.includes('prototyping')) return <Sparkles size={24} />;
    if (key.includes('design system')) return <Boxes size={24} />;
    return <Code2 size={24} />;
  };

  const filteredSkills = activeCategory === 'All'
    ? skills
    : skills?.filter(s => s.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="skills" className="section" style={{ position: 'relative' }}>
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
            <div className="section-tag">04 // Core Arsenal</div>
            <h2 className="section-title">
              TECHNICAL <span style={{ color: '#e50914' }}>SYSTEMS.</span>
            </h2>
            <p className="section-subtitle">
              Comprehensive modern toolchain cultivated through 3+ years of production engineering, architecture design, and client problem solving.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div
            className="no-scrollbar skills-filter-bar"
            style={{
              display: 'flex',
              gap: '0.5rem',
              backgroundColor: 'var(--bg-elevated)',
              padding: '0.4rem',
              borderRadius: '100px',
              border: '1px solid var(--border-subtle)',
              maxWidth: '100%',
              overflowX: 'auto'
            }}
          >
            {categories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); playClick(); }}
                  onMouseEnter={playHover}
                  style={{
                    padding: '0.45rem 1.1rem',
                    borderRadius: '100px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    color: isSelected ? '#ffffff' : 'var(--text-secondary)',
                    backgroundColor: isSelected ? '#e50914' : 'transparent',
                    boxShadow: isSelected ? '0 0 15px rgba(229, 9, 20, 0.4)' : 'none',
                    transition: 'all 0.25s ease',
                    flexShrink: 0
                  }}
                  className="interactive-hover"
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bento Interactive Cards Grid */}
        <div
          className="skills-bento-grid"
          style={{
            display: 'grid',
            gap: '1.25rem'
          }}
        >
          {filteredSkills?.map((skill) => {
            const isHovered = hoveredSkill === skill.id;
            return (
              <div
                key={skill.id}
                onMouseEnter={() => { setHoveredSkill(skill.id); playHover(); }}
                onMouseLeave={() => setHoveredSkill(null)}
                style={{
                  backgroundColor: isHovered ? 'var(--bg-card-hover)' : 'var(--bg-card)',
                  border: isHovered ? '1px solid #e50914' : '1px solid var(--border-subtle)',
                  borderRadius: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                  transform: isHovered ? 'translateY(-4px)' : 'none',
                  boxShadow: isHovered ? '0 15px 30px -10px rgba(229, 9, 20, 0.3)' : 'none',
                  cursor: 'default'
                }}
                className="interactive-hover skill-bento-card"
              >
                <div>
                  {/* Top row: Icon and Category Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        backgroundColor: isHovered ? '#e50914' : 'rgba(255, 255, 255, 0.05)',
                        color: isHovered ? '#ffffff' : '#e50914',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.25s ease',
                        boxShadow: isHovered ? '0 0 15px rgba(229, 9, 20, 0.5)' : 'none'
                      }}
                    >
                      {getSkillIcon(skill.name, skill.icon)}
                    </div>

                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        color: '#71717a',
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em'
                      }}
                    >
                      {skill.category}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h4
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: 'var(--text-primary)',
                      marginBottom: '0.5rem'
                    }}
                  >
                    {skill.name}
                  </h4>
                </div>

                {/* Bottom Row: Proficiency Indicator & Level Tag */}
                <div style={{ marginTop: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.74rem', color: '#a1a1aa' }}>
                      Proficiency
                    </span>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', fontWeight: 700, color: '#e50914' }}>
                      {skill.proficiency || 90}%
                    </span>
                  </div>

                  {/* Red Laser Progress Line */}
                  <div
                    style={{
                      width: '100%',
                      height: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      borderRadius: '4px',
                      overflow: 'hidden'
                    }}
                  >
                    <div
                      style={{
                        width: `${skill.proficiency || 90}%`,
                        height: '100%',
                        backgroundColor: '#e50914',
                        borderRadius: '4px',
                        boxShadow: '0 0 8px #e50914',
                        transition: 'width 0.4s ease-out'
                      }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <style>{`
        .skills-bento-grid {
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        }
        .skill-bento-card {
          padding: 1.75rem;
        }
        @media (max-width: 640px) {
          .skills-bento-grid {
            grid-template-columns: 1fr !important;
          }
          .skill-bento-card {
            padding: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}

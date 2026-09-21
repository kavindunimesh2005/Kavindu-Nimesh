import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FolderKanban, Wrench, Star, MessageSquare, Briefcase, 
  ArrowUpRight, Clock, CheckCircle, Mail, ExternalLink, Plus
} from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { playClick, playHover } = useSound();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await api.getDashboardData();
      if (res.success && res.data) {
        setData(res.data);
      }
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id, currentStatus) => {
    playClick();
    try {
      await api.markMessageRead(id, !currentStatus);
      loadDashboard();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div style={{ color: '#a1a1aa' }}>Loading CMS metrics...</div>;
  }

  const stats = data?.stats || {};

  const statCards = [
    { title: 'Total Projects', value: stats.totalProjects || 0, link: '/admin/projects', icon: <FolderKanban size={22} color="#e50914" /> },
    { title: 'Total Services', value: stats.totalServices || 0, link: '/admin/services', icon: <Wrench size={22} color="#3b82f6" /> },
    { title: 'Client Reviews', value: stats.totalTestimonials || 0, link: '/admin/testimonials', icon: <Star size={22} color="#eab308" /> },
    { title: 'Inquiries', value: stats.totalMessages || 0, unread: stats.unreadMessages, link: '/admin/messages', icon: <MessageSquare size={22} color="#10b981" /> },
    { title: 'Career Entries', value: stats.totalExperience || 0, link: '/admin/experience', icon: <Briefcase size={22} color="#8b5cf6" /> },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '2rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.25rem' }}>
            Operations Command Center
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.9rem' }}>
            Managing live portfolio data for Kavindu Nimesh & Aura Digital Developer Sri Lanka.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <Link
            to="/admin/projects"
            onClick={playClick}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
          >
            <Plus size={16} />
            <span>Add New Project</span>
          </Link>

          <Link
            to="/"
            target="_blank"
            className="btn btn-secondary"
            style={{ padding: '0.65rem 1.25rem', fontSize: '0.85rem' }}
          >
            <span>Live Website</span>
            <ExternalLink size={14} />
          </Link>
        </div>
      </div>

      {/* 5 Core Metric Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          marginBottom: '3rem'
        }}
      >
        {statCards.map((sc) => (
          <Link
            key={sc.title}
            to={sc.link}
            onClick={playClick}
            onMouseEnter={playHover}
            style={{
              backgroundColor: '#121216',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.5rem',
              textDecoration: 'none',
              transition: 'all 0.25s ease',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
            className="admin-stat-card"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
              <span style={{ color: '#71717a', fontSize: '0.82rem', fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>
                {sc.title}
              </span>
              <div style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.04)' }}>
                {sc.icon}
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '2.2rem', fontWeight: 900, color: '#ffffff', lineHeight: 1 }}>
                {sc.value}
              </div>

              {sc.unread > 0 && (
                <span
                  style={{
                    padding: '0.2rem 0.55rem',
                    borderRadius: '100px',
                    backgroundColor: '#e50914',
                    color: '#ffffff',
                    fontSize: '0.72rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700
                  }}
                >
                  {sc.unread} new
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* 2-Column Split: Recent Messages & Recent Projects */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '2rem' }}>
        
        {/* Recent Messages Card */}
        <div
          style={{
            backgroundColor: '#121216',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '1.75rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.25rem', fontWeight: 800 }}>
              Recent Client Messages
            </h2>
            <Link
              to="/admin/messages"
              style={{ fontSize: '0.82rem', color: '#e50914', fontWeight: 600, textDecoration: 'none' }}
            >
              View All →
            </Link>
          </div>

          {data?.recentMessages?.length === 0 ? (
            <p style={{ color: '#71717a', fontSize: '0.9rem' }}>No messages in inbox yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {data?.recentMessages?.map((msg) => (
                <div
                  key={msg.id}
                  style={{
                    padding: '1rem',
                    borderRadius: '12px',
                    backgroundColor: msg.is_read ? 'rgba(255, 255, 255, 0.02)' : 'rgba(229, 9, 20, 0.08)',
                    border: msg.is_read ? '1px solid rgba(255, 255, 255, 0.06)' : '1px solid rgba(229, 9, 20, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.4rem'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#ffffff' }}>{msg.name}</span>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p style={{ color: '#a1a1aa', fontSize: '0.84rem', margin: '0.2rem 0', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {msg.message}
                  </p>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.25rem' }}>
                    <span style={{ fontSize: '0.75rem', color: '#e50914', fontFamily: "'JetBrains Mono', monospace" }}>
                      {msg.project_type} • {msg.budget}
                    </span>

                    <button
                      onClick={() => handleMarkRead(msg.id, msg.is_read)}
                      style={{ fontSize: '0.75rem', color: '#71717a', textDecoration: 'underline' }}
                    >
                      {msg.is_read ? 'Mark Unread' : 'Mark Read'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Projects Card */}
        <div
          style={{
            backgroundColor: '#121216',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '18px',
            padding: '1.75rem'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.25rem', fontWeight: 800 }}>
              Active Projects
            </h2>
            <Link
              to="/admin/projects"
              style={{ fontSize: '0.82rem', color: '#e50914', fontWeight: 600, textDecoration: 'none' }}
            >
              Manage Projects →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {data?.recentProjects?.map((proj) => (
              <div
                key={proj.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <img
                  src={proj.image_url}
                  alt={proj.title}
                  style={{ width: '56px', height: '42px', objectFit: 'cover', borderRadius: '8px' }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {proj.title}
                  </h4>
                  <div style={{ fontSize: '0.75rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>
                    {proj.category} • {proj.year}
                  </div>
                </div>

                <Link
                  to={`/projects/${proj.slug}`}
                  target="_blank"
                  style={{ color: '#71717a', padding: '0.4rem' }}
                  title="View Page"
                >
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>

      </div>

      <style>{`
        .admin-stat-card:hover {
          border-color: rgba(229, 9, 20, 0.4) !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

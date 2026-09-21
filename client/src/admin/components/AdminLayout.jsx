import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Outlet, Navigate } from 'react-router-dom';
import { 
  LayoutDashboard, FolderKanban, Wrench, Layers, 
  Briefcase, MessageSquare, Star, User, Settings, 
  LogOut, ExternalLink, Menu, X, Shield, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useSound } from '../../hooks/useSound';

export default function AdminLayout() {
  const { admin, logout, isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { playClick } = useSound();
  const [mobileOpen, setMobileOpen] = useState(false);

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#09090b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
        <p>Verifying secure session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const menuItems = [
    { label: 'Dashboard', path: '/admin', icon: <LayoutDashboard size={18} /> },
    { label: 'Projects', path: '/admin/projects', icon: <FolderKanban size={18} /> },
    { label: 'Services', path: '/admin/services', icon: <Wrench size={18} /> },
    { label: 'Skills', path: '/admin/skills', icon: <Layers size={18} /> },
    { label: 'Experience', path: '/admin/experience', icon: <Briefcase size={18} /> },
    { label: 'Testimonials', path: '/admin/testimonials', icon: <Star size={18} /> },
    { label: 'About & Stats', path: '/admin/about', icon: <User size={18} /> },
    { label: 'Messages', path: '/admin/messages', icon: <MessageSquare size={18} /> },
    { label: 'Site Settings', path: '/admin/settings', icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    playClick();
    logout();
    navigate('/admin/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#09090b', color: '#f4f4f5' }}>
      
      {/* Sidebar Desktop */}
      <aside
        style={{
          width: '260px',
          backgroundColor: '#0d0d10',
          borderRight: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          height: '100vh',
          zIndex: 100
        }}
        className="admin-sidebar"
      >
        <div>
          {/* Brand Header */}
          <div style={{ padding: '1.75rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: '#e50914',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 900,
                  fontSize: '15px'
                }}
              >
                KN
              </div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '0.95rem', color: '#ffffff' }}>
                  Aura Studio CMS
                </div>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.65rem', color: '#e50914' }}>
                  ADMIN CONTROL
                </div>
              </div>
            </div>
          </div>

          {/* Nav Items */}
          <nav style={{ padding: '1rem 0.75rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={playClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    padding: '0.7rem 0.85rem',
                    borderRadius: '8px',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.88rem',
                    fontWeight: 600,
                    textDecoration: 'none',
                    color: isActive ? '#ffffff' : '#a1a1aa',
                    backgroundColor: isActive ? 'rgba(229, 9, 20, 0.15)' : 'transparent',
                    border: isActive ? '1px solid rgba(229, 9, 20, 0.3)' : '1px solid transparent',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <span style={{ color: isActive ? '#e50914' : '#71717a' }}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile & Actions */}
        <div style={{ padding: '1.25rem 1rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ marginBottom: '1rem', padding: '0.5rem 0.75rem' }}>
            <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff' }}>{admin?.name || 'Kavindu Nimesh'}</div>
            <div style={{ fontSize: '0.72rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>{admin?.email}</div>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link
              to="/"
              target="_blank"
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.35rem',
                padding: '0.55rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                fontSize: '0.78rem',
                fontWeight: 600,
                textDecoration: 'none'
              }}
              title="Preview Live Website"
            >
              <span>View Site</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              style={{
                padding: '0.55rem 0.75rem',
                borderRadius: '8px',
                backgroundColor: 'rgba(229, 9, 20, 0.1)',
                border: '1px solid rgba(229, 9, 20, 0.25)',
                color: '#e50914',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
              title="Log Out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Admin Content Body */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        
        {/* Top Header Bar */}
        <header
          style={{
            height: '64px',
            backgroundColor: '#0d0d10',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 2rem',
            position: 'sticky',
            top: 0,
            zIndex: 90
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ display: 'none', color: '#ffffff' }}
              className="admin-mobile-btn"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600, color: '#a1a1aa' }}>
              Portal // <span style={{ color: '#ffffff' }}>Management System</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.3rem 0.75rem',
                borderRadius: '100px',
                backgroundColor: 'rgba(229, 9, 20, 0.1)',
                border: '1px solid rgba(229, 9, 20, 0.25)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: '#e50914'
              }}
            >
              <Shield size={12} /> SECURE 2026
            </span>
          </div>
        </header>

        {/* Child Route Outlet */}
        <main style={{ flex: 1, padding: '2rem', overflowY: 'auto' }}>
          <Outlet />
        </main>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .admin-sidebar {
            display: none !important;
          }
          .admin-mobile-btn {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}

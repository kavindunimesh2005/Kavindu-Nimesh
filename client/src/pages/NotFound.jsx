import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

export default function NotFound() {
  return (
    <div style={{ backgroundColor: '#050505', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <main
        style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '140px 2rem 80px'
        }}
      >
        <div style={{ maxWidth: '600px' }}>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 'clamp(5rem, 15vw, 9rem)',
              fontWeight: 900,
              color: '#e50914',
              lineHeight: 1,
              letterSpacing: '-0.04em',
              marginBottom: '1rem',
              textShadow: '0 0 40px rgba(229, 9, 20, 0.4)'
            }}
          >
            404
          </div>

          <h2
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
              fontWeight: 800,
              color: '#ffffff',
              marginBottom: '1rem'
            }}
          >
            PAGE OUT OF BOUNDS.
          </h2>

          <p style={{ color: '#a1a1aa', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            The digital coordinates you requested do not exist in this sector or have been decommissioned.
          </p>

          <Link to="/" className="btn btn-primary interactive-hover">
            <ArrowLeft size={16} />
            <span>Return to Orbit</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

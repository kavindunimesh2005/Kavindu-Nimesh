import React, { useEffect, useState } from 'react';
import { Save, UploadCloud, CheckCircle2, User, Sparkles } from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function AdminAbout() {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    company: '',
    bio: '',
    secondary_bio: '',
    years_experience: 3,
    projects_count: 25,
    clients_count: 20,
    tech_count: 18,
    portrait_url: '',
    resume_url: '',
    availability: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { playClick } = useSound();

  useEffect(() => {
    loadAbout();
  }, []);

  const loadAbout = async () => {
    try {
      const res = await api.getAbout();
      if (res.success && res.data) {
        setFormData(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePortraitUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.data?.path) {
        setFormData(prev => ({ ...prev, portrait_url: res.data.path }));
      }
    } catch (err) {
      alert(err.message || 'Image upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setSaving(true);
    setSuccess(false);

    try {
      const res = await api.updateAbout(formData);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      }
    } catch (err) {
      alert(err.message || 'Failed to update about data');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ color: '#a1a1aa' }}>Loading biography and stats...</div>;
  }

  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.85rem', fontWeight: 800 }}>
          About & Live Statistics Management
        </h1>
        <p style={{ color: '#71717a', fontSize: '0.88rem' }}>
          Update biography narrative, portrait photo, and live counter numbers without touching code.
        </p>
      </div>

      {success && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '10px',
            backgroundColor: 'rgba(16, 185, 129, 0.15)',
            border: '1px solid #10b981',
            color: '#ffffff',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            marginBottom: '1.5rem'
          }}
        >
          <CheckCircle2 size={18} style={{ color: '#10b981' }} />
          <span>Profile and live statistics updated successfully on the public website!</span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: '#121216',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '18px',
          padding: '2.5rem'
        }}
      >
        {/* Basic Identity */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
              Professional Title *
            </label>
            <input
              type="text"
              required
              value={formData.title || ''}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', marginBottom: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
              Company / Digital Studio *
            </label>
            <input
              type="text"
              required
              value={formData.company || ''}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
              Availability Status Badge
            </label>
            <input
              type="text"
              value={formData.availability || ''}
              onChange={(e) => setFormData({ ...formData, availability: e.target.value })}
              placeholder="AVAILABLE FOR SELECT CLIENT PROJECTS • 2026"
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
            />
          </div>
        </div>

        {/* Live Dynamic Statistics Grid */}
        <div style={{ padding: '1.5rem', borderRadius: '12px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '1.5rem' }}>
          <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.92rem', fontWeight: 700, color: '#e50914', marginBottom: '1rem' }}>
            LIVE NUMERICAL STATISTICS (SHOWN ON PUBLIC ABOUT SECTION)
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>
                Years Experience (e.g. 3)
              </label>
              <input
                type="number"
                value={formData.years_experience ?? 3}
                onChange={(e) => setFormData({ ...formData, years_experience: parseInt(e.target.value, 10) })}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>
                Projects Count (e.g. 25)
              </label>
              <input
                type="number"
                value={formData.projects_count ?? 25}
                onChange={(e) => setFormData({ ...formData, projects_count: parseInt(e.target.value, 10) })}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>
                Technologies (e.g. 18)
              </label>
              <input
                type="number"
                value={formData.tech_count ?? 18}
                onChange={(e) => setFormData({ ...formData, tech_count: parseInt(e.target.value, 10) })}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>
                Happy Clients (e.g. 20)
              </label>
              <input
                type="number"
                value={formData.clients_count ?? 20}
                onChange={(e) => setFormData({ ...formData, clients_count: parseInt(e.target.value, 10) })}
                style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
              />
            </div>
          </div>
        </div>

        {/* Portrait & Resume URLs */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
            Portrait Image (URL or Upload)
          </label>
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <input
              type="text"
              value={formData.portrait_url || ''}
              onChange={(e) => setFormData({ ...formData, portrait_url: e.target.value })}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
            />
            <label style={{ padding: '0.75rem 1.1rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fff' }}>
              <UploadCloud size={16} />
              <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
              <input type="file" accept="image/*" onChange={handlePortraitUpload} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
            Resume / CV File URL
          </label>
          <input
            type="text"
            value={formData.resume_url || ''}
            onChange={(e) => setFormData({ ...formData, resume_url: e.target.value })}
            placeholder="e.g. /uploads/Kavindu_Nimesh_CV.pdf or Google Drive link"
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
          />
        </div>

        {/* Bio Paragraphs */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
            Primary Biography Paragraph *
          </label>
          <textarea
            rows="4"
            required
            value={formData.bio || ''}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff', lineHeight: 1.6 }}
          />
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
            Secondary Capabilities & Methodology Paragraph
          </label>
          <textarea
            rows="3"
            value={formData.secondary_bio || ''}
            onChange={(e) => setFormData({ ...formData, secondary_bio: e.target.value })}
            style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff', lineHeight: 1.6 }}
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="btn btn-primary"
          style={{ padding: '0.85rem 2rem', fontSize: '0.95rem' }}
        >
          <Save size={16} />
          <span>{saving ? 'Saving Changes...' : 'Save Profile & Statistics'}</span>
        </button>
      </form>
    </div>
  );
}

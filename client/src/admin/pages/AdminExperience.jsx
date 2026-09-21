import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Briefcase } from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function AdminExperience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState(null);
  const { playClick } = useSound();

  const initialForm = {
    company: '',
    position: '',
    period: '2024 — Present',
    description: '',
    technologiesText: '',
    display_order: 1
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    try {
      const res = await api.getAdminExperiences();
      if (res.success && res.data) {
        setExperiences(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    playClick();
    setEditingExp(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEdit = (exp) => {
    playClick();
    setEditingExp(exp);
    setFormData({
      company: exp.company || '',
      position: exp.position || '',
      period: exp.period || '',
      description: exp.description || '',
      technologiesText: Array.isArray(exp.technologies) ? exp.technologies.join(', ') : '',
      display_order: exp.display_order ?? 1
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    const payload = {
      ...formData,
      technologies: formData.technologiesText.split(',').map(t => t.trim()).filter(Boolean)
    };

    try {
      if (editingExp) {
        await api.updateExperience(editingExp.id, payload);
      } else {
        await api.createExperience(payload);
      }
      setModalOpen(false);
      loadExperience();
    } catch (err) {
      alert(err.message || 'Error saving experience');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this career entry?')) return;
    playClick();
    try {
      await api.deleteExperience(id);
      loadExperience();
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.85rem', fontWeight: 800 }}>
            Career & Experience Timeline
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.88rem' }}>
            Manage timeline entries, roles, organizations, and tech stacks.
          </p>
        </div>

        <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}>
          <Plus size={16} />
          <span>Add Career Entry</span>
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {experiences.map((exp) => (
          <div
            key={exp.id}
            style={{
              backgroundColor: '#121216',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.75rem',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '1.5rem'
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.25rem', fontWeight: 800, color: '#ffffff' }}>
                  {exp.position}
                </h3>
                <span style={{ color: '#71717a' }}>•</span>
                <span style={{ color: '#e50914', fontWeight: 600, fontSize: '0.92rem' }}>{exp.company}</span>
              </div>

              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.78rem', color: '#71717a', marginBottom: '0.85rem' }}>
                {exp.period}
              </div>

              <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem', maxWidth: '750px' }}>
                {exp.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {exp.technologies?.map((t, idx) => (
                  <span key={idx} style={{ fontSize: '0.72rem', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.55rem', borderRadius: '4px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => openEdit(exp)}
                style={{ padding: '0.45rem 0.85rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.06)', color: '#ffffff', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Edit2 size={13} /> Edit
              </button>
              <button
                onClick={() => handleDelete(exp.id)}
                style={{ padding: '0.45rem 0.85rem', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#121216', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '18px', width: '100%', maxWidth: '580px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800 }}>
                {editingExp ? 'Edit Experience' : 'Add Experience'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ color: '#71717a' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Position / Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Company / Client *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Period *</label>
                <input
                  type="text"
                  required
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  placeholder="2024 — Present"
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Description *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Technologies (Comma separated)</label>
                <input
                  type="text"
                  value={formData.technologiesText}
                  onChange={(e) => setFormData({ ...formData, technologiesText: e.target.value })}
                  placeholder="React.js, Node.js, Express"
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.7rem 1.25rem', color: '#a1a1aa' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', borderRadius: '8px' }}>Save Entry</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

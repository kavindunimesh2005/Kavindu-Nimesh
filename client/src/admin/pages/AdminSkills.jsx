import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Layers, CheckCircle2 } from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function AdminSkills() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const { playClick } = useSound();

  const initialForm = {
    name: '',
    category: 'Frontend',
    icon: 'Code',
    proficiency: 90,
    display_order: 1,
    is_active: 1
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadSkills();
  }, []);

  const loadSkills = async () => {
    try {
      const res = await api.getAdminSkills();
      if (res.success && res.data) {
        setSkills(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    playClick();
    setEditingSkill(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEdit = (sk) => {
    playClick();
    setEditingSkill(sk);
    setFormData({
      name: sk.name || '',
      category: sk.category || 'Frontend',
      icon: sk.icon || 'Code',
      proficiency: sk.proficiency ?? 90,
      display_order: sk.display_order ?? 1,
      is_active: sk.is_active ? 1 : 0
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    try {
      if (editingSkill) {
        await api.updateSkill(editingSkill.id, formData);
      } else {
        await api.createSkill(formData);
      }
      setModalOpen(false);
      loadSkills();
    } catch (err) {
      alert(err.message || 'Error saving skill');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this skill?')) return;
    playClick();
    try {
      await api.deleteSkill(id);
      loadSkills();
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  const categories = ['Frontend', 'Backend', 'Database', 'Tools', 'Design'];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.85rem', fontWeight: 800 }}>
            Skills & Technology Arsenal
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.88rem' }}>
            Manage technologies, categories, and proficiency levels displayed on the portfolio.
          </p>
        </div>

        <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}>
          <Plus size={16} />
          <span>Add New Skill</span>
        </button>
      </div>

      {categories.map((cat) => {
        const catSkills = skills.filter(s => s.category?.toLowerCase() === cat.toLowerCase());
        if (catSkills.length === 0) return null;

        return (
          <div key={cat} style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.2rem', fontWeight: 700, color: '#e50914', marginBottom: '1rem' }}>
              {cat}
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {catSkills.map((s) => (
                <div
                  key={s.id}
                  style={{
                    backgroundColor: '#121216',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>{s.name}</span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '0.75rem', color: '#e50914', fontWeight: 700 }}>
                        {s.proficiency}%
                      </span>
                    </div>

                    <div style={{ width: '100%', height: '4px', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden', marginBottom: '1rem' }}>
                      <div style={{ width: `${s.proficiency}%`, height: '100%', backgroundColor: '#e50914' }} />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.75rem' }}>
                    <button onClick={() => openEdit(s)} style={{ padding: '0.35rem 0.6rem', color: '#a1a1aa' }}><Edit2 size={13} /></button>
                    <button onClick={() => handleDelete(s.id)} style={{ padding: '0.35rem 0.6rem', color: '#ef4444' }}><Trash2 size={13} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#121216', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '18px', width: '100%', maxWidth: '480px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800 }}>
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ color: '#71717a' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Skill Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Next.js"
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                />
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                >
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                  <label style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Proficiency (%)</label>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#e50914', fontWeight: 700 }}>{formData.proficiency}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={formData.proficiency}
                  onChange={(e) => setFormData({ ...formData, proficiency: parseInt(e.target.value, 10) })}
                  style={{ width: '100%', accentColor: '#e50914' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.7rem 1.25rem', color: '#a1a1aa' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', borderRadius: '8px' }}>Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

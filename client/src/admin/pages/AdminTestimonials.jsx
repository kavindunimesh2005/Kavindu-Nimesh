import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Star, UploadCloud } from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const { playClick } = useSound();

  const initialForm = {
    client_name: '',
    position: '',
    company: '',
    avatar_url: '',
    rating: 5,
    quote: '',
    is_active: 1,
    display_order: 1
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const res = await api.getAdminTestimonials();
      if (res.success && res.data) {
        setTestimonials(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    playClick();
    setEditingItem(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEdit = (t) => {
    playClick();
    setEditingItem(t);
    setFormData({
      client_name: t.client_name || '',
      position: t.position || '',
      company: t.company || '',
      avatar_url: t.avatar_url || '',
      rating: t.rating ?? 5,
      quote: t.quote || '',
      is_active: t.is_active ? 1 : 0,
      display_order: t.display_order ?? 1
    });
    setModalOpen(true);
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await api.uploadImage(file);
      const newPath = res.data?.path || res.url;
      if (res.success && newPath) {
        setFormData(prev => ({ ...prev, avatar_url: newPath }));
      }
    } catch (err) {
      alert(err.message || 'Avatar upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    try {
      if (editingItem) {
        await api.updateTestimonial(editingItem.id, formData);
      } else {
        await api.createTestimonial(formData);
      }
      setModalOpen(false);
      loadTestimonials();
    } catch (err) {
      alert(err.message || 'Error saving testimonial');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this client testimonial?')) return;
    playClick();
    try {
      await api.deleteTestimonial(id);
      loadTestimonials();
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.85rem', fontWeight: 800 }}>
            Testimonials & Client Endorsements
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.88rem' }}>
            Manage client quotes, ratings, and executive profiles.
          </p>
        </div>

        <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}>
          <Plus size={16} />
          <span>Add Testimonial</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {testimonials.map((t) => (
          <div
            key={t.id}
            style={{
              backgroundColor: '#121216',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              padding: '1.75rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginBottom: '1.25rem' }}>
                <img
                  src={t.avatar_url || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'}
                  alt=""
                  style={{ width: '48px', height: '48px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <h4 style={{ fontWeight: 700, color: '#ffffff', fontSize: '1rem' }}>{t.client_name}</h4>
                  <div style={{ fontSize: '0.78rem', color: '#71717a' }}>{t.position} — {t.company}</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill={i < (t.rating || 5) ? '#e50914' : 'none'} color={i < (t.rating || 5) ? '#e50914' : '#3f3f46'} />
                ))}
              </div>

              <p style={{ color: '#a1a1aa', fontSize: '0.88rem', fontStyle: 'italic', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                "{t.quote}"
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: '0.85rem' }}>
              <button
                onClick={() => openEdit(t)}
                style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.05)', color: '#ffffff', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <Edit2 size={13} /> Edit
              </button>
              <button
                onClick={() => handleDelete(t.id)}
                style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <Trash2 size={13} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1.5rem' }}>
          <div style={{ backgroundColor: '#121216', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '18px', width: '100%', maxWidth: '540px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.4rem', fontWeight: 800 }}>
                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ color: '#71717a' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Client Name *</label>
                <input
                  type="text"
                  required
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Position</label>
                  <input
                    type="text"
                    value={formData.position}
                    onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Company</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>
              </div>

              {/* Avatar Upload / URL */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Client Photo Avatar</label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.avatar_url}
                    onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                    placeholder="URL or Upload"
                    style={{ flex: 1, padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                  <label style={{ padding: '0.7rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#fff' }}>
                    <UploadCloud size={15} />
                    <span>{uploadingImage ? '...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleAvatarUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Rating (1 - 5 Stars)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value, 10) })}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Client Quote / Review *</label>
                <textarea
                  rows="3"
                  required
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button type="button" onClick={() => setModalOpen(false)} style={{ padding: '0.7rem 1.25rem', color: '#a1a1aa' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', borderRadius: '8px' }}>Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

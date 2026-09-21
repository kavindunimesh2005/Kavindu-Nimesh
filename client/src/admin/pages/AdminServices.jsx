import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, X, Wrench } from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const { playClick } = useSound();

  const initialForm = {
    service_number: '01',
    title: '',
    icon: 'Globe',
    description: '',
    technologiesText: '',
    display_order: 1,
    is_active: 1
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const res = await api.getAdminServices();
      if (res.success && res.data) {
        setServices(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAdd = () => {
    playClick();
    setEditingService(null);
    setFormData({ ...initialForm, service_number: String(services.length + 1).padStart(2, '0') });
    setModalOpen(true);
  };

  const openEdit = (s) => {
    playClick();
    setEditingService(s);
    setFormData({
      service_number: s.service_number || '',
      title: s.title || '',
      icon: s.icon || 'Globe',
      description: s.description || '',
      technologiesText: Array.isArray(s.technologies) ? s.technologies.join(', ') : '',
      display_order: s.display_order ?? 1,
      is_active: s.is_active ? 1 : 0
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
      if (editingService) {
        await api.updateService(editingService.id, payload);
      } else {
        await api.createService(payload);
      }
      setModalOpen(false);
      loadServices();
    } catch (err) {
      alert(err.message || 'Error saving service');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return;
    playClick();
    try {
      await api.deleteService(id);
      loadServices();
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.85rem', fontWeight: 800 }}>
            Services Management
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.88rem' }}>
            Configure and edit client capabilities, service numbers, and tech offerings.
          </p>
        </div>

        <button onClick={openAdd} className="btn btn-primary" style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}>
          <Plus size={16} />
          <span>Add New Service</span>
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem' }}>
        {services.map((s) => (
          <div
            key={s.id}
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
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: '#e50914', fontWeight: 700, fontSize: '1rem' }}>
                  {s.service_number}
                </span>
                <span style={{ fontSize: '0.75rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>
                  Icon: {s.icon}
                </span>
              </div>

              <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.75rem' }}>
                {s.title}
              </h3>

              <p style={{ color: '#a1a1aa', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                {s.description}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.5rem' }}>
                {s.technologies?.map((t, idx) => (
                  <span key={idx} style={{ fontSize: '0.7rem', color: '#ffffff', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', paddingTop: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
              <button
                onClick={() => openEdit(s)}
                style={{ padding: '0.45rem 0.85rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.06)', color: '#ffffff', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Edit2 size={13} /> Edit
              </button>
              <button
                onClick={() => handleDelete(s.id)}
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
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ color: '#71717a' }}><X size={20} /></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Number</label>
                  <input
                    type="text"
                    value={formData.service_number}
                    onChange={(e) => setFormData({ ...formData, service_number: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', color: '#a1a1aa', marginBottom: '0.3rem' }}>Icon Name</label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                >
                  <option value="Globe">Globe (Website Development)</option>
                  <option value="ShoppingBag">ShoppingBag (E-Commerce)</option>
                  <option value="Cpu">Cpu (Custom Web App)</option>
                  <option value="LayoutDashboard">LayoutDashboard (Admin Dashboard)</option>
                  <option value="Palette">Palette (UI/UX)</option>
                  <option value="ShieldCheck">ShieldCheck (Maintenance)</option>
                </select>
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
                <button type="submit" className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', borderRadius: '8px' }}>
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

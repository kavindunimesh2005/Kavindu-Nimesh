import React, { useEffect, useState } from 'react';
import { 
  Plus, Edit2, Trash2, ExternalLink, Image, 
  Check, X, Search, Eye, EyeOff, Star, UploadCloud 
} from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [search, setSearch] = useState('');
  const { playClick } = useSound();

  const initialForm = {
    title: '',
    slug: '',
    category: 'E-Commerce',
    client: '',
    industry: '',
    year: new Date().getFullYear().toString(),
    timeline: '6 Weeks',
    short_description: '',
    full_description: '',
    challenge: '',
    solution: '',
    featuresText: '',
    technologiesText: '',
    live_url: '',
    github_url: '',
    image_url: '',
    results: '',
    client_feedback: '',
    is_featured: 1,
    is_published: 1,
    display_order: 0
  };

  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const res = await api.getAdminProjects();
      if (res.success && res.data) {
        setProjects(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    playClick();
    setEditingProject(null);
    setFormData(initialForm);
    setModalOpen(true);
  };

  const openEditModal = (project) => {
    playClick();
    setEditingProject(project);
    setFormData({
      title: project.title || '',
      slug: project.slug || '',
      category: project.category || 'E-Commerce',
      client: project.client || '',
      industry: project.industry || '',
      year: project.year || '',
      timeline: project.timeline || '',
      short_description: project.short_description || '',
      full_description: project.full_description || '',
      challenge: project.challenge || '',
      solution: project.solution || '',
      featuresText: Array.isArray(project.features) ? project.features.join('\n') : '',
      technologiesText: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
      live_url: project.live_url || '',
      github_url: project.github_url || '',
      image_url: project.image_url || '',
      results: project.results || '',
      client_feedback: project.client_feedback || '',
      is_featured: project.is_featured ? 1 : 0,
      is_published: project.is_published ? 1 : 0,
      display_order: project.display_order ?? 0
    });
    setModalOpen(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingImage(true);
    try {
      const res = await api.uploadImage(file);
      if (res.success && res.data?.path) {
        setFormData(prev => ({ ...prev, image_url: res.data.path }));
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

    const payload = {
      ...formData,
      features: formData.featuresText.split('\n').map(s => s.trim()).filter(Boolean),
      technologies: formData.technologiesText.split(',').map(s => s.trim()).filter(Boolean)
    };

    try {
      if (editingProject) {
        await api.updateProject(editingProject.id, payload);
      } else {
        await api.createProject(payload);
      }
      setModalOpen(false);
      loadProjects();
    } catch (err) {
      alert(err.message || 'Operation failed');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    playClick();
    try {
      await api.deleteProject(id);
      loadProjects();
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  const handleTogglePublish = async (project) => {
    playClick();
    try {
      await api.updateProject(project.id, { is_published: project.is_published ? 0 : 1 });
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleFeatured = async (project) => {
    playClick();
    try {
      await api.updateProject(project.id, { is_featured: project.is_featured ? 0 : 1 });
      loadProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = projects.filter(p => 
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.category?.toLowerCase().includes(search.toLowerCase()) ||
    p.client?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Action Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.85rem', fontWeight: 800 }}>
            Projects & Case Studies Manager
          </h1>
          <p style={{ color: '#71717a', fontSize: '0.88rem' }}>
            Full control over portfolio showcase entries, media, and case study metrics.
          </p>
        </div>

        <button onClick={openAddModal} className="btn btn-primary" style={{ padding: '0.65rem 1.35rem', fontSize: '0.88rem' }}>
          <Plus size={16} />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1.5rem', maxWidth: '380px', position: 'relative' }}>
        <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#71717a' }} />
        <input
          type="text"
          placeholder="Filter projects..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: '100%',
            padding: '0.65rem 1rem 0.65rem 2.5rem',
            borderRadius: '8px',
            backgroundColor: '#121216',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#ffffff',
            fontSize: '0.88rem',
            outline: 'none'
          }}
        />
      </div>

      {/* Projects Table List */}
      <div
        style={{
          backgroundColor: '#121216',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          overflow: 'hidden'
        }}
      >
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
            <thead>
              <tr style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', color: '#a1a1aa' }}>
                <th style={{ padding: '1rem 1.25rem' }}>Project</th>
                <th style={{ padding: '1rem' }}>Category</th>
                <th style={{ padding: '1rem' }}>Client</th>
                <th style={{ padding: '1rem' }}>Year</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Featured</th>
                <th style={{ padding: '1rem', textAlign: 'center' }}>Status</th>
                <th style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'background-color 0.2s ease'
                  }}
                  className="table-row"
                >
                  <td style={{ padding: '1rem 1.25rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <img
                        src={p.image_url}
                        alt=""
                        style={{ width: '48px', height: '36px', objectFit: 'cover', borderRadius: '6px' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: '#ffffff' }}>{p.title}</div>
                        <div style={{ fontSize: '0.75rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>/{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '1rem', color: '#a1a1aa' }}>{p.category}</td>
                  <td style={{ padding: '1rem', color: '#ffffff' }}>{p.client}</td>
                  <td style={{ padding: '1rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>{p.year}</td>

                  {/* Featured Toggle */}
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleToggleFeatured(p)}
                      style={{
                        color: p.is_featured ? '#e50914' : '#3f3f46',
                        padding: '0.25rem'
                      }}
                      title={p.is_featured ? 'Featured on home' : 'Standard project'}
                    >
                      <Star size={18} fill={p.is_featured ? '#e50914' : 'none'} />
                    </button>
                  </td>

                  {/* Published Toggle */}
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <button
                      onClick={() => handleTogglePublish(p)}
                      style={{
                        padding: '0.25rem 0.6rem',
                        borderRadius: '100px',
                        fontSize: '0.72rem',
                        fontFamily: "'JetBrains Mono', monospace",
                        fontWeight: 700,
                        backgroundColor: p.is_published ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: p.is_published ? '#10b981' : '#ef4444',
                        border: `1px solid ${p.is_published ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
                      }}
                    >
                      {p.is_published ? 'Published' : 'Draft'}
                    </button>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '1rem 1.25rem', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '0.4rem' }}>
                      <button
                        onClick={() => openEditModal(p)}
                        style={{ padding: '0.4rem', borderRadius: '6px', color: '#a1a1aa', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                        title="Edit Project"
                      >
                        <Edit2 size={15} />
                      </button>

                      <button
                        onClick={() => handleDelete(p.id)}
                        style={{ padding: '0.4rem', borderRadius: '6px', color: '#ef4444', backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                        title="Delete Project"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Project Modal */}
      {modalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1.5rem'
          }}
        >
          <div
            style={{
              backgroundColor: '#121216',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '20px',
              width: '100%',
              maxWidth: '820px',
              maxHeight: '90vh',
              overflowY: 'auto',
              padding: '2.5rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800 }}>
                {editingProject ? 'Edit Project' : 'Create New Project'}
              </h2>
              <button onClick={() => setModalOpen(false)} style={{ color: '#71717a' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Slug (Auto-generated if blank)
                  </label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="bharana-books"
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  >
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="Admin Dashboards">Admin Dashboards</option>
                    <option value="Custom Web Applications">Custom Web Applications</option>
                    <option value="Corporate Website">Corporate Website</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Client
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Industry
                  </label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Year
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>
              </div>

              {/* Image Upload / URL */}
              <div style={{ marginBottom: '1.25rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                  Project Showcase Image (URL or Upload)
                </label>
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://... or /uploads/..."
                    style={{ flex: 1, padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                  <label
                    style={{
                      padding: '0.7rem 1.1rem',
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      cursor: 'pointer',
                      fontSize: '0.84rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#ffffff'
                    }}
                  >
                    <UploadCloud size={16} />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload'}</span>
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                  </label>
                </div>
              </div>

              {/* Short & Full Descriptions */}
              <div style={{ marginBottom: '1rem' }}>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                  Short Summary *
                </label>
                <textarea
                  rows="2"
                  required
                  value={formData.short_description}
                  onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                  style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                />
              </div>

              {/* Case Study Challenge & Solution */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Challenge / Problem
                  </label>
                  <textarea
                    rows="3"
                    value={formData.challenge}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Architectural Solution
                  </label>
                  <textarea
                    rows="3"
                    value={formData.solution}
                    onChange={(e) => setFormData({ ...formData, solution: e.target.value })}
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>
              </div>

              {/* Technologies & Features */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Technologies (Comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.technologiesText}
                    onChange={(e) => setFormData({ ...formData, technologiesText: e.target.value })}
                    placeholder="React.js, Node.js, Express, MySQL"
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Key Features (One per line)
                  </label>
                  <textarea
                    rows="2"
                    value={formData.featuresText}
                    onChange={(e) => setFormData({ ...formData, featuresText: e.target.value })}
                    placeholder="Feature 1&#10;Feature 2"
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>
              </div>

              {/* URLs: Live & GitHub */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={formData.live_url}
                    onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                    placeholder="https://..."
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.35rem' }}>
                    GitHub Repository URL
                  </label>
                  <input
                    type="url"
                    value={formData.github_url}
                    onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                    placeholder="https://github.com/..."
                    style={{ width: '100%', padding: '0.7rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  style={{ padding: '0.75rem 1.5rem', borderRadius: '8px', backgroundColor: 'transparent', color: '#a1a1aa', border: '1px solid rgba(255, 255, 255, 0.1)' }}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ padding: '0.75rem 1.75rem', borderRadius: '8px' }}
                >
                  <span>{editingProject ? 'Save Changes' : 'Create Project'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`
        .table-row:hover {
          background-color: rgba(255, 255, 255, 0.02) !important;
        }
      `}</style>
    </div>
  );
}

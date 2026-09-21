import React, { useEffect, useState } from 'react';
import { Save, Lock, Share2, Globe, CheckCircle2, AlertCircle, KeyRound } from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function AdminSettings() {
  const [socials, setSocials] = useState([]);
  const [settings, setSettings] = useState({
    meta_title: '',
    meta_description: '',
    contact_email: '',
    contact_phone: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const [pwError, setPwError] = useState('');
  const [pwSuccess, setPwSuccess] = useState('');
  const { playClick } = useSound();

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [socRes, setRes] = await Promise.all([
        api.getAdminSocials(),
        api.getAdminSettings()
      ]);
      if (socRes.success) setSocials(socRes.data || []);
      if (setRes.success) setSettings(setRes.data || {});
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialChange = (index, field, value) => {
    const updated = [...socials];
    updated[index] = { ...updated[index], [field]: value };
    setSocials(updated);
  };

  const handleSaveSocials = async () => {
    playClick();
    setStatusMsg('');
    try {
      await Promise.all(socials.map(s => api.updateSocialLink(s.id, s)));
      setStatusMsg('Social profiles saved successfully!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      alert(err.message || 'Error updating socials');
    }
  };

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    playClick();
    try {
      await api.updateSettings(settings);
      setStatusMsg('Site and SEO settings updated successfully!');
      setTimeout(() => setStatusMsg(''), 3000);
    } catch (err) {
      alert(err.message || 'Error updating settings');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    playClick();
    setPwError('');
    setPwSuccess('');

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPwError('New passwords do not match.');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setPwError('Password must be at least 6 characters.');
      return;
    }

    try {
      const res = await api.changePassword(passwordData.currentPassword, passwordData.newPassword);
      if (res.success) {
        setPwSuccess('Password updated successfully! Remember your new credentials.');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      }
    } catch (err) {
      setPwError(err.message || 'Password update failed.');
    }
  };

  if (loading) {
    return <div style={{ color: '#a1a1aa' }}>Loading platform settings...</div>;
  }

  return (
    <div style={{ maxWidth: '840px' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.85rem', fontWeight: 800 }}>
          Settings, Social Channels & Security
        </h1>
        <p style={{ color: '#71717a', fontSize: '0.88rem' }}>
          Configure live social handles, SEO metadata, and update admin password.
        </p>
      </div>

      {statusMsg && (
        <div style={{ padding: '0.9rem 1.25rem', borderRadius: '10px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#fff', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <CheckCircle2 size={18} style={{ color: '#10b981' }} />
          <span>{statusMsg}</span>
        </div>
      )}

      {/* 1. Social Channels Management */}
      <section style={{ backgroundColor: '#121216', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <Share2 size={20} style={{ color: '#e50914' }} />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 800 }}>
            Social Profile Handles & Links
          </h2>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.75rem' }}>
          {socials.map((s, idx) => (
            <div key={s.id || s.platform} style={{ display: 'grid', gridTemplateColumns: '140px 1fr 100px', gap: '0.85rem', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, textTransform: 'capitalize', color: '#ffffff', fontSize: '0.88rem' }}>
                {s.title || s.platform}
              </div>
              <input
                type="text"
                value={s.url}
                onChange={(e) => handleSocialChange(idx, 'url', e.target.value)}
                placeholder="https://..."
                style={{ width: '100%', padding: '0.65rem 0.85rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff', fontSize: '0.85rem' }}
              />
              <select
                value={s.is_active ? 1 : 0}
                onChange={(e) => handleSocialChange(idx, 'is_active', parseInt(e.target.value, 10))}
                style={{ padding: '0.65rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff', fontSize: '0.82rem' }}
              >
                <option value={1}>Visible</option>
                <option value={0}>Hidden</option>
              </select>
            </div>
          ))}
        </div>

        <button onClick={handleSaveSocials} className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.88rem' }}>
          <Save size={15} /> Save Social Links
        </button>
      </section>

      {/* 2. SEO & Site Meta Configuration */}
      <section style={{ backgroundColor: '#121216', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '2rem', marginBottom: '2.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <Globe size={20} style={{ color: '#e50914' }} />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 800 }}>
            Search Engine Optimization (SEO) & Identity
          </h2>
        </div>

        <form onSubmit={handleSaveSettings}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
              SEO Title Tag
            </label>
            <input
              type="text"
              value={settings.meta_title || ''}
              onChange={(e) => setSettings({ ...settings, meta_title: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
            />
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
              SEO Meta Description
            </label>
            <textarea
              rows="3"
              value={settings.meta_description || ''}
              onChange={(e) => setSettings({ ...settings, meta_description: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.88rem' }}>
            <Save size={15} /> Save SEO Settings
          </button>
        </form>
      </section>

      {/* 3. Security & Password Update */}
      <section style={{ backgroundColor: '#121216', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '18px', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
          <KeyRound size={20} style={{ color: '#e50914' }} />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.3rem', fontWeight: 800 }}>
            Security: Change Admin Password
          </h2>
        </div>

        {pwError && (
          <div style={{ padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(239, 68, 68, 0.15)', border: '1px solid #ef4444', color: '#fff', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {pwError}
          </div>
        )}

        {pwSuccess && (
          <div style={{ padding: '0.8rem 1rem', borderRadius: '8px', backgroundColor: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#fff', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            {pwSuccess}
          </div>
        )}

        <form onSubmit={handleChangePassword}>
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
              Current Password *
            </label>
            <input
              type="password"
              required
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
                New Password *
              </label>
              <input
                type="password"
                required
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#a1a1aa', marginBottom: '0.4rem' }}>
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                style={{ width: '100%', padding: '0.75rem', borderRadius: '8px', backgroundColor: '#18181b', border: '1px solid #27272a', color: '#fff' }}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-secondary" style={{ padding: '0.7rem 1.5rem', fontSize: '0.88rem' }}>
            <Lock size={15} /> Update Password
          </button>
        </form>
      </section>

    </div>
  );
}

import React, { useEffect, useState } from 'react';
import { Mail, PhoneCall, Trash2, CheckCircle2, AlertCircle, MessageSquare, ExternalLink } from 'lucide-react';
import { api } from '../../services/api';
import { useSound } from '../../hooks/useSound';

export default function AdminMessages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const { playClick } = useSound();

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      const res = await api.getAdminMessages();
      if (res.success && res.data) {
        setMessages(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleRead = async (msg) => {
    playClick();
    try {
      await api.markMessageRead(msg.id, msg.is_read ? 0 : 1);
      loadMessages();
      if (selectedMsg?.id === msg.id) {
        setSelectedMsg({ ...selectedMsg, is_read: msg.is_read ? 0 : 1 });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this inquiry permanently?')) return;
    playClick();
    try {
      await api.deleteMessage(id);
      loadMessages();
      if (selectedMsg?.id === id) setSelectedMsg(null);
    } catch (err) {
      alert(err.message || 'Delete failed');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.85rem', fontWeight: 800 }}>
          Client Inquiries & Proposals Inbox
        </h1>
        <p style={{ color: '#71717a', fontSize: '0.88rem' }}>
          Real-time submissions from the public portfolio contact form.
        </p>
      </div>

      {messages.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0', color: '#71717a' }}>
          <MessageSquare size={48} style={{ margin: '0 auto 1rem', opacity: 0.4 }} />
          <p>No messages received yet.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: selectedMsg ? '1fr 1fr' : '1fr', gap: '2rem' }}>
          
          {/* List of Messages */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {messages.map((m) => {
              const isSelected = selectedMsg?.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => { setSelectedMsg(m); playClick(); }}
                  style={{
                    backgroundColor: isSelected ? 'rgba(229, 9, 20, 0.12)' : m.is_read ? '#121216' : 'rgba(229, 9, 20, 0.05)',
                    border: isSelected ? '1px solid #e50914' : m.is_read ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(229, 9, 20, 0.3)',
                    borderRadius: '14px',
                    padding: '1.25rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  className="interactive-hover"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      {!m.is_read && (
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#e50914' }} />
                      )}
                      <h4 style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.98rem' }}>{m.name}</h4>
                    </div>
                    <span style={{ fontSize: '0.72rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>
                      {new Date(m.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#e50914', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.4rem' }}>
                    {m.project_type} • {m.budget}
                  </div>

                  <p style={{ color: '#a1a1aa', fontSize: '0.86rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {m.message}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Selected Message Detail Drawer */}
          {selectedMsg && (
            <div
              style={{
                backgroundColor: '#121216',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '2rem',
                position: 'sticky',
                top: '90px',
                height: 'fit-content'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
                <div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontSize: '1.5rem', fontWeight: 800, color: '#ffffff' }}>
                    {selectedMsg.name}
                  </h3>
                  <div style={{ fontSize: '0.82rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>
                    Received: {new Date(selectedMsg.created_at).toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleToggleRead(selectedMsg)}
                    style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', backgroundColor: 'rgba(255, 255, 255, 0.06)', color: '#ffffff', fontSize: '0.78rem' }}
                  >
                    {selectedMsg.is_read ? 'Mark Unread' : 'Mark Read'}
                  </button>
                  <button
                    onClick={() => handleDelete(selectedMsg.id)}
                    style={{ padding: '0.4rem 0.75rem', borderRadius: '6px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', fontSize: '0.78rem' }}
                  >
                    Delete
                  </button>
                </div>
              </div>

              {/* Sender Details Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', padding: '1.25rem', borderRadius: '10px', backgroundColor: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 255, 255, 0.06)', marginBottom: '1.5rem' }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>EMAIL</div>
                  <a href={`mailto:${selectedMsg.email}`} style={{ fontSize: '0.9rem', color: '#e50914', fontWeight: 600 }}>{selectedMsg.email}</a>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>PHONE / WHATSAPP</div>
                  <div style={{ fontSize: '0.9rem', color: '#ffffff' }}>{selectedMsg.phone || 'Not provided'}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>PROJECT TYPE</div>
                  <div style={{ fontSize: '0.9rem', color: '#ffffff' }}>{selectedMsg.project_type}</div>
                </div>

                <div>
                  <div style={{ fontSize: '0.75rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace" }}>BUDGET</div>
                  <div style={{ fontSize: '0.9rem', color: '#ffffff' }}>{selectedMsg.budget}</div>
                </div>
              </div>

              {/* Full Message Body */}
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ fontSize: '0.75rem', color: '#71717a', fontFamily: "'JetBrains Mono', monospace", marginBottom: '0.5rem' }}>
                  PROJECT BRIEF / REQUIREMENTS
                </div>
                <div style={{ color: '#f4f4f5', fontSize: '0.96rem', lineHeight: 1.7, backgroundColor: '#09090b', padding: '1.25rem', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.06)', whiteSpace: 'pre-wrap' }}>
                  {selectedMsg.message}
                </div>
              </div>

              {/* Direct Reply Shortcuts */}
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <a
                  href={`mailto:${selectedMsg.email}?subject=Regarding Your Project Inquiry with Kavindu Nimesh`}
                  className="btn btn-primary"
                  style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem' }}
                >
                  <Mail size={15} />
                  <span>Reply via Email</span>
                </a>

                {selectedMsg.phone && (
                  <a
                    href={`https://wa.me/${selectedMsg.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.75rem', fontSize: '0.85rem' }}
                  >
                    <PhoneCall size={15} />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>

            </div>
          )}

        </div>
      )}
    </div>
  );
}

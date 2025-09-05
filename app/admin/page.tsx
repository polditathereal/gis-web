'use client';

import React, { useEffect, useState } from 'react';
import styles from './admin.module.css';
import ProjectsSection from './components_admin/ProjectsSection';
import NewsSection from './components_admin/NewsSection';
import JobsSection from './components_admin/JobsSection';

const sectionOptions = [
  { key: 'projects', label: 'Proyectos' },
  { key: 'news', label: 'Noticias' },
  { key: 'jobs', label: 'Ofertas' },
];

function AdminMessageBox({ error, success }: { error: string; success: string }) {
  if (!error && !success) return null;
  return (
    <div style={{
      background: success ? '#ffe9c6' : '#fff3e0',
      color: success ? '#256029' : '#b71c1c',
      borderRadius: 12,
      padding: 16,
      margin: '0 auto 24px auto',
      maxWidth: 600,
      textAlign: 'center',
      fontWeight: 500,
      boxShadow: '0 2px 8px rgba(0,0,0,0.07)',
      border: success ? '1px solid #f59e42' : '1px solid #f59e42'
    }}>
      {error || success}
    </div>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState('');
  const [selectedSection, setSelectedSection] = useState<'projects' | 'news' | 'jobs'>('projects');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  useEffect(() => {
    const t = sessionStorage.getItem('token') || localStorage.getItem('token');
    if (t) setToken(t);
  }, []);
  if (!token) return <div className={styles.adminAccessDenied}>Acceso restringido. Inicie sesión.</div>;

  function handleError(msg: string) {
    setError(msg);
    setSuccess('');
  }
  function handleSuccess(msg: string) {
    setSuccess(msg);
    setError('');
  }

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.adminTitle}>Panel de Administración</h1>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginBottom: 32 }}>
        {sectionOptions.map(opt => (
          <button
            key={opt.key}
            className={`${styles.adminBtn} ${selectedSection === opt.key ? styles.adminBtnPrimary : styles.adminBtnSecondary}`}
            style={selectedSection === opt.key ? { fontWeight: 700 } : {}}
            onClick={() => setSelectedSection(opt.key as 'projects' | 'news' | 'jobs')}
          >
            {opt.label}
          </button>
        ))}
      </div>
      <AdminMessageBox error={error} success={success} />
      <div style={{ width: '100%' }}>
        {selectedSection === 'projects' && <ProjectsSection token={token} setError={handleError} setSuccess={handleSuccess} />}
        {selectedSection === 'news' && <NewsSection token={token} setError={handleError} setSuccess={handleSuccess} />}
        {selectedSection === 'jobs' && <JobsSection token={token} setError={handleError} setSuccess={handleSuccess} />}
      </div>
    </div>
  );
}
          
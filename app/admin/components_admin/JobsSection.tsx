import React, { useState, useEffect } from 'react';
import SectionBase from './SectionBase';
import styles from '../admin.module.css';

const API = 'http://localhost:4000/jobs';

type Category = { id: string; name: string; color: string };
type Job = {
  id?: string;
  title: string;
  description: string;
  date: string;
  category: string;
  linkedin?: string;
};

type Data = {
  jobs: Job[];
  categories: Category[];
};

function useFetch(token: string): [Data, () => void] {
  const [data, setData] = useState<Data>({ jobs: [], categories: [] });
  const refresh = () => {
    fetch(API, { headers: { Authorization: token } })
      .then(r => r.json())
      .then(json => setData(json));
  };
  useEffect(() => {
    refresh();
  }, [token]);
  return [data, refresh];
}

function CategoryList({ categories, onEdit, onDelete }: {
  categories: Category[];
  onEdit: (cat: Category) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className={styles.adminCategories}>
      <h4 className={styles.adminSectionTitle}>Categorías</h4>
      <ul className={styles.adminList}>
        {categories.map(cat => (
          <li key={cat.id} className={styles.adminListItem}>
            <span className={styles.adminCategoryBadge} style={{ background: cat.color }}>{cat.name}</span>
            <button type="button" className={`${styles.adminBtn} ${styles.adminBtnEdit}`} onClick={() => onEdit(cat)}>Editar</button>
            <button type="button" className={`${styles.adminBtn} ${styles.adminBtnDelete}`} onClick={() => onDelete(cat.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function JobsList({ jobs, onEdit, onDelete }: {
  jobs: Job[];
  onEdit: (job: Job) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className={styles.adminItems}>
      <h4 className={styles.adminSectionTitle}>Listado</h4>
      <ul className={styles.adminList}>
        {jobs.map(j => (
          <li key={j.id} className={styles.adminListItem}>
            <span className={styles.adminItemTitle}>{j.title}</span>
            <button type="button" className={`${styles.adminBtn} ${styles.adminBtnEdit}`} onClick={() => onEdit(j)}>Editar</button>
            <button type="button" className={`${styles.adminBtn} ${styles.adminBtnDelete}`} onClick={() => onDelete(j.id!)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategoryForm({ initial, onSave, onCancel }: {
  initial?: Category | null;
  onSave: (cat: { name: string; color: string }) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name || '');
  const [color, setColor] = useState(initial?.color || '#888');
  return (
    <form className={styles.adminForm} onSubmit={e => { e.preventDefault(); onSave({ name, color }); }}>
      <input className={styles.adminInput} placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <label style={{ fontWeight: 500 }}>Color:</label>
        <input
          className={styles.adminInput}
          type="color"
          value={color}
          onChange={e => setColor(e.target.value)}
          required
          style={{
            width: 40,
            height: 40,
            border: '2px solid #ffd699',
            borderRadius: 8,
            background: color,
            padding: 0,
            cursor: 'pointer'
          }}
        />
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: color,
          border: '2px solid #ffd699'
        }} />
      </div>
      <div className={styles.adminFormActions}>
        <button type="submit" className={`${styles.adminBtn} ${styles.adminBtnPrimary}`}>Guardar</button>
        <button type="button" className={`${styles.adminBtn} ${styles.adminBtnSecondary}`} onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

function JobForm({ initial, categories, onSave, onCancel, token, setError, setSuccess }: {
  initial?: Job | null;
  categories: Category[];
  onSave: (job: any) => void;
  onCancel: () => void;
  token: string;
  setError: (msg: string) => void;
  setSuccess: (msg: string) => void;
}) {
  const [fieldsState, setFieldsState] = useState<Job>(initial || {
    title: '', description: '', date: '', category: '', linkedin: ''
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFieldsState({ ...fieldsState, [e.target.name]: e.target.value });
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    fetch(`${API}${initial?.id ? '/' + initial.id : ''}`, {
      method: initial ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify(fieldsState),
    })
      .then(async r => {
        const res = await r.json();
        if (!r.ok || res.error) {
          setError(res.error || 'Error guardando oferta');
        } else {
          setSuccess(initial?.id ? 'Oferta editada correctamente.' : 'Oferta creada correctamente.');
          onSave(fieldsState);
        }
      })
      .catch(() => setError('Error de conexión al guardar oferta'));
  }
  return (
    <form className={styles.adminForm} onSubmit={handleSubmit} style={{
      background: '#fff7e6',
      borderRadius: 16,
      boxShadow: '0 2px 12px rgba(255, 153, 0, 0.07)',
      border: '1px solid #ffd699',
      marginBottom: 24
    }}>
      {fields.map(field => {
        if (field.type === 'select') {
          return (
            <div key={field.name} style={{ marginBottom: 8 }}>
              <label style={{ fontWeight: 500 }}>{field.label}:</label>
              <select
                name={field.name}
                value={fieldsState[field.name as keyof Job] || ''}
                onChange={handleChange}
                className={styles.adminInput}
                required={field.required}
              >
                <option value="">Selecciona categoría</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          );
        }
        if (field.type === 'textarea') {
          return (
            <div key={field.name} style={{ marginBottom: 8 }}>
              <label style={{ fontWeight: 500 }}>{field.label}:</label>
              <textarea
                name={field.name}
                value={fieldsState[field.name as keyof Job] || ''}
                onChange={handleChange}
                className={styles.adminInput}
                placeholder={field.label}
                required={field.required}
              />
            </div>
          );
        }
        return (
          <div key={field.name} style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500 }}>{field.label}:</label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={fieldsState[field.name as keyof Job] || ''}
              onChange={handleChange}
              className={styles.adminInput}
              placeholder={field.label}
              required={field.required}
            />
          </div>
        );
      })}
      <div className={styles.adminFormActions}>
        <button type="submit" className={`${styles.adminBtn} ${styles.adminBtnPrimary}`}>Guardar</button>
        <button type="button" className={`${styles.adminBtn} ${styles.adminBtnSecondary}`} onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

const fields = [
  { name: "title", label: "Título", required: true },
  { name: "description", label: "Descripción", type: "textarea" },
  { name: "date", label: "Fecha", type: "date" },
  { name: "linkedin", label: "URL LinkedIn" },
  { name: "category", label: "Categoría", type: "select" },
];

export default function JobsSection({ token, setError, setSuccess }: { token: string, setError: (msg: string) => void, setSuccess: (msg: string) => void }) {
  const [data, refresh] = useFetch(token);
  const [editing, setEditing] = useState<Job | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [catEditing, setCatEditing] = useState<Category | null>(null);
  const [showCatForm, setShowCatForm] = useState(false);

  function handleDelete(id: string) {
    setError('');
    fetch(`${API}/${id}`, { method: 'DELETE', headers: { Authorization: token } })
      .then(r => r.json())
      .then(res => {
        if (res.error) setError(res.error);
        refresh();
      })
      .catch(() => setError('Error eliminando oferta'));
  }
  function handleCatDelete(id: string) {
    setError('');
    fetch(`${API}/categories/${id}`, { method: 'DELETE', headers: { Authorization: token } })
      .then(r => r.json())
      .then(res => {
        if (res.error) setError(res.error);
        refresh();
      })
      .catch(() => setError('Error eliminando categoría'));
  }
  function handleSave() {
    setShowForm(false);
    setEditing(null);
    refresh();
  }
  function handleCatSave() {
    setShowCatForm(false);
    setCatEditing(null);
    refresh();
  }
  function handleCreateNew() {
    setShowForm(false);
    setEditing(null);
    setTimeout(() => setShowForm(true), 0);
  }

  return (
    <section className={styles.adminSection}>
      <h2 className={styles.adminSectionHeader}>Ofertas</h2>
      <button
        type="button"
        className={`${styles.adminBtn} ${styles.adminBtnPrimary}`}
        onClick={handleCreateNew}
      >
        Crear nuevo
      </button>
      <JobsList
        jobs={data.jobs}
        onEdit={j => {
          setShowForm(false);
          setEditing(null);
          setTimeout(() => {
            setEditing(j);
            setShowForm(true);
          }, 0);
        }}
        onDelete={handleDelete}
      />
      {showForm && (
        <JobForm
          initial={editing}
          categories={data.categories}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          token={token}
          setError={setError}
          setSuccess={setSuccess}
        />
      )}
      <h3 className={styles.adminSectionTitle}>Categorías</h3>
      <button type="button" className={`${styles.adminBtn} ${styles.adminBtnSecondary}`} onClick={() => { setShowCatForm(true); setCatEditing(null); }}>
        Crear categoría
      </button>
      <CategoryList categories={data.categories} onEdit={cat => { setCatEditing(cat); setShowCatForm(true); }} onDelete={handleCatDelete} />
      {showCatForm && (
        <CategoryForm
          initial={catEditing}
          onSave={cat => {
            const url = catEditing?.id ? `${API}/categories/${catEditing.id}` : `${API}/categories`;
            const body = catEditing?.id
              ? { id: cat.name, name: cat.name, color: cat.color }
              : { name: cat.name, color: cat.color };
            fetch(url, {
              method: catEditing?.id ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: token },
              body: JSON.stringify(body),
            }).then(r => r.json()).then(handleCatSave);
          }}
          onCancel={() => { setShowCatForm(false); setCatEditing(null); }}
        />
      )}
    </section>
  );
}

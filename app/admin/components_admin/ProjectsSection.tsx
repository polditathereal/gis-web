import React, { useState, useEffect, useCallback } from 'react';
import styles from '../admin.module.css';
import Image from "next/image";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL_PROD ||
  process.env.NEXT_PUBLIC_API_URL_LOCAL ||
  "http://localhost:4000"

type Category = { id: string; name: string; color: string };
type Project = {
  id?: string;
  title: string;
  tipo: string;
  tema: string;
  entidadContratante: string;
  paisOrigen: string;
  tipo2: string;
  objeto: string;
  fechaInicial: string;
  fechaFinal: string;
  consorcio: string;
  integrantes: string;
  descripcion: string;
  category: string;
  imagenPrincipal?: string;
  image1?: string;
  image2?: string;
};

type Data = {
  projects: Project[];
  categories: Category[];
};

function useFetch(token: string): [Data, () => void] {
  const [data, setData] = useState<Data>({ projects: [], categories: [] })
  const refresh = useCallback(() => {
    // Asegúrate de que el fetch apunte a un endpoint válido, no a la raíz
    fetch(`${API_URL}/projects`, { headers: { Authorization: token } })
      .then(r => r.json())
      .then(json => setData(json))
  }, [token])
  useEffect(() => {
    refresh()
  }, [refresh])
  return [data, refresh]
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

function ProjectList({ projects, onEdit, onDelete }: {
  projects: Project[];
  onEdit: (project: Project) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className={styles.adminItems}>
      <h4 className={styles.adminSectionTitle}>Listado</h4>
      <ul className={styles.adminList}>
        {projects.map(project => (
          <li key={project.id} className={styles.adminListItem}>
            <span className={styles.adminItemTitle}>{project.title}</span>
            <button type="button" className={`${styles.adminBtn} ${styles.adminBtnEdit}`} onClick={() => onEdit(project)}>Editar</button>
            <button type="button" className={`${styles.adminBtn} ${styles.adminBtnDelete}`} onClick={() => onDelete(project.id!)}>Eliminar</button>
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

const fields = [
  { name: "title", label: "Título", required: true },
  { name: "tipo", label: "Tipo" },
  { name: "tema", label: "Tema" },
  { name: "entidadContratante", label: "Entidad Contratante" },
  { name: "paisOrigen", label: "País de Origen" },
  { name: "tipo2", label: "Tipo 2" },
  { name: "objeto", label: "Objeto" },
  { name: "fechaInicial", label: "Fecha Inicial", type: "date" },
  { name: "fechaFinal", label: "Fecha Final", type: "date" },
  { name: "consorcio", label: "Consorcio" },
  { name: "integrantes", label: "Integrantes" },
  { name: "descripcion", label: "Descripción", type: "textarea" },
  { name: "category", label: "Categoría", type: "select" },
  { name: "imagenPrincipal", label: "Imagen principal", isImage: true },
  { name: "image1", label: "Imagen secundaria 1", isImage: true },
  { name: "image2", label: "Imagen secundaria 2", isImage: true },
];

function ProjectForm({ initial, categories, onSave, onCancel, token, setError, setSuccess }: {
  initial?: Project | null;
  categories: Category[];
  onSave: () => void;
  onCancel: () => void;
  token: string;
  setError: (msg: string) => void;
  setSuccess: (msg: string) => void;
}) {
  const [form, setForm] = useState<Project>(initial || {
    title: '',
    tipo: '',
    tema: '',
    entidadContratante: '',
    paisOrigen: '',
    tipo2: '',
    objeto: '',
    fechaInicial: '',
    fechaFinal: '',
    consorcio: '',
    integrantes: '',
    descripcion: '',
    category: '',
    imagenPrincipal: '',
    image1: '',
    image2: '',
  });
  const [imagenPrincipalFile, setImagenPrincipalFile] = useState<File | null>(null);
  const [image1File, setImage1File] = useState<File | null>(null);
  const [image2File, setImage2File] = useState<File | null>(null);
  const [imagenPrincipalPreview, setImagenPrincipalPreview] = useState<string | null>(null);
  const [image1Preview, setImage1Preview] = useState<string | null>(null);
  const [image2Preview, setImage2Preview] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    const { files } = e.target;
    if (files && files[0]) {
      const file = files[0];
      if (field === "imagenPrincipal") {
        setImagenPrincipalFile(file);
        setImagenPrincipalPreview(null); // Elimina preview anterior
        const reader = new FileReader();
        reader.onload = () => setImagenPrincipalPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
      if (field === "image1") {
        setImage1File(file);
        setImage1Preview(null);
        const reader = new FileReader();
        reader.onload = () => setImage1Preview(reader.result as string);
        reader.readAsDataURL(file);
      }
      if (field === "image2") {
        setImage2File(file);
        setImage2Preview(null);
        const reader = new FileReader();
        reader.onload = () => setImage2Preview(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  }

  function handleImageDrop(e: React.DragEvent<HTMLDivElement>, field: string) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (field === "imagenPrincipal") {
        setImagenPrincipalFile(file);
        setImagenPrincipalPreview(null);
        const reader = new FileReader();
        reader.onload = () => setImagenPrincipalPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
      if (field === "image1") {
        setImage1File(file);
        setImage1Preview(null);
        const reader = new FileReader();
        reader.onload = () => setImage1Preview(reader.result as string);
        reader.readAsDataURL(file);
      }
      if (field === "image2") {
        setImage2File(file);
        setImage2Preview(null);
        const reader = new FileReader();
        reader.onload = () => setImage2Preview(reader.result as string);
        reader.readAsDataURL(file);
      }
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (!["imagenPrincipal", "image1", "image2"].includes(key)) {
        formData.append(key, value ?? '');
      }
    });
    // Log para depuración: ¿qué se está enviando?
    console.log('Imagen principal enviada:', imagenPrincipalFile ?? form.imagenPrincipal);
    console.log('Imagen secundaria 1 enviada:', image1File ?? form.image1);
    console.log('Imagen secundaria 2 enviada:', image2File ?? form.image2);

    // Si hay archivo, envía el archivo; si no, envía la URL actual (para PUT)
    if (form.id) {
      formData.append('imagenPrincipal', imagenPrincipalFile ?? (form.imagenPrincipal || ''));
      formData.append('image1', image1File ?? (form.image1 || ''));
      formData.append('image2', image2File ?? (form.image2 || ''));
    } else {
      if (imagenPrincipalFile) formData.append('imagenPrincipal', imagenPrincipalFile);
      if (image1File) formData.append('image1', image1File);
      if (image2File) formData.append('image2', image2File);
    }
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `${API_URL}/projects/${form.id}` : `${API_URL}/projects`;
    fetch(url, {
      method,
      headers: { Authorization: token },
      body: formData,
    })
      .then(async r => {
        const res = await r.json();
        if (!r.ok || res.error) {
          setError(res.error || 'Error guardando proyecto');
        } else {
          setSuccess(form.id ? 'Proyecto editado correctamente.' : 'Proyecto creado correctamente.');
          onSave();
        }
      })
      .catch(() => setError('Error de conexión al guardar proyecto'));
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
                value={form[field.name as keyof Project] || ''}
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
                value={form[field.name as keyof Project] || ''}
                onChange={handleChange}
                className={styles.adminInput}
                placeholder={field.label}
                required={field.required}
                style={{ minHeight: 60 }}
              />
            </div>
          );
        }
        if (field.isImage) {
          let fileState: File | null = null;
          let preview: string | null = null;
          if (field.name === "imagenPrincipal") {
            fileState = imagenPrincipalFile;
            preview = imagenPrincipalPreview;
          }
          if (field.name === "image1") {
            fileState = image1File;
            preview = image1Preview;
          }
          if (field.name === "image2") {
            fileState = image2File;
            preview = image2Preview;
          }
          return (
            <div key={field.name} className={styles.adminFormImage} style={{ marginBottom: 8 }}>
              <label style={{ fontWeight: 500 }}>{field.label}:</label>
              <div
                className={styles.adminImageDrop}
                onDrop={e => handleImageDrop(e, field.name)}
                onDragOver={e => e.preventDefault()}
                style={{ background: '#fff3e0', border: '1px dashed #ffa726', borderRadius: 8, padding: 12 }}
              >
                <input
                  type="file"
                  name={field.name}
                  accept="image/*"
                  onChange={e => handleImageChange(e, field.name)}
                  className={styles.adminInput}
                />
                {fileState && (
                  <span className={styles.adminImageName}>{fileState.name}</span>
                )}
                <span className={styles.adminImageHint}>Arrastra una imagen aquí</span>
                {preview && (
                  <Image src={preview} alt={field.label} width={120} height={120} style={{ maxWidth: 120, marginTop: 8, borderRadius: 8, boxShadow: '0 1px 6px #ffd699' }} />
                )}
              </div>
            </div>
          );
        }
        return (
          <div key={field.name} style={{ marginBottom: 8 }}>
            <label style={{ fontWeight: 500 }}>{field.label}:</label>
            <input
              type={field.type || 'text'}
              name={field.name}
              value={form[field.name as keyof Project] || ''}
              onChange={handleChange}
              className={styles.adminInput}
              placeholder={field.label}
              required={field.required}
              style={{ background: '#fffbe6' }}
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

export default function ProjectsSection({ token, setError, setSuccess }: { token: string, setError: (msg: string) => void, setSuccess: (msg: string) => void }) {
  const [data, refresh] = useFetch(token);
  const [editing, setEditing] = useState<Project | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [catEditing, setCatEditing] = useState<Category | null>(null);
  const [showCatForm, setShowCatForm] = useState(false);

  function handleDelete(id: string) {
    setError('');
    fetch(`${API_URL}/projects/${id}`, { method: 'DELETE', headers: { Authorization: token } })
      .then(r => r.json())
      .then(res => {
        if (res.error) setError(res.error);
        refresh();
      })
      .catch(() => setError('Error eliminando proyecto'));
  }
  function handleCatDelete(id: string) {
    setError('');
    fetch(`${API_URL}/categories/${id}`, { method: 'DELETE', headers: { Authorization: token } })
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
    setTimeout(() => setShowForm(true), 0); // Fuerza el reset del formulario
  }

  return (
    <section className={styles.adminSection}>
      <h2 className={styles.adminSectionHeader}>Proyectos</h2>
      <button
        type="button"
        className={`${styles.adminBtn} ${styles.adminBtnPrimary}`}
        onClick={handleCreateNew}
      >
        Crear nuevo
      </button>
      <ProjectList
        projects={data.projects}
        onEdit={p => {
          setShowForm(false);
          setEditing(null);
          setTimeout(() => {
            setEditing(p);
            setShowForm(true);
          }, 0);
        }}
        onDelete={handleDelete}
      />
      {showForm && (
        <ProjectForm
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
            const url = catEditing?.id ? `${API_URL}/categories/${catEditing.id}` : `${API_URL}/categories`;
            const body = catEditing?.id
              ? { id: cat.name, name: cat.name, color: cat.color }
              : { name: cat.name, color: cat.color };
            fetch(url, {
              method: catEditing?.id ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: token },
              body: JSON.stringify(body),
            })
              .then(r => r.json())
              .then(handleCatSave);
          }}
          onCancel={() => { setShowCatForm(false); setCatEditing(null); }}
        />
      )}
    </section>
  );
}


import React, { useState, useEffect } from 'react';
import styles from '../admin.module.css';

type Category = { id: string; name: string; color: string };
type Item = { id?: string; [key: string]: any };

type Data = {
  items: Item[];
  categories: Category[];
};

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  isImage?: boolean;
};

type SectionBaseProps = {
  token: string;
  api: string;
  sectionLabel: string;
  itemLabel: string;
  fields: Field[];
  imageFields?: string[];
};

function useFetch(api: string, token: string): [Data, () => void] {
  const [data, setData] = useState<Data>({ items: [], categories: [] });
  const refresh = () => {
    fetch(api, { headers: { Authorization: token } })
      .then(r => r.json())
      .then(json => setData({
        items: json.projects || json.news || json.jobs || [],
        categories: json.categories || [],
      }));
  };
  useEffect(refresh, [api, token]);
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

function ItemList({ items, onEdit, onDelete, itemLabel }: {
  items: Item[];
  onEdit: (item: Item) => void;
  onDelete: (id: string) => void;
  itemLabel: string;
}) {
  return (
    <div className={styles.adminItems}>
      <h4 className={styles.adminSectionTitle}>Listado de {itemLabel}</h4>
      <ul className={styles.adminList}>
        {items.map(item => (
          <li key={item.id} className={styles.adminListItem}>
            <span className={styles.adminItemTitle}>{item.title || item.name}</span>
            <button type="button" className={`${styles.adminBtn} ${styles.adminBtnEdit}`} onClick={() => onEdit(item)}>Editar</button>
            <button type="button" className={`${styles.adminBtn} ${styles.adminBtnDelete}`} onClick={() => onDelete(item.id!)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CategoryForm({ initial, onSave, onCancel }: {
  initial?: Category | null;
  onSave: (cat: Category) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(initial?.name || '');
  const [color, setColor] = useState(initial?.color || '#888');
  return (
    <form className={styles.adminForm} onSubmit={e => { e.preventDefault(); onSave({ name, color, id: initial?.id || name }); }}>
      <input className={styles.adminInput} placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} required />
      <input className={styles.adminInput} type="color" value={color} onChange={e => setColor(e.target.value)} required />
      <div className={styles.adminFormActions}>
        <button type="submit" className={`${styles.adminBtn} ${styles.adminBtnPrimary}`}>Guardar</button>
        <button type="button" className={`${styles.adminBtn} ${styles.adminBtnSecondary}`} onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

function ItemForm({
  fields,
  initial,
  categories,
  onSave,
  onCancel,
  token,
  api,
  imageFields = [],
}: {
  fields: Field[];
  initial?: Item | null;
  categories: Category[];
  onSave: (item: any) => void;
  onCancel: () => void;
  token: string;
  api: string;
  imageFields?: string[];
}) {
  const [formFields, setFormFields] = useState<Item>(initial || {});
  const [images, setImages] = useState<{ [key: string]: File | null }>({});
  useEffect(() => {
    setFormFields(initial || {});
    setImages({});
  }, [initial]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormFields({ ...formFields, [e.target.name]: e.target.value });
  }
  function handleImageDrop(e: React.DragEvent<HTMLDivElement>, field: string) {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImages(prev => ({ ...prev, [field]: e.dataTransfer.files[0] }));
    }
  }
  function handleImageSelect(e: React.ChangeEvent<HTMLInputElement>, field: string) {
    if (e.target.files && e.target.files[0]) {
      if (e.target.files && e.target.files[0]) {
        setImages(prev => ({ ...prev, [field]: e.target.files![0] }));
      }
    }
  }
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(formFields).forEach(([k, v]) => formData.append(k, v ?? ''));
    imageFields.forEach(field => {
      if (images[field]) formData.append(field, images[field]!);
    });
    fetch(`${api}${initial?.id ? '/' + initial.id : ''}`, {
      method: initial ? 'PUT' : 'POST',
      headers: { Authorization: token },
      body: formData,
    }).then(r => r.json()).then(onSave);
  }
  return (
    <form className={styles.adminForm} onSubmit={handleSubmit}>
      {fields.map(f =>
        f.isImage ? (
          <div key={f.name} className={styles.adminImageDrop} onDrop={e => handleImageDrop(e, f.name)} onDragOver={e => e.preventDefault()}>
            <input type="file" accept="image/*" onChange={e => handleImageSelect(e, f.name)} />
            {images[f.name] && <span className={styles.adminImageName}>{images[f.name]?.name}</span>}
            <span className={styles.adminImageHint}>{f.label} (drag & drop)</span>
          </div>
        ) : f.type === "textarea" ? (
          <textarea
            key={f.name}
            className={styles.adminInput}
            name={f.name}
            placeholder={f.label}
            value={formFields[f.name] || ""}
            onChange={handleChange}
            required={f.required}
          />
        ) : f.type === "select" ? (
          <select
            key={f.name}
            className={styles.adminInput}
            name={f.name}
            value={formFields[f.name] || ""}
            onChange={handleChange}
            required={f.required}
          >
            <option value="">Sin categoría</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
        ) : (
          <input
            key={f.name}
            className={styles.adminInput}
            name={f.name}
            type={f.type || "text"}
            placeholder={f.label}
            value={formFields[f.name] || ""}
            onChange={handleChange}
            required={f.required}
          />
        )
      )}
      <div className={styles.adminFormActions}>
        <button type="submit" className={`${styles.adminBtn} ${styles.adminBtnPrimary}`}>Guardar</button>
        <button type="button" className={`${styles.adminBtn} ${styles.adminBtnSecondary}`} onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
}

export default function SectionBase({
  token,
  api,
  sectionLabel,
  itemLabel,
  fields,
  imageFields = [],
}: SectionBaseProps) {
  const [data, refresh] = useFetch(api, token);
  const [editing, setEditing] = useState<Item | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [catEditing, setCatEditing] = useState<Category | null>(null);
  const [showCatForm, setShowCatForm] = useState(false);

  function handleDelete(id: string) {
    fetch(`${api}/${id}`, { method: 'DELETE', headers: { Authorization: token } }).then(refresh);
  }
  function handleCatDelete(id: string) {
    fetch(`${api}/categories/${id}`, { method: 'DELETE', headers: { Authorization: token } }).then(refresh);
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

  return (
    <section className={styles.adminSection}>
      <h2 className={styles.adminSectionHeader}>{sectionLabel}</h2>
      <button type="button" className={`${styles.adminBtn} ${styles.adminBtnPrimary}`} onClick={() => { setShowForm(true); setEditing(null); }}>
        Crear nuevo
      </button>
      <ItemList items={data.items} onEdit={item => { setEditing(item); setShowForm(true); }} onDelete={handleDelete} itemLabel={itemLabel} />
      {showForm && (
        <ItemForm
          fields={fields}
          initial={editing}
          categories={data.categories}
          onSave={handleSave}
          onCancel={() => { setShowForm(false); setEditing(null); }}
          token={token}
          api={api}
          imageFields={imageFields}
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
            const url = cat.id ? `${api}/categories/${cat.id}` : `${api}/categories`;
            fetch(url, {
              method: cat.id ? 'PUT' : 'POST',
              headers: { 'Content-Type': 'application/json', Authorization: token },
              body: JSON.stringify(cat),
            }).then(r => r.json()).then(handleCatSave);
          }}
          onCancel={() => { setShowCatForm(false); setCatEditing(null); }}
        />
      )}
    </section>
  );
}

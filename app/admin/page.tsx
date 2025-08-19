
"use client";
import { useState, useEffect } from "react";

// ItemList logic will be inlined below
import CreateProjectForm from "./components_admin/CreateProjectForm";
import EditProjectForm from "./components_admin/EditProjectForm";
import CreateNewsForm from "./components_admin/CreateNewsForm";
import EditNewsForm from "./components_admin/EditNewsForm";
import ProjectCategoryForm from "./components_admin/ProjectCategoryForm";
import NewsCategoryForm from "./components_admin/NewsCategoryForm";
import ProjectCategoryEditForm from "./components_admin/ProjectCategoryEditForm";
import NewsCategoryEditForm from "./components_admin/NewsCategoryEditForm";

const API_URL = "http://localhost:4000";

export default function AdminPage() {
  const [view, setView] = useState<'projects' | 'news'>('projects');
  const [projects, setProjects] = useState<any[]>([]);
  const [news, setNews] = useState<any[]>([]);
  const [projectCategories, setProjectCategories] = useState<any[]>([]);
  const [newsCategories, setNewsCategories] = useState<any[]>([]);
  const [selected, setSelected] = useState<any | null>(null);
  const [editData, setEditData] = useState<any | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [imagePreview, setImagePreview] = useState<string>("");
  const [categoryEdit, setCategoryEdit] = useState<any | null>(null);
  const [newCategory, setNewCategory] = useState<any>({ name: '', color: '#888888' });
  const [loading, setLoading] = useState(false);
  const [backendMessage, setBackendMessage] = useState<string>("");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/projects`)
      .then(res => res.json())
      .then(data => {
        setProjects(data.projects || []);
        setProjectCategories(data.categories || []);
      });
    fetch(`${API_URL}/news`)
      .then(res => res.json())
      .then(data => {
        setNews(data.news || []);
        setNewsCategories(data.categories || []);
      });
    setLoading(false);
  }, [view]);

  // CRUD para items
  const handleDelete = async () => {
    if (!selected) return;
    try {
      const res = await fetch(`${API_URL}/${view}/${selected.id}`, { method: 'DELETE' });
      let backendText = '';
      try {
        const data = await res.json();
        backendText = data.message || JSON.stringify(data);
      } catch {
        backendText = await res.text();
      }
      setBackendMessage(backendText || 'Eliminado correctamente');
    } catch (err) {
      setBackendMessage('Error al eliminar');
    }
    if (view === 'projects') {
      setProjects(projects.filter(item => item.id !== selected.id));
    } else {
      setNews(news.filter(item => item.id !== selected.id));
    }
    setSelected(null);
    setEditData(null);
  };

  const handleEdit = async () => {
    if (!editData) return;
    const endpoint = `${API_URL}/${view}/${editData.id}`;
    let payload = { ...editData };
    try {
      let res, backendText = '';
      if (editData.image instanceof File) {
        const fd = new FormData();
        Object.entries(payload).forEach(([k, v]) => {
          if (v !== undefined && v !== null) fd.append(k, v as any);
        });
        fd.append('image', editData.image);
        res = await fetch(endpoint, { method: 'PUT', body: fd });
      } else {
        res = await fetch(endpoint, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      try {
        const data = await res.json();
        backendText = data.message || JSON.stringify(data);
      } catch {
        backendText = await res.text();
      }
      setBackendMessage(backendText || 'Editado correctamente');
    } catch (err) {
      setBackendMessage('Error al editar');
    }
    setEditMode(false);
    setEditData(null);
    setSelected(null);
    setLoading(true);
    const res = await fetch(`${API_URL}/${view}`);
    const data = await res.json();
    if (view === 'projects') {
      setProjects(data.projects || []);
    } else {
      setNews(data.news || []);
    }
    setLoading(false);
  };

  // CRUD para categorías
  const handleCategoryEdit = async (cat: any) => {
    try {
      const res = await fetch(`${API_URL}/${view}/categories/${cat.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat)
      });
      let backendText = '';
      try {
        const data = await res.json();
        backendText = data.message || JSON.stringify(data);
      } catch {
        backendText = await res.text();
      }
      setBackendMessage(backendText || 'Categoría editada correctamente');
    } catch (err) {
      setBackendMessage('Error al editar categoría');
    }
    setCategoryEdit(null);
    setLoading(true);
    const res = await fetch(`${API_URL}/${view}`);
    const data = await res.json();
    if (view === 'projects') {
      setProjectCategories(data.categories || []);
    } else {
      setNewsCategories(data.categories || []);
    }
    setLoading(false);
  };

  const handleCategoryDelete = async (cat: any) => {
    try {
      const res = await fetch(`${API_URL}/${view}/categories/${cat.id}`, { method: 'DELETE' });
      let backendText = '';
      try {
        const data = await res.json();
        backendText = data.message || JSON.stringify(data);
      } catch {
        backendText = await res.text();
      }
      setBackendMessage(backendText || 'Categoría eliminada correctamente');
    } catch (err) {
      setBackendMessage('Error al eliminar categoría');
    }
    setLoading(true);
    const res = await fetch(`${API_URL}/${view}`);
    const data = await res.json();
    if (view === 'projects') {
      setProjectCategories(data.categories || []);
    } else {
      setNewsCategories(data.categories || []);
    }
    setLoading(false);
  };

  const handleCategoryCreate = async () => {
    if (!newCategory.name.trim()) return;
    try {
      const res = await fetch(`${API_URL}/${view}/categories`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCategory)
      });
      let backendText = '';
      try {
        const data = await res.json();
        backendText = data.message || JSON.stringify(data);
      } catch {
        backendText = await res.text();
      }
      setBackendMessage(backendText || 'Categoría creada correctamente');
    } catch (err) {
      setBackendMessage('Error al crear categoría');
    }
    setNewCategory({ name: '', color: '#888888' });
    setLoading(true);
    const res = await fetch(`${API_URL}/${view}`);
    const data = await res.json();
    if (view === 'projects') {
      setProjectCategories(data.categories || []);
    } else {
      setNewsCategories(data.categories || []);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-orange-50 p-8 relative">
      <div className="w-full max-w-xl mx-auto mb-4 p-4 rounded bg-orange-100 border border-orange-300 text-orange-800 text-center shadow">
        {backendMessage ? backendMessage : 'Sin respuesta del backend aún.'}
        {backendMessage && (
          <button className="ml-4 text-xs text-orange-600 underline" onClick={() => setBackendMessage("")}>Cerrar</button>
        )}
      </div>
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="mb-4 flex gap-4">
        <button
          className={`px-4 py-2 rounded ${view === 'projects' ? 'bg-orange-500 text-white' : 'bg-white border'}`}
          onClick={() => { setView('projects'); setSelected(null); setEditData(null); setEditMode(false); setCreateMode(false); setFormData({}); setImagePreview("") }}
        >Proyectos</button>
        <button
          className={`px-4 py-2 rounded ${view === 'news' ? 'bg-orange-500 text-white' : 'bg-white border'}`}
          onClick={() => { setView('news'); setSelected(null); setEditData(null); setEditMode(false); setCreateMode(false); setFormData({}); setImagePreview("") }}
        >Noticias</button>
        <button
          className="px-4 py-2 rounded bg-green-500 text-white"
          onClick={() => { setCreateMode(true); setSelected(null); setEditData(null); setEditMode(false); setFormData({}); setImagePreview("") }}
        >Crear {view === 'projects' ? 'Proyecto' : 'Noticia'}</button>
      </div>
      {/* Listado de proyectos/noticias */}
      <div className="mb-6">
        <ul className="divide-y divide-orange-200 bg-white rounded shadow">
          {(view === 'projects' ? projects : news).map((item: any) => (
            <li
              key={item.id}
              className={`p-4 cursor-pointer hover:bg-orange-100 ${selected?.id === item.id ? 'bg-orange-200' : ''}`}
              onClick={() => {
                setSelected(item);
                setEditData(item);
                setEditMode(true);
                setCreateMode(false);
                setFormData({});
                setImagePreview(item.imagenPrincipal || item.image || "");
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{item.titulo || item.title || item.nombre || item.name}</span>
                <span className="text-xs text-gray-500">{item.categoria || item.category}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {/* Listado y edición de categorías */}
      <h2 className="text-lg font-semibold mb-2">Categorías de {view === 'projects' ? 'Proyectos' : 'Noticias'}</h2>
      {view === 'projects' ? (
        <>
          {/* Formulario para crear categoría de proyecto */}
          <ProjectCategoryForm
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            handleCreate={handleCategoryCreate}
          />
          {/* Listado de categorías de proyecto */}
          <div className="mt-4 flex flex-wrap gap-2">
            {projectCategories.map((cat: any) => (
              <button
                key={cat.id}
                className={`px-3 py-1 rounded border flex items-center gap-2 ${categoryEdit?.id === cat.id ? 'bg-orange-200' : 'bg-white'}`}
                onClick={() => setCategoryEdit(cat)}
              >
                <span className="inline-block w-4 h-4 rounded" style={{ background: cat.color }}></span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
          {/* Formulario para editar/eliminar categoría seleccionada */}
          <ProjectCategoryEditForm
            categoryEdit={categoryEdit}
            setCategoryEdit={setCategoryEdit}
            handleEdit={handleCategoryEdit}
            handleDelete={handleCategoryDelete}
          />
        </>
      ) : (
        <>
          {/* Formulario para crear categoría de noticia */}
          <NewsCategoryForm
            newCategory={newCategory}
            setNewCategory={setNewCategory}
            handleCreate={handleCategoryCreate}
          />
          {/* Listado de categorías de noticia */}
          <div className="mt-4 flex flex-wrap gap-2">
            {newsCategories.map((cat: any) => (
              <button
                key={cat.id}
                className={`px-3 py-1 rounded border flex items-center gap-2 ${categoryEdit?.id === cat.id ? 'bg-orange-200' : 'bg-white'}`}
                onClick={() => setCategoryEdit(cat)}
              >
                <span className="inline-block w-4 h-4 rounded" style={{ background: cat.color }}></span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
          {/* Formulario para editar/eliminar categoría seleccionada */}
          <NewsCategoryEditForm
            categoryEdit={categoryEdit}
            setCategoryEdit={setCategoryEdit}
            handleEdit={handleCategoryEdit}
            handleDelete={handleCategoryDelete}
          />
        </>
      )}
      {/* Formulario de creación */}
      {createMode && (
        view === 'projects' ? (
          <CreateProjectForm
            formData={formData}
            setFormData={setFormData}
            categories={projectCategories}
            handleCreate={async () => {
              const endpoint = `${API_URL}/projects`;
              let payload = { ...formData };
              let backendText = '';
              let res;
              // Si hay alguna imagen como File, usar FormData
              if (
                formData.imagenPrincipal instanceof File ||
                formData.image1 instanceof File ||
                formData.image2 instanceof File
              ) {
                const fd = new FormData();
                Object.entries(payload).forEach(([k, v]) => {
                  // Solo agregar si no es undefined/null y no es File (las imágenes se agregan abajo)
                  if (
                    v !== undefined && v !== null &&
                    !(k === 'imagenPrincipal' || k === 'image1' || k === 'image2')
                  ) {
                    fd.append(k, v as any);
                  }
                });
                if (formData.imagenPrincipal instanceof File) {
                  fd.append('imagenPrincipal', formData.imagenPrincipal);
                }
                if (formData.image1 instanceof File) {
                  fd.append('image1', formData.image1);
                }
                if (formData.image2 instanceof File) {
                  fd.append('image2', formData.image2);
                }
                res = await fetch(endpoint, { method: 'POST', body: fd });
              } else {
                res = await fetch(endpoint, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
              }
              try {
                const data = await res.json();
                backendText = data.message || JSON.stringify(data);
              } catch {
                backendText = await res.text();
              }
              setBackendMessage(backendText || 'Proyecto creado correctamente');
              // NO limpiar los datos ni el preview, para que el usuario pueda revisar/corregir
              // setCreateMode(false);
              // setFormData({});
              // setImagePreview("");
              setLoading(true);
              const resList = await fetch(endpoint);
              const dataList = await resList.json();
              setProjects(dataList.projects);
              setLoading(false);
            }}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        ) : (
          <CreateNewsForm
            formData={formData}
            setFormData={setFormData}
            categories={newsCategories}
            handleCreate={async () => {
              const endpoint = `${API_URL}/news`;
              let payload = { ...formData };
              let backendText = '';
              let res;
              if (formData.image instanceof File) {
                const fd = new FormData();
                Object.entries(payload).forEach(([k, v]) => {
                  if (v !== undefined && v !== null) fd.append(k, v as any);
                });
                fd.append('image', formData.image);
                res = await fetch(endpoint, { method: 'POST', body: fd });
              } else {
                res = await fetch(endpoint, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
              }
              try {
                const data = await res.json();
                backendText = data.message || JSON.stringify(data);
              } catch {
                backendText = await res.text();
              }
              setBackendMessage(backendText || 'Noticia creada correctamente');
              // NO limpiar los datos ni el preview, para que el usuario pueda revisar/corregir
              // setCreateMode(false);
              // setFormData({});
              // setImagePreview("");
              setLoading(true);
              const resList = await fetch(endpoint);
              const dataList = await resList.json();
              setNews(dataList.news);
              setLoading(false);
            }}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        )
      )}
      {/* Formulario de edición */}
      {editMode && selected && (
        view === 'projects' ? (
          <EditProjectForm
            editData={editData}
            setEditData={setEditData}
            categories={projectCategories}
            handleEdit={async () => {
              if (!editData) return;
              const endpoint = `${API_URL}/projects/${editData.id}`;
              let payload = { ...editData };
              let backendText = '';
              let res;
              // Si hay alguna imagen como File, usar FormData
              if (
                editData.imagenPrincipal instanceof File ||
                editData.image1 instanceof File ||
                editData.image2 instanceof File
              ) {
                const fd = new FormData();
                Object.entries(payload).forEach(([k, v]) => {
                  if (
                    v !== undefined && v !== null &&
                    !(k === 'imagenPrincipal' || k === 'image1' || k === 'image2')
                  ) {
                    fd.append(k, v as any);
                  }
                });
                if (editData.imagenPrincipal instanceof File) {
                  fd.append('imagenPrincipal', editData.imagenPrincipal);
                }
                if (editData.image1 instanceof File) {
                  fd.append('image1', editData.image1);
                }
                if (editData.image2 instanceof File) {
                  fd.append('image2', editData.image2);
                }
                res = await fetch(endpoint, { method: 'PUT', body: fd });
              } else {
                res = await fetch(endpoint, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
              }
              try {
                const data = await res.json();
                backendText = data.message || JSON.stringify(data);
              } catch {
                backendText = await res.text();
              }
              setBackendMessage(backendText || 'Proyecto editado correctamente');
              // NO limpiar los datos ni el preview, para que el usuario pueda revisar/corregir
              // setEditMode(false);
              // setEditData(null);
              // setSelected(null);
              setLoading(true);
              const resList = await fetch(`${API_URL}/projects`);
              const dataList = await resList.json();
              setProjects(dataList.projects);
              setLoading(false);
            }}
            handleDelete={handleDelete}
          />
        ) : (
          <EditNewsForm
            editData={editData}
            setEditData={setEditData}
            categories={newsCategories}
            handleEdit={async () => {
              if (!editData) return;
              const endpoint = `${API_URL}/news/${editData.id}`;
              let payload = { ...editData };
              let backendText = '';
              let res;
              if (editData.image instanceof File) {
                const fd = new FormData();
                Object.entries(payload).forEach(([k, v]) => {
                  if (v !== undefined && v !== null) fd.append(k, v as any);
                });
                fd.append('image', editData.image);
                res = await fetch(endpoint, { method: 'PUT', body: fd });
              } else {
                res = await fetch(endpoint, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                });
              }
              try {
                const data = await res.json();
                backendText = data.message || JSON.stringify(data);
              } catch {
                backendText = await res.text();
              }
              setBackendMessage(backendText || 'Noticia editada correctamente');
              // NO limpiar los datos ni el preview, para que el usuario pueda revisar/corregir
              // setEditMode(false);
              // setEditData(null);
              // setSelected(null);
              setLoading(true);
              const resList = await fetch(`${API_URL}/news`);
              const dataList = await resList.json();
              setNews(dataList.news);
              setLoading(false);
            }}
            handleDelete={handleDelete}
            imagePreview={imagePreview}
            setImagePreview={setImagePreview}
          />
        )
      )}
    </div>
  );
}

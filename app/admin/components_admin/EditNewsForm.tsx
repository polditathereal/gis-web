"use client";
import React, { useRef } from "react";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface EditNewsFormProps {
  editData: any;
  setEditData: (data: any) => void;
  categories: Category[];
  handleEdit: () => void;
  handleDelete: () => void;
  imagePreview: string;
  setImagePreview: (url: string) => void;
}

const EditNewsForm: React.FC<EditNewsFormProps> = ({ editData, setEditData, categories, handleEdit, handleDelete, imagePreview, setImagePreview }) => {
  const API_URL = "http://localhost:4000";
  const PLACEHOLDER = "/placeholder.jpg";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imagePreviewLocal, setImagePreviewLocal] = React.useState<string>("");

  React.useEffect(() => {
    if (editData?.id) {
      fetch(`${API_URL}/news/${editData.id}/image`)
        .then(res => {
          if (res.ok) return res.url;
          return PLACEHOLDER;
        })
        .then(url => setImagePreviewLocal(url))
        .catch(() => setImagePreviewLocal(PLACEHOLDER));
    }
  }, [editData?.id]);

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setEditData({ ...editData, image: file });
      setImagePreviewLocal(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditData({ ...editData, image: file });
      setImagePreviewLocal(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-8 p-4 border rounded bg-white">
      <h2 className="text-xl font-semibold mb-2">Editar Noticia</h2>
      {["title", "description", "date", "featured", "author", "readTime"].map(key => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">{key}</label>
          <input
            className="border rounded px-2 py-1 w-full"
            value={editData[key] ?? ''}
            onChange={e => setEditData({ ...editData, [key]: e.target.value })}
          />
        </div>
      ))}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={editData.category ?? ''}
          onChange={e => setEditData({ ...editData, category: e.target.value })}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div
        className="mb-2 border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer"
        onDragOver={e => e.preventDefault()}
        onDrop={handleImageDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreviewLocal ? (
          <>
            <img src={imagePreviewLocal} alt="Preview" className="mx-auto max-h-32 mb-2 rounded" />
            <button
              type="button"
              className="bg-red-500 text-white px-3 py-1 rounded mb-2"
              onClick={e => {
                e.stopPropagation();
                setEditData({ ...editData, image: null });
                setImagePreviewLocal("");
              }}
            >Quitar imagen</button>
          </>
        ) : (
          <span>Arrastra una imagen aquí o haz click para seleccionar</span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
      <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={handleEdit}>Guardar Cambios</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={handleDelete}>Eliminar Noticia</button>
    </div>
  );
};

export default EditNewsForm;

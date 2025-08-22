"use client";
import React, { useRef } from "react";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CreateNewsFormProps {
  formData: any;
  setFormData: (data: any) => void;
  categories: Category[];
  handleCreate: () => void;
  imagePreview: string;
  setImagePreview: (url: string) => void;
}

const CreateNewsForm: React.FC<CreateNewsFormProps> = ({ formData, setFormData, categories, handleCreate, imagePreview, setImagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };


  return (
    <div className="mb-8 p-4 border rounded bg-white">
      <h2 className="text-xl font-semibold mb-2">Crear Noticia</h2>
      {/* Campos específicos de noticia */}
      {["title", "description", "date", "featured", "author", "readTime"].map(key => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">{key}</label>
          <input
            className="border rounded px-2 py-1 w-full"
            value={formData?.[key] ?? ''}
            onChange={e => setFormData({ ...formData, [key]: e.target.value })}
            name={key}
          />
        </div>
      ))}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={formData.category ?? ''}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
          name="category"
        >
          <option value="">Selecciona una categoría</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div
        className="mb-2 border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer"
        onDragOver={e => e.preventDefault()}
        onDrop={handleImageDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <>
            <img src={imagePreview} alt="Preview" className="mx-auto max-h-32 mb-2 rounded" />
            <button
              type="button"
              className="bg-red-500 text-white px-3 py-1 rounded mb-2"
              onClick={e => {
                e.stopPropagation();
                setFormData({ ...formData, image: null });
                setImagePreview("");
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
          name="image"
        />
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleCreate}>Crear Noticia</button>
    </div>
  );
};

export default CreateNewsForm;

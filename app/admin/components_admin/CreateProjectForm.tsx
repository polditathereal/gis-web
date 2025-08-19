"use client";
import React, { useRef } from "react";

interface Category {
  id: string;
  name: string;
  color: string;
}


interface CreateProjectFormProps {
  formData: any;
  setFormData: (data: any) => void;
  categories: Category[];
  handleCreate: () => void;
  imagePreview: string;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
}

const CreateProjectForm: React.FC<CreateProjectFormProps> = ({ formData, setFormData, categories, handleCreate, imagePreview, setImagePreview }) => {
  // Imagen principal
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, imagenPrincipal: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, imagenPrincipal: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Imagen 1
  const fileInputRef1 = useRef<HTMLInputElement | null>(null);
  const [imagePreview1, setImagePreview1] = React.useState<string>("");
  const handleImageDrop1 = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, image1: file });
      setImagePreview1(URL.createObjectURL(file));
    }
  };
  const handleImageChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image1: file });
      setImagePreview1(URL.createObjectURL(file));
    }
  };

  // Imagen 2
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);
  const [imagePreview2, setImagePreview2] = React.useState<string>("");
  const handleImageDrop2 = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData({ ...formData, image2: file });
      setImagePreview2(URL.createObjectURL(file));
    }
  };
  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image2: file });
      setImagePreview2(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-8 p-4 border rounded bg-white">
      <h2 className="text-xl font-semibold mb-2">Crear Proyecto</h2>
      {/* Campos específicos de proyecto */}
      {["title", "tipo", "tema", "entidadContratante", "paisOrigen", "tipo2", "objeto", "fechaInicial", "fechaFinal", "consorcio", "integrantes", "descripcion"].map(key => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">{key}</label>
          <input
            className="border rounded px-2 py-1 w-full"
            value={formData[key] ?? ''}
            onChange={e => setFormData({ ...formData, [key]: e.target.value })}
          />
        </div>
      ))}
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={formData.category ?? ''}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
        >
          <option value="">Selecciona una categoría</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.name}>{cat.name}</option>
          ))}
        </select>
      </div>
      {/* Imagen principal */}
      <div
        className="mb-2 border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer"
        onDragOver={e => e.preventDefault()}
        onDrop={handleImageDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {imagePreview ? (
          <img src={imagePreview} alt="Preview" className="mx-auto max-h-32 mb-2 rounded" />
        ) : (
          <span>Arrastra una imagen principal aquí o haz click para seleccionar</span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </div>
      {/* Imagen 1 */}
      <div
        className="mb-2 border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer"
        onDragOver={e => e.preventDefault()}
        onDrop={handleImageDrop1}
        onClick={() => fileInputRef1.current?.click()}
      >
        {imagePreview1 ? (
          <img src={imagePreview1} alt="Preview" className="mx-auto max-h-32 mb-2 rounded" />
        ) : (
          <span>Arrastra la imagen 1 aquí o haz click para seleccionar</span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef1}
          style={{ display: 'none' }}
          onChange={handleImageChange1}
        />
      </div>
      {/* Imagen 2 */}
      <div
        className="mb-2 border-dashed border-2 border-gray-300 rounded p-4 text-center cursor-pointer"
        onDragOver={e => e.preventDefault()}
        onDrop={handleImageDrop2}
        onClick={() => fileInputRef2.current?.click()}
      >
        {imagePreview2 ? (
          <img src={imagePreview2} alt="Preview" className="mx-auto max-h-32 mb-2 rounded" />
        ) : (
          <span>Arrastra la imagen 2 aquí o haz click para seleccionar</span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef2}
          style={{ display: 'none' }}
          onChange={handleImageChange2}
        />
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleCreate}>Crear Proyecto</button>
    </div>
  );
};

export default CreateProjectForm;

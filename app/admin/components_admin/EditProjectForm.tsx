"use client";
import React, { useRef } from "react";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface EditProjectFormProps {
  editData: any;
  setEditData: (data: any) => void;
  categories: Category[];
  handleEdit: () => void;
  handleDelete: () => void;
  // ...eliminar las props de previsualización, ya no se usan
}

const EditProjectForm: React.FC<EditProjectFormProps> = ({ editData, setEditData, categories, handleEdit, handleDelete }) => {
  const API_URL = "http://localhost:4000";
  const PLACEHOLDER = "/placeholder.jpg";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileInputRef1 = useRef<HTMLInputElement | null>(null);
  const fileInputRef2 = useRef<HTMLInputElement | null>(null);
  const [imagePreviewLocal, setImagePreviewLocal] = React.useState<string>("");
  const [imagePreview1, setImagePreview1] = React.useState<string>("");
  const [imagePreview2, setImagePreview2] = React.useState<string>("");

  React.useEffect(() => {
    if (editData?.id) {
      fetch(`${API_URL}/projects/${editData.id}/images`)
        .then(res => res.json())
        .then(imgs => {
          setImagePreviewLocal(imgs.imagenPrincipal ? API_URL + imgs.imagenPrincipal : PLACEHOLDER);
          setImagePreview1(imgs.image1 ? API_URL + imgs.image1 : PLACEHOLDER);
          setImagePreview2(imgs.image2 ? API_URL + imgs.image2 : PLACEHOLDER);
        })
        .catch(() => {
          setImagePreviewLocal(PLACEHOLDER);
          setImagePreview1(PLACEHOLDER);
          setImagePreview2(PLACEHOLDER);
        });
    }
  }, [editData?.id]);

  // Imagen principal
  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setEditData({ ...editData, imagenPrincipal: file });
      setImagePreviewLocal(URL.createObjectURL(file));
    }
  };
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditData({ ...editData, imagenPrincipal: file });
      setImagePreviewLocal(URL.createObjectURL(file));
    }
  };

  // Imagen 1
  const handleImageDrop1 = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setEditData({ ...editData, image1: file });
      setImagePreview1(URL.createObjectURL(file));
    }
  };
  const handleImageChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditData({ ...editData, image1: file });
      setImagePreview1(URL.createObjectURL(file));
    }
  };

  // Imagen 2
  const handleImageDrop2 = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setEditData({ ...editData, image2: file });
      setImagePreview2(URL.createObjectURL(file));
    }
  };
  const handleImageChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setEditData({ ...editData, image2: file });
      setImagePreview2(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mb-8 p-4 border rounded bg-white">
      <h2 className="text-xl font-semibold mb-2">Editar Proyecto</h2>
      {["title", "tipo", "tema", "entidadContratante", "paisOrigen", "tipo2", "objeto", "fechaInicial", "fechaFinal", "consorcio", "integrantes", "descripcion"].map(key => (
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
      {/* Imagen principal */}
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
                setEditData({ ...editData, imagenPrincipal: null });
                setImagePreviewLocal("");
              }}
            >Quitar imagen</button>
          </>
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
          <>
            <img src={imagePreview1} alt="Preview" className="mx-auto max-h-32 mb-2 rounded" />
            <button
              type="button"
              className="bg-red-500 text-white px-3 py-1 rounded mb-2"
              onClick={e => {
                e.stopPropagation();
                setEditData({ ...editData, image1: null });
                setImagePreview1("");
              }}
            >Quitar imagen</button>
          </>
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
          <>
            <img src={imagePreview2} alt="Preview" className="mx-auto max-h-32 mb-2 rounded" />
            <button
              type="button"
              className="bg-red-500 text-white px-3 py-1 rounded mb-2"
              onClick={e => {
                e.stopPropagation();
                setEditData({ ...editData, image2: null });
                setImagePreview2("");
              }}
            >Quitar imagen</button>
          </>
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
      <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={handleEdit}>Guardar Cambios</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={handleDelete}>Eliminar Proyecto</button>
    </div>
  );
};

export default EditProjectForm;

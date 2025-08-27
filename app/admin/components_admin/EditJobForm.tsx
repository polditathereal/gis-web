"use client";
import React from "react";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface EditJobFormProps {
  editData: any;
  setEditData: (data: any) => void;
  categories: Category[];
  handleEdit: () => void;
  handleDelete: () => void;
}

const EditJobForm: React.FC<EditJobFormProps> = ({ editData, setEditData, categories, handleEdit, handleDelete }) => {
  return (
    <div className="mb-8 p-4 border rounded bg-white">
      <h2 className="text-xl font-semibold mb-2">Editar Oferta de Empleo</h2>
      {["title", "description", "date"].map(key => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">{key}</label>
          {key === 'date' ? (
            <input
              type="date"
              className="border rounded px-2 py-1 w-full"
              value={editData?.date ? new Date(editData.date).toISOString().slice(0,10) : ''}
              onChange={e => setEditData({ ...editData, date: e.target.value })}
              name="date"
            />
          ) : (
            <input
              className="border rounded px-2 py-1 w-full"
              value={editData?.[key] ?? ''}
              onChange={e => setEditData({ ...editData, [key]: e.target.value })}
              name={key}
            />
          )}
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
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Enlace LinkedIn</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={editData.linkedin ?? ''}
          onChange={e => setEditData({ ...editData, linkedin: e.target.value })}
          name="linkedin"
          type="url"
          placeholder="https://www.linkedin.com/jobs/view/..."
        />
      </div>
      <button className="bg-orange-500 text-white px-4 py-2 rounded" onClick={handleEdit}>Guardar Cambios</button>
      <button className="bg-red-500 text-white px-4 py-2 rounded ml-2" onClick={handleDelete}>Eliminar Oferta</button>
    </div>
  );
};

export default EditJobForm;

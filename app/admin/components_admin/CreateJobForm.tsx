"use client";
import React, { useRef } from "react";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CreateJobFormProps {
  formData: any;
  setFormData: (data: any) => void;
  categories: Category[];
  handleCreate: () => void;
}

const CreateJobForm: React.FC<CreateJobFormProps> = ({ formData, setFormData, categories, handleCreate }) => {
  return (
    <div className="mb-8 p-4 border rounded bg-white">
      <h2 className="text-xl font-semibold mb-2">Crear Oferta de Empleo</h2>
      {["title", "description", "date"].map(key => (
        <div key={key} className="mb-2">
          <label className="block text-sm font-medium text-gray-700">{key}</label>
          {key === 'date' ? (
            <input
              type="date"
              className="border rounded px-2 py-1 w-full"
              value={formData?.date ? new Date(formData.date).toISOString().slice(0,10) : ''}
              onChange={e => setFormData({ ...formData, date: e.target.value })}
              name="date"
            />
          ) : (
            <input
              className="border rounded px-2 py-1 w-full"
              value={formData?.[key] ?? ''}
              onChange={e => setFormData({ ...formData, [key]: e.target.value })}
              name={key}
            />
          )}
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
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-medium text-gray-700">Enlace LinkedIn</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={formData.linkedin ?? ''}
          onChange={e => setFormData({ ...formData, linkedin: e.target.value })}
          name="linkedin"
          type="url"
          placeholder="https://www.linkedin.com/jobs/view/..."
        />
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={handleCreate}>Crear Oferta</button>
    </div>
  );
};

export default CreateJobForm;

"use client";
import React from "react";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface ProjectCategoryEditFormProps {
  categoryEdit: Category | null;
  setCategoryEdit: (cat: Category | null) => void;
  handleEdit: (cat: Category) => void;
  handleDelete: (cat: Category) => void;
}

const ProjectCategoryEditForm: React.FC<ProjectCategoryEditFormProps> = ({ categoryEdit, setCategoryEdit, handleEdit, handleDelete }) => (
  <div className="flex flex-wrap gap-4">
    {categoryEdit && (
      <div className="border rounded p-2 flex items-center gap-2">
        <span className="inline-block w-4 h-4 rounded" style={{ background: categoryEdit.color }}></span>
        <input value={categoryEdit.name} onChange={e => setCategoryEdit({ ...categoryEdit, name: e.target.value })} className="border rounded px-2 py-1 text-sm" />
        <input type="color" value={categoryEdit.color} onChange={e => setCategoryEdit({ ...categoryEdit, color: e.target.value })} />
        <button className="bg-green-500 text-white px-2 py-1 rounded text-xs" onClick={() => handleEdit(categoryEdit)}>Guardar</button>
        <button className="bg-gray-300 px-2 py-1 rounded text-xs" onClick={() => setCategoryEdit(null)}>Cancelar</button>
        <button className="bg-red-500 text-white px-2 py-1 rounded text-xs" onClick={() => handleDelete(categoryEdit)}>Eliminar</button>
      </div>
    )}
  </div>
);

export default ProjectCategoryEditForm;

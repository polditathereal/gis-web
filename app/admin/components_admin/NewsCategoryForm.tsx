"use client";
import React from "react";

interface Category {
  id?: string;
  name: string;
  color: string;
}

interface NewsCategoryFormProps {
  newCategory: Category;
  setNewCategory: (cat: Category) => void;
  handleCreate: () => void;
}

const NewsCategoryForm: React.FC<NewsCategoryFormProps> = ({ newCategory, setNewCategory, handleCreate }) => (
  <div className="mt-4 flex gap-2 items-center">
    <input value={newCategory.name} onChange={e => setNewCategory({ ...newCategory, name: e.target.value })} placeholder="Nombre de categoría de noticia" className="border rounded px-2 py-1 text-sm" />
    <input type="color" value={newCategory.color} onChange={e => setNewCategory({ ...newCategory, color: e.target.value })} />
    <button className="bg-green-500 text-white px-2 py-1 rounded text-xs" onClick={handleCreate}>Crear categoría de noticia</button>
  </div>
);

export default NewsCategoryForm;

"use client";
import React from "react";

interface Job {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  color: string;
}

interface JobListProps {
  jobs: Job[];
  categories: Category[];
  onEdit: (job: Job) => void;
}

const JobList: React.FC<JobListProps> = ({ jobs, categories, onEdit }) => {
  const getCategoryColor = (catId: string) => {
    const cat = categories.find(c => c.id === catId);
    return cat ? cat.color : '#ccc';
  };
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-2">Ofertas de Empleo</h2>
      <div className="grid gap-4">
        {jobs.map(job => (
          <div key={job.id} className="border rounded p-4 bg-white flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mr-2"
                style={{ background: getCategoryColor(job.category), color: '#fff' }}
              >
                {categories.find(c => c.id === job.category)?.name || job.category}
              </span>
              <span className="font-bold text-lg mr-2">{job.title}</span>
              <span className="text-sm text-gray-500">{job.date ? new Date(job.date).toLocaleDateString() : ''}</span>
              <p className="mt-2 text-gray-700 text-sm">{job.description}</p>
            </div>
            <button className="bg-orange-500 text-white px-3 py-1 rounded mt-2 md:mt-0" onClick={() => onEdit(job)}>Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobList;
